import styles from "./setProjectModal.module.css";

export default function SetProjectModal({ toggleModal }) {
  const outModal = "outmodal";

  const disabledModal = (e) => {
    if (e.target.id === outModal) {
      toggleModal();
    }
  };

  return (
    <section
      className={styles.container_set_project_modal}
      id={outModal}
      onClick={disabledModal}
    >
      <div className={styles.modal}>
        <h1>Model para Adicionar Novo Projeto</h1>
      </div>
    </section>
  );
}
