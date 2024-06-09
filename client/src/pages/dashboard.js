import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { Row, Col, Card, message, Button } from "antd";
import "./dashboard.css";
import { getAllBikes, submitSelectedBikes,getSelectedBikesByUsername } from "../api";
import { useNavigate } from "react-router-dom";
import bikeImage from "../assests/bike.webp";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"; 
import AssembledBikesInMetrics from "../components/assembledBikesInMetrics";
import EmployeeProductionMetrics from "../components/productionMetrics";

const { Meta } = Card;

const Dashboard = () => {
  const [bikes, setBikes] = useState([]);
  const [selectedBikes, setSelectedBikes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [availableBikes, setAvailableBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await getAllBikes();
        setAvailableBikes(response.bikes);
        const filteredBikes = response.bikes.filter(bike => bike.status !== 'completed');

        setBikes(filteredBikes);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };
  
    fetchBikes();
  }, []);

  const handleSelectBike = async (selectedBike) => {
    if (!token) {
        message.error("Please login to select a bike");
        setTimeout(() => {
            navigate("/login");
        }, 2000);
        return;
    }
  
    try {
        const response = await getSelectedBikesByUsername(username);
        if (!response) {
            setSelectedBikes((prevSelectedBikes) => [
                ...prevSelectedBikes,
                selectedBike,
            ]);
            return;
        }
  
        const isBikeNotCompleted = response.some((bike) => bike.status !== "Completed");
  
        if (isBikeNotCompleted) {
            message.warning("You already have bikes assigned to assemble.");
            navigate("/assemble");
            return;
        } else {
            message.info("Your task for today is already completed.");
            return;
        }
    } catch (error) {
        setSelectedBikes((prevSelectedBikes) => [
            ...prevSelectedBikes,
            selectedBike,
        ]);
    }
};

  
  
  
  const handleRemoveBike = (selectedBikeToRemove) => {
    setSelectedBikes((prevSelectedBikes) =>
      prevSelectedBikes.filter((bike) => bike !== selectedBikeToRemove)
    );
  };

  const handleAssemble = async () => {
    if (!token) {
      message.error("Please login to select a bike");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    if (selectedBikes.length === 0) {
    message.warning("Please select at least one bike to assemble");
    return;
  }
    try {
      await submitSelectedBikes(selectedBikes, username);
      message.success("Selected bikes submitted successfully!");
      setSelectedBikes([]);
      navigate("/assemble");
    } catch (error) {
      message.error(
        "Failed to submit selected bikes. Please try again later."
      );
    }
  };

  return (
    <section>
      <Row>
        <Col span={24} align="end">
          <Header />
        </Col>
      </Row>

      <div>
        <Row>
          <Col span={24} className="bike">
            <img alt="bike" src={bikeImage} />
          </Col>
        </Row>
        <h1
          style={{
            textAlign: "center",
            color: "darkblue",
            marginTop: "20px",
            fontWeight: "400",
            marginBottom: "10px",
          }}
        >
          Available bikes for assemble
        </h1>
        <Row>
          <Col span={24} align="end" className="assemble">
            <Button type="primary" onClick={handleAssemble} className="assemble-btn">
              Assemble Bike
            </Button>
          </Col>
        </Row>
        <div className="bike_container">
          {bikes.map((bike, index) => (
            <Card
              key={index}
              hoverable
              className={`card ${selectedBikes.includes(bike) ? 'selected' : ''}`}
              cover={
                <img
                  alt={bike.bikeName}
                  src={bike.thumbnail}
                  className="bike_image"
                />
              }
              onClick={() => handleSelectBike(bike)}
              actions={[
                <PlusOutlined
                  key="add"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectBike(bike);
                  }}
                />,
                <MinusOutlined
                  key="minus"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveBike(bike);
                  }}
                />,
              ]}
            >
              <Meta
                title={bike.bikeName}
                description={`CC: ${bike.cc}, Model: ${bike.model}`}
              />
            </Card>
          ))}
        </div>
      </div>
      {availableBikes.some((bike) => bike.status === "completed") && <AssembledBikesInMetrics />}
      {username && <EmployeeProductionMetrics />}
    </section>
  );
};

export default Dashboard;
