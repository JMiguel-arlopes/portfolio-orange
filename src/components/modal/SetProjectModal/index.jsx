import styles from "./setProjectModal.module.css";

import FormNewProject from "../../form/FormNewProject";
import { useState } from "react";
import InputImage from "../../form/InputImage";
import ContainerModal from "../ContainerModal";
import ModalSucess from "../ModalSucess";

export default function SetProjectModal({ toggleModal }) {
  const outModal = "outmodal";
  const [formData, setFormData] = useState({});
  const [sucess, setSucess] = useState(false);

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
    setSucess(true);
  };

  return (
    <>
      {!sucess ? (
        <ContainerModal id={outModal} handleOnCLick={disabledModal}>
          <form className={styles.modal} onSubmit={handleSubmit}>
            <h1>Adicionar projeto</h1>

            <div className={styles.container}>
              <InputImage />

              <div className={styles.form}>
                <FormNewProject
                  handleChange={handleChange}
                  formData={formData}
                />
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
        </ContainerModal>
      ) : (
        <ModalSucess
          message="Projeto adicionado com sucesso!"
          handleOnClick={toggleModal}
        />
      )}
    </>
  );
}
