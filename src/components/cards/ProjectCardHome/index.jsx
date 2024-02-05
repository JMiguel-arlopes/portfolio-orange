import axios from "axios";
import { useEffect, useState } from "react";
import img_project from "../../../assets/img_projeto.png";
import Mode from "../../layoult/Mode";
import Tag from "../../layoult/Tag";
import DeleteModal from "../../modal/DeleteModal";
import SetProjectModal from "../../modal/SetProjectModal";
import ViewProject from "../../modal/ViewProject";
import styles from "./projectCard.module.css";

export default function ProjectCardHome({
  dataProject,
  name,
  imgBackground,
  imgUser,
  title,
  tags,
  link,
  description,
  handleEdit,
  handleDelete,
}) {
  const [viewProject, setViewProject] = useState(false);
  const [isEditProject, setEditProject] = useState(false);
  const [isDeleteProject, setDeleteProject] = useState(false);
  const [imgData, setImgData] = useState(false);

  function toggleViewProject() {
    setViewProject(!viewProject);
  }

  function toggleEditProject() {
    setEditProject(!isEditProject);
  }

  function toggleDeleteProject() {
    setDeleteProject(!isDeleteProject);
  }

  function deleteProject() {
    handleDelete(dataProject);
    toggleDeleteProject();
  }

  const DownloadImage = async () => {
    const token = localStorage.getItem("token");

    if (imgBackground === null || imgBackground == undefined) {
      setImgData(img_project);
      return;
    }

    if (imgBackground.length === 0) {
      setImgData(img_project);
      return;
    }

    await axios
      .get(
        "https://hackaton-orange-app-backend.onrender.com/image/" +
          `${imgBackground}`,
        {
          headers: {
            Authorization: `${token}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        if (response) {
          const file = new Blob([response.data], { type: "image/png" });
          var image = URL.createObjectURL(file);
          setImgData(image);
          return;
        }
      })
      .catch((err) => {
        setImgData(img_project);
        return;
      });
  };

  useEffect(() => {
    DownloadImage();
  }, [imgBackground]);

  return (
    <>
      <div className={styles.card_project}>
        <Mode
          view={toggleViewProject}
          handleEdit={toggleEditProject}
          handleDelete={toggleDeleteProject}
        />
        <img src={imgData} alt="Background card" />
        <div className={styles.row_information_project}>
          <div>
            <img src={imgUser} alt="image User" />
            <h5>{name}</h5>
          </div>
          <div>
            {tags.map((item, index) => {
              return <Tag key={index} text={item} />;
            })}
          </div>
        </div>
      </div>

      {viewProject && (
        <ViewProject
          name={name}
          title={title}
          tags={tags}
          link={link}
          description={description}
          imgBackground={imgData}
          imgUser={imgUser}
          handleOnClick={toggleViewProject}
        />
      )}

      {isEditProject && (
        <SetProjectModal
          imageData={imgData}
          toggleModal={toggleEditProject}
          handleSubmit={handleEdit}
          initialData={dataProject}
          modalTitle="Editar Projeto"
        />
      )}

      {isDeleteProject && (
        <DeleteModal
          cancel={toggleDeleteProject}
          handleDelete={deleteProject}
        />
      )}
    </>
  );
}
