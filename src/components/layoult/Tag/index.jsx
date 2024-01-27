import styles from "./tag.module.css";

export default function Tag({ text }) {
  return <p className={styles.tag}>{text}</p>;
}
