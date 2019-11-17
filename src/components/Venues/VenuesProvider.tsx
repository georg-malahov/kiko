import React from 'react';
import { VenuesContext } from './VenuesContext';
import { getVenuesSearchAsync } from 'ts-foursquare';
import Foursquare from '@foursquare/foursquare-places';
import { FOURSQUARE_CLIENT_SECRET, FOURSQUARE_CLIENT_ID } from '../../constants';
import { NVenue } from 'ts-foursquare/types';
import { distance } from '@turf/turf';

const foursquare = new Foursquare(FOURSQUARE_CLIENT_ID, FOURSQUARE_CLIENT_SECRET);

const VenuesProvider = ({ children }: { children: React.ReactNode }) => {
  const [venues, setVenues] = React.useState([] as NVenue.IVenue[]);
  const [map, setMap] = React.useState({} as mapboxgl.Map);

  const updateVenues = React.useCallback(
    (e: mapboxgl.MapBoxZoomEvent) => {
      const { lng, lat } = map.getCenter();
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
    <VenuesContext.Provider
      value={{
        venues,
        updateVenues,
        map,
        setMap,
      }}>
      {children}
    </VenuesContext.Provider>
  );
};

export default VenuesProvider;
