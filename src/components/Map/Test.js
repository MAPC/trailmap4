/* eslint-disable no-unused-expressions */
import React, {
  useRef, useState, useCallback, useEffect, useMemo
} from 'react';
import ReactMapGL from 'react-map-gl';
// import "mapbox-gl/dist/mapbox-gl.css";

const Test = () => {
  // const mapBoxToken = process.env.REACT_APP_MAPBOX_API_TOKEN;
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = mapRef.current.getMap();

    }
  }, []);

  const [viewport, setViewport] = useState({
    latitude: 42.37722,
    longitude: -71.02446,
    zoom: 8.85,
    transitionDuration: 1000
  });
  
  const handleViewportChange = useCallback(
    (viewport) => setViewport(viewport), [],
  );

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      width="100vw"
      height="100%"
      onViewportChange={handleViewportChange}
      mapboxAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
      mapStyle="mapbox://styles/ihill/ckzn61agl000c14qjecumnu8o"
      scrollZoom={true}
      ></ReactMapGL>
  );
};

export default Test;
