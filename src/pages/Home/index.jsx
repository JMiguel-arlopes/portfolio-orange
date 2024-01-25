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
  const currentUser = db.users[0];
  const projectsDone = currentUser.projects;
  const [projectsUser, setProjectsUser] = useState(projectsDone);
  const [modalAddProject, setModalAddProject] = useState(false);

  const filterProjectsByTag = (e) => {
    const word = e.target.value.toLowerCase();

    const updateProjects = projectsDone.filter((project) => {
      const tagsProject = project.tags.map((tag) => tag.toLowerCase());
      return tagsProject.some((tag) => tag.includes(word));
    });

    setProjectsUser(updateProjects);
  };

  const toggleAddProjectModal = () => {
    setModalAddProject(!modalAddProject);
  };

  return (
    <>
      <Header />
      <section className={styles.container_home}>
        <div className={styles.content_profile}>
          <CardProfile
            name={currentUser.name}
            toggleModal={toggleAddProjectModal}
          />
        </div>
        <h3>Meus Projetos</h3>
        <InputTag handleOnChange={filterProjectsByTag} />
        <ContainerProjects>
          {projectsDone.length > 0 ? (
            projectsUser.map((project) => {
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
    </>
  );
}
