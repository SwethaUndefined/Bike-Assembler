import React from "react";
import { Button, message, Row, Col, Typography, Space } from "antd";
import {useNavigate } from "react-router-dom";
import { logoutUser, updateSelectedBike } from "../api";
import "./header.css";

const Header = ({ bikeId, bikeName }) => {
  const navigate = useNavigate();
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
