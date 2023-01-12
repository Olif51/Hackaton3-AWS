import React, { useRef } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import car from "../assets/car.png";

function Map({ vehicles, setToggleTab, myPosition }) {
  const mapRef = useRef(null);
  const styles = {
    parentContainer: {
      position: "relative",
      width: "100vw",
      height: "90vh",
      padding: 0,
      margin: 0,
    },
  };

  const customMarker = L.icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/navigation-and-gps/48/navigate_location_human-512.png",
    iconSize: [60, 60], // size of the icon
  });

  const customCarIcon = L.icon({
    iconUrl: car,
    iconSize: [60, 60], // size of the icon
  });

  return (
    <>
      <div className="w-full h-[10vh] flex justify-center items-center bg-slate-100">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg m-4 h-1/2"
          onClick={() => setToggleTab("list")}
        >
          Return to the car list
        </button>
      </div>
      <div style={styles.parentContainer}>
        <MapContainer
          center={[myPosition.latitude, myPosition.longitude]}
          zoom={13}
          ref={mapRef}
          style={styles.parentContainer}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {myPosition && (
            <Marker
              position={[myPosition.latitude, myPosition.longitude]}
              icon={customMarker}
            />
          )}
          {vehicles.map((vehicle) => {
            return (
              <Marker
                key={vehicle.id}
                position={[vehicle.latitude, vehicle.longitude]}
                icon={customCarIcon}
              >
                <Popup className="text-xl font-medium">
                  {vehicle.car_maker} {vehicle.car_model}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}

Map.propTypes = {
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
};

export default Map;
