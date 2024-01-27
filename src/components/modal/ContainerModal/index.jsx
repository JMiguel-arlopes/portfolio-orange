import styles from "./containerModal.module.css";

export default function ContainerModal({ children, handleOnCLick, id }) {
  return (
    <section
      className={styles.container_set_project_modal}
      id={id}
      onClick={handleOnCLick}
    >
      {children}
    </section>
  );
}
