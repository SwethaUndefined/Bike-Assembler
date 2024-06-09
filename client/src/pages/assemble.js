import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import { getSelectedBikesByUsername } from "../api";
import { BikeAssemblyProvider } from "../bikeAssemblyProvider";
import Header from "../components/header";
import BikeAssembly from "../components/assembleBike";

const { Meta } = Card;

const Assemble = () => {
  const username = localStorage.getItem("username");
  const [selectedBikes, setSelectedBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [isInProgress, setIsInProgress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSelectedBikesByUsername(username);
        setSelectedBikes(response);

        // const inProgressBike = response.find((bike) => bike.status === "in progress");
        // if (inProgressBike) {
        //   setSelectedBike(inProgressBike);
        //   setIsInProgress(true);
        // }
      } catch (error) {
        message.error("Failed to fetch selected bikes.");
      }
    };

    fetchData();
  }, [username]);


  const handleBikeClick = (bike) => {
    if (bike.status === "Completed") {
      message.warning("Bike already assembled!");
    } else if (isInProgress) {
      message.warning("Please wait for the current assembly to finish before selecting another bike.");
    } else {
      setIsInProgress(true);
      setSelectedBike(bike);
    }
  };

  return (
    <BikeAssemblyProvider>
      <Header bikeId={selectedBike && selectedBike._id} bikeName={selectedBike && selectedBike.bikeName}/>
      <div className="bike_container">
        {selectedBikes?.length > 0 ?   selectedBikes.map((bike, index) => (
          <Card
            key={index}
            hoverable
            className="card"
            cover={<img alt={bike.bikeName} src={bike.thumbnail} className="bike_image" />}
            onClick={() => handleBikeClick(bike)}
          >
            <Meta
              title={bike.bikeName}
              description={`CC: ${bike.cc}, Model: ${bike.model}, Assemble Time: ${bike.assembleTime}`}
            />
          </Card>
        )) : <div>No Bikes Selected</div>}
      </div>
      {selectedBike && (
        <BikeAssembly
          selectedBike={selectedBike}
          updateSelectedBikes={setSelectedBikes}
        />
      )}
    </BikeAssemblyProvider>
  );
};

export default Assemble;
