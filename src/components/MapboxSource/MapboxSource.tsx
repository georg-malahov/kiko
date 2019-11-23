import React from 'react';
import { MapboxApiContext } from '../MapboxApi/MapboxApiContext';
import { FeatureCollection } from 'geojson';

export const SOURCE_ID = 'venues';

const MapboxSource = () => {
  const { map, venues, updateVenues } = React.useContext(MapboxApiContext);

  React.useEffect(() => {
    // Add source to mapbox
    map.on('load', () => {
      map.addSource(SOURCE_ID, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 50,
      });
    });

    // Define when new venues should be requested
    map.on('load', updateVenues);
    map.on('zoomend', updateVenues);
    map.on('dragend', updateVenues);
  }, [map, updateVenues]);

  // Process new venues
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

  // Update source data
  const existingSource = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource;
  if (existingSource) {
    existingSource.setData(data);
  }

  return null;
};

export default MapboxSource;
