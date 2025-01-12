import React from "react";

interface ElevationFormProps {
  latitude: string;
  longitude: string;
  elevation: string;
  loading: boolean;
  error: string | null;
  onLatitudeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLongitudeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetElevation: () => void;
  setMapLatitude: (lat: number) => void;
  setMapLongitude: (lng: number) => void;
}

const ElevationForm: React.FC<ElevationFormProps> = ({
  latitude,
  longitude,
  elevation,
  loading,
  error,
  onLatitudeChange,
  onLongitudeChange,
  onGetElevation,
  setMapLatitude,
  setMapLongitude,
}) => {
  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLatitudeChange(e);
    const newLatitude = parseFloat(e.target.value);
    if (!isNaN(newLatitude)) {
      setMapLatitude(newLatitude); // Update the map latitude if valid
    }
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLongitudeChange(e);
    const newLongitude = parseFloat(e.target.value);
    if (!isNaN(newLongitude)) {
      setMapLongitude(newLongitude); // Update the map longitude if valid
    }
  };

  return (
    <div className="form-container">
      <h2>Get Elevation Data</h2>

      {/* Latitude input field */}
      <input
        type="number"
        value={latitude}
        onChange={handleLatitudeChange}
        placeholder="Latitude (e.g., 35.6892)"
        className="form-input"
        min="-90"
        max="90"
      />

      {/* Longitude input field */}
      <input
        type="number"
        value={longitude}
        onChange={handleLongitudeChange}
        placeholder="Longitude (e.g., 51.3890)"
        className="form-input"
        min="-180"
        max="180"
      />

      {/* Submit button to fetch elevation */}
      <button
        onClick={onGetElevation}
        className="form-button"
        disabled={loading || !!error} // Disable button if loading or there's an error
      >
        {loading ? "Loading..." : "Get Elevation"}
      </button>

      {/* Display error message if exists */}
      {error && (
        <div className="form-error">
          <i className="fas fa-exclamation-circle"></i> {String(error)}
        </div>
      )}

      {/* Display elevation data if no error */}
      {!error && <div className="form-elevation">{String(elevation)}</div>}
    </div>
  );
};

export default ElevationForm;
