import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxContainer, MapboxMap } from './Mapbox.styled';
import MapboxApi from '../MapboxApi/MapboxApi';

const Mapbox = () => {
  const [mounted, setMounted] = React.useState(false);
  const [mapboxgl, setMapboxgl] = React.useState();
  const mapRef = React.useRef<HTMLDivElement>(null!);
  React.useEffect(() => {
    import('mapbox-gl')
      .then(setMapboxgl)
      .then(() => setMounted(true));
  }, []);
  return (
    <MapboxContainer>
      <MapboxMap id="map" ref={mapRef} />
      {mounted ? <MapboxApi mapboxgl={mapboxgl} mapRef={mapRef} /> : null}
    </MapboxContainer>
  );
};

export default Mapbox;
