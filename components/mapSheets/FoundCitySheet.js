import styles from '/styles/map/Map.module.css';
import { ShowMoreButton } from '../officePage/ShowMoreButton';
import { useContext, useState } from 'react';
import { InputContext } from '../../pages/map';
import { CompoundComponent } from './MenuAccordion';
import { CSSTransition } from 'react-transition-group';

export const FoundCitySheet = ({ onClick }) => {
  const [more, setMore] = useState(null);
  const inputValue = useContext(InputContext);

  return (
    <div className={styles.foundCityBox}>
      <button className={styles.searchButton} onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 7.30435C0 3.27027 3.27027 0 7.30435 0C11.3384 0 14.6087 3.27027 14.6087 7.30435C14.6087 9.13361 13.9363 10.8058 12.8251 12.0873L15.8472 15.1093C16.0509 15.3131 16.0509 15.6434 15.8472 15.8472C15.6434 16.0509 15.3131 16.0509 15.1093 15.8472L12.0873 12.8251C10.8058 13.9363 9.13361 14.6087 7.30435 14.6087C3.27027 14.6087 0 11.3384 0 7.30435ZM7.30435 1.04348C3.84657 1.04348 1.04348 3.84657 1.04348 7.30435C1.04348 10.7621 3.84657 13.5652 7.30435 13.5652C10.7621 13.5652 13.5652 10.7621 13.5652 7.30435C13.5652 3.84657 10.7621 1.04348 7.30435 1.04348Z"
            fill="white"
          />
        </svg>
      </button>
      <h3>г. {inputValue}</h3>
      <p>Северо-западный федеральный округ, Мурманская область</p>
      <div>
        <p>
          <span>Население: </span>262 553
        </p>
        <p>
          <span>Площадь: </span>262 553
        </p>
      </div>
      {more ? (
        <>
          <CompoundComponent />
          <ShowMoreButton
            text={'Скрыть'}
            onClick={() => setMore(!more)}
            svgStatus={more}
          />
        </>
      ) : (
        <ShowMoreButton
          text={'Подробнее'}
          onClick={() => setMore(!more)}
          svgStatus={more}
        />
      )}
    </div>
  );
};
