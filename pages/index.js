import React, { useCallback, useState } from 'react';
import { CITY_INITIAL_STATE } from '../functions/mapFunctions/cityReducer';
import { CompoundSheets } from '../components/mapSheets/CompoundSheets';
import { MainPanel } from '../components/panelSheets/MainPanel';
// import { InfoHexSheet } from '../components/mapSheets/InfoHexSheet';
import dynamic from 'next/dynamic';

const SRMap = dynamic(() => import('../pages/map/Map'), { ssr: false });

export const MapContext = React.createContext({});

const MapSection = () => {
  const [cityInfo, setCityInfo] = useState(CITY_INITIAL_STATE);
  const [objToggles, setObjToggles] = useState({});
  const [objectsOfCity, setObjectsOfCity] = useState();
  const [typeOfMap, setTypeOfMap] = useState(1);
  const [numberOfLayer, setNumberOfLayer] = useState(0);
  const [clickCoordinates, setClickCoordinates] = useState([]);
  const [activeTransport, setActiveTransport] = useState("foot");
  const [layers, setLayers] = useState([]);

  const changeCity = useCallback(info => {
    setCityInfo(info);
  }, []);

  const changeLayers = useCallback(layer => {
    setObjToggles(layer);
  }, []);

  const changeObjects = useCallback(objectOfObjects => {
    setObjectsOfCity(objectOfObjects);
  }, []);

  return (
    <MapContext.Provider
      value={{
        changeCity,
        cityInfo,
        changeLayers,
        objToggles,
        setTypeOfMap,
        typeOfMap,
        objectsOfCity,
        changeObjects,
        numberOfLayer,
        setNumberOfLayer,
        clickCoordinates,
        setClickCoordinates,
        activeTransport,
        setActiveTransport,
        layers,
        setLayers
      }}
    >
      <SRMap />
      <CompoundSheets />
      <MainPanel />
      {/*<InfoHexSheet />*/}
    </MapContext.Provider>
  );
};

export default MapSection;
