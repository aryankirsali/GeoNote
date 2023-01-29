import React, { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ viewport, setViewport, setNewPlace }) {
  const [longValue, setLongitude] = useState("");
  const [latValue, setLatitude] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longValue || !latValue) return;
    const long = parseFloat(longValue);
    const lat = parseFloat(latValue);
    if (isNaN(long) || isNaN(lat)) return;
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: long,
      zoom: 9,
    });
    setNewPlace({ lat: lat, long: long });
  };

  return (
    <div class="search-bar">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Longitude:
          <input
            className="text-input"
            type="text"
            value={longValue}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <label className="label">
          Latitude:
          <input
            className="text-input"
            type="text"
            value={latValue}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <input className="submit-button" type="submit" value="Locate" />
      </form>
    </div>
  );
}
