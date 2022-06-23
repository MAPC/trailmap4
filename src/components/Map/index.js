/* eslint-disable no-unused-expressions */
import React, { useState, useRef, useCallback } from "react";
// import ReactMapGL, {
//   NavigationControl,
//   GeolocateControl,
//   ScaleControl,
//   // Popup,
// } from "react-map-gl";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import "../../styles/map.scss";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import Geocoder from "react-map-gl-geocoder";
// import ControlPanel from "./control-panel";
// import ControlPanelToggleButton from "./control-panel-toggle-button";
// import AboutButton from "./about-button";
// import AboutPanel from "./about-panel";
// import BasemapButton from "./basemap-button";
// import BasemapPanel from "./basemap-panel";
// import MapLayers from "./map-layers";

const Map = () => {
  const mapBoxToken = process.env.REACT_APP_MAPBOX_API_TOKEN;
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/light-v10");
  const [viewport, setViewport] = useState({
    latitude: 42.3601,
    longitude: -71.0589,
    zoom: 10,
  });
  const [opacity, setOpacity] = useState({
    existing: {
      "Paved Paths": 1,
      "Unimproved Paths": 1,
      "Protected Bike Lane": 1,
      "Bike Lane": 1,
      "Paved Footway": 1,
      "Natural Surface Footway": 1,
    },
    proposed: {
      "Paved Paths": 0,
      "Unimproved Paths": 0,
      "Protected Bike Lane": 0,
      "Bike Lane": 0,
      "Paved Footway": 0,
      "Natural Surface Footway": 0,
    },
  });

  // const [popupLngLat, setPopupLngLat] = useState(null);
  // const [showPopup, toggleShowPopup] = useState(false);

  // const [identifyLayer, setIdentifyLayer] = useState("");
  // const [identifyTrailName, setIdentifyTrailName] = useState("");
  // const [identifySteward, setIdentifySteward] = useState("");
  // const [identifyDate, setIdentifyDate] = useState("");

  const mapRef = useRef();

  const toggleEsriLayer = (trailName) => {
    setOpacity((prevState) => {
      const updatedOpacity = prevState.opacity;
      const proposedIsToggled = document.querySelector(
        ".toggle-switch__input"
      ).checked;
      if (proposedIsToggled) {
        updatedOpacity.existing[trailName] = toggleLayer(
          prevState.opacity.existing[trailName]
        );
        updatedOpacity.proposed[trailName] = toggleLayer(
          prevState.opacity.proposed[trailName]
        );
      } else {
        updatedOpacity.existing[trailName] = toggleLayer(
          prevState.opacity.existing[trailName]
        );
      }
      return { opacity: updatedOpacity };
    });
  };

  const toggleEsriProposedLayer = () => {
    setOpacity((prevState) => {
      const updatedOpacities = prevState.opacity;
      const proposedIsToggled = document.querySelector(
        ".toggle-switch__input"
      ).checked;
      if (proposedIsToggled) {
        for (const [trail, opacity] of Object.entries(
          prevState.opacity.existing
        )) {
          if (opacity === 1) {
            updatedOpacities.proposed[trail] = 1;
          }
        }
      } else {
        for (const [trail, opacity] of Object.entries(
          prevState.opacity.proposed
        )) {
          if (opacity === 1) {
            updatedOpacities.proposed[trail] = 0;
          }
        }
      }
      return { opacity: updatedOpacities };
    });
  };

  const toggleLayer = (prevValue) => {
    if (prevValue === 1) {
      return 0;
    }
    return 1;
  };

  const updateMapLayers = (updatedMapStyle) => {
    setMapStyle({ mapStyle: updatedMapStyle });
  };

  const changeBasemap = (updatedMapStyle) => {
    setMapStyle({ mapStyle: updatedMapStyle });
  };

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  // useEffect(() => {
  //   if(width && height){
  //     setViewport((viewport) => ({
  //       ...viewport,
  //       width,
  //       height
  //     }));
  //   }
  // }, [width, height]);

  // const onViewportChange = (nextViewports) => setViewport(nextViewport)

  return (
    <main>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100vw"
        height="100vh"
        onViewportChange={handleViewportChange}
        // onClick={(e) => {
        //   const currentMap = mapRef.current.getMap();
        //   const currentMapBounds = currentMap.getBounds();
        //   fetch(
        //     `https://geo.mapc.org:6443/arcgis/rest/services/transportation/AllTrails/MapServer/identify?geometry=${e.lngLat[0]},${e.lngLat[1]}&geometryType=esriGeometryPoint&sr=4326&layers=all&layerDefs=&time=&layerTimeOptions=&tolerance=3&mapExtent=${currentMapBounds._sw.lng},${currentMapBounds._sw.lat},${currentMapBounds._ne.lng},${currentMapBounds._ne.lat}&imageDisplay=600%2C550%2C96&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&dynamicLayers=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnUnformattedValues=false&returnFieldName=false&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&f=pjson`
        //   )
        //     .then((res) => res.json())
        //     .then((result) => {
        //       const identifyLayer = result["results"][0].layerName;
        //       const identifyAttributes = result["results"][0].attributes;
        //       let identifyTrailName = "";
        //       if (identifyAttributes["Regional Name"] !== "Null") {
        //         identifyTrailName = identifyAttributes["Regional Name"];
        //       } else if (identifyAttributes["Property Name"] !== "Null") {
        //         identifyTrailName = identifyAttributes["Property Name"];
        //       } else {
        //         identifyTrailName = identifyAttributes["Local Name"];
        //       }
        //       const identifySteward = identifyAttributes["Steward"]
        //         ? identifyAttributes["Steward"]
        //         : identifyAttributes["Owner / Steward"];
        //       const identifyDate = identifyAttributes["Facility Opening Date"];

        //       setState({
        //         popupLngLat: e.lngLat,
        //         identifyLayer: result["results"][0].layerName,
        //         identifyTrailName: identifyTrailName,
        //         identifySteward: identifySteward,
        //         identifyDate: identifyDate,
        //         showPopup: true,
        //       });
        //     });
        // }}
        mapboxAccessToken={mapBoxToken}
        mapStyle={mapStyle}
      >
        {/* {state.showPopup && (
          <Popup
            longitude={state.popupLngLat[0]}
            latitude={state.popupLngLat[1]}
            anchor="bottom"
            onClose={() => setState({ showPopup: false })}
          >
            {state.identifyLayer !== "Null" ? (
              <div>
                Layer Name: {state.identifyLayer}
                <br />
              </div>
            ) : (
              ""
            )}
            {state.identifyTrailName !== "Null" ? (
              <div>
                Property Name: {state.identifyTrailName}
                <br />
              </div>
            ) : (
              ""
            )}
            {state.identifySteward !== "Null" ? (
              <div>
                Steward: {state.identifySteward}
                <br />
              </div>
            ) : (
              ""
            )}
            {state.identifyDate !== "Null" ? (
              <div>
                Opening Date: {state.identifyDate}
                <br />
              </div>
            ) : (
              ""
            )}
          </Popup>
        )} */}
        {/* <div className="zoom-wrapper">
          <NavigationControl />
        </div> */}
        {/* 
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          className="control-panel__geolocate"
        />
        <ControlPanelToggleButton />
        <ControlPanel
          mapStyle={mapStyle}
          updateMapLayers={updateMapLayers}
          // updateLoading={updateLoading}
          toggleEsriLayer={toggleEsriLayer}
          toggleEsriProposedLayer={toggleEsriProposedLayer}
        /> */}
        {/* <Geocoder
          mapRef={mapRef}
          mapboxApiAccessToken={mapBoxToken}
          onViewportChange={handleGeocoderViewportChange}
          position="top-left"
          placeholder="Search by city or address"
        /> */}
        {/* <BasemapButton />
        <BasemapPanel changeBasemap={changeBasemap} />
        <MapLayers opacity={opacity} />
        <div className="mapboxgl-ctrl-bottom-right">
          <ScaleControl maxWidth={100} unit="imperial" />
        </div> */}
      </ReactMapGL>
      {/* <AboutButton />
      <AboutPanel /> */}
    </main>
  );
};

export default Map;
