import React from 'react';
import { VenuesContext } from './VenuesContext';
import { getVenuesSearchAsync } from 'ts-foursquare';
import Foursquare from '@foursquare/foursquare-places';
import { FOURSQUARE_CLIENT_SECRET, FOURSQUARE_CLIENT_ID } from '../../constants';
import { NVenue } from 'ts-foursquare/types';

const foursquare = new Foursquare(FOURSQUARE_CLIENT_ID, FOURSQUARE_CLIENT_SECRET);

const VenuesProvider = ({ children }: { children: React.ReactNode }) => {
  const [venues, setVenues] = React.useState([] as NVenue.IVenue[]);
  const [map, setMap] = React.useState();

  const updateVenues = React.useCallback(
    (e: mapboxgl.MapBoxZoomEvent) => {
      console.log('map.getZoom()', map.getZoom());
      const { lng, lat } = map.getCenter();
      // TODO: add radius param
      // @see https://github.com/alex3165/react-mapbox-gl/issues/426
      // @see http://turfjs.org/getting-started
      const { payload } = getVenuesSearchAsync.request({
        ll: `${lat},${lng}`,
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
