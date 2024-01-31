import { useState } from "react";
import styles from "../ProjectCardHome/projectCard.module.css";
import ViewProject from "../../modal/ViewProject";
import Tag from "../../layoult/Tag";

export default function ProjectCardExplore({
  name,
  imgBackground,
  imgUser,
  title,
  tags,
  link,
  description,
}) {
  const [viewProject, setViewProject] = useState(false);

  function toggleViewProject() {
    setViewProject(!viewProject);
  }

  return (
    <>
      <div className={styles.card_project} onClick={toggleViewProject}>
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
    </>
  );
}
