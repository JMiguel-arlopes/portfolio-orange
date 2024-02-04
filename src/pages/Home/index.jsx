import styles from "./home.module.css";
import { useState, useEffect, useContext } from "react";
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
import ModalSucess from "../../components/modal/ModalSucess";

import img_project from "../../assets/img_projeto.png";
import img_profile from "../../assets/perfil.png";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/UserContext";

export default function Home() {
  // const { id } = useParams();
  // const url = `http://localhost:8080/users/${id}`;

  // useContext
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState({});
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [projectsDone, setProjectsDone] = useState([]);
  const [modalAddProject, setModalAddProject] = useState(false);
  const [isSucessMessage, setSucessMessage] = useState("");

  // requisições
  const BASE_URL = "https://hackaton-orange-app-backend.onrender.com";
  const decoded = jwtDecode(localStorage.getItem("token"));
  const email = decoded.sub;

  const dataUser = async () => {
    const endPoint = `${BASE_URL}/api/users/all`;

    await axios
      .get(endPoint, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        const users = resp.data;
        users.forEach((user) => {
          if (user.email == email) {
            console.log(user);
            setLoggedUser(user);
            setCurrentUser(user);
            setProjectsDone(user.projects);
            setVisibleProjects(user.projects);
          }
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    dataUser();
  }, [BASE_URL]);

  const filterProjectsByTag = (e) => {
    const word = e.target.value.toLowerCase();

    const updateProjects = projectsDone.filter((project) => {
      const tagsProject = project.tags.map((tag) => tag.toLowerCase());
      return tagsProject.some((tag) => tag.includes(word));
    });

    setVisibleProjects(updateProjects);
  };

  const disabledModalSucess = () => {
    setSucessMessage("");
  };

  const toggleAddProjectModal = () => {
    setModalAddProject(!modalAddProject);
  };

  const addProject = async (project) => {
    // código antigo:
    // newProject.id = uuidv4();
    // const result = currentUser;
    // result.projects = [...result.projects, newProject];

    const endPoint = `${BASE_URL}/api/projects`;

    const newProject = { ...project };
    newProject.tags = newProject.tags.split(/[,\s;\/-]+/);
    console.log(newProject);

    // await axios
    //   .post(endPoint, newProject)
    //   .then((resp) => {
    //     setVisibleProjects(resp.data);
    //     setSucessMessage("Projeto adicionado com sucesso!");
    //   })
    //   .catch((err) => console.error(err));
  };

  const editProject = async (project) => {
    //   const copyUser = { ...currentUser };
    //   const newProject = { ...project };
    //   newProject.tags = newProject.tags.split(/[,\s]+/);
    //   copyUser.projects = copyUser.projects.filter(
    //     (projectFiltered) => projectFiltered.id !== newProject.id
    //   );
    //   copyUser.projects.unshift(newProject);
    //   await axios
    //     .patch(url, copyUser)
    //     .then((resp) => {
    //       setCurrentUser(resp.data);
    //       setVisibleProjects(resp.data.projects);
    //       setSucessMessage("Projeto editado com sucesso!");
    //     })
    //     .catch((err) => console.error(err));
  };

  const deleteProject = async (project) => {
    // código antigo:
    // copyUser.projects = copyUser.projects.filter((projectFiltered) => {
    //   return projectFiltered.id !== project.id;
    // });
    const endPoint = `${BASE_URL}`;

    const copyUser = { ...project };

    // await axios
    //   .delete(endPoint, copyUser)
    //   .then((resp) => {
    //     setCurrentUser(resp.data);
    //     setVisibleProjects(resp.data.projects);
    //     setSucessMessage("Projeto deletado com sucesso!");
    //   })
    //   .catch((err) => console.error(err));
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
            visibleProjects.map((project) => {
              return (
                <ProjectCardHome
                  key={project.id}
                  dataProject={project}
                  name={currentUser.name}
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
          modalTitle="Adicionar Projeto"
          messageSucess="Projeto adicionado com sucesso!"
        />
      )}
      {isSucessMessage && (
        <ModalSucess
          message={isSucessMessage}
          handleOnClick={disabledModalSucess}
        />
      )}
    </>
  );
}
