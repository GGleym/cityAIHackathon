import React, { useContext, useEffect, useState } from 'react';
import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {
  GeoJsonLayer,
  PathLayer,
  SolidPolygonLayer,
  PolygonLayer,
  IconLayer
} from '@deck.gl/layers';
import { MapContext } from '../index';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NavbarContext } from '../../components/layouts/Main';
import { getDifferentHexes } from '../../functions/getDifferentHexes';
import { filterObjects } from '../../functions/objectsFilter/filterObjects';

const ACCESS_TOKEN =
  'pk.eyJ1IjoiZ2dsZXltIiwiYSI6ImNsazQxdTdxbjA2aTEzbXJ5dTQxM2t4eTcifQ.WkaIkLWY8zNsBJOAbhEc0Q';

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true, anchorY: 120 }
};

const MainMap = () => {
  const {
    cityInfo,
    objToggles,
    typeOfMap,
    objectsOfCity,
    numberOfLayer,
    setClickCoordinates,
    clickCoordinates,
    activeTransport
  } = useContext(MapContext);
  const [layersOfMaps, setLayersOfMaps] = useState();
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/ggleym/clk5rokki009q01pg1o351shx'
  );
  const [isochron, setIsochron] = useState([]);
  const [layers, setLayers] = useState([]);
  const { setTheme, setLoader } = useContext(NavbarContext);
  const [initialViewState, setInitialViewState] = useState({
    latitude: cityInfo && cityInfo['cityCoordinates'][0],
    longitude: cityInfo && cityInfo['cityCoordinates'][1],
    zoom: 10,
    bearing: 0,
    pitch: 40
  });
  const [boundariesOfIsochron, setBoundariesOfIsochron] = useState([]);

  useEffect(() => {
    if (clickCoordinates.length === 0) return;
    if (typeOfMap === 2) {
      let transport;
      switch (activeTransport) {
        case 1: {
          transport = 'foot';
          break;
        }
        case 2: {
          transport = 'bike';
          break;
        }
        case 3: {
          transport = 'car';
          break;
        }
      }
      (async function () {
        const isochroneResult = await fetch(
          `https://graphhopper.com/api/1/isochrone?point=${clickCoordinates[1]},${clickCoordinates[0]}&profile=${transport}&time_limit=900&buckets=3&key=550ee6f2-15b2-4b89-b21e-66304e205b7a`,
          {
            method: 'GET',
            headers: {
              'Content-type': 'application/json'
            }
          }
        );
        const response = await isochroneResult.json();

        const firstPolygon = [
          {
            polygon:
              response && response['polygons'][0]['geometry']['coordinates']
          }
        ];

        const secondPolygon = [
          {
            polygon:
              response && response['polygons'][1]['geometry']['coordinates']
          }
        ];

        const thirdPolygon = [
          {
            polygon:
              response && response['polygons'][2]['geometry']['coordinates']
          }
        ];

        setBoundariesOfIsochron(thirdPolygon[0]['polygon']);

        setIsochron([
          new PolygonLayer({
            id: '15minPolygon',
            data: thirdPolygon,
            pickable: false,
            stroked: true,
            filled: true,
            lineWidthMinPixels: 2,
            getPolygon: d => d.polygon,
            getLineColor: [150, 0, 0],
            getFillColor: [252, 88, 79, 100],
            getLineWidth: 2,
            lineJointRounded: true
          }),
          new PolygonLayer({
            id: '10minPolygon',
            data: secondPolygon,
            pickable: false,
            stroked: true,
            filled: true,
            lineWidthMinPixels: 2,
            getPolygon: d => d.polygon,
            getLineColor: [0, 0, 150],
            getFillColor: [45, 156, 219, 100],
            getLineWidth: 2,
            lineJointRounded: true
          }),
          new PolygonLayer({
            id: '5minPolygon',
            data: firstPolygon,
            pickable: false,
            stroked: true,
            filled: true,
            lineWidthMinPixels: 2,
            getPolygon: d => d.polygon,
            getLineColor: [0, 150, 0],
            getFillColor: [1, 221, 160, 100],
            getLineWidth: 2,
            lineJointRounded: true
          }),
          new IconLayer({
            id: 'isochronMarker',
            data: [
              {
                coordinates: clickCoordinates
              }
            ],
            pickable: false,
            iconMapping: ICON_MAPPING,
            iconAtlas: 'https://img.icons8.com/?size=100&id=85049&format=png',
            getIcon: d => 'marker',
            getPosition: d => d.coordinates,
            sizeScale: 2,
            getSize: 20,
            getColor: [255, 0, 0, 255]
          })
        ]);
      })();
    }
  }, [clickCoordinates, typeOfMap, activeTransport]);

  useEffect(() => {
    setInitialViewState({
      ...initialViewState,
      latitude: cityInfo['cityCoordinates'][1],
      longitude: cityInfo['cityCoordinates'][0]
    });
  }, [cityInfo]);

  const dataOfInitialLayer = [
    {
      polygon: cityInfo && cityInfo['boundaries']
    }
  ];

  useEffect(() => {
    if (typeOfMap === 1) {
      setMapStyle('mapbox://styles/ggleym/clk5rokki009q01pg1o351shx');
      setTheme('white');
      setLayers([]);
      setIsochron([]);

      for (let key of Object.keys(objToggles)) {
        objToggles[key] = false;
      }

      setLayersOfMaps([
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
      ]);
    } else if (typeOfMap === 2) {
      setMapStyle('mapbox://styles/ggleym/clkfcheba005701pbc3882oar');
      setTheme('black');
      setLayers([]);
      setLayersOfMaps([]);

      for (let key of Object.keys(objToggles)) {
        objToggles[key] = false;
      }

      (async function () {
        const roadsData = await fetch(
          `/geoJSONs/roads/${cityInfo['selectValueName']}.geojson`
        );

        const responseRoadsData = await roadsData.json();

        const getColorOfRoad = obj => {
          if (
            obj['properties']['minutes'] &&
            obj['properties']['minutes'] > 0.05 &&
            obj['properties']['minutes'] < 0.07
          ) {
            return [255, 255, 0, 100];
          } else if (
            obj['properties']['minutes'] &&
            obj['properties']['minutes'] < 0.05
          ) {
            return [1, 221, 160];
          } else if (
            obj['properties']['minutes'] &&
            obj['properties']['minutes'] > 0.07
          ) {
            return [252, 88, 79];
          } else if (obj['properties']['meters'] > 80) {
            return [252, 88, 79];
          } else if (obj['properties']['meters'] < 80) {
            return [1, 221, 160];
          } else {
            return [255, 255, 0, 100];
          }
        };

        setLayersOfMaps([
          new PathLayer({
            data: responseRoadsData.features,
            pickable: false,
            widthScale: 1,
            widthMinPixels: 1,
            getPath: d => d['geometry']['coordinates'][0],
            getColor: getColorOfRoad,
            draggable: false,
            getWidth: 1,
            capRounded: true,
            jointRounded: true
          })
        ]);
      })();
    } else if (typeOfMap === 3) {
      setMapStyle('mapbox://styles/ggleym/clkfcpdcm004301qydbqx1fe2');
      setTheme('black');
      setLayers([]);
      setIsochron([]);

      for (let key of Object.keys(objToggles)) {
        objToggles[key] = false;
      }

      if (cityInfo['name'] === 'Архангельск') {
        setInitialViewState({
          ...initialViewState,
          latitude: 64.54725,
          longitude: 40.56016
        });
        (async function () {
          const getBuildings = await fetch(
            `/geoJSONs/buildings/город_Архангельск.geojson`
          );
          const buildingsData = await getBuildings.json();

          const getFillColor = d => {
            if (d && d.properties.year < 1965 && d.properties.year !== 0) {
              return [252, 88, 79];
            } else {
              return [1, 221, 160];
            }
          };

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
              getFillColor: getFillColor,
              getPointRadius: 10,
              getLineWidth: 1
            })
          );
        })();
      }
    } else if (typeOfMap === 4) {
      for (let key of Object.keys(objToggles)) {
        objToggles[key] = false;
      }
    }
  }, [typeOfMap, cityInfo]);

  useEffect(() => {
    if (typeOfMap === 4) {
      setMapStyle('mapbox://styles/ggleym/clkgs5q2b007e01pcd4iq4bhd');
      setTheme('black');
      setLayers([]);
      setIsochron([]);

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
    if (typeOfMap !== 2) {
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
              getColor: [1, 221, 160]
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
              getColor: [45, 156, 219]
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
              getColor: [252, 88, 79]
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
    } else if (typeOfMap === 2) {
      function addObjectToTransport(objOfFeatureOfToggles) {
        const objOfFeatureLayers = [];

        for (let key of Object.keys(objOfFeatureOfToggles)) {
          if (objOfFeatureOfToggles[key]) {
            objOfFeatureLayers.push(key);
          }
        }

        let filteredEducation = [];
        let filteredZdrav = [];
        let filteredTourism = [];

        if (objectsOfCity && boundariesOfIsochron) {
          filteredEducation = filterObjects(
            objectsOfCity.objectsEducation.features,
            boundariesOfIsochron
          );
          filteredZdrav = filterObjects(
            objectsOfCity.objectsZdrav.features,
            boundariesOfIsochron
          );
          filteredTourism = filterObjects(
            objectsOfCity.objectsTourism.features,
            boundariesOfIsochron
          );
        }

        const mapLayers = [
          {
            layerName: 'transport_education_objects',
            layer: new GeoJsonLayer({
              id: 'educationObjects',
              data: filteredEducation,
              pickable: true,
              getPosition: d => d.geometry.coordinates,
              stroked: false,
              filled: true,
              extruded: true,
              pointType: 'circle',
              lineWidthScale: 10,
              lineWidthMinPixels: 2,
              getFillColor: [0, 255, 0],
              getPointRadius: 10,
              sizeScale: 10,
              getSize: 4
            })
          },
          {
            layerName: 'transport_tourism_objects',
            layer: new GeoJsonLayer({
              id: 'tourismObjects',
              data: filteredTourism,
              pickable: true,
              getPosition: d => d.geometry.coordinates,
              stroked: false,
              filled: true,
              extruded: true,
              pointType: 'circle',
              lineWidthScale: 10,
              lineWidthMinPixels: 2,
              getFillColor: [1, 5, 255],
              getPointRadius: 10,
              sizeScale: 10,
              getSize: 4
            })
          },
          {
            layerName: 'transport_zdrav_objects',
            layer: new GeoJsonLayer({
              id: 'zdravObjects',
              data: filteredZdrav,
              pickable: true,
              getPosition: d => d.geometry.coordinates,
              stroked: false,
              filled: true,
              extruded: true,
              pointType: 'circle',
              lineWidthScale: 10,
              lineWidthMinPixels: 2,
              getFillColor: [255, 150, 0],
              getPointRadius: 10,
              sizeScale: 10,
              getSize: 4
            })
          }
        ];

        return mapLayers
          .filter(layerItem =>
            objOfFeatureLayers.includes(layerItem['layerName'])
          )
          .map(item => item['layer']);
      }

      setLayers(addObjectToTransport(objToggles));
    }
  }, [objToggles]);

  const getTooltip = ({ object }) => {
    if (object && object.properties.name) {
      return {
        html: `<h1>${object.properties.name}</h1>`,
        style: {
          fontSize: '0.4rem'
        }
      };
    } else if (object && object.properties.year) {
      return {
        html: `<h1>${object.properties.year}</h1>`,
        style: {
          fontSize: '0.4rem'
        }
      };
    } else if (object && !object.properties.year) {
      return {
        html: `<h1>>1980</h1>`,
        style: {
          fontSize: '0.4rem'
        }
      };
    }
  };

  return (
    <>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[layersOfMaps, ...layers, ...isochron]}
        getTooltip={getTooltip}
        style={{ position: 'fixed' }}
        onClick={e => setClickCoordinates(e.coordinate)}
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
