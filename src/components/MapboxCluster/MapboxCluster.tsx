import React from 'react';
import { MapboxApiContext } from '../MapboxApi/MapboxApiContext';
import { SOURCE_ID } from '../MapboxSource/MapboxSource';

const MapboxCluster = () => {
  const { map } = React.useContext(MapboxApiContext);

  React.useEffect(() => {
    map.on('load', () => {
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: SOURCE_ID,
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 10
          //   * Yellow, 30px circles when point count is between 10 and 50
          //   * Pink, 40px circles when point count is greater than or equal to 50
          'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 50, '#f28cb1'],
          'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 50, 40],
        },
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: SOURCE_ID,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: SOURCE_ID,
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      });

      // inspect a cluster on click
      map.on('click', 'clusters', function(e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] }) as mapboxgl.MapboxGeoJSONFeature[];
        var clusterId = features[0].properties!.cluster_id;
        (map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource).getClusterExpansionZoom(clusterId, function(err, zoom) {
          if (err) return;

          map.easeTo({
            center: (features[0].geometry as GeoJSON.Point).coordinates as any,
            zoom: zoom,
          });
        });
      });

      map.on('mouseenter', 'clusters', function() {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', function() {
        map.getCanvas().style.cursor = '';
      });
    });
  }, [map]);

  return null;
};

export default MapboxCluster;
