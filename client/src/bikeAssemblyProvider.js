import React, { createContext, useContext, useState } from "react";

const BikeAssemblyContext = createContext();

export const useBikeAssembly = () => {
  return useContext(BikeAssemblyContext);
};

export const BikeAssemblyProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState("");

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  const updateTimeLeft = (newTimeLeft) => {
    setTimeLeft(newTimeLeft);
  };

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <BikeAssemblyContext.Provider
      value={{ progress, timeLeft, status, updateProgress, updateTimeLeft, updateStatus }}
    >
      {children}
    </BikeAssemblyContext.Provider>
  );
};
