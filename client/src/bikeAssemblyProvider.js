import React, { createContext, useContext, useEffect, useState } from "react";

const BikeAssemblyContext = createContext();

export const useBikeAssembly = () => {
  return useContext(BikeAssemblyContext);
};

export const BikeAssemblyProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState("Yet to Start");

  useEffect(()=>{

  console.log({progress})

  },[progress,timeLeft,status])

  
  return (
    <BikeAssemblyContext.Provider
      value={{ progress, timeLeft, status, setProgress,setTimeLeft,setStatus }}
    >
      {children}
    </BikeAssemblyContext.Provider>
  );
};
