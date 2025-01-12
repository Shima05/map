import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  latitude: number | null; // Current latitude to center the map
  longitude: number | null; // Current longitude to center the map
  setLatitude: (lat: number) => void; // Function to update latitude
  setLongitude: (lng: number) => void; // Function to update longitude
}

interface ClickHandlerProps {
  setLatitude: (lat: number) => void; // Callback to update latitude on map click
  setLongitude: (lng: number) => void; // Callback to update longitude on map click
}

const MapUpdater: React.FC<{
  latitude: number | null;
  longitude: number | null;
}> = ({ latitude, longitude }) => {
  const map = useMap();

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      map.flyTo([latitude, longitude], map.getZoom(), {
        animate: true,
        duration: 1.5,
      });
    }
  }, [latitude, longitude, map]);

  return null;
};

const ClickHandler: React.FC<ClickHandlerProps> = ({
  setLatitude,
  setLongitude,
}) => {
  useMapEvents({
    click: (e) => {
      // Update latitude and longitude based on click position
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });

  return null;
};

const MapView: React.FC<MapViewProps> = ({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}) => {
  return (
    <MapContainer
      center={[latitude || 48.2025, longitude || 16.3556]} // Default center
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {latitude !== null && longitude !== null && (
        <Marker position={[latitude, longitude]} />
      )}
      <ClickHandler setLatitude={setLatitude} setLongitude={setLongitude} />
      <MapUpdater latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
};

export default MapView;
