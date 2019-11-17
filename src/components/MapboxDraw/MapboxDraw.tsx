import React from 'react';
import { VenuesContext } from '../Venues/VenuesContext';

const MapboxDraw = () => {
  const { map, venues } = React.useContext(VenuesContext);
  if (!map) {
    return null;
  }

  map.on('load', () => {
    map.addSource('venues', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });
    map.addLayer({
      id: 'foursquare-venues',
      type: 'circle',
      source: 'venues',
      paint: {
        'circle-radius': 6,
        'circle-color': '#B42222',
      },
      filter: ['==', '$type', 'Point'],
    });
  });

  const data: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: venues.map((venue) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [venue.location.lng, venue.location.lat],
      },
      properties: {
        title: venue.name,
      },
    })),
  };

  const existingSource = map.getSource('venues') as mapboxgl.GeoJSONSource;
  if (existingSource) {
    existingSource.setData(data);
  }

  return null;
};

export default MapboxDraw;
