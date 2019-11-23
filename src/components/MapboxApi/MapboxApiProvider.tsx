import React from 'react';
import { MapboxApiContext } from './MapboxApiContext';
import { getVenuesSearchAsync } from 'ts-foursquare';
import Foursquare from '@foursquare/foursquare-places';
import { FOURSQUARE_CLIENT_SECRET, FOURSQUARE_CLIENT_ID, MAPBOX_ACCESS_TOKEN } from '../../constants';
import { NVenue } from 'ts-foursquare/types';
import { distance } from '@turf/turf';
import { MapboxEvents } from '../MapboxEvents/MapboxEvents';

const foursquare = new Foursquare(FOURSQUARE_CLIENT_ID, FOURSQUARE_CLIENT_SECRET);

const MapboxApiProvider = ({ children, mapboxgl }: { children: React.ReactNode; mapboxgl: any }) => {
  const map = React.useMemo(
    () =>
      new mapboxgl.Map({
        accessToken: MAPBOX_ACCESS_TOKEN,
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.118092, 51.509865],
        zoom: 9,
      } as mapboxgl.MapboxOptions),
    [mapboxgl.Map]
  );
  const popup = React.useMemo(() => new mapboxgl.Popup({ closeButton: false }), [mapboxgl.Popup]);

  const [venues, setVenues] = React.useState([] as NVenue.IVenue[]);
  const updateVenues = React.useCallback(
    (e: MapboxEvents) => {
      const { lng, lat } = map.getCenter();
      console.log('zoom', map.getZoom());
      const sw = map.getBounds().getSouthWest();
      const nw = map.getBounds().getNorthWest();
      const radius = Math.floor(distance([sw.lng, sw.lat], [nw.lng, nw.lat], { units: 'meters' }) / 2);
      const { payload } = getVenuesSearchAsync.request({
        ll: `${lat},${lng}`,
        radius: Math.min(radius, 100000),
        limit: 50,
        // @see https://developer.foursquare.com/docs/resources/categories
        categoryId: [/* Park */ '4bf58dd8d48988d163941735', /* Arts & Entertainment */ '4d4b7104d754a06370d81259'],
      });
      console.log('payload', payload);
      foursquare.venues.getVenues(payload).then(({ response }: { response: NVenue.IResponse }) => {
        const venues = response.venues;
        setVenues(venues);
      });
    },
    [map]
  );

  return (
    <MapboxApiContext.Provider
      value={{
        venues,
        updateVenues,
        map,
        popup,
      }}>
      {children}
    </MapboxApiContext.Provider>
  );
};

export default MapboxApiProvider;
