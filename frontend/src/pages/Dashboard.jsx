import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";
import VehicleList from "../components/VehicleList";
import Map from "../components/Map";
import CarRentalDetails from "../components/Rent";
import PaymentForm from "../components/PaymentForm";

function Dashboard() {
  const [selectedCar, setSelectedCar] = useState({});
  const { auth } = React.useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [toggleTab, setToggleTab] = useState("list");
  const [myPosition, setMyPosition] = useState({});

  const amazonLockers = [
    {
      address: "Amazon Hub Locker - Pote",
      latitude: 49.22627,
      longitude: 4.02696,
    },
    {
      address: "Amazon Locker - Rion",
      latitude: 49.24257,
      longitude: 4.0394,
    },
    {
      name: "Amazon Hub Locker - lychée",
      latitude: 49.251766126334324,
      longitude: 4.029126482772831,
    },
    {
      address: "Amazon Hub Locker - Requin",
      latitude: 49.256227119470616,
      longitude: 4.0325650747299235,
    },
  ];

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
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
        />
      )}
      {toggleTab === "map" && (
        <Map
          vehicles={vehicles}
          setToggleTab={setToggleTab}
          myPosition={myPosition}
          amazonLockers={amazonLockers}
        />
      )}
      {toggleTab === "rent" && (
        <CarRentalDetails
          car={selectedCar}
          setToggleTab={setToggleTab}
          myPosition={myPosition}
        />
      )}
      {toggleTab === "payment" && (
        <PaymentForm
          car={selectedCar}
          setToggleTab={setToggleTab}
          myPosition={myPosition}
          selectedCar={selectedCar}
        />
      )}
    </>
  );
}

export default Dashboard;
