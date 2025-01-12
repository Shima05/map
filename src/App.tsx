import React, { useState } from "react";
import ElevationForm from "./components/ElevationForm";
import MapView from "./components/MapView";
import "./styles/App.css";

const App: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null); // Current latitude
  const [longitude, setLongitude] = useState<number | null>(null); // Current longitude
  const [elevation, setElevation] = useState<string>(
    "Elevation data will appear here."
  ); // Elevation data
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Validates latitude or longitude based on its type
  const isValidCoordinate = (value: number, type: "latitude" | "longitude") => {
    if (type === "latitude") {
      return value >= -90 && value <= 90;
    }
    if (type === "longitude") {
      return value >= -180 && value <= 180;
    }
    return false;
  };

  // Fetches elevation data from the API
  const getElevation = async () => {
    if (latitude === null || longitude === null) {
      alert("Please enter both latitude and longitude.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error before fetching new data

    try {
      const response = await fetch(
        `/api/v1/etopo1?locations=${latitude},${longitude}`
      );

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.results || !data.results[0]) {
        throw new Error("Invalid API response format.");
      }

      setElevation(`Elevation: ${data.results[0].elevation} meters`);
    } catch (e: unknown) {
      let errorMsg = "";
      if (e instanceof Error) {
        errorMsg = e.message;
      } else if (typeof e === "string") {
        errorMsg = e;
      }
      console.error("Error fetching elevation data:", errorMsg);
      setError(errorMsg || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <ElevationForm
        latitude={latitude?.toString() || ""}
        longitude={longitude?.toString() || ""}
        elevation={elevation}
        loading={loading}
        error={error}
        onLatitudeChange={(e) => {
          const value = parseFloat(e.target.value);
          if (isValidCoordinate(value, "latitude")) {
            setLatitude(value);
          } else {
            alert("Invalid latitude. Please enter a value between -90 and 90.");
          }
        }}
        onLongitudeChange={(e) => {
          const value = parseFloat(e.target.value);
          if (isValidCoordinate(value, "longitude")) {
            setLongitude(value);
          } else {
            alert(
              "Invalid longitude. Please enter a value between -180 and 180."
            );
          }
        }}
        onGetElevation={getElevation}
        setMapLatitude={setLatitude}
        setMapLongitude={setLongitude}
      />

      <div className="map-container">
        <MapView
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      </div>
    </div>
  );
};

export default App;
