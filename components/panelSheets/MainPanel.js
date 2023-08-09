import styles from '../../styles/panel/Panel.module.css';
// import Select from 'react-select';
import { PanelSheet } from './PanelSheet';
import {useContext, useState} from 'react';
import { NavbarContext } from '../layouts/Main';
import cities from '../../public/geoJSONs/areas.geojson';
import {CiCircleAlert} from "react-icons/ci";

export const MainPanel = () => {
  const { showPanel } = useContext(NavbarContext);
  const [inputValue, setInputValue] = useState("")

  let setOfCities = new Set();

  for (let key of Object.keys(cities)) {
    setOfCities.add(key);
  }

  const panelSelectStyles = {
    control: baseStyles => ({
      ...baseStyles,
      borderColor: '#D9C7B1',
      borderRadius: '1.375rem',
      fontSize: '1rem',
      padding: '0 2rem'
    }),
    menu: baseStyles => ({
      ...baseStyles,
      position: 'absolute'
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
    indicatorSeparator: baseStyles => ({
      ...baseStyles,
      display: 'none'
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      transition: 'all .2s ease-in-out',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none'
    })
  };

  const options = [
    {
      value: 'Архангельск',
      label: 'Архангельск'
    },
    {
      value: 'Мурманск',
      label: 'Мурманск'
    }
  ];

  return (
    <div className={`${styles.mainPanel} ${showPanel && styles.activePanel}`}>
      <div className={styles.upperPanel}>
        <h1>Обзорная панель</h1>
        <input type="text" placeholder={"Введите город"} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      </div>
      <div className={styles.gridPanel}>
        {[...setOfCities].filter((item) => item.toLowerCase().includes(inputValue.toLowerCase())).map(
          (item, index) =>
            index < 30 && (
              <PanelSheet
                key={index}
                cityName={item}
                numberOfPeople={cities[item]['number_of_people']}
                area={(cities[item]['area'] * 10000).toFixed(2)}
              />
            )
        )}
      </div>
      {
          [...setOfCities].filter((item) => item.toLowerCase().includes(inputValue.toLowerCase())).length === 0 && (
              <div className={styles.wrongCityAlert}>
                <CiCircleAlert size={30}/>
                <h2>Город не найден</h2>
              </div>
          )
      }
    </div>
  );
};