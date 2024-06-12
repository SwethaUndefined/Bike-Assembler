import React, { useState, useEffect } from "react";
import { getProductionCountForDay } from "../api";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { Typography, DatePicker, Row, Col, Empty } from "antd";
import moment from "moment";
import "./productionMetrics.css";

const EmployeeProductionMetrics = () => {
  const [productionData, setProductionData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (selectedDate) {
      fetchProductionData();
    } else {
      setProductionData([]);
    }
  }, [selectedDate]);

  const fetchProductionData = async () => {
    try {
      if (!selectedDate) {
        return;
      }
      const dateObj = moment(selectedDate).set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
      const isoDateString = dateObj.toISOString();
      const response = await getProductionCountForDay(username, isoDateString);
      const dataArray = [
        { name: "Production Count", value: response.productionCount },
      ];
      setProductionData(dataArray);
    } catch (error) {
      console.error("Error fetching production data:", error);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Typography className="title">Employee Production Metrics</Typography>
      </Col>
      <Col span={24} className="datePicker">
        <DatePicker onChange={(date, dateString) => setSelectedDate(date)} />
      </Col>
      {selectedDate && productionData.length > 0 ? (
        <Col span={24} className="assembleMetrics">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={productionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      ) : (
        <Col span={24} className="emptyMessage">
          <Empty description="No Production" />
        </Col>
      )}
    </Row>
  );
};

export default EmployeeProductionMetrics;

