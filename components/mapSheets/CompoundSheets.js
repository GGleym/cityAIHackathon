import { createContext, useCallback, useContext, useState } from 'react';
import { FindCitySheet } from './FindCitySheet';
import { FoundCitySheet } from './FoundCitySheet';
import styles from '../../styles/map/Map.module.css';
import { NavbarContext } from '../layouts/Main';

export const SheetsContext = createContext();

export const CompoundSheets = () => {
  const [inputValue, setInputValue] = useState('');
  const { showSheets, showPanel } = useContext(NavbarContext);
  const [showFoundBox, setShowFoundBox] = useState(null);
  const [noData, setNoData] = useState(true);
  const [haveEducation, setHaveEducation] = useState(null);
  const [haveTourism, setHaveTourism] = useState(null);
  const [haveZdrav, setHaveZdrav] = useState(null);

  const changeInputValue = useCallback(
    value => {
      setInputValue(value);
    },
    []
  );

  return (
    <SheetsContext.Provider
      value={{
        changeInputValue,
        inputValue,
        setShowFoundBox,
        showFoundBox,
        setNoData,
        noData,
        haveZdrav,
        setHaveZdrav,
        haveEducation,
        setHaveEducation,
        haveTourism,
        setHaveTourism
      }}
    >
      <div
        className={`${styles.citySheetWrapper} ${
          showSheets && !showPanel ? styles.activeSheets : ''
        } ${showFoundBox && styles.activeSheetsWithHeight}`}
      >
        <FindCitySheet />
        <FoundCitySheet />
      </div>
    </SheetsContext.Provider>
  );
};
