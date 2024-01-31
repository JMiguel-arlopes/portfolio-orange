import styles from "./home.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import CardProfile from "../../components/cards/CardProfile";
import Header from "../../components/layoult/Header";
import FirstProjectCard from "../../components/cards/FirstProjectCard";
import SetProjectModal from "../../components/modal/SetProjectModal";
import ContainerProjects from "../../components/layoult/ContainerProjects";
import ProjectCardHome from "../../components/cards/ProjectCardHome";
import Input from "../../components/form/Input";

import img_project from "../../assets/img_projeto.png";
import img_profile from "../../assets/perfil.png";

export default function Home() {
  const { id } = useParams();
  const url = `http://localhost:8080/users/${id}`;

  const [currentUser, setCurrentUser] = useState({});
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [projectsDone, setProjectsDone] = useState([]);
  const [modalAddProject, setModalAddProject] = useState(false);

  useEffect(() => {
    const dataUser = async () => {
      await axios
        .get(url)
        .then((response) => {
          const user = response.data;
          setCurrentUser(user);
          setProjectsDone(user.projects);
          setVisibleProjects(user.projects);
        })
        .catch((err) => console.error(err));
    };

    dataUser();
  }, [id]);

  const filterProjectsByTag = (e) => {
    const word = e.target.value.toLowerCase();

    const updateProjects = projectsDone.filter((project) => {
      const tagsProject = project.tags.map((tag) => tag.toLowerCase());
      return tagsProject.some((tag) => tag.includes(word));
    });

    setVisibleProjects(updateProjects);
  };

  const toggleAddProjectModal = () => {
    setModalAddProject(!modalAddProject);
  };

  const addProject = async (project) => {
    const result = currentUser;
    const newProject = { ...project };
    newProject.tags = newProject.tags.split(/[,\s]+/);
    newProject.id = uuidv4();

    result.projects = [...result.projects, newProject];

    await axios
      .patch(url, result)
      .then((resp) => {
        setCurrentUser(resp.data);
        setVisibleProjects(resp.data.projects);
      })
      .catch((err) => console.error(err));
  };

  const editProject = async (project) => {
    const copyUser = { ...currentUser };
    const newProject = { ...project };
    newProject.tags = newProject.tags.split(/[,\s]+/);

    copyUser.projects = copyUser.projects.filter(
      (projectFiltered) => projectFiltered.id !== newProject.id
    );

    copyUser.projects.unshift(newProject);

    await axios
      .patch(url, copyUser)
      .then((resp) => {
        setCurrentUser(resp.data);
        setVisibleProjects(resp.data.projects);
      })
      .catch((err) => console.error(err));
  };

  const deleteProject = async (project) => {
    const copyUser = { ...currentUser };

    copyUser.projects = copyUser.projects.filter((projectFiltered) => {
      return projectFiltered.id !== project.id;
    });

    await axios
      .patch(url, copyUser)
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
          {projectsDone.length > 0 ? (
            visibleProjects.map((project) => {
              return (
                <ProjectCardHome
                  dataProject={project}
                  id={project.id}
                  name={currentUser.firstName + " " + currentUser.lastName}
                  imgBackground={img_project}
                  imgUser={img_profile}
                  title={project.title}
                  tags={project.tags}
                  link={project.link}
                  description={project.description}
                  handleEdit={editProject}
                  handleDelete={deleteProject}
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
