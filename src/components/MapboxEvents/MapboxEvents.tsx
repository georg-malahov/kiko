import React from 'react';
import { VenuesContext } from '../Venues/VenuesContext';

const MapboxEvents = () => {
  const { map, updateVenues } = React.useContext(VenuesContext);
  React.useEffect(() => {
    if (Object.keys(map).length === 0) {
      return;
    }
    map.on('load', updateVenues);
    map.on('zoomend', updateVenues);
    map.on('dragend', updateVenues);
  }, [map, updateVenues]);

  return null;
};

export default MapboxEvents;
