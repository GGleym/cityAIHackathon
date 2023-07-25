import styles from '/styles/map/Map.module.css';
import toggleStyles from "/styles/Toggle.module.css"
import {
  useContext,
  useReducer,
  useState
} from 'react';
import { MapContext } from '../../pages';
import { SheetsContext } from './CompoundSheets';
import { ToggleButton } from '../toggle/ToggleButton';
import { ButtonTypes } from './ButtonTypes';
import {
  ACTIONS_TOGGLE,
  TOGGLE_INITIAL,
  toggleReducer
} from '../../functions/toggleReducer/toggleReducer';

export const FoundCitySheet = () => {
  const {
    objToggles,
    cityInfo,
    changeLayers,
    setTypeOfMap,
    typeOfMap,
    setNumberOfLayer
  } = useContext(MapContext);
  const {
    showFoundBox,
    haveTourism,
    haveZdrav,
    haveEducation,
    inputValue,
    noData
  } = useContext(SheetsContext);
  const [state, dispatch] = useReducer(toggleReducer, TOGGLE_INITIAL);
  const [activeButton, setActiveButton] = useState(1);

  const handleToggleChange = e => {
    if (typeOfMap === 4) {
      dispatch({
        type: ACTIONS_TOGGLE.CHANGE_TOGGLE_HEX,
        payload: {
          id: e.target.id,
          value: e.target.checked
        }
      });
    } else {
      dispatch({
        type: ACTIONS_TOGGLE.CHANGE_TOGGLE,
        payload: {
          name: e.target.name,
          value: e.target.checked
        }
      });
    }
  };

  switch (true) {
    case state['hex_zdrav'] && state['hex_education'] && state['hex_tourism']: {
      setNumberOfLayer(1);
      break;
    }
    case state['hex_tourism'] && state['hex_education']: {
      setNumberOfLayer(2);
      break;
    }
    case state['hex_tourism'] && state['hex_zdrav']: {
      setNumberOfLayer(3);
      break;
    }
    case state['hex_zdrav'] && state['hex_education']: {
      setNumberOfLayer(4);
      break;
    }
    case state['hex_tourism']: {
      setNumberOfLayer(5);
      break;
    }
    case state['hex_education']: {
      setNumberOfLayer(6);
      break;
    }
    case state['hex_zdrav']: {
      setNumberOfLayer(7);
      break;
    }
    default:
      setNumberOfLayer(0);
  }
  changeLayers(state);

  return (
    <div
      className={`${styles.foundCityBox} ${
        showFoundBox && styles.showFoundCityBox
      }`}
    >
      <section className={styles.foundCityBoxHeader}>
        <h3>г. {inputValue}</h3>
        <p>{cityInfo && cityInfo['region'][0]}</p>
        <p>{cityInfo['region'][1] && cityInfo['region'][1]}</p>
        <div className={styles.infoOfCity}>
          <p>
            <span>Население: </span>
            {cityInfo['population']}{' '}
            <span style={{ fontWeight: 'lighter' }}>ч.</span>
          </p>
          <p>
            <span>Площадь: </span>
            {(cityInfo['area'] * 10000).toFixed(0)}
            км<sup>2</sup>
          </p>
        </div>
      </section>
      <section>
        <h3>Вид карты</h3>
        <div className={styles.typeOfMapButtons}>
          <ButtonTypes
            name={'classic'}
            isActive={activeButton === 1}
            onClick={() => {
              setActiveButton(1);
              setTypeOfMap(1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill={'black'}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9998 1.33349C24.1 1.3335 30.6665 7.89999 30.6665 16.0002C30.6665 24.1003 24.1 30.6668 15.9998 30.6668C7.89966 30.6668 1.33317 24.1003 1.33317 16.0002C1.33317 7.89998 7.89966 1.33349 15.9998 1.33349ZM28.6493 15.3335L22.3222 15.3335C22.1885 11.2844 20.8567 8.01304 19.5315 5.72834C19.0116 4.83183 18.4909 4.08414 18.0404 3.497C23.852 4.43822 28.3381 9.33361 28.6493 15.3335ZM22.2891 17.3335L28.5972 17.3335C28.0016 23.0264 23.6352 27.5972 18.0405 28.5033C18.4909 27.9162 19.0116 27.1685 19.5315 26.272C20.7831 24.114 22.0407 21.0759 22.2891 17.3335ZM20.2841 17.3335L11.7155 17.3335C11.9596 20.6392 13.076 23.3337 14.1982 25.2686C14.8326 26.3624 15.4658 27.2079 15.9365 27.7759L15.9998 27.8519L16.0631 27.7759C16.5339 27.2079 17.1671 26.3624 17.8015 25.2686C18.9237 23.3337 20.0401 20.6392 20.2841 17.3335ZM11.6787 15.3335L20.321 15.3335C20.1884 11.7224 18.9982 8.79514 17.8015 6.73178C17.1671 5.63796 16.5339 4.79249 16.0631 4.2244L15.9998 4.14848L15.9365 4.2244C15.4658 4.79249 14.8326 5.63796 14.1982 6.73178C13.0015 8.79514 11.8113 11.7224 11.6787 15.3335ZM9.7106 17.3335C9.95895 21.0759 11.2165 24.114 12.4681 26.272C12.9881 27.1685 13.5088 27.9162 13.9592 28.5033C8.36447 27.5972 3.99806 23.0264 3.40251 17.3335L9.7106 17.3335ZM3.35041 15.3335L9.6775 15.3335C9.81121 11.2844 11.143 8.01304 12.4681 5.72834C12.9881 4.83183 13.5088 4.08414 13.9592 3.497C8.1477 4.43822 3.66153 9.33361 3.35041 15.3335Z"
                fill={'black'}
              />
            </svg>
            <span>Классическая карта</span>
          </ButtonTypes>
          <ButtonTypes
            name={'transport'}
            isActive={activeButton === 2}
            onClick={() => {
              setActiveButton(2);
              setTypeOfMap(2);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.6665 6.33333C28.6665 3.9401 26.7264 2 24.3332 2C21.9399 2 19.9998 3.9401 19.9998 6.33333C19.9998 8.3847 21.4253 10.1031 23.3396 10.5522C23.3354 10.5898 23.3332 10.628 23.3332 10.6667L23.3332 13C23.3332 13.0003 23.3332 12.9997 23.3332 13C23.3327 14.2883 22.2882 15.3333 20.9998 15.3333L11.6665 15.3333C8.90508 15.3333 6.6665 17.5719 6.6665 20.3333L6.66651 21.4493C4.75537 21.9007 3.33317 23.6176 3.33317 25.6667C3.33317 28.0599 5.27327 30 7.66651 30C10.0597 30 11.9998 28.0599 11.9998 25.6667C11.9998 23.6176 10.5776 21.9007 8.66651 21.4493L8.6665 20.3333C8.6665 18.6765 10.0097 17.3333 11.6665 17.3333L20.9998 17.3333C21.8589 17.3333 22.6596 17.0833 23.3332 16.6521L23.3332 21.3333C23.3332 21.372 23.3354 21.4102 23.3396 21.4478C21.4253 21.8969 19.9998 23.6153 19.9998 25.6667C19.9998 28.0599 21.9399 30 24.3332 30C26.7264 30 28.6665 28.0599 28.6665 25.6667C28.6665 23.6153 27.2411 21.8969 25.3267 21.4478C25.331 21.4102 25.3332 21.372 25.3332 21.3333L25.3332 13.0011C25.3332 13.0015 25.3332 13.0007 25.3332 13.0011L25.3332 10.6667C25.3332 10.628 25.331 10.5898 25.3267 10.5522C27.2411 10.1031 28.6665 8.3847 28.6665 6.33333ZM24.3332 4C25.6218 4 26.6665 5.04467 26.6665 6.33333C26.6665 7.622 25.6218 8.66667 24.3332 8.66667C23.0445 8.66667 21.9998 7.622 21.9998 6.33333C21.9998 5.04467 23.0445 4 24.3332 4ZM24.3332 23.3333C25.6218 23.3333 26.6665 24.378 26.6665 25.6667C26.6665 26.9553 25.6218 28 24.3332 28C23.0445 28 21.9998 26.9553 21.9998 25.6667C21.9998 24.378 23.0445 23.3333 24.3332 23.3333ZM9.99984 25.6667C9.99984 24.378 8.95517 23.3333 7.66651 23.3333C6.37784 23.3333 5.33317 24.378 5.33317 25.6667C5.33317 26.9553 6.37784 28 7.66651 28C8.95517 28 9.99984 26.9553 9.99984 25.6667Z"
                fill="black"
              />
            </svg>
            <span>Транспортная доступность</span>
          </ButtonTypes>
          <ButtonTypes
            name={'ageOfBuildings'}
            isActive={activeButton === 3}
            onClick={() => {
              setActiveButton(3);
              setTypeOfMap(3);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M22.3333 16.0002C22.8856 16.0002 23.3333 16.4479 23.3333 17.0002C23.3333 17.5524 22.8856 18.0002 22.3333 18.0002L21.6667 18.0002C21.1144 18.0002 20.6667 17.5524 20.6667 17.0002C20.6667 16.4479 21.1144 16.0002 21.6667 16.0002L22.3333 16.0002Z"
                fill="#333333"
              />
              <path
                d="M23.3333 12.3335C23.3333 11.7812 22.8856 11.3335 22.3333 11.3335L21.6667 11.3335C21.1144 11.3335 20.6667 11.7812 20.6667 12.3335C20.6667 12.8858 21.1144 13.3335 21.6667 13.3335L22.3333 13.3335C22.8856 13.3335 23.3333 12.8858 23.3333 12.3335Z"
                fill="#333333"
              />
              <path
                d="M22.3333 6.66683C22.8856 6.66683 23.3333 7.11455 23.3333 7.66683C23.3333 8.21911 22.8856 8.66683 22.3333 8.66683L21.6667 8.66683C21.1144 8.66683 20.6667 8.21912 20.6667 7.66683C20.6667 7.11455 21.1144 6.66683 21.6667 6.66683L22.3333 6.66683Z"
                fill="#333333"
              />
              <path
                d="M18.6667 17.0002C18.6667 16.4479 18.219 16.0002 17.6667 16.0002L17 16.0002C16.4477 16.0002 16 16.4479 16 17.0002C16 17.5524 16.4477 18.0002 17 18.0002L17.6667 18.0002C18.219 18.0002 18.6667 17.5524 18.6667 17.0002Z"
                fill="#333333"
              />
              <path
                d="M17.6667 11.3335C18.219 11.3335 18.6667 11.7812 18.6667 12.3335C18.6667 12.8858 18.219 13.3335 17.6667 13.3335L17 13.3335C16.4477 13.3335 16 12.8858 16 12.3335C16 11.7812 16.4477 11.3335 17 11.3335L17.6667 11.3335Z"
                fill="#333333"
              />
              <path
                d="M18.6667 7.66683C18.6667 7.11455 18.219 6.66683 17.6667 6.66683L17 6.66683C16.4477 6.66683 16 7.11455 16 7.66683C16 8.21912 16.4477 8.66683 17 8.66683L17.6667 8.66683C18.219 8.66683 18.6667 8.21912 18.6667 7.66683Z"
                fill="#333333"
              />
              <path
                d="M13 16.0002C13.5523 16.0002 14 16.4479 14 17.0002C14 17.5524 13.5523 18.0002 13 18.0002L12.3333 18.0002C11.7811 18.0002 11.3333 17.5524 11.3333 17.0002C11.3333 16.4479 11.781 16.0002 12.3333 16.0002L13 16.0002Z"
                fill="#333333"
              />
              <path
                d="M14 12.3335C14 11.7812 13.5523 11.3335 13 11.3335L12.3333 11.3335C11.781 11.3335 11.3333 11.7812 11.3333 12.3335C11.3333 12.8858 11.781 13.3335 12.3333 13.3335L13 13.3335C13.5523 13.3335 14 12.8858 14 12.3335Z"
                fill="#333333"
              />
              <path
                d="M13 6.66683C13.5523 6.66683 14 7.11455 14 7.66683C14 8.21912 13.5523 8.66683 13 8.66683L12.3333 8.66683C11.781 8.66683 11.3333 8.21912 11.3333 7.66683C11.3333 7.11455 11.781 6.66683 12.3333 6.66683L13 6.66683Z"
                fill="#333333"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28 26.6668C28 28.1396 26.8061 29.3335 25.3333 29.3335L20.3333 29.3335C19.7811 29.3335 19.3333 28.8858 19.3333 28.3335L19.3333 25.3335L15.3333 25.3335L15.3333 28.3335C15.3333 28.8858 14.8856 29.3335 14.3333 29.3335L9.33334 29.3335C9.21032 29.3335 9.08924 29.3252 8.97065 29.309C8.89966 29.325 8.82582 29.3335 8.75 29.3335L3.33296 29.3335C1.8599 29.3335 0.666668 28.1393 0.666668 26.6668L0.666667 16.5001C0.666667 15.6608 1.06185 14.8704 1.73333 14.3668L3.06667 13.3668C3.50849 13.0354 4.13529 13.125 4.46667 13.5668C4.79804 14.0086 4.70849 14.6354 4.26667 14.9668L2.93333 15.9668C2.76546 16.0927 2.66667 16.2903 2.66667 16.5001L2.66667 26.6668C2.66667 27.0353 2.96506 27.3335 3.33296 27.3335L6.75067 27.3335C6.69583 27.1204 6.66667 26.897 6.66667 26.6668L6.66667 4.00016C6.66667 2.52741 7.86057 1.3335 9.33333 1.3335L25.3333 1.3335C26.8061 1.3335 28 2.5274 28 4.00016L28 26.6668ZM25.3333 27.3335C25.7015 27.3335 26 27.035 26 26.6668L26 4.00016C26 3.63197 25.7015 3.3335 25.3333 3.3335L9.33333 3.3335C8.96514 3.3335 8.66667 3.63198 8.66667 4.00016L8.66667 26.6668C8.66667 27.035 8.96515 27.3335 9.33334 27.3335L13.3333 27.3335L13.3333 24.3335C13.3333 23.7812 13.7811 23.3335 14.3333 23.3335L20.3333 23.3335C20.8856 23.3335 21.3333 23.7812 21.3333 24.3335L21.3333 27.3335L25.3333 27.3335Z"
                fill="#333333"
              />
            </svg>
            <span>Возраст застройки</span>
          </ButtonTypes>
          <ButtonTypes
            name={'hexes'}
            isActive={activeButton === 4}
            onClick={() => {
              setActiveButton(4);
              setTypeOfMap(4);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.5826 1.3335L16.7479 4.12482L16.7479 9.70746L21.5826 12.4988L26.4174 9.70746L26.4174 4.12482L21.5826 1.3335ZM10.4174 1.3335L5.58264 4.12482L5.58265 9.70747L10.4174 12.4988L15.2521 9.70746L15.2521 4.12482L10.4174 1.3335ZM2.01112e-06 13.4292L4.83471 10.6379L9.66942 13.4292L9.66942 19.0119L4.83471 21.8032L2.49917e-06 19.0119L2.01112e-06 13.4292ZM10.4174 19.9423L5.58265 22.7336L5.58265 28.3163L10.4174 31.1076L15.2521 28.3163L15.2521 22.7336L10.4174 19.9423ZM11.1653 13.4292L16 10.6379L20.8347 13.4292L20.8347 19.0119L16 21.8032L11.1653 19.0119L11.1653 13.4292ZM21.5826 19.9423L16.7479 22.7336L16.7479 28.3163L21.5826 31.1076L26.4174 28.3163L26.4174 22.7336L21.5826 19.9423ZM22.3306 13.4292L27.1653 10.6379L32 13.4292L32 19.0119L27.1653 21.8032L22.3306 19.0119L22.3306 13.4292Z"
                fill="#333333"
              />
            </svg>
            <span>Гексагональная карта</span>
          </ButtonTypes>
        </div>
      </section>
      <section className={styles.showOnMapSection}>
        <h3>Отобразить на карте</h3>
        {noData ? (
          <div className={styles.noDataBox}>
            <h1>У нас нет данных по выбранной Вами области</h1>
          </div>
        ) : (
          <>
            {haveZdrav && (
              <div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.73649 4C4.65746 4 2.5 5.88043 2.5 8.51351C2.5 11.6209 4.8236 14.4738 7.36118 16.6342C8.60701 17.6948 9.85656 18.5479 10.7965 19.1364C11.2656 19.4301 11.6557 19.6567 11.9269 19.8091C11.9523 19.8234 11.9767 19.837 12 19.85C12.0233 19.837 12.0477 19.8234 12.0731 19.8091C12.3443 19.6567 12.7344 19.4301 13.2035 19.1364C14.1434 18.5479 15.393 17.6948 16.6388 16.6342C19.1764 14.4738 21.5 11.6209 21.5 8.51351C21.5 5.88043 19.3425 4 17.2635 4C15.1581 4 13.4627 5.38899 12.7115 7.64258C12.6094 7.94883 12.3228 8.15541 12 8.15541C11.6772 8.15541 11.3906 7.94883 11.2885 7.64258C10.5373 5.38899 8.84185 4 6.73649 4ZM12 20.7027L12.3426 21.3699C12.1276 21.4803 11.8725 21.4803 11.6574 21.3699L12 20.7027ZM1 8.51351C1 5.052 3.82903 2.5 6.73649 2.5C9.02981 2.5 10.8808 3.72621 12 5.60482C13.1192 3.72621 14.9702 2.5 17.2635 2.5C20.171 2.5 23 5.052 23 8.51351C23 12.3318 20.1986 15.5735 17.6112 17.7763C16.2945 18.8973 14.9816 19.7929 13.9996 20.4077C13.5078 20.7157 13.0971 20.9544 12.8078 21.1169C12.6631 21.1982 12.5486 21.2605 12.4694 21.3029C12.4299 21.3241 12.3991 21.3404 12.3777 21.3516L12.3529 21.3646L12.3459 21.3682L12.3438 21.3693C12.3435 21.3694 12.3426 21.3699 12 20.7027C11.6574 21.3699 11.6576 21.37 11.6574 21.3699L11.6541 21.3682L11.6471 21.3646L11.6223 21.3516C11.6009 21.3404 11.5701 21.3241 11.5306 21.3029C11.4514 21.2605 11.3369 21.1982 11.1922 21.1169C10.9029 20.9544 10.4922 20.7157 10.0004 20.4077C9.01844 19.7929 7.70549 18.8973 6.38882 17.7763C3.80141 15.5735 1 12.3318 1 8.51351Z"
                      fill="black"
                    />
                  </svg>
                  Объекты здравоохранения
                </span>
                <ToggleButton
                  name={'objects_zdrav'}
                  id={'hex_zdrav'}
                  handleToggleChange={handleToggleChange}
                  checked={objToggles["hex_zdrav"] || objToggles['objects_zdrav']}
                  className={toggleStyles.zdrav}
                />
              </div>
            )}
            {haveTourism && (
              <div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.75 1C12.1642 1 12.5 1.33579 12.5 1.75V3.99999L19.032 4C19.4517 4 19.8575 4.15084 20.1752 4.42503L23.3624 7.17503C24.1715 7.87309 24.1715 9.12691 23.3624 9.82498L20.1752 12.575C19.8575 12.8492 19.4517 13 19.032 13L12.5 13V22.25C12.5 22.6642 12.1642 23 11.75 23C11.3358 23 11 22.6642 11 22.25V13L3.74999 12.9999C2.7835 12.9999 2 12.2164 2 11.2499V5.74998C2 4.78348 2.7835 3.99998 3.75 3.99998L11 3.99999V1.75C11 1.33579 11.3358 1 11.75 1ZM11.75 5.5L11.754 5.49999L19.032 5.5C19.092 5.5 19.1499 5.52155 19.1953 5.56072L22.3825 8.31072C22.4981 8.41044 22.4981 8.58956 22.3825 8.68928L19.1953 11.4393C19.1499 11.4785 19.092 11.5 19.032 11.5L3.75 11.4999C3.61193 11.4999 3.5 11.388 3.5 11.2499L3.5 5.74998C3.5 5.61191 3.61193 5.49998 3.75 5.49998L11.746 5.49999L11.75 5.5Z"
                      fill="#111111"
                    />
                  </svg>
                  Объекты туризма
                </span>
                <ToggleButton
                  name={'objects_tourism'}
                  id={'hex_tourism'}
                  handleToggleChange={handleToggleChange}
                  checked={objToggles["hex_tourism"] || objToggles['objects_tourism']}
                  className={toggleStyles.tourism}
                />
              </div>
            )}
            {haveEducation && (
              <div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.2917 2.05906C12.1052 1.98031 11.8948 1.98031 11.7083 2.05906L0.458271 6.80906C0.180526 6.92633 0 7.19851 0 7.5C0 7.80149 0.180526 8.07367 0.458271 8.19094L4.25 9.79189V13.5955C3.76381 13.7216 3.30237 13.9729 2.9228 14.3524C2.34402 14.9312 2 15.7627 2 16.7811V21.2811C2 21.5304 2.12795 21.7681 2.33509 21.9059C2.39421 21.9451 2.45249 21.9787 2.55517 22.0301C2.67876 22.0919 2.85216 22.1683 3.07529 22.2427C3.52261 22.3918 4.1651 22.5312 5 22.5312C5.83487 22.5312 6.47733 22.3919 6.92463 22.2428C7.14776 22.1684 7.32115 22.0921 7.44474 22.0303C7.54157 21.9819 7.59819 21.9487 7.65465 21.9128C7.86613 21.7752 8 21.5344 8 21.2813V16.7813C8 15.7629 7.65599 14.9313 7.07721 14.3525C6.69764 13.9729 6.2362 13.7216 5.75 13.5955V10.4252L11.7083 12.9409C11.8948 13.0197 12.1052 13.0197 12.2917 12.9409L17.5 10.7419V14.7441C17.4774 14.7696 17.4512 14.798 17.4213 14.8288C17.2597 14.9949 16.9876 15.2338 16.572 15.4791C15.7458 15.9667 14.3174 16.5 12 16.5C11.388 16.5 10.8384 16.4628 10.346 16.3992C9.93522 16.3462 9.55922 16.6362 9.50619 17.047C9.45317 17.4578 9.74321 17.8339 10.154 17.8869C10.7132 17.9591 11.3271 18 12 18C14.5576 18 16.2543 17.4083 17.3343 16.7709C17.8718 16.4537 18.2481 16.1301 18.4968 15.8744C18.6402 15.7268 18.7814 15.5683 18.8894 15.3921L18.89 15.3911C18.9619 15.2733 19 15.138 19 15V10.1085L23.5417 8.19094C23.8195 8.07367 24 7.80149 24 7.5C24 7.19851 23.8195 6.92633 23.5417 6.80906L12.2917 2.05906ZM4.99993 15C4.99992 15 4.99995 15 4.99993 15C4.62297 15 4.25546 15.1411 3.98345 15.4131C3.71848 15.6781 3.5 16.1121 3.5 16.7811V20.8027C3.7989 20.9079 4.29726 21.0312 5 21.0312C5.70271 21.0312 6.20108 20.908 6.5 20.8027V16.7813C6.5 16.1122 6.28151 15.6781 6.01654 15.4132C5.74451 15.1411 5.37691 15 4.99993 15ZM12 11.4359L2.67816 7.5L12 3.56411L21.3218 7.5L12 11.4359Z"
                      fill="black"
                    />
                  </svg>
                  Объекты образования
                </span>
                <ToggleButton
                  name={'objects_education'}
                  id={'hex_education'}
                  handleToggleChange={handleToggleChange}
                  checked={objToggles["hex_education"] || objToggles['objects_education']}
                  className={toggleStyles.education}
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};
