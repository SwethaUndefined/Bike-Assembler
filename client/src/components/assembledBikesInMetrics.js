import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getAllBikes } from "../api";
import { Row, Col, Typography } from "antd";
import "./assembledBikesInMetrics.css";

const AssembledBikesInMetrics = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await getAllBikes();
      const filteredBikes = response.bikes.filter(
        (bike) => bike.status === "completed"
      );
      console.log(filteredBikes);
      setBikes(filteredBikes);
    } catch (error) {
      console.error("Error fetching assembled bikes:", error);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Typography className="title">Assembled Bikes</Typography>
      </Col>

      <Col span={24} className="assembleMetrics">
        <BarChart
          width={600}
          height={300}
          data={bikes}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bikeName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cc" fill="#8884d8" />
        </BarChart>
      </Col>
    </Row>
  );
};

export default AssembledBikesInMetrics;
