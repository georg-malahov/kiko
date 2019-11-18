import React from 'react';
import { NVenue } from 'ts-foursquare/types';

type VenuesContext = {
  updateVenues: (e: mapboxgl.MapBoxZoomEvent) => void;
  venues: NVenue.IVenue[];
  map: mapboxgl.Map;
  setMap: (map: mapboxgl.Map) => void;
  popup: mapboxgl.Popup;
  setPopup: (popup: mapboxgl.Popup) => void;
};

export const VenuesContext = React.createContext({} as VenuesContext);
