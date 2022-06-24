/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

const Test = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-71.02446);
  const [lat, setLat] = useState(42.37722);
  const [zoom, setZoom] = useState(8.85);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  // const [viewport, setViewport] = useState({
  //   latitude: 42.37722,
  //   longitude: -71.02446,
  //   zoom: 8.85,
  //   transitionDuration: 1000
  // });

  // const handleViewportChange = useCallback(
  //   (viewport) => setViewport(viewport), [],
  // );

  return (
    <div className="map-wrapper">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Test;
