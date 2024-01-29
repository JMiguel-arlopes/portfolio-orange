import styles from "./home.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CardProfile from "../../components/cards/CardProfile";
import Header from "../../components/layoult/Header";
import FirstProjectCard from "../../components/cards/FirstProjectCard";
import SetProjectModal from "../../components/modal/SetProjectModal";
import ContainerProjects from "../../components/layoult/ContainerProjects";
import ProjectCard from "../../components/cards/ProjectCard";
import axios from "axios";

// import db from "../../db.json";
import img_project from "../../assets/img_projeto.png";
import img_profile from "../../assets/perfil.png";
import Input from "../../components/form/Input";

export default function Home() {
  const { id } = useParams();
  const url = `http://localhost:8080/users/${id}`;

  const [currentUser, setCurrentUser] = useState({});
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [modalAddProject, setModalAddProject] = useState(false);

  useEffect(() => {
    const dataUser = async () => {
      await axios
        .get(url)
        .then((response) => {
          const user = response.data;
          setCurrentUser(user);
          setVisibleProjects(user.projects);
        })
        .catch((err) => console.error(err));
    };

    dataUser();
  }, [id]);

  const filterProjectsByTag = (e) => {
    const word = e.target.value.toLowerCase();

    const updateProjects = visibleProjects.filter((project) => {
      const tagsProject = project.tags.map((tag) => tag.toLowerCase());
      return tagsProject.some((tag) => tag.includes(word));
    });

    setVisibleProjects(updateProjects);
  };

  const toggleAddProjectModal = () => {
    setModalAddProject(!modalAddProject);
  };

  const addProject = async (newProject) => {
    const result = currentUser;
    result.projects = [...result.projects, newProject];

    await axios
      .patch(url, result)
      .then((resp) => {
        setCurrentUser(resp.data);
        setVisibleProjects(resp.data.projects);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Header />
      <section className={styles.container_home}>
        <div className={styles.content_profile}>
          <CardProfile
            name={currentUser.firstName + " " + currentUser.lastName}
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
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project) => {
              return (
                <ProjectCard
                  name={currentUser.firstName + " " + currentUser.lastName}
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
        <SetProjectModal
          toggleModal={toggleAddProjectModal}
          handleSubmit={addProject}
        />
      )}
    </>
  );
}
