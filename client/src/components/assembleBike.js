import React, { useState, useEffect } from "react";
import { Progress, Typography, Row, Col, message } from "antd";
import "./assembleBike.css";
import { updateSelectedBike, getSelectedBikesByUsername } from "../api";

import useAssemblyTimer from "../timerAndPercentageCalculationHook";


const AssembleBike = ({ selectedBike, setIsInProgress, updateSelectedBikes }) => {
  const { progress, timeLeft, status } = useAssemblyTimer(selectedBike);
  const username = localStorage.getItem("username");
  const [bikeName, setBikeName] = useState(selectedBike?.bikeName);

  useEffect(() => {
    if (selectedBike) {
      setBikeName(selectedBike.bikeName);
    }
  }, [selectedBike]);
  

  const handleAssemblyCompletion = async (status, progress, timeLeft) => {
    try {
      const bikeStatus = {
        status: status,
        progress: progress,
        duration: timeLeft,
        bikeName: selectedBike.bikeName,
      };
      await updateSelectedBike(selectedBike._id, username, bikeStatus);
      const updatedBikes = await getSelectedBikesByUsername(username);
      updateSelectedBikes(updatedBikes);
      message.success("Bike assembly completed successfully!");
      setIsInProgress(false);
      localStorage.removeItem("assembleReport");
    } catch (error) {
      message.error("Failed to update backend");
    }
  };
  useEffect(() => {
    if (status === "Completed") {
      handleAssemblyCompletion(status, progress, timeLeft);
    }
  }, [status]);
  return (
    <section className="assembling-bike">
      <Row>
        <Col span={24}>
          <Typography className="bikeName">
            {bikeName} is {status === "Completed" ? "assembled" : "assembling"}
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
