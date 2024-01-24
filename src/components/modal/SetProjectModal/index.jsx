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
        <h1>Adicionar projeto</h1>

        <div className={styles.container}>
          <div className={styles.image}>
            <p>Selecione o conteúdo que você deseja fazer upload</p>
            <button><input type="file" />Compartilhe seu talento com milhares de pessoas</button>
          </div>

          <div className={styles.form}>
            <span>FORMULARIO AQUI</span>
          </div>  
        </div>

        <a className={styles.visualizar}>Visualizar publicação</a>

        <div className={styles.buttons}>
          <button className={styles.salvar}>Salvar</button>
          <button className={styles.cancelar}>Cancelar</button>
        </div>
      </div>
    </section>
  );
}
