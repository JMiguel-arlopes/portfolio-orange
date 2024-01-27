import { useState } from "react";
import styles from "./projectCard.module.css";
import ViewProject from "../../modal/ViewProject";
import Tag from "../../layoult/Tag";

export default function ProjectCard({
  name,
  imgBackground,
  imgUser,
  title,
  tags,
  link,
  description,
}) {
  // você vai mudar para o Project fazer a requisição Get quando for clicado e pegar
  // os dados de Title, tags, link e description
  // por enquanto irá colocar aqui para conseguir fazer a tela
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
