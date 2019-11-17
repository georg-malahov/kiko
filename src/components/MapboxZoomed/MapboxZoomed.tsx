import React from 'react';
import { VenuesContext } from '../Venues/VenuesContext';

const MapboxZoomend = () => {
  const { map, updateVenues } = React.useContext(VenuesContext);
  React.useEffect(() => {
    if (!map) {
      return;
    }
    map.on('zoomend', updateVenues);
  }, [map, updateVenues]);

  return null;
};

export default MapboxZoomend;
