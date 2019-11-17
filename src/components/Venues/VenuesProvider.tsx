import React from 'react';
import { VenuesContext } from './VenuesContext';

const VenuesProvider = ({ children }: { children: React.ReactNode }) => {
  const [venues, setVenues] = React.useState([]);
  const [map, setMap] = React.useState();

  const updateVenues = React.useCallback(
    (e: mapboxgl.MapBoxZoomEvent) => {
      console.log('e', e);
      console.log('map.getCenter()', map.getCenter());
      console.log('map.getZoom()', map.getZoom());
      setVenues([]);
    },
    [map]
  );

  return (
    <VenuesContext.Provider
      value={{
        venues,
        updateVenues,
        map,
        setMap,
      }}>
      {children}
    </VenuesContext.Provider>
  );
};

export default VenuesProvider;
