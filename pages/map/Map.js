import React, { useContext, useEffect, useState } from 'react';
import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react/dist/esm';
import {
  GeoJsonLayer,
  PathLayer,
  SolidPolygonLayer,
  PolygonLayer,
  IconLayer
} from '@deck.gl/layers/dist/esm';
import { MapContext } from '../index';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NavbarContext } from '../../components/layouts/Main';
import roads from '../../public/geoJSONs/roads/город_Архангельск.geojson';
import { getDifferentHexes } from '../../functions/getDifferentHexes';

const ACCESS_TOKEN =
  'pk.eyJ1IjoiZ2dsZXltIiwiYSI6ImNsazQxdTdxbjA2aTEzbXJ5dTQxM2t4eTcifQ.WkaIkLWY8zNsBJOAbhEc0Q';

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
};

const MainMap = () => {
  const { cityInfo, objToggles, typeOfMap, objectsOfCity, numberOfLayer } =
    useContext(MapContext);
  const [layersOfMaps, setLayersOfMaps] = useState();
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/ggleym/clk5rokki009q01pg1o351shx'
  );
  const [layers, setLayers] = useState([]);
  const { setTheme, setLoader } = useContext(NavbarContext);
  const [initialViewState, setInitialViewState] = useState({
    latitude: cityInfo['cityCoordinates'][0],
    longitude: cityInfo['cityCoordinates'][1],
    zoom: 10,
    bearing: 0,
    pitch: 10
  });

  useEffect(() => {
    setInitialViewState({
      ...initialViewState,
      latitude: cityInfo['cityCoordinates'][1],
      longitude: cityInfo['cityCoordinates'][0]
    });
  }, [cityInfo]);

  const dataOfInitialLayer = [
    {
      polygon: cityInfo['boundaries']
    }
  ];

  useEffect(() => {
    if (typeOfMap === 1) {
      setMapStyle('mapbox://styles/ggleym/clk5rokki009q01pg1o351shx');
      setTheme('white');
      setLayers([]);

      for (let key of Object.keys(objToggles)) {
        objToggles[key] = false;
      }

      setLayersOfMaps(
        new PolygonLayer({
          id: 'borderLayer',
          data: dataOfInitialLayer,
          pickable: false,
          stroked: true,
          filled: false,
          lineWidthMinPixels: 2,
          getPolygon: d => d.polygon,
          getLineColor: [80, 80, 80],
          getLineWidth: 2
        })
      );
    } else if (typeOfMap === 2) {
      setMapStyle('mapbox://styles/ggleym/clkfcheba005701pbc3882oar');
      setTheme('black');
      setLayers([]);

      for (let key of Object.keys(objToggles)) {
        objToggles[key] = false;
      }

      setLayersOfMaps(
        new PathLayer({
          data: roads.features,
          pickable: true,
          widthScale: 1,
          widthMinPixels: 1,
          getPath: d => d['geometry']['coordinates'][0],
          getColor: [255, 0, 0],
          draggable: false,
          getWidth: 1
        })
      );
    } else if (typeOfMap === 3) {
      setMapStyle('mapbox://styles/ggleym/clkfcpdcm004301qydbqx1fe2');
      setTheme('black');
      setLayers([]);

      for (let key of Object.keys(objToggles)) {
        objToggles[key] = false;
      }

      if (cityInfo['name'] === 'Архангельск') {
        setInitialViewState({
          ...initialViewState,
          latitude: 64.54725,
          longitude: 40.56016,
          zoom: 13
        });
        (async function () {
          const getBuildings = await fetch(
            `/geoJSONs/buildings/город_Архангельск.geojson`
          );
          const buildingsData = await getBuildings.json();

          setLayersOfMaps(
            new GeoJsonLayer({
              id: 'buildings',
              data: buildingsData,
              pickable: true,
              stroked: false,
              filled: true,
              extruded: true,
              pointType: 'circle',
              lineWidthScale: 10,
              lineWidthMinPixels: 2,
              getFillColor: d =>
                d.properties.year > 1960 ? [255, 0, 0, 255] : [0, 255, 0, 255],
              getPointRadius: 10,
              getLineWidth: 1,
              getElevation: 30
            })
          );
        })();
      }
    }
  }, [typeOfMap, cityInfo]);

  useEffect(() => {
    if (typeOfMap === 4) {
      setMapStyle('mapbox://styles/ggleym/clkgs5q2b007e01pcd4iq4bhd');
      setTheme('black');
      setLayers([]);

      // for (let key of Object.keys(objToggles)) { //это нужно убрать, если
      //   objToggles[key] = false;                //хотим, чтобы цветы сливались
      // }

      (async function () {
        const {
          features,
          tourismFeatures,
          zdravFeatures,
          educationFeatures,
          ETFeatures,
          EZFeatures,
          ZTFeatures,
          ZTEFeatures
        } = await getDifferentHexes(cityInfo['selectValueName']);

        const layers = [
          {
            layer: new SolidPolygonLayer({
              data: features,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              fillColor: [100, 100, 100, 100],
              elevationScale: 10,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          },
          {
            layer: new SolidPolygonLayer({
              data: ZTEFeatures,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              fillColor: [100, 100, 100, 100],
              elevationScale: 10,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          },
          {
            layer: new SolidPolygonLayer({
              data: ETFeatures,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              fillColor: [100, 100, 100, 100],
              elevationScale: 10,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          },
          {
            layer: new SolidPolygonLayer({
              data: ZTFeatures,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              fillColor: [100, 100, 100, 100],
              elevationScale: 10,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          },
          {
            layer: new SolidPolygonLayer({
              data: EZFeatures,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              fillColor: [100, 100, 100, 100],
              elevationScale: 10,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          },
          {
            layer: new SolidPolygonLayer({
              data: tourismFeatures,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              fillColor: [100, 100, 100, 100],
              elevationScale: 10,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          },
          {
            layer: new SolidPolygonLayer({
              data: educationFeatures,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              fillColor: [100, 100, 100, 100],
              elevationScale: 10,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          },
          {
            layer: new SolidPolygonLayer({
              data: zdravFeatures,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              fillColor: [100, 100, 100, 100],
              elevationScale: 10,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          }
        ];
        setLayersOfMaps([layers[numberOfLayer].layer]);
      })();
    }
  }, [objToggles, typeOfMap]);

  useEffect(() => {
    function addLayers(objOfFeatureOfToggles) {
      const objOfFeatureLayers = [];

      for (let key of Object.keys(objOfFeatureOfToggles)) {
        if (objOfFeatureOfToggles[key]) {
          objOfFeatureLayers.push(key);
        }
      }

      const mapLayers = [
        {
          layerName: 'objects_education',
          layer: new IconLayer({
            id: 'educationIcons',
            data: objectsOfCity && objectsOfCity.objectsEducation.features,
            pickable: true,
            iconMapping: ICON_MAPPING,
            iconAtlas: 'https://img.icons8.com/?size=100&id=85049&format=png',
            getIcon: d => 'marker',
            getPosition: d => d.geometry.coordinates,
            sizeScale: 10,
            getSize: 4,
            getColor: [0, 255, 0, 150]
          })
        },
        {
          layerName: 'objects_tourism',
          layer: new IconLayer({
            id: 'tourismIcons',
            data: objectsOfCity && objectsOfCity.objectsTourism.features,
            pickable: true,
            iconMapping: ICON_MAPPING,
            iconAtlas: 'https://img.icons8.com/?size=100&id=85049&format=png',
            getIcon: d => 'marker',
            getPosition: d => d.geometry.coordinates,
            sizeScale: 10,
            getSize: 4,
            getColor: [0, 0, 255, 150]
          })
        },
        {
          layerName: 'objects_zdrav',
          layer: new IconLayer({
            id: 'icon-layer',
            data: objectsOfCity && objectsOfCity.objectsZdrav.features,
            pickable: true,
            iconMapping: ICON_MAPPING,
            iconAtlas: 'https://img.icons8.com/?size=100&id=85049&format=png',
            getIcon: d => 'marker',
            getPosition: d => d.geometry.coordinates,
            sizeScale: 10,
            getSize: 4,
            getColor: [255, 0, 0, 150]
          })
        }
      ];

      return mapLayers
        .filter(layerItem =>
          objOfFeatureLayers.includes(layerItem['layerName'])
        )
        .map(item => item['layer']);
    }

    setLayers(addLayers(objToggles));
  }, [objToggles]);

  const getTooltip = ({ object }) =>
    object && {
      html: `<h1>${
        object.properties.name || object['properties']['year']
      }</h1><h1>${object['properties']['street'] ? 'улица: ' : ''}${
        object['properties']['street'] ? object['properties']['street'] : ''
      }</h1>`,
      style: {
        fontSize: '0.4rem'
      }
    };

  return (
    <>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[layersOfMaps, ...layers]}
        getTooltip={getTooltip}
        style={{ position: 'fixed' }}
      >
        <MapGL
          mapboxAccessToken={ACCESS_TOKEN}
          mapStyle={mapStyle}
          onLoad={() => setLoader(false)}
        />
      </DeckGL>
    </>
  );
};

export default MainMap;
