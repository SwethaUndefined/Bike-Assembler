import React, { useState } from "react";
import { Button, message, Row, Col, Typography, Space } from "antd";
import { json, useNavigate } from "react-router-dom";
import { logoutUser, updateSelectedBike } from "../api";
import "./header.css";
import { useBikeAssembly } from "../bikeAssemblyProvider";

const Header = ({ bikeId, bikeName }) => {
  const navigate = useNavigate();
  const { progress, timeLeft, status } = useBikeAssembly();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const username = localStorage.getItem("username");

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      const assembleReport = JSON.parse(localStorage.getItem("assembleReport"));

      if (bikeId && assembleReport) {
        const bikeStatus = {
          status: assembleReport.status,
          progress: assembleReport.progress,
          duration: assembleReport.timeLeft,
          bikeName: bikeName,
        };
        await updateSelectedBike(bikeId, username, bikeStatus);
      }
      const res = await logoutUser(username);
      message.success("Logged out successfully.");
      navigate("/bikes");
    } catch (error) {
      console.error("Error logging out:", error);
      message.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="header">
      {isLoggedIn && (
        <Row>
          <Col span={24} align="end">
            <Space>
              <Typography className="name">{username}!</Typography>
              <Button type="primary" className="logout" onClick={handleLogout}>
                Logout
              </Button>
            </Space>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Header;
