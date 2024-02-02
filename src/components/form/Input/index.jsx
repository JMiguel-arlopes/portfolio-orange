import styles from "./input.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Input({
  text,
  name,
  type,
  handleOnChange,
  value,
  required = true,
  icon = false,
  isPassword = false,
  toggleVisible,
}) {
  return (
    <div className={styles.input_container}>
      <label htmlFor={name} className={value != "" ? styles.up : ""}>
        {text}
      </label>
      <input
        required={required}
        type={type}
        id={name}
        name={name}
        onChange={handleOnChange}
        value={value}
      />
      {icon && (
        <div className={styles.eye} onClick={toggleVisible}>
          {!isPassword ? <FaEye size={16} /> : <FaEyeSlash size={18} />}
        </div>
      )}
    </div>
  );
}
