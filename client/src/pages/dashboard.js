import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { Row, Col, Button, Card, message } from "antd";
import "./dashboard.css";
import { getAllBikes } from "../api";
import { useNavigate } from "react-router-dom";
import bike from "../assests/bike.webp";
const { Meta } = Card;
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
    navigate("/admindashboard");
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
            <img alt={bike} src={bike} />
          </Col>
        </Row>
        <h1
          style={{
            textAlign: "center",
            color: "darkblue",
            marginTop: "20px",
            fontWeight: "400",
            marginBottom: "10px"
          }}
        >
          Explore Our Bike Collection
        </h1>
        <div className="bike_container">
          {bikes.map((bike, index) => (
            <Card
              key={index}
              hoverable
              className="card"
              cover={
                <img
                  alt={bike.bikeName}
                  src={bike.thumbnail}
                  className="bike_image"
                />
              }
              onClick={() => handleSelectBike(bike)}
            >
              <Meta
                title={bike.bikeName}
                description={`CC: ${bike.cc}, Model: ${bike.model}`}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
