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
import { getAllBikes, fetchDataByDateRange } from "../api";
import { Row, Col, Typography, DatePicker, Empty } from "antd";
import "./assembledBikesInMetrics.css";

const { RangePicker } = DatePicker;

const AssembledBikesInMetrics = () => {
  const [bikesData, setBikesData] = useState([]);
  const [label, setLabel] = useState("cc");

  useEffect(() => {
    fetchAllBikesData();
  }, []);

  const fetchAllBikesData = async () => {
    try {
      const response = await getAllBikes();
      const filteredBikes = response.bikes.filter(
        (bike) => bike.status === "completed"
      );
      setBikesData(filteredBikes);
    } catch (error) {
      console.error("Error fetching all bikes data:", error);
    }
  };

  const handleDateChange = async (dates) => {
    if (!dates || dates.length === 0) {
      fetchAllBikesData();
      setLabel("cc");
    } else if (dates.length === 2) {
      const [fromDate, toDate] = dates;
      const fromDateISO = fromDate.toISOString();
      const toDateISO = toDate.toISOString();
      try {
        const response = await fetchDataByDateRange(fromDateISO, toDateISO);
        const { assembledBikesCount } = response;
        setBikesData([
          { bikeName: "Assembled Bikes", cc: assembledBikesCount },
        ]);
        setLabel("Count");
      } catch (error) {
        console.error("Error fetching data by date range:", error);
      }
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Typography className="title">Assembled Bikes</Typography>
      </Col>
      <Col span={24} className="datePicker">
        <RangePicker onChange={handleDateChange} />
      </Col>
      <Col span={24} className="assembleMetrics">
        <BarChart
          width={600}
          height={300}
          data={bikesData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bikeName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cc" fill="#8884d8" name={label} />
        </BarChart>
      </Col>
    </Row>
  );
};

export default AssembledBikesInMetrics;
