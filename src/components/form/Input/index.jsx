import styles from "./input.module.css";

export default function Input({ text, name, type, placeholder }) {
  return (
    <div className={styles.input_container}>
      <label htmlFor={name}>{text}</label>
      <input type={type} id={name} placeholder={placeholder} />
    </div>
  );
}
