import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import FormNewProject from "../../form/FormNewProject";
import InputImage from "../../form/InputImage";
import ContainerModal from "../ContainerModal";
import ViewProject from "../ViewProject";
import styles from "./setProjectModal.module.css";
export default function SetProjectModal({
  imageData,
  toggleModal,
  handleSubmit,
  initialData,
  modalTitle,
}) {
  const { loggedUser } = useContext(UserContext);
  const outModal = "outmodal";
  const [formData, setFormData] = useState(initialData || {});
  const [view, setView] = useState(false);
  const [selectedFile, setSelectedFile] = useState(imageData);

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
    const imageName = selectedFile.name;
    setFormData({ ...formData, [name]: value, "photo": imageName });
  };
  console.log(formData);

  const handleUpload = (e) => {
    const { name, files } = e.target;
    // setImageToUpload(files[0]);
    setFormData({ ...formData, [name]: selectedFile });
  };

  const HandleFileChange = (e) => {
    const { name } = e.target
    setSelectedFile(e.target.files[0])
  }

  const createProject = (e) => {
    e.preventDefault();

    handleSubmit(formData);
    UploadImage()
    toggleModal();
  };

  const UploadImage = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(
        'https://hackaton-orange-app-backend.onrender.com/image',
        formData,
        {
          headers: {
            'Authorization': `${token}`
          }
        }
      );
      console.log('Resposta do servidor:', response.data);
      return response;
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      throw error;
    }
  }

  return (
    <>
      {!view ? (
        <ContainerModal id={outModal} handleOnCLick={disabledModal}>
          <form className={styles.modal} onSubmit={createProject}>
            <h1>{modalTitle}</h1>

            {/* <div className={styles.container}>
              <InputImage
                handleUpload={handleUpload}
                dataImage={ImageToUpload}
              /> */}

            <div className={styles.container}>
              <InputImage
                dataImage={selectedFile}
                handleUpload={HandleFileChange}
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
