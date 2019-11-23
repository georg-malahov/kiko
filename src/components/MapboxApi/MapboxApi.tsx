import React from 'react';
import MapboxPopup from '../MapboxPopup/MapboxPopup';
import MapboxApiProvider from './MapboxApiProvider';
import MapboxSource from '../MapboxSource/MapboxSource';
import MapboxCluster from '../MapboxCluster/MapboxCluster';

const MapboxApi = ({ mapboxgl, mapRef }: any) => {
  return (
    <MapboxApiProvider mapboxgl={mapboxgl} mapRef={mapRef}>
      <MapboxSource />
      <MapboxCluster />
      <MapboxPopup />
    </MapboxApiProvider>
  );
};

export default MapboxApi;
