import React, { useState, useEffect } from 'react';
import { getProductionCountForDay } from '../api'; // Import the API function to fetch production count
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import Recharts components
import { Typography } from 'antd'; // Import Ant Design Typography component

const { Title } = Typography;

const EmployeeProductionMetrics = () => {
  const [productionData, setProductionData] = useState([]);

  useEffect(() => {
    fetchProductionData();
  }, []); 

  const fetchProductionData = async () => {
    try {
      const response = await getProductionCountForDay(selectedDate); 
      setProductionData(response.productionCounts); 
    } catch (error) {
      console.error('Error fetching production data:', error);
    }
  };

  return (
    <div>
      <Title level={2}>Employee Production Metrics</Title>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={productionData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="employeeName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="productionCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeProductionMetrics;
