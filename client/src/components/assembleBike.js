import React, { useEffect, useState } from "react";
import { Progress, Typography, message, Row, Col } from "antd";
import "./assembleBike.css";
import { updateSelectedBike, getSelectedBikesByUsername } from "../api";
import { useBikeAssembly } from "../bikeAssemblyProvider";

const BikeAssembly = ({ selectedBike, setIsInProgress, updateSelectedBikes }) => {
  const { progress, timeLeft, status, updateProgress, updateTimeLeft, updateStatus } = useBikeAssembly();
  const username = localStorage.getItem("username")
  const assembleTimeToSeconds = (assembleTime) => {
    const [hours, minutes] = assembleTime.split(":");
    return parseInt(hours) * 3600 + parseInt(minutes) * 60;
  };

  const calculateInitialProgress = () => {
    if (selectedBike && status === 'in progress') {
      const totalAssemblyTime = assembleTimeToSeconds(selectedBike.assembleTime);
      const remainingTime = timeLeft;
      return Math.floor(((totalAssemblyTime - remainingTime) / totalAssemblyTime) * 100);
    }
    return 0;
  };

  useEffect(() => {
    if (!selectedBike || !selectedBike.assembleTime) {
      return;
    }

    const initialTimeLeft = assembleTimeToSeconds(selectedBike.assembleTime);
    updateTimeLeft(initialTimeLeft);

    const initialProgress = calculateInitialProgress();
    updateProgress(initialProgress);

    const timer = setInterval(() => {
      updateTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setIsInProgress(false);
          updateStatus("Completed");
          handleAssemblyCompletion();
          return 0;
        }
        updateStatus("in progress");
        const progressPercentage = Math.floor(((assembleTimeToSeconds(selectedBike.assembleTime) - prevTime) / assembleTimeToSeconds(selectedBike.assembleTime)) * 100);
        updateProgress(progressPercentage);
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedBike]);

  
  const handleAssemblyCompletion = async () => {
    try {
      const durationTaken = assembleTimeToSeconds(selectedBike.assembleTime) - timeLeft;
      const progressPercentage = Math.floor(((assembleTimeToSeconds(selectedBike.assembleTime) - timeLeft) / assembleTimeToSeconds(selectedBike.assembleTime)) * 100);
      await updateSelectedBike(selectedBike._id, username, {
        status: "Completed",
        startProgress: progressPercentage,
        duration: durationTaken,
        bikeName: selectedBike.bikeName
      });
      const updatedBikes = await getSelectedBikesByUsername(username);
      updateSelectedBikes(updatedBikes);
      message.success("Bike assembly completed successfully!");
    } catch (error) {
      message.error("Failed to update backend");
    }
  };
  
  const totalAssemblyTime = selectedBike ? assembleTimeToSeconds(selectedBike.assembleTime) : 0;
  const remainingTimePercentage = Math.floor((timeLeft / totalAssemblyTime) * 100);

  return (
    <section className="assembling-bike">
      <Row>
        <Col span={24}>
          <Typography className="name">
            {selectedBike && selectedBike.bikeName} is {status === 'Completed' ? 'assembled' : 'assembling'}
          </Typography>
        </Col>
        <Col span={24} className="progress">
          <Progress
            type="circle"
            percent={status === 'in progress' ? progress : calculateInitialProgress()}
            format={() => (
              <Typography className="progress-text">
                {status === 'in progress' ? progress : calculateInitialProgress()}%
              </Typography>
            )}
          />
        </Col>
        <Typography>Time Left: {timeLeft} seconds</Typography>
        <Typography>Status: {status}</Typography>
        <Typography className="progress-text">
          {status === 'in progress' ? progress : calculateInitialProgress()}%
        </Typography>
      </Row>
    </section>
  );
};

export default BikeAssembly;