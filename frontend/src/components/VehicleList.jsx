import React from "react";
import PropTypes from "prop-types";

function VehicleList({
  vehicles,
  setToggleTab,
  myPosition,
  selectedCar,
  setSelectedCar,
}) {
  const toRad = (degrees) => (degrees * Math.PI) / 180;
  const distanceInKm = (lat1, lon1, lat2, lon2) => {
    const earthRadiusKm = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  };

  const calculateDistance = () => {
    const vehiclesWithDistance = vehicles.map((vehicle) => {
      const distance = distanceInKm(
        myPosition.latitude,
        myPosition.longitude,
        vehicle.latitude,
        vehicle.longitude
      );
      return { ...vehicle, distance };
    });

    const sorted = vehiclesWithDistance.sort((a, b) => a.distance - b.distance);
    return sorted;
  };

  const sortedVehicles = calculateDistance();

  return (
    <>
      <div className="bg-white rounded-lg shadow-md pb-12">
        <h1 className="text-4xl font-medium m-4">Vehicles nearby</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg m-4"
          type="button"
          onClick={() => setToggleTab("map")}
        >
          See on Map
        </button>
        <ul className="grid grid-cols-1 gap-4 m-4">
          {sortedVehicles.map((vehicle) => (
            <li
              key={vehicle.id}
              className={`p-4 rounded-md shadow-md ${
                selectedCar.id === vehicle.id ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <button
                type="button"
                className="flex flex-col items-center justify-center w-full h-full rounded-md"
                onClick={() => setSelectedCar(vehicle)}
              >
                <h2 className="text-xl font-medium">{vehicle.car_maker}</h2>
                <p className="text-base">{vehicle.car_model}</p>
                <p className="text-base">
                  {vehicle.distance.toFixed(2) * 1000} m
                </p>
                <p className="text-base">{vehicle.location_status}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className={`fixed bottom-2 w-5/6 text-center h-12 flex items-center justify-center left-1/2 -translate-x-1/2 rounded-xl shadow-md ${
          selectedCar.id ? "bg-blue-500" : "bg-gray-500"
        }`}
        onClick={() => setToggleTab("rent")}
      >
        <p className="text-2xl font-medium text-white">Rent the car !</p>
      </button>
    </>
  );
}

VehicleList.propTypes = {
  vehicles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      car_maker: PropTypes.string.isRequired,
      car_model: PropTypes.string.isRequired,
      location_status: PropTypes.string.isRequired,
    })
  ).isRequired,
  setToggleTab: PropTypes.func.isRequired,
  myPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedCar: PropTypes.shape({
    id: PropTypes.number.isRequired,
    car_maker: PropTypes.string.isRequired,
    car_model: PropTypes.string.isRequired,
    location_status: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedCar: PropTypes.func.isRequired,
};

export default VehicleList;
