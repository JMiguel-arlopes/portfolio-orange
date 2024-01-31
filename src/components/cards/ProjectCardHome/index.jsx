import { useState } from "react";
import styles from "./projectCard.module.css";
import ViewProject from "../../modal/ViewProject";
import Tag from "../../layoult/Tag";
import Mode from "../../layoult/Mode";
import SetProjectModal from "../../modal/SetProjectModal";

export default function ProjectCardHome({
  dataProject,
  id,
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

  function toggleViewProject() {
    setViewProject(!viewProject);
  }

  function toggleEditProject() {
    setEditProject(!isEditProject);
  }

  function toggleDeleteProject() {
    handleDelete(dataProject);
  }

  return (
    <>
      <div className={styles.card_project}>
        <Mode
          view={toggleViewProject}
          handleEdit={toggleEditProject}
          handleDelete={toggleDeleteProject}
        />
        <img src={imgBackground} alt="Background card" />
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
          imgBackground={imgBackground}
          imgUser={imgUser}
          handleOnClick={toggleViewProject}
        />
      )}

      {isEditProject && (
        <SetProjectModal
          toggleModal={toggleEditProject}
          handleSubmit={handleEdit}
          initialData={dataProject}
        />
      )}
    </>
  );
}
