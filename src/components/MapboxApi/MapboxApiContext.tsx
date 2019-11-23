import React from 'react';
import { NVenue } from 'ts-foursquare/types';

export type MapboxEvents = mapboxgl.MapboxEvent | mapboxgl.MapBoxZoomEvent | mapboxgl.MapMouseEvent;

type MapboxApiContext = {
  updateVenues: (e: MapboxEvents) => void;
  venues: NVenue.IVenue[];
  map: mapboxgl.Map;
  popup: mapboxgl.Popup;
};

export const MapboxApiContext = React.createContext({} as MapboxApiContext);
