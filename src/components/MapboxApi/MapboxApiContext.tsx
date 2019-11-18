import React from 'react';
import { NVenue } from 'ts-foursquare/types';

type MapboxApiContext = {
  updateVenues: (e: mapboxgl.MapBoxZoomEvent) => void;
  venues: NVenue.IVenue[];
  map: mapboxgl.Map;
  popup: mapboxgl.Popup;
};

export const MapboxApiContext = React.createContext({} as MapboxApiContext);
