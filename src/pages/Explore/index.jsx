import styles from "./explore.module.css";
import { useState } from "react";
import Header from "../../components/layoult/Header";
import InputTag from "../../components/form/InputTag";
import FirstProjectCard from "../../components/cards/FirstProjectCard";
import SetProjectModal from "../../components/modal/SetProjectModal";
import ContainerProjects from "../../components/layoult/ContainerProjects";
import ProjectCard from "../../components/cards/ProjectCard";

import db from "../../db.json";
import img_project from "../../assets/img_projeto.png";
import img_profile from "../../assets/perfil.png";

export default function Descobrir() {
  const [modalAddProject, setModalAddProject] = useState(false);

  const changeTextTag = (e) => {
    console.log(e.target.value);
  };

  const toggleAddProjectModal = () => {
    setModalAddProject(!modalAddProject);
  };

  const currentUser = db.users[0];
  const projectsDone = currentUser.projects;

  return (
    <div>
      <Header />
      <section className={styles.container_home}>
        <div className={styles.text}>
          <h1>
            Junte-se à comunidade de inovação, inspiração e descobertas,
            transformando experiências em conexões inesquecíveis
          </h1>
        </div>

        <InputTag handleOnChange={changeTextTag} />
        <ContainerProjects>
          {projectsDone.length > 0 ? (
            projectsDone.map((project) => {
              return (
                <ProjectCard
                  name={currentUser.name}
                  imgBackground={img_project}
                  imgUser={img_profile}
                  tags={project.tags}
                />
              );
            })
          ) : (
            <FirstProjectCard toggleModal={toggleAddProjectModal} />
          )}
        </ContainerProjects>
      </section>
      {modalAddProject && (
        <SetProjectModal toggleModal={toggleAddProjectModal} />
      )}
    </div>
  );
}
