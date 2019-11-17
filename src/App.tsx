import React from 'react';
import Mapbox from './components/Mapbox/Mapbox';
import VenuesProvider from './components/Venues/VenuesProvider';

const App = () => (
  <VenuesProvider>
    <Mapbox />
  </VenuesProvider>
);

export default App;
