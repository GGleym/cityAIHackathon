import styles from '/styles/map/Map.module.css';
import { FindCitySheet } from '../../components/mapSheets/FindCitySheet';
import { FoundCitySheet } from '../../components/mapSheets/FoundCitySheet';
import React, { useState } from 'react';
import {CSSTransition} from "react-transition-group";

export const InputContext = React.createContext('');

const Map = () => {
  const [showNext, setShowNext] = useState(null);
  const [inputValue, setInputValue] = useState(null)

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.citySheetWrapper}>
          <InputContext.Provider value={inputValue}>
              {showNext ? (
                  <FoundCitySheet onClick={() => setShowNext(!showNext)} />
              ) : (
                  <FindCitySheet onClick={() => setShowNext(!showNext)} inputValue={setInputValue}/>
              )}
          </InputContext.Provider>
      </div>
    </div>
  );
};

export default Map