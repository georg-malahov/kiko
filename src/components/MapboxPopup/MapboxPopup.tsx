import React from 'react';
import { MapboxApiContext } from '../MapboxApi/MapboxApiContext';

const MapboxPopup = () => {
  const { map, popup } = React.useContext(MapboxApiContext);

  React.useEffect(() => {
    map.on('load', () => {
      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on('mouseenter', 'unclustered-point', function(e: any) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.title;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'unclustered-point', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    });
  }, [map, popup]);

  return null;
};

export default MapboxPopup;
