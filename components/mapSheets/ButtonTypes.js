import styles from '../../styles/map/Map.module.css';

export const ButtonTypes = ({ children, name, isActive, onClick }) => {

  return (
    <button
      className={`${styles.btnTypeOfMap} ${isActive && styles.pickedBtnType}`}
      onClick={onClick}
      name={name}
    >
      {children}
    </button>
  );
};