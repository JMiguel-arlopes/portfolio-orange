import styles from "./setProjectModal.module.css";
import Collections from "../../../assets/collections.svg"
import FormNewProject from "../../form/FormNewProject"

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
            <div class={styles.uploudImage} >
                <img src={Collections} />
                <label for="upload">Compartilhe seu talento com milhares de pessoas</label>
                <input type="file" id="upload" name="upload" />
            </div>
          </div>

          <div className={styles.form}>
              <FormNewProject/>
          </div>  
        </div>

        <a className={styles.visualizar}>Visualizar publicação</a>

        <div className={styles.buttons}>
          <button className={styles.salvar}>Salvar</button>
          <button 
          id={outModal}
          onClick={disabledModal}
          className={styles.cancelar}>Cancelar</button>
          
        </div>
      </div>
    </section>
  );
}
