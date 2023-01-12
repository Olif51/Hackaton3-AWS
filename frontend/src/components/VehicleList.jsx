import React from "react";
import PropTypes from "prop-types";

function VehicleList({ vehicles, setToggleTab }) {
  return (
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
};

export default VehicleList;
