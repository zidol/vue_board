<template>
  <div>
    <div id="map" class="map"></div>
    <span id="status"></span>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';
import Overlay from 'ol/Overlay';

export default {
  mounted() {
    var image = new CircleStyle({
      radius: 5,
      fill: null,
      stroke: new Stroke({ color: 'red', width: 1 }),
    });

    var styles = {
      Point: new Style({
        image: image,
      }),
      LineString: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      MultiLineString: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      MultiPoint: new Style({
        image: image,
      }),
      MultiPolygon: new Style({
        stroke: new Stroke({
          color: 'black',
          width: 3,
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)',
        }),
      }),
      Polygon: new Style({
        stroke: new Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)',
        }),
      }),
      GeometryCollection: new Style({
        stroke: new Stroke({
          color: 'magenta',
          width: 2,
        }),
        fill: new Fill({
          color: 'magenta',
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: 'magenta',
          }),
        }),
      }),
      Circle: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.2)',
        }),
      }),
    };

    var styleFunction = function(feature) {
      return styles[feature.getGeometry().getType()];
    };

    var getStyle = function(feature) {
      if (feature.values_.CTPRVN_CD < 10) {
        return new Style({
          fill: new Fill({
            color: [255, 0, 0, 0.5], // semi-transparent red
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 20) {
        return new Style({
          fill: new Fill({
            color: [255, 0, 255, 0.5], // semi-transparent red
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 30) {
        return new Style({
          fill: new Fill({
            color: [0, 0, 255, 0.5], // semi-transparent red
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 40) {
        return new Style({
          fill: new Fill({
            color: [0, 255, 255, 0.5], // semi-transparent red
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 41) {
        return new Style({
          fill: new Fill({
            color: [255, 255, 0, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 42) {
        return new Style({
          fill: new Fill({
            color: [100, 255, 0, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 43) {
        return new Style({
          fill: new Fill({
            color: [100, 111, 0, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 44) {
        return new Style({
          fill: new Fill({
            color: [100, 111, 10, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 45) {
        return new Style({
          fill: new Fill({
            color: [100, 111, 110, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 44) {
        return new Style({
          fill: new Fill({
            color: [0, 111, 10, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 45) {
        return new Style({
          fill: new Fill({
            color: [0, 111, 210, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 46) {
        return new Style({
          fill: new Fill({
            color: [110, 111, 210, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 47) {
        return new Style({
          fill: new Fill({
            color: [12, 255, 120, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 48) {
        return new Style({
          fill: new Fill({
            color: [21, 3, 0, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 49) {
        return new Style({
          fill: new Fill({
            color: [22, 255, 20, 0.5], // semi-transparent yellow
          }),
        });
      } else if (feature.values_.CTPRVN_CD < 50) {
        return new Style({
          fill: new Fill({
            color: [155, 155, 10, 0.5], // semi-transparent yellow
          }),
        });
      } else {
        return new Style({
          fill: new Fill({
            color: [255, 255, 0, 0.5], // semi-transparent yellow
          }),
        });
      }
    };

    var vectorSource = new VectorSource({
      url:
        'http://112.220.90.93:8899/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3A%EC%8B%9C%EB%8F%84&maxFeatures=50&outputFormat=application%2Fjson',
      format: new GeoJSON(),
    });

    var vectorSource2 = new VectorSource({
      url:
        'http://112.220.90.93:8899/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3A%EC%8B%9C%EA%B5%B0%EA%B5%AC&maxFeatures=50&outputFormat=application%2Fjson',
      format: new GeoJSON(),
    });
    /**************overlay start *************** */

    /**
     * Elements that make up the popup.
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = function() {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    /**************overlay end *************** */

    // var vectorSource = new VectorSource({
    //   features: new GeoJSON().readFeatures(geojsonObject)
    // });

    var vectorLayer = new VectorLayer({
      source: vectorSource,
      style: getStyle,
    });
    var vectorLayer2 = new VectorLayer({
      source: vectorSource2,
      style: styleFunction,
    });
    // proj4.defs(
    //   "EPSG:5179",
    //   "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"
    // );
    proj4.defs('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');

    register(proj4);
    const koreaProjection = getProjection('EPSG:4326');

    /** overlay */
    /**
     * Create an overlay to anchor the popup to the map.
     */
    var overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    var map = new Map({
      layers: [
        // rasterLayer,
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
        // vectorLayer2
      ],
      overlays: [overlay],
      target: 'map',
      view: new View({
        projection: koreaProjection,
        center: [14143087.77691487, 36.55891018869106],
        zoom: 5,
      }),
    });

    /** overlay  code start **/
    /**
     * Add a click handler to the map to render the popup.
     */

    var selected = null;
    map.on('singleclick', function(evt) {
      var coordinate = evt.coordinate;
      //   var hdms = toStringHDMS(toLonLat(coordinate));
      // console.log(selected);
      if (selected != null) {
        if (selected.get('CTP_KOR_NM') != null) {
          content.innerHTML =
            '<p>You clicked here: <code>' +
            selected.get('CTP_KOR_NM') +
            '</code></p>';
        } else if (
          selected.get('CTP_KOR_NM') != null &&
          selected.get('SIG_KOR_NM') != null
        ) {
          content.innerHTML =
            '<p>You clicked here: <code>' +
            selected.get('CTP_KOR_NM') +
            ' ' +
            selected.get('SIG_KOR_NM') +
            '</code></p>';
        } else if (selected.get('SIG_KOR_NM') != null) {
          content.innerHTML =
            '<p>You clicked here: <code>' +
            selected.get('SIG_KOR_NM') +
            '</code></p>';
        }

        overlay.setPosition(coordinate);
      } else {
        closer.onclick();
      }
    });
    map.on('dblclick', function(evt) {
      console.log(evt);
    });
    /** overlay  code end*/

    var highlightStyle = new Style({
      fill: new Fill({
        color: 'rgba(255,255,255,0.7)',
      }),
      stroke: new Stroke({
        color: '#3399CC',
        width: 3,
      }),
    });

    var status = document.getElementById('status');

    map.on('pointermove', function(e) {
      if (selected !== null) {
        selected.setStyle(undefined);
        selected = null;
      }

      map.forEachFeatureAtPixel(e.pixel, function(f) {
        selected = f;
        f.setStyle(highlightStyle);
        return true;
      });

      if (selected) {
        //  content.innerHTML = '<p>You clicked here: <code>' + selected.get('CTP_KOR_NM') + '</code></p>';
        //  var coordinate = e.coordinate;
        // overlay.setPosition(coordinate);
        if (selected.get('CTP_KOR_NM') != null) {
          status.innerHTML =
            '&nbsp;Hovering: ' +
            selected.get('CTP_KOR_NM') +
            +selected.get('CTPRVN_CD');
        } else if (selected.get('SIG_KOR_NM') != null) {
          status.innerHTML = '&nbsp;Hovering: ' + selected.get('SIG_KOR_NM');
        }
      } else {
        status.innerHTML = '&nbsp;';
      }
    });

    var currZoom = 0;
    map.on('moveend', function() {
      var newZoom = map.getView().getZoom();
      // console.log('currZoom : ' + currZoom)
      // console.log('newZoom : ' + newZoom)
      if (newZoom >= 10 && !(currZoom > 10)) {
        // vectorLayer.getSource().clear();
        // vectorSource.setUrl('http://112.220.90.93:8899/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3A%EC%8B%9C%EA%B5%B0%EA%B5%AC&maxFeatures=50&outputFormat=application%2Fjson');
        // vectorSource.refresh();
        // map.layers.push(vectorLayer2);
        // vectorSource.refresh();
        map.addLayer(vectorLayer2);
      } else if (newZoom < 10 && !(currZoom < 10)) {
        map.removeLayer(vectorLayer2);
        // vectorLayer.getSource().clear();
        // vectorSource.setUrl('http://112.220.90.93:8899/geoserver/test/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=test%3A%EC%8B%9C%EB%8F%84&maxFeatures=50&outputFormat=application%2Fjson');
        // vectorSource.refresh();
      }
      currZoom = map.getView().getZoom();
    });
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}

.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}

.ol-popup-closer:after {
  content: '✖';
}
</style>
