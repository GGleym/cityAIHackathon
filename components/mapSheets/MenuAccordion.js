import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState
} from 'react';
import styles from '/styles/map/Map.module.css';
import { ToggleButton } from '../toggle/ToggleButton';
import { CSSTransition } from 'react-transition-group';
import {
  ACTIONS_TOGGLE,
  TOGGLE_INITIAL,
  toggleReducer
} from '../../functions/toggleReducer/toggleReducer';
import {MapContext} from "../../pages";

const MenuContext = React.createContext();

const MenuAccordion = ({ children }) => {
  const [activeGroup, setActiveGroup] = useState(undefined);
  const [show, setShow] = useState(false);
  const [state, dispatch] = useReducer(toggleReducer, TOGGLE_INITIAL);
  const {changeLayers} = useContext(MapContext)

  const switchGroup = useCallback(title => {
    setActiveGroup(activeTitle => {
      return activeTitle === title ? undefined : title;
    });
  }, []);


  changeLayers(state)

  return (
    <MenuContext.Provider
      value={{
        activeGroup,
        switchGroup,
        show,
        setShow,
        handleToggleChange,
        state
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

MenuAccordion.Group = function MenuGroup({ children, title }) {
  const { activeGroup, switchGroup } = useContext(MenuContext);

  return (
    <div className={styles.accordionGroup}>
      <button
        onClick={() => {
          switchGroup(title);
        }}
      >
        <span>{title}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={activeGroup === title && styles.showClosed}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.66225 6.95393C4.41817 7.19801 4.41817 7.59374 4.66225 7.83782L9.87058 13.0461C10.1147 13.2902 10.5104 13.2902 10.7545 13.0461L15.9628 7.83782C16.2069 7.59374 16.2069 7.19801 15.9628 6.95393C15.7187 6.70985 15.323 6.70985 15.0789 6.95393L10.3125 11.7203L5.54613 6.95393C5.30205 6.70985 4.90632 6.70985 4.66225 6.95393Z"
            fill="#111111"
          />
        </svg>
      </button>

      <CSSTransition
        in={activeGroup === title}
        timeout={300}
        classNames={'group'}
        unmountOnExit
      >
        <div>{children}</div>
      </CSSTransition>
    </div>
  );
};

MenuAccordion.Item = function MenuItem({ title, id, name }) {
  const { handleToggleChange, state } = useContext(MenuContext);

  return (
    <span className={styles.itemBox}>
      <p>{title}</p>
      <ToggleButton
        name={name}
        title={title}
        id={id}
        handleToggleChange={e => {
          handleToggleChange(e);
        }}
        checked={state[name]}
      />
    </span>
  );
};

export const CompoundComponent = () => {
  return (
    <MenuAccordion>
      <MenuAccordion.Group title={'Социальная инфраструктура'}>
        <MenuAccordion.Item title={'Промышленные зоны'} id={'promZones'} name={"promZones"} />
        <MenuAccordion.Item title={'Жилые зоны'} id={'livingZones'} name={"livingZones"}/>
        <MenuAccordion.Item title={'Места озеленения'} id={'greenZones'} name={"greenZones"}/>
        <MenuAccordion.Item title={'Объекты инфраструктуры'} id={'objects'} name={"objects"}/>
        <MenuAccordion.Item
          title={'Ожидаемые результаты мастер-плана'}
          id={'resultsOfPlan'}
          name={"resultsOfPlan"}
        />
      </MenuAccordion.Group>
      <MenuAccordion.Group title={'Загруженность дорог'}>
        <MenuAccordion.Item title={'Загруженность дорог'} id={'workload'} name={"workload"}/>
      </MenuAccordion.Group>
      <MenuAccordion.Group title={'Транспортная доступность'}>
        <MenuAccordion.Item
          title={'Доступность социальных объектов'}
          id={'accessibilitySocial'}
          name={"accessibilitySocial"}
        />
      </MenuAccordion.Group>
      <MenuAccordion.Group title={'Сведения о населении'}>
        <MenuAccordion.Item title={'Проживающее население'} id={'population'} name={"population"} />
      </MenuAccordion.Group>
      <MenuAccordion.Group title={'Торговые точки'}>
        <MenuAccordion.Item title={'Доступность торговых точек'} id={'shops'} name={"shops"} />
      </MenuAccordion.Group>
      <MenuAccordion.Group title={'Возраст застроек'}>
        <MenuAccordion.Item title={'Возраст застроек'} id={'ageOfBuildings'} name={"ageOfBuildings"}/>
      </MenuAccordion.Group>
      <MenuAccordion.Group title={'Ценообразование застроек'}>
        <MenuAccordion.Item
          title={'Цены объектов недвижимости'}
          id={'prices'}
          name={"prices"}
        />
        <MenuAccordion.Item
          title={'Тепловая карта распределения цен'}
          id={'heatMapOfPrices'}
          name={"heatMapOfPrices"}
        />
      </MenuAccordion.Group>
      <MenuAccordion.Group title={'Освещенность'}>
        <MenuAccordion.Item title={'Освещенность улиц'} id={'lights'} name={"lights"} />
      </MenuAccordion.Group>
    </MenuAccordion>
  );
};
