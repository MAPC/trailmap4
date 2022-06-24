import React from "react";
import "./App.css";
import Test from "./components/Map/Test";
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <div className="App">
      <Helmet>
        <title>Trailmap V4</title>
        <link href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css' rel='stylesheet' />
      </Helmet>      
      <Test />
    </div>
  );
};

export default App;
