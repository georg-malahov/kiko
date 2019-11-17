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
      const { payload } = getVenuesSearchAsync.request({
        ll: `${lat},${lng}`,
      });
      // const response = adaptGetVenuesSearch(payload);
      console.log('payload', payload);
      // console.log('response', response);
      foursquare.venues.getVenues(payload).then(({ response }: { response: NVenue.IResponse }) => {
        const venues = response.venues;
        console.log('venues', venues);
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
