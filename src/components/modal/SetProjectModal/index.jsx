import styles from "./setProjectModal.module.css";
import FormNewProject from "../../form/FormNewProject";
import { useState, useContext } from "react";
import InputImage from "../../form/InputImage";
import ContainerModal from "../ContainerModal";
import ViewProject from "../ViewProject";
import { UserContext } from "../../../context/UserContext";
export default function SetProjectModal({
  toggleModal,
  handleSubmit,
  initialData,
  modalTitle,
}) {
  const { loggedUser } = useContext(UserContext);
  const outModal = "outmodal";
  const [formData, setFormData] = useState(initialData || {});
  const [view, setView] = useState(false);
  const [ImageToUpload, setImageToUpload] = useState("");

  console.log(initialData);
  const toggleView = () => {
    setView(!view);
  };

  const activeView = () => {
    if (typeof formData.tags === "string") {
      formData.tags = formData.tags.split(/[,\s;\/-]+/);
    }
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
  console.log(formData);

  const handleUpload = (e) => {
    const { name, files } = e.target;
    setImageToUpload(files[0]);
    setFormData({ ...formData, [name]: files[0] });
  };

  const createProject = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    toggleModal();
  };

  return (
    <>
      {!view ? (
        <ContainerModal id={outModal} handleOnCLick={disabledModal}>
          <form className={styles.modal} onSubmit={createProject}>
            <h1>{modalTitle}</h1>

            <div className={styles.container}>
              <InputImage
                handleUpload={handleUpload}
                dataImage={ImageToUpload}
              />

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
      ) : (
        <ViewProject
          name={loggedUser.name}
          title={formData.title}
          link={formData.link}
          tags={formData.tags}
          description={formData.description}
          handleOnClick={toggleView}
        />
      )}
    </>
  );
}
