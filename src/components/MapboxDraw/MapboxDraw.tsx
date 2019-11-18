import React from 'react';
import { MapboxApiContext } from '../MapboxApi/MapboxApiContext';
import { FeatureCollection } from 'geojson';

const MapboxDraw = () => {
  const { map, popup, venues } = React.useContext(MapboxApiContext);

  React.useEffect(() => {
    map.on('load', () => {
      map.addSource('venues', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
        cluster: true,
        clusterMaxZoom: 13,
        clusterRadius: 50,
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'venues',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 50, '#f28cb1'],
          'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 50, 40],
        },
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'venues',
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
        source: 'venues',
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
        (map.getSource('venues') as mapboxgl.GeoJSONSource).getClusterExpansionZoom(clusterId, function(err, zoom) {
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

  const data: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: venues.map((venue) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [venue.location.lng, venue.location.lat],
      },
      properties: {
        title: venue.name,
      },
    })),
  };

  const existingSource = map.getSource('venues') as mapboxgl.GeoJSONSource;
  if (existingSource) {
    console.log('venues', venues);
    console.log('data', data);
    existingSource.setData(data);
  }

  return null;
};

export default MapboxDraw;
