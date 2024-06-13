import { useState, useEffect } from "react";

const useAssemblyTimer = (selectedBike) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("Yet to Start");

  useEffect(() => {
    if (!selectedBike) return;

    let assembleTimeInSeconds = calculateAssembleTimeInSeconds(selectedBike.duration !== "00:00:00" ? selectedBike.duration : selectedBike.assembleTime);
    const totalAssembleTimeInSeconds = calculateAssembleTimeInSeconds(selectedBike.assembleTime);
    setStatus("In progress")
    setTimeLeft(secondsToTime(assembleTimeInSeconds));
    setProgress(((totalAssembleTimeInSeconds - assembleTimeInSeconds) / totalAssembleTimeInSeconds) * 100);

    const timerInterval = setInterval(() => {
      if (assembleTimeInSeconds > 0) {
        assembleTimeInSeconds -= 1;
        const currentTimeLeft = secondsToTime(assembleTimeInSeconds);
        const currentProgress = ((totalAssembleTimeInSeconds - assembleTimeInSeconds) / totalAssembleTimeInSeconds) * 100;

        setTimeLeft(currentTimeLeft);
        setProgress(currentProgress);
        
        const assembleReport = {
          timeLeft: currentTimeLeft,
          progress: currentProgress,
          status: "In progress"
        };
        localStorage.setItem("assembleReport", JSON.stringify(assembleReport));

        if (assembleTimeInSeconds === 0) {
          clearInterval(timerInterval);
          setStatus("Completed");
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [selectedBike]);

  const calculateAssembleTimeInSeconds = (assembleTime) => {
    const [hours, minutes, seconds] = assembleTime.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const secondsToTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return { progress, timeLeft, status };
};

export default useAssemblyTimer;
