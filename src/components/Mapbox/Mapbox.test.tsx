import React from 'react';
import ReactDOM from 'react-dom';
import Mapbox from './Mapbox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Mapbox />, div);
  ReactDOM.unmountComponentAtNode(div);
});
