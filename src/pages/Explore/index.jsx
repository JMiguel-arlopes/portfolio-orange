import styles from "./explore.module.css";
import { useState } from "react";
import Header from "../../components/layoult/Header";
import SetProjectModal from "../../components/modal/SetProjectModal";
import ContainerProjects from "../../components/layoult/ContainerProjects";
import ProjectCard from "../../components/cards/ProjectCardHome";

import db from "../../db.json";
import img_project from "../../assets/img_projeto.png";
import img_profile from "../../assets/perfil.png";
import Input from "../../components/form/Input";

export default function Explore() {
  const users = db.users;
  const projects = db.users.map((user) => user.projects).flat();

  const [modalAddProject, setModalAddProject] = useState(false);
  const [currentProjects, setCurrentProjects] = useState(projects);

  const filterProjectsByTag = (e) => {
    const word = e.target.value.toLowerCase();

    const updateProjects = projects.filter((project) => {
      const tagsProject = project.tags.map((tag) => tag.toLowerCase());
      return tagsProject.some((tag) => tag.includes(word));
    });

    setCurrentProjects(updateProjects);
  };

  const toggleAddProjectModal = () => {
    setModalAddProject(!modalAddProject);
  };

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

        <Input
          text="Buscar tags"
          name="tag"
          type="text"
          handleOnChange={filterProjectsByTag}
          required={false}
        />
        <ContainerProjects>
          {projects.length > 0 ? (
            currentProjects.map((project) => {
              const user = users.find((u) =>
                u.projects.some((p) => p === project)
              );

              return (
                <ProjectCard
                  name={user.name}
                  imgBackground={img_project}
                  imgUser={img_profile}
                  tags={project.tags}
                />
              );
            })
          ) : (
            <h3>Sem Projetos, no momento..</h3>
          )}
        </ContainerProjects>
      </section>
      {modalAddProject && (
        <SetProjectModal toggleModal={toggleAddProjectModal} />
      )}
    </div>
  );
}
