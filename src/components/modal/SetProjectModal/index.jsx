import styles from "./setProjectModal.module.css";
import Collections from "../../../assets/collections.svg";
import FormNewProject from "../../form/FormNewProject";
import { useState } from "react";

export default function SetProjectModal({ toggleModal }) {
  const outModal = "outmodal";
  const [formData, setFormData] = useState({});

  const disabledModal = (e) => {
    if (e.target.id === outModal) {
      toggleModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: [value] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    toggleModal();
  };

  return (
    <section
      className={styles.container_set_project_modal}
      id={outModal}
      onClick={disabledModal}
    >
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h1>Adicionar projeto</h1>

        <div className={styles.container}>
          <div className={styles.image}>
            <p>Selecione o conteúdo que você deseja fazer upload</p>
            <div class={styles.uploudImage}>
              <img src={Collections} />
              <label for="upload">
                Compartilhe seu talento com milhares de pessoas
              </label>
              <input type="file" id="upload" name="upload" />
            </div>
          </div>

          <div className={styles.form}>
            <FormNewProject handleChange={handleChange} formData={formData} />
          </div>
        </div>

        <a className={styles.visualizar}>Visualizar publicação</a>

        <div className={styles.buttons}>
          <input type="submit" className={styles.salvar} value="salvar" />
          <button
            id={outModal}
            onClick={disabledModal}
            className={styles.cancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
