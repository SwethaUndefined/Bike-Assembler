import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { Row, Col, Button, Card, message } from "antd";
import { getAllBikes } from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await getAllBikes();
      setBikes(response.bikes);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };
  const handleSelectBike = (bike) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Please login to select a bike");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    message.success(`Selected ${bike.name}`);
    navigate(`/assembly/${bike.bike_id}`);
  };

  return (
    <section>
      <Row>
        <Col span={24} align="end">
          <Header />
        </Col>
      </Row>

      <div>
        <h1>All Bikes</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {bikes.map((bike, index) => (
            <Card key={index} style={{ width: 300, margin: "10px" }}>
              <h2>{bike.name}</h2>
              <p>Assembly Time: {bike.assemblyTime}</p>
              <Button type="primary" onClick={() => handleSelectBike(bike)}>
                Select Bike
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
