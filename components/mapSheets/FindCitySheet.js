import styles from '/styles/map/Map.module.css';
import React, {
  useContext,
  useReducer,
  useState
} from 'react';
import { MapContext } from '../../pages';
import {
  cityReducer,
  CITY_INITIAL_STATE,
  ACTIONS_CITY
} from '../../functions/mapFunctions/cityReducer';
import { SheetsContext } from './CompoundSheets';
import {
  parseGeoJsons,
  processHexes
} from '../../functions/geoJsonFunctions/geoJSONParser';
import areasGeoJson from '../../public/geoJSONs/areas.geojson';
import AsyncSelect from 'react-select/async';
import { loadOptions } from '../../public/selectOptions';
import { parseObjects } from '../../functions/geoJsonFunctions/parseObjects';

export const FindCitySheet = () => {
  const [state, ] = useReducer(cityReducer, CITY_INITIAL_STATE);
  const { changeCity, changeObjects } = useContext(MapContext);
  const [selectValue, setSelectValue] = useState(null);
  const {
    changeInputValue,
    setShowFoundBox,
    setHaveEducation,
    setNoData,
    setHaveTourism,
    setHaveZdrav
  } = useContext(SheetsContext);

  const handleChange = async e => {
    const { bordersData, hexesData } = await parseGeoJsons(e.value);
    setNoData(true);
    const features = hexesData.features;

    for (const feature of features) {
      const { featuresToAdd } = processHexes(feature);
      if (featuresToAdd.includes('hex_education')) {
        setHaveEducation(true);
        setNoData(false);
      }
      if (featuresToAdd.includes('hex_tourism')) {
        setHaveTourism(true);
        setNoData(false);
      }
      if (featuresToAdd.includes('hex_zdrav')) {
        setHaveZdrav(true);
        setNoData(false);
      }
    }

    setShowFoundBox(true);
    changeInputValue(e.label);
    setSelectValue(true);

    const action = {
      type: ACTIONS_CITY.CHANGE_CITY,
      payload: {
        name: bordersData['name'],
        cityCoordinates:
          bordersData['features'][0]['geometry']['coordinates'][0][0],
        region: [bordersData['gicity'], bordersData['District']],
        population: areasGeoJson[e.label]['number_of_people'],
        boundaries: bordersData['features'][0]['geometry']['coordinates'],
        area: bordersData['area'],
        selectValueName: e.value
      }
    };
    changeCity(cityReducer(state, action));
    changeObjects(await parseObjects(e.value));
  };

  const selectStyles = {
    control: baseStyles => ({
      ...baseStyles,
      borderColor: '#D9C7B1',
      borderRadius: '1.375rem',
      fontSize: '1rem',
      padding: '0 2rem'
    }),
    menu: baseStyles => ({
      ...baseStyles,
      position: 'relative'
    }),
    option: (baseStyles, { isActive }) => ({
      ...baseStyles,
      borderRadius: '0.5rem',
      width: '100%',
      margin: '0 auto',
      fontSize: '1rem',
      backgroundColor: isActive ? '#D9C7B1' : 'transparent',
      color: 'black',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#D9C7B1',
        color: '#FFF'
      }
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      transition: 'all .2s ease-in-out',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none'
    })
  };

  return (
    <div className={`${styles.cityBoxWrapper}`}>
      <form className={styles.formOfFindBox}>
        {!selectValue && <p>Для анализа выберите город</p>}
        <div className={styles.inputSection}>
          <AsyncSelect
            instanceId={'findBoxSelect'}
            onChange={handleChange}
            placeholder={'Название Вашего города'}
            loadOptions={loadOptions}
            styles={selectStyles}
            theme={theme => ({
              ...theme,
              borderRadius: '1rem',
              colors: {
                ...theme.colors,
                primary25: '#D9c7B1',
                primary: '#D9c7B1'
              }
            })}
            noOptionsMessage={() => 'Такого города у нас нет :('}
            closeMenuOnScroll={true}
            loadingMessage={() => 'Поиск города...'}
          />
        </div>
      </form>
    </div>
  );
};
