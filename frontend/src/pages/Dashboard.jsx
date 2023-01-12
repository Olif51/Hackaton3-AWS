import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";

function Dashboard() {
  const { auth } = React.useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
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
    <div className="bg-white rounded-lg shadow-md pb-12">
      <h1 className="text-4xl font-medium m-4">Vehicles nearby</h1>
      <h2 className="text-right pr-5">See on Map</h2>
      <ul className="grid grid-cols-1 gap-4 m-4">
        {vehicles.map((vehicle) => (
          <li key={vehicle.id} className="p-4 rounded-md bg-gray-200">
            <div>
              <h2 className="text-xl font-medium">{vehicle.car_maker}</h2>
              <p className="text-base">{vehicle.car_model}</p>
              <p className="text-base">{vehicle.location_status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
