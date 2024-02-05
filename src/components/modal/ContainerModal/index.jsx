import styles from "./containerModal.module.css";

export default function ContainerModal({
  children,
  handleOnCLick,
  id,
  bottomMobile = false,
}) {
  return (
    <section
      className={`${styles.container_set_project_modal} ${
        bottomMobile ? styles.bottom : ""
      }`}
      id={id}
      onClick={handleOnCLick}
    >
      {children}
    </section>
  );
}
