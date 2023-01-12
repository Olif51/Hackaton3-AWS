import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";
import VehicleList from "../components/VehicleList";
import Map from "../components/Map";

function Dashboard() {
  const { auth } = React.useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [toggleTab, setToggleTab] = useState("list");
  const [myPosition, setMyPosition] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const getVehicles = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:5000/vehicles",
          config
        );
        setVehicles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getVehicles();
  }, []);

  return (
    <>
      {toggleTab === "list" && (
        <VehicleList
          vehicles={vehicles}
          setToggleTab={setToggleTab}
          myPosition={myPosition}
        />
      )}
      {toggleTab === "map" && (
        <Map
          vehicles={vehicles}
          setToggleTab={setToggleTab}
          myPosition={myPosition}
        />
      )}
    </>
  );
}

export default Dashboard;
