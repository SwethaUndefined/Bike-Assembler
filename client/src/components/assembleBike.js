import React, { useState, useEffect } from "react";
import { Progress,Typography,Row,Col,message } from "antd";
import "./assembleBike.css";
import {updateSelectedBike,getSelectedBikesByUsername} from "../api"

const AssembleBike = ({ selectedBike, setIsInProgress, updateSelectedBikes }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("Yet to Start");
  const username = localStorage.getItem("username");
  useEffect(() => {
    if (selectedBike) {
      setProgress(selectedBike.progress);
      setStatus("In progress");
      setTimeLeft(
        selectedBike.duration !== "00:00:00"
          ? selectedBike.duration
          : selectedBike.assembleTime
      );
    }
  }, [selectedBike]);


  useEffect(() => {
    
    if (!selectedBike) return; 

    const assembleTimeInSeconds = calculateAssembleTimeInSeconds(
      selectedBike.duration !== "00:00:00"
        ? selectedBike.duration
        : selectedBike.assembleTime
    );

    
    let elapsedTime = Math.round(selectedBike.progress * (assembleTimeInSeconds / 100)); 
    const interval = setInterval(() => {
      elapsedTime++;
      const progressPercentage = Math.min(
        (elapsedTime / assembleTimeInSeconds) * 100,
        100
      );
      setProgress(progressPercentage);

      const remainingSeconds = Math.max(assembleTimeInSeconds - elapsedTime, 0);
      setTimeLeft(secondsToTime(remainingSeconds));
  
      const assembleReport = {
        timeLeft: secondsToTime(remainingSeconds),
        progress: Math.round(progressPercentage),
        status: "In progress"
      };
      localStorage.setItem("assembleReport", JSON.stringify(assembleReport));
  
      if (elapsedTime >= assembleTimeInSeconds) {
        clearInterval(interval);
        setStatus("Completed");
        handleAssemblyCompletion("Completed", progressPercentage, secondsToTime(remainingSeconds))
      }
    }, 1000);
  
    // Cleanup function
    return () => clearInterval(interval);
  }, [selectedBike]);
  

  const calculateAssembleTimeInSeconds = (assembleTime) => {
    const [hours, minutes, seconds] = assembleTime.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const secondsToTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  const handleAssemblyCompletion = async (status, progress, timeLeft) => {
    try {
      const bikeStatus = {
        status: status,
        progress: progress,
        duration: timeLeft,
        bikeName: selectedBike.bikeName
      }
      await updateSelectedBike(selectedBike._id, username, bikeStatus)
      const updatedBikes = await getSelectedBikesByUsername(username);
      updateSelectedBikes(updatedBikes);
      message.success("Bike assembly completed successfully!");
      setIsInProgress(false);
    } catch (error) {
      message.error("Failed to update backend");
    }
  };
  return (
    <section className="assembling-bike">
    <Row>
      <Col span={24}>
      <Typography className="name">
            {selectedBike && selectedBike.bikeName} is {status === 'Completed' ? 'assembled' : 'assembling'}
          </Typography>

      </Col>
      <Col span={24} className="progressbar">
        <Progress
          type="circle"
          percent={progress}
          format={() => <span style={{ fontSize: "13px" }}>{Math.round(progress)}%</span>}
          />
      </Col>
      <Col span={24}>
        <Typography.Title level={3}>Time Left</Typography.Title>
        <Typography.Text>{timeLeft}</Typography.Text>
        <Typography.Title level={3}>Status</Typography.Title>
        <Typography.Text>{status}</Typography.Text>
      </Col>
    </Row>
  </section>
  );
};

export default AssembleBike;
