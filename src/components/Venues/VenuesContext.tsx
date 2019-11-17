import React from 'react';

type VenuesContext = {
  updateVenues: (e: mapboxgl.MapBoxZoomEvent) => void;
  venues: any[];
  map: mapboxgl.Map;
  setMap: (map: mapboxgl.Map) => void;
};

export const VenuesContext = React.createContext({} as VenuesContext);
