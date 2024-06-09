import React, { useEffect, useState } from "react";
import { Progress, Typography, Row, Col } from "antd";
import "./assembleBike.css";
import { useBikeAssembly } from "../bikeAssemblyProvider";

const BikeAssembly = ({ selectedBike }) => {
  const { progress, timeLeft, status, setProgress, setTimeLeft, setStatus } =
    useBikeAssembly();
  const [assembleTimeMilliseconds, setAssembleTimeMilliseconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(selectedBike?.duration);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => { 
    if (selectedBike) {
      let calculatedAssembleTime = selectedBike.duration > 0 ? selectedBike.duration : selectedBike.assembleTime
      const [hours, minutes] = calculatedAssembleTime.split(":").map(Number);
      const timeInMilliseconds = hours * 3600000 + minutes * 60000;
      setAssembleTimeMilliseconds(timeInMilliseconds);
      setRemainingTime(timeInMilliseconds);
      // Set initial values only if they exist in selectedBike
      if (selectedBike.progress !== undefined) setProgress(selectedBike.progress);
      if (selectedBike.status !== undefined) setStatus(selectedBike.status);
      if (selectedBike.duration !== undefined) setTimeLeft(selectedBike.duration);
      setIsFirstRender(false);
    }
  }, [selectedBike, setProgress, setStatus, setTimeLeft]);

  const progressPercentage =
    ((assembleTimeMilliseconds - remainingTime) / assembleTimeMilliseconds) *
    100;

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      if (progress > 0) setStatus("In Progress");
      if (progress === 100) setStatus("Completed");
      setTimeLeft(new Date(remainingTime).toISOString().substr(11, 8));
      setProgress(Math.round(progressPercentage));
      const assembleReport = {
        timeLeft,
        progress,
        status,
      };
      localStorage.setItem("assembleReport", JSON.stringify(assembleReport));
    }
  }, [remainingTime, progress, progressPercentage, setStatus, setTimeLeft, setProgress, status, timeLeft, isFirstRender]);

  return (
    <section className="assembling-bike">
      <Row>
        <Col span={24}>
          <Typography.Title level={3}>Assemble Progress</Typography.Title>
        </Col>
        <Col span={24} className="progressbar">
          <Progress
            type="circle"
            percent={progress}
            format={() => <span style={{ fontSize: "13px" }}>{progress}%</span>}
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

export default BikeAssembly;
