import React from 'react';
import MapboxEvents from '../MapboxEvents/MapboxEvents';
import MapboxDraw from '../MapboxDraw/MapboxDraw';
import MapboxApiProvider from './MapboxApiProvider';

const MapboxApi = ({ mapboxgl }: any) => {
  return (
    <MapboxApiProvider mapboxgl={mapboxgl}>
      <MapboxEvents />
      <MapboxDraw />
    </MapboxApiProvider>
  );
};

export default MapboxApi;
