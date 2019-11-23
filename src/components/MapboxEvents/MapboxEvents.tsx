import React from 'react';
import { MapboxApiContext } from '../MapboxApi/MapboxApiContext';
import { MAP_LOADED_CLASSNAME } from '../../constants';

export type MapboxEvents = mapboxgl.MapboxEvent | mapboxgl.MapBoxZoomEvent | mapboxgl.MapMouseEvent;

const MapboxEvents = ({ mapRef }: { mapRef: { current: HTMLDivElement } }) => {
  const { map, updateVenues } = React.useContext(MapboxApiContext);
  React.useEffect(() => {
    map.on('load', (e: MapboxEvents) => {
      (mapRef.current as HTMLElement).classList.add(MAP_LOADED_CLASSNAME);
      updateVenues(e);
    });
    map.on('zoomend', updateVenues);
    map.on('dragend', updateVenues);
  }, [map, mapRef, updateVenues]);

  return null;
};

export default MapboxEvents;
