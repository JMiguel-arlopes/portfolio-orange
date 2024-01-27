import styles from "./home.module.css";
import { useState } from "react";

import CardProfile from "../../components/cards/CardProfile";
import Header from "../../components/layoult/Header";
import FirstProjectCard from "../../components/cards/FirstProjectCard";
import SetProjectModal from "../../components/modal/SetProjectModal";
import ContainerProjects from "../../components/layoult/ContainerProjects";
import ProjectCard from "../../components/cards/ProjectCard";

import db from "../../db.json";
import img_project from "../../assets/img_projeto.png";
import img_profile from "../../assets/perfil.png";
import Input from "../../components/form/Input";

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
        <Input
          text="Buscar tags"
          name="tag"
          type="text"
          handleOnChange={filterProjectsByTag}
          required={false}
        />
        <ContainerProjects>
          {projectsDone.length > 0 ? (
            projectsUser.map((project) => {
              return (
                <ProjectCard
                  name={currentUser.name}
                  imgBackground={img_project}
                  imgUser={img_profile}
                  title={project.title}
                  tags={project.tags}
                  link={project.link}
                  description={project.description}
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
