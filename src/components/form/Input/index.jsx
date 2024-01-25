import { useState } from "react";
import styles from "./input.module.css";

export default function Input({ text, name, type, handleOnChange, value }) {
  const [isFocus, setFocus] = useState(false);

  const handleInputFocus = () => {
    setFocus(true);
  };

  return (
    <div className={styles.input_container}>
      <label htmlFor={name} className={isFocus ? styles.up : ""}>
        {text}
      </label>
      <input
        required="true"
        type={type}
        id={name}
        name={name}
        onChange={handleOnChange}
        value={value}
        onFocus={handleInputFocus}
      />
    </div>
  );
}
