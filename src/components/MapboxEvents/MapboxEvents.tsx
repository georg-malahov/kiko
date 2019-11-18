import React from 'react';
import { MapboxApiContext } from '../MapboxApi/MapboxApiContext';

const MapboxEvents = () => {
  const { map, updateVenues } = React.useContext(MapboxApiContext);
  React.useEffect(() => {
    map.on('load', updateVenues);
    map.on('zoomend', updateVenues);
    map.on('dragend', updateVenues);
  }, [map, updateVenues]);

  return null;
};

export default MapboxEvents;
