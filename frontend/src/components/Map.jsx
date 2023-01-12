import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MyMap() {
  const [center, setCenter] = useState([49.2571531, 4.0199563]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const mapRef = useRef(null);
  const styles = {
    parentContainer: {
      position: "relative",
      width: "100vw",
      height: "100vh",
      padding: 0,
      margin: 0,
    },
  };
  const customMarker = L.icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/navigation-and-gps/48/navigate_location_human-512.png",
    iconSize: [60, 60], // size of the icon
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
        setMarkerPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [center]);

  return (
    <div style={styles.parentContainer}>
      <MapContainer
        center={center}
        zoom={13}
        ref={mapRef}
        style={styles.parentContainer}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerPosition && (
          <Marker position={markerPosition} icon={customMarker} />
        )}
      </MapContainer>
    </div>
  );
}
