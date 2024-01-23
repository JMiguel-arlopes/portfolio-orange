import styles from "./submit.module.css";

export default function Submit({ textSubmit }) {
  return <input type="submit" value={textSubmit} className={styles.submit} />;
}
