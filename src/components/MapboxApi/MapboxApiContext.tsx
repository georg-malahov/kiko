import React from 'react';
import { NVenue } from 'ts-foursquare/types';
import { MapboxEvents } from '../MapboxEvents/MapboxEvents';

type MapboxApiContext = {
  updateVenues: (e: MapboxEvents) => void;
  venues: NVenue.IVenue[];
  map: mapboxgl.Map;
  popup: mapboxgl.Popup;
};

export const MapboxApiContext = React.createContext({} as MapboxApiContext);
