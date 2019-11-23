import React from 'react';
import MapboxEvents from '../MapboxEvents/MapboxEvents';
import MapboxDraw from '../MapboxDraw/MapboxDraw';
import MapboxApiProvider from './MapboxApiProvider';

const MapboxApi = ({ mapboxgl, mapRef }: any) => {
  return (
    <MapboxApiProvider mapboxgl={mapboxgl}>
      <MapboxEvents mapRef={mapRef} />
      <MapboxDraw />
    </MapboxApiProvider>
  );
};

export default MapboxApi;
