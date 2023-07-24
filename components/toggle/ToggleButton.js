import styles from '/styles/Toggle.module.css';

export const ToggleButton = ({ id, handleToggleChange, name, checked }) => {

  return (
    <>
      <input
        type="checkbox"
        id={id}
        className={styles.toggleCheckbox}
        onChange={handleToggleChange}
        name={name}
      />
      <label htmlFor={id}></label>
    </>
  );
};