import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Progress, message } from "antd";
import { getBikeById } from "../api"; 

const AssemblyPage = () => {
  const { bike_id } = useParams();
  const [selectedBike, setSelectedBike] = useState(null);
  const [assemblyProgress, setAssemblyProgress] = useState(0);

  useEffect(() => {
    fetchBikeDetails();
  }, [bike_id]);

  const fetchBikeDetails = async () => {
    try {
      const response = await getBikeById(bike_id);
      setSelectedBike(response.bike);
      startAssemblyProcess();
    } catch (error) {
      console.error("Error fetching bike details:", error);
    }
  };

  const startAssemblyProcess = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10; 
      if (progress >= 100) {
        clearInterval(interval); 
        message.success('Assembly Completed!');
      }
      setAssemblyProgress(progress);
    }, 5000); 
  };

  return (
    <div>
      <h1>Assembly Page</h1>
      {selectedBike && (
        <div className="selected-bike">
          <h2>Selected Bike: {selectedBike.name}</h2>
          <p>Assembly Time: {selectedBike.assemblyTime}</p>
          <Progress percent={assemblyProgress} status="active" />
        </div>
      )}
    </div>
  );
};

export default AssemblyPage;
