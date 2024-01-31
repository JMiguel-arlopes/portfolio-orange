import styles from "./setProjectModal.module.css";
import FormNewProject from "../../form/FormNewProject";
import { useState } from "react";
import InputImage from "../../form/InputImage";
import ContainerModal from "../ContainerModal";
import ModalSucess from "../ModalSucess";
import ViewProject from "../ViewProject";

export default function SetProjectModal({
  toggleModal,
  handleSubmit,
  initialData,
}) {
  const outModal = "outmodal";
  const [formData, setFormData] = useState(initialData || {});
  const [sucess, setSucess] = useState(false);
  const [isForm, setIsForm] = useState(true);
  const [view, setView] = useState(false);

  const activeSucess = () => {
    setIsForm(false);
    setView(false);
    setSucess(true);
  };

  const activeForm = () => {
    setView(false);
    setSucess(false);
    setIsForm(true);
  };

  const activeView = () => {
    setIsForm(false);
    setSucess(false);
    setView(true);
  };

  const disabledModal = (e) => {
    if (e.target.id === outModal) {
      toggleModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createProject = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    activeSucess();
  };

  return (
    <>
      {isForm && (
        <ContainerModal id={outModal} handleOnCLick={disabledModal}>
          <form className={styles.modal} onSubmit={createProject}>
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

            <button className={styles.visualizar} onClick={activeView}>
              Visualizar publicação
            </button>

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
      )}
      {view && <ViewProject formData={formData} handleOnClick={activeForm} />}
      {sucess && (
        <ModalSucess
          message="Projeto criado com sucesso!"
          handleOnClick={toggleModal}
        />
      )}
    </>
  );
}
