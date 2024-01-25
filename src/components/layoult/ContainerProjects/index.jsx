import styles from "./containerProjects.module.css";

export default function ContainerProjects({ children }) {
  return <div className={styles.container}>{children}</div>;
}
