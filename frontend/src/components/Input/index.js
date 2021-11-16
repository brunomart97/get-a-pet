import styles from './styles.module.css';

function Input({
  text,
  type,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple
}) {
  return(
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple ? { multiple } : '')}
      />
    </div>
  )
}

export default Input;