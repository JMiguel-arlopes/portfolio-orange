import styles from "./deleteModal.module.css";
import ContainerModal from "../ContainerModal";

export default function DeleteModal({ cancel, handleDelete }) {
  const outModal = "outmodal";

  const disabledModal = (e) => {
    if (e.target.id === outModal) {
      cancel();
    }
  };

  return (
    <ContainerModal handleOnCLick={disabledModal} id={outModal}>
      <section className={styles.container_delete_modal}>
        <h2>Deseja Excluir?</h2>
        <p>Se você prosseguir irá excluir o projeto do seu portfólio</p>
        <div className={styles.row_btns}>
          <button onClick={handleDelete}>Excluir</button>
          <button onClick={cancel}>Cancelar</button>
        </div>
      </section>
    </ContainerModal>
  );
}
