import styles from '../../styles/Input.module.css';

export const InputType = props => {

  return (
    <div className={props.className}>
      <input
        id={props.id}
        type={props.type}
        required={props.required}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        maxLength={props.maxLength}
      />
      <label htmlFor={props.id} className={props.value && styles.inputFilled}>
        {props.placeholder}
      </label>
    </div>
  );
};