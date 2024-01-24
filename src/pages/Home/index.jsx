import styles from "./home.module.css";
import { useState } from "react";

import CardProfile from "../../components/CardProfile";
import Header from "../../components/Header";
import InputTag from "../../components/InputTag";
import FirstProjectCard from "../../components/FirstProjectCard";
import SetProjectModal from "../../components/modal/SetProjectModal";
import ContainerProjects from "../../components/ContainerProjects";
import ProjectCard from "../../components/ProjectCard";

import db from "../../db.json";
import img_project from "../../assets/img_projeto.png";
import img_profile from "../../assets/perfil.png";

export default function Home() {
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
        <div className={styles.content_profile}>
          <CardProfile toggleModal={toggleAddProjectModal} />
        </div>
        <h3>Meus Projetos</h3>
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
