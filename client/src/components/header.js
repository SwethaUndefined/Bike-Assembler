import React, { useState } from "react";
import { Button, message, Row, Col, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api";
import "./header.css";
import { useBikeAssembly } from "../bikeAssemblyProvider"; 
import {updateSelectedBike} from "../api"

const Header = ({bikeId}) => {
  const navigate = useNavigate();
  const { progress, timeLeft, status } = useBikeAssembly(); 
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const name = localStorage.getItem("username");
  const [username, setUsername] = useState(name);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      const res = await logoutUser(username);
      message.success("Logged out successfully.");
      if(bikeId){
        let bikeStatus = {
          status: status,
          startProgress: isNaN(progress) ? 0 : parseInt(progress),
          duration: timeLeft,
        }
        await updateSelectedBike(bikeId, username, bikeStatus);
      }
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
              <Typography> {username}</Typography>
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
