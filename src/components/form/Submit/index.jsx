import styles from "./submit.module.css";

export default function Submit({ textSubmit, disabled = false }) {
  return (
    <input
      type="submit"
      value={!disabled ? textSubmit : "aguarde..."}
      className={styles.submit}
      disabled={disabled}
    />
  );
}
