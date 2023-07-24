import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import MapGL from 'react-map-gl';
import DeckGL, {
  GeoJsonLayer,
  PathLayer,
  IconLayer,
  SolidPolygonLayer,
  PolygonLayer
} from 'deck.gl';
import { MapContext } from '../index';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapLoader } from '../../components/loader/MapLoader';
import { NavbarContext } from '../../components/layouts/Main';
import roads from '../../public/geoJSONs/roads/город_Архангельск.geojson';
import {getDifferentHexes} from '../../functions/getDifferentHexes';

const ACCESS_TOKEN =
  'pk.eyJ1IjoiZ2dsZXltIiwiYSI6ImNsazQxdTdxbjA2aTEzbXJ5dTQxM2t4eTcifQ.WkaIkLWY8zNsBJOAbhEc0Q';

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
};

export default function MainMap() {
  const [mapLoaded, setMapLoaded] = useState(true);
  const { cityInfo, objToggles, typeOfMap, objectsOfCity } =
    useContext(MapContext);
  const [layersOfMaps, setLayersOfMaps] = useState();
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/ggleym/clk5rokki009q01pg1o351shx'
  );
  const [layers, setLayers] = useState([]);
  const { setTheme } = useContext(NavbarContext);
  const [initialViewState, setInitialViewState] = useState({
    latitude: cityInfo['cityCoordinates'][0],
    longitude: cityInfo['cityCoordinates'][1],
    zoom: 10,
    bearing: 0,
    pitch: 10
  });
  const [educationFeatures, setEducationFeatures] = useState()
  const [tourismFeatures, setTourismFeatures] = useState()
  const [zdravFeatures, setZdravFeatures] = useState()

  useLayoutEffect(() => {
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
              getFillColor: [160, 160, 180, 200],
              getPointRadius: 10,
              getLineWidth: 1,
              getElevation: 30
            })
          );
        })();
      }
    } else if (typeOfMap === 4) {
      // const {educationFeatures} = getDifferentHexes(cityInfo['selectValueName']);
      //
      // console.log(educationFeatures)
      setMapStyle('mapbox://styles/ggleym/clkgs5q2b007e01pcd4iq4bhd');
      setTheme('black');


      (async function () {

        const getHexes = await fetch(`/geoJSONs/hexes/${cityInfo["selectValueName"]}.geojson`)
        const responseHexes = await getHexes.json()

        const features = responseHexes.features

        const educationFeatures = JSON.parse(JSON.stringify(features))
        const tourismFeatures = JSON.parse(JSON.stringify(features))
        const zdravFeatures = JSON.parse(JSON.stringify(features))
        // const ETFeatures = JSON.parse(JSON.stringify(features)) //education and tourism toggles
        // const EZFeatures = JSON.parse(JSON.stringify(features)) //education and zdrav toggles
        // const ZTFeatures = JSON.parse(JSON.stringify(features)) //zdrav and tourism toggles
        // const ZTEFeatures = JSON.parse(JSON.stringify(features)) //zdrav and tourism and education toggles

        const changeEducation = (feature) => {
          let objOfFeature = feature.properties
          for (let key of Object.keys(objOfFeature)) {
            if (objOfFeature["hex_education"]) {
              feature.color = [0, 255, 0, 100]
            }
          }
        }
        const changeTourism = (feature) => {
          let objOfFeature = feature.properties
          for (let key of Object.keys(objOfFeature)) {
            if (objOfFeature["hex_tourism"]) {
              feature.color = [0, 0, 255, 100]
            }
          }
        }
        const changeZdrav = (feature) => {
          let objOfFeature = feature.properties
          for (let key of Object.keys(objOfFeature)) {
            if (objOfFeature["hex_zdrav"]) {
              feature.color = [255, 0, 0, 100]
            }
          }
        }
        // const changeET = (feature) => {
        //     let objOfFeature = feature.properties
        //     for (let key of Object.keys(objOfFeature)) {
        //         if (objOfFeature["hex_education"] && objOfFeature["hex_tourism"]) {
        //             feature.color = [0, 255, 255, 255]
        //         }
        //     }
        // }
        // const changeEZ = (feature) => {
        //     let objOfFeature = feature.properties
        //     for (let key of Object.keys(objOfFeature)) {
        //         if (objOfFeature["hex_education"] && objOfFeature["hex_zdrav"]) {
        //             feature.color = [255, 255, 0, 255]
        //         }
        //     }
        // }
        // const changeZT = (feature) => {
        //     let objOfFeature = feature.properties
        //     for (let key of Object.keys(objOfFeature)) {
        //         if (objOfFeature["hex_zdrav"] && objOfFeature["hex_tourism"]) {
        //             feature.color = [255, 0, 255, 255]
        //         }
        //     }
        // }
        // const changeZTE = (feature) => {
        //     let objOfFeature = feature.properties
        //     for (let key of Object.keys(objOfFeature)) {
        //         if (objOfFeature["hex_education"] && objOfFeature["hex_zdrav"] && objOfFeature["hex_tourism"]) {
        //             feature.color = [255, 255, 255, 100]
        //         }
        //     }
        // }

        for (const feature of educationFeatures) {
          changeEducation(feature)
        }
        for (const feature of tourismFeatures) {
          changeTourism(feature)
        }
        for (const feature of zdravFeatures) {
          changeZdrav(feature)
        }
        // for (const feature of ETFeatures) {
        //     changeET(feature)
        // }
        // for (const feature of EZFeatures) {
        //     changeEZ(feature)
        // }
        // for (const feature of ZTFeatures) {
        //     changeZT(feature)
        // }
        // for (const feature of ZTEFeatures) {
        //     changeZTE(feature)
        // }

        setEducationFeatures(educationFeatures)
        setTourismFeatures(tourismFeatures)
        setZdravFeatures(zdravFeatures)
      })()

      // (async function () {
      //   const getHexes = await fetch(
      //     `/geoJSONs/hexes/${cityInfo['selectValueName']}.geojson`
      //   );
      // const hexesData = await getHexes.json();
      //
      // const features = hexesData.features;

      // const changeColorOfFeature = feature => {
      //   let obj = feature.properties;
      //   for (let key of Object.keys(obj)) {
      //     if (obj['hex_education']) {
      //       feature.color = [0, 255, 0, 100];
      //     }
      //     if (obj['hex_tourism']) {
      //       feature.color = [0, 0, 255, 100];
      //     }
      //     if (obj['hex_zdrav']) {
      //       feature.color = [255, 0, 0, 100];
      //     }
      //     if (obj['hex_education'] && obj['hex_tourism']) {
      //       feature.color = [0, 255, 255, 100];
      //     }
      //     if (obj['hex_education'] && obj['hex_zdrav']) {
      //       feature.color = [255, 255, 0, 100];
      //     }
      //     if (obj['hex_tourism'] && obj['hex_zdrav']) {
      //       feature.color = [255, 0, 255, 50];
      //     }
      //     if (
      //       obj['hex_tourism'] &&
      //       obj['hex_zdrav'] &&
      //       obj['hex_education']
      //     ) {
      //       feature.color = [255, 255, 255, 50];
      //     }
      //   }
      // };

      // for (const feature of features) {
      //   changeColorOfFeature(feature);
      // }

      const addHexLayers = stateOfToggles => {
        let toggleLayers = []

        for (let key of Object.keys(stateOfToggles)) {
          if (stateOfToggles[key]) {
            toggleLayers.push(key)
          }
        }

        const layers = [
          {
            hexName: 'hex_education',
            layer: new SolidPolygonLayer({
              data: educationFeatures,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              elevationScale: 1,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          },
          {
            hexName: 'hex_tourism',
            layer: new SolidPolygonLayer({
              data: tourismFeatures,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              elevationScale: 1,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          },
          {
            hexName: 'hex_zdrav',
            layer: new SolidPolygonLayer({
              data: zdravFeatures,
              extruded: true,
              filled: true,
              getLineColor: [255, 255, 255, 255],
              wireframe: true,
              elevationScale: 1,
              getFillColor: d => d.color || [100, 100, 100, 100],
              getElevation: 1,
              getPolygon: d => d['geometry']['coordinates']
            })
          },
          // {
          //   hexName: 'ETFeatures',
          //   layer: new SolidPolygonLayer({
          //     data: hexesData.features,
          //     extruded: true,
          //     filled: true,
          //     getLineColor: [255, 255, 255, 255],
          //     wireframe: true,
          //     fillColor: [100, 100, 100, 100],
          //     elevationScale: 10,
          //     getFillColor: d => d.color || [100, 100, 100, 100],
          //     getElevation: d => d['properties']['hex_buildings_count'],
          //     getPolygon: d => d['geometry']['coordinates']
          //   })
          // },
          // {
          //   hexName: 'EZFeatures',
          //   layer: new SolidPolygonLayer({
          //     data: hexesData.features,
          //     extruded: true,
          //     filled: true,
          //     getLineColor: [255, 255, 255, 255],
          //     wireframe: true,
          //     fillColor: [100, 100, 100, 100],
          //     elevationScale: 10,
          //     getFillColor: d => d.color || [100, 100, 100, 100],
          //     getElevation: d => d['properties']['hex_buildings_count'],
          //     getPolygon: d => d['geometry']['coordinates']
          //   })
          // },
          // {
          //   hexName: 'ZTFeatures',
          //   layer: new SolidPolygonLayer({
          //     data: ZTData,
          //     extruded: true,
          //     filled: true,
          //     getLineColor: [255, 255, 255, 255],
          //     wireframe: true,
          //     fillColor: [100, 100, 100, 100],
          //     elevationScale: 10,
          //     getFillColor: d => d.color || [100, 100, 100, 100],
          //     getElevation: d => d['properties']['hex_buildings_count'],
          //     getPolygon: d => d['geometry']['coordinates']
          //   })
          // },
          // {
          //   hexName: 'ZTEFeatures',
          //   layer: new SolidPolygonLayer({
          //     data: ZTEData,
          //     extruded: true,
          //     filled: true,
          //     getLineColor: [255, 255, 255, 255],
          //     wireframe: true,
          //     fillColor: [100, 100, 100, 100],
          //     elevationScale: 10,
          //     getFillColor: d => d.color || [100, 100, 100, 100],
          //     getElevation: d => d['properties']['hex_buildings_count'],
          //     getPolygon: d => d['geometry']['coordinates']
          //   })
          // }
        ];

        return layers.filter((layer) => toggleLayers.includes(layer.hexName))
            .map((itemLayer) => itemLayer.layer)
      }

      const initialHexes = new SolidPolygonLayer({
        data: educationFeatures,
        extruded: true,
        filled: true,
        getLineColor: [255, 255, 255, 255],
        wireframe: true,
        fillColor: [100, 100, 100, 100],
        getFillColor: [255, 255, 255, 50],
        getElevation: 1,
        getPolygon: d => d['geometry']['coordinates']
      })

      setLayersOfMaps([initialHexes, ...addHexLayers(objToggles)])
    }
  }, [typeOfMap, cityInfo, objToggles]);

  useEffect(() => {
    function addLayers(stateOfToggles) {
      const stateLayers = [];

      for (let key of Object.keys(stateOfToggles)) {
        if (stateOfToggles[key]) {
          stateLayers.push(key);
        }
      }

      const mapLayers = [
        {
          layerName: 'objects_education',
          layer: new IconLayer({
            id: 'educationIcons',
            data: objectsOfCity && objectsOfCity.objectsEducation.features,
            pickable: true,
            iconAtlas: 'https://img.icons8.com/?size=100&id=73815&format=png',
            iconMapping: ICON_MAPPING,
            getIcon: d => 'marker',
            getPosition: d => d.geometry.coordinates,
            sizeScale: 10,
            getSize: 3,
            getColor: [0, 0, 0, 200]
          })
        },
        {
          layerName: 'objects_tourism',
          layer: new IconLayer({
            id: 'tourismIcons',
            data: objectsOfCity && objectsOfCity.objectsTourism.features,
            pickable: true,
            iconAtlas:
              'https://img.icons8.com/?size=100&id=7oEDRZeazDGp&format=png',
            iconMapping: ICON_MAPPING,
            getIcon: d => 'marker',
            getPosition: d => d.geometry.coordinates,
            sizeScale: 10,
            getSize: 3,
            getColor: [0, 0, 0, 200]
          })
        },
        {
          layerName: 'objects_zdrav',
          layer: new IconLayer({
            id: 'icon-layer',
            data: objectsOfCity && objectsOfCity.objectsZdrav.features,
            pickable: true,
            iconAtlas: 'https://img.icons8.com/?size=100&id=87&format=png',
            iconMapping: ICON_MAPPING,
            getIcon: d => 'marker',
            getPosition: d => d.geometry.coordinates,
            sizeScale: 10,
            getSize: 3,
            getColor: [0, 0, 0, 200]
          })
        }
      ];

      return mapLayers
        .filter(layerItem => stateLayers.includes(layerItem['layerName']))
        .map(item => item['layer']);
    }

    setLayers(addLayers(objToggles));
  }, [objToggles]);

  if (typeOfMap === 3) {
    var getTooltip = ({ object }) =>
      object && {
        html: `${object['properties']['year']}`,
        style: {
          fontSize: '1rem'
        }
      };
  } else {
    var getTooltip = ({ object }) =>
      object && {
        html: `<h1>${object.properties.name}</h1>`,
        style: {
          backgroundColor: '#000',
          fontSize: '0.4rem',
          position: 'absolute',
          lineHeight: '50%',
          width: 'fit-content'
        }
      };
  }

  return (
    <>
      <MapLoader loading={mapLoaded} />
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
          onLoad={() => setMapLoaded(false)}
        />
      </DeckGL>
    </>
  );
}
