import styles from "./inputtag.module.css";

export default function InputTag({ handleOnChange }) {
  return (
    <input
      type="text"
      name="tag"
      placeholder="Buscar tags"
      onChange={handleOnChange}
      className={styles.tag_input}
    />
  );
}
