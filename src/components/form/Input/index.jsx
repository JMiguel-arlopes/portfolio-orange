import styles from "./input.module.css";

export default function Input({
  text,
  name,
  type,
  placeholder,
  handleOnChange,
  value,
}) {
  return (
    <div className={styles.input_container}>
      <label htmlFor={name}>{text}</label>
      <input
        required="true"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}
