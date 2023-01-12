import React, { useState } from "react";
import PropTypes from "prop-types";

function CarRentalDetails({ car, setToggleTab }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inspection, setInspection] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium mb-4">Rented Car</h2>
      <div className="flex mb-4">
        <div className="w-1/3">
          <p className="text-gray-700">brand :</p>
        </div>
        <div className="w-2/3">
          <p className="text-gray-900 font-medium">{car.car_maker}</p>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/3">
          <p className="text-gray-700">Model :</p>
        </div>
        <div className="w-2/3">
          <p className="text-gray-900 font-medium">{car.car_model}</p>
        </div>
      </div>

      <button
        type="button"
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        onClick={() => setIsModalOpen(true)}
      >
        Terminate the rental
      </button>
      {isModalOpen && (
        <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium mb-4">Vehicle inspection</h2>
              <textarea
                className="w-full h-32 p-2 border rounded-lg"
                value={inspection}
                onChange={(e) => setInspection(e.target.value)}
              />
            </div>
            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-800"
                  onClick={() => setToggleTab("payment")}
                >
                  Confirm
                </button>
              </span>
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CarRentalDetails.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    car_maker: PropTypes.string.isRequired,
    car_model: PropTypes.string.isRequired,
    location_status: PropTypes.string.isRequired,
  }).isRequired,
  setToggleTab: PropTypes.func.isRequired,
};

export default CarRentalDetails;
