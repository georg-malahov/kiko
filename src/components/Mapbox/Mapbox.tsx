import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxContainer, MapboxMap } from './Mapbox.styled';
import { MAPBOX_ACCESS_TOKEN } from '../../constants';

const Mapbox = () => {
  React.useEffect(() => {
    import('mapbox-gl').then((mapboxgl) => {
      new mapboxgl.Map({
        accessToken: MAPBOX_ACCESS_TOKEN,
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.118092, 51.509865],
        zoom: 9,
      } as mapboxgl.MapboxOptions);
    });
  });

  return (
    <MapboxContainer>
      <MapboxMap id="map" />
    </MapboxContainer>
  );
};

export default Mapbox;
