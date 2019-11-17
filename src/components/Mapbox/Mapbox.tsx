import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxContainer, MapboxMap } from './Mapbox.styled';
import { MAPBOX_ACCESS_TOKEN } from '../../constants';
import { VenuesContext } from '../Venues/VenuesContext';
import MapboxZoomend from '../MapboxZoomed/MapboxZoomed';
import MapboxDraw from '../MapboxDraw/MapboxDraw';

const Mapbox = () => {
  const { setMap } = React.useContext(VenuesContext);
  React.useEffect(() => {
    import('mapbox-gl').then((mapboxgl) => {
      const mapboxOptions = {
        accessToken: MAPBOX_ACCESS_TOKEN,
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.118092, 51.509865],
        zoom: 9,
      } as mapboxgl.MapboxOptions;
      const map: mapboxgl.Map = new mapboxgl.Map(mapboxOptions);
      setMap(map);
    });
  }, [setMap]);

  return (
    <MapboxContainer>
      <MapboxMap id="map" />
      <MapboxZoomend />
      <MapboxDraw />
    </MapboxContainer>
  );
};

export default Mapbox;
