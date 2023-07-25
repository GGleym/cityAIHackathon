import styles from '/styles/Toggle.module.css';

export const ToggleButton = ({ id, handleToggleChange, name, checked, className }) => {

  return (
    <>
      <input
        type="checkbox"
        id={id}
        className={`${styles.toggleCheckbox} ${className}`}
        onChange={handleToggleChange}
        name={name}
        checked={checked}
      />
      <label htmlFor={id}></label>
    </>
  );
};