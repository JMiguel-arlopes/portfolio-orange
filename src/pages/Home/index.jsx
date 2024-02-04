import styles from "./home.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

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
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  
  let navigate = useNavigate();

  const { setLoggedUser } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState({});
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [projectsDone, setProjectsDone] = useState([]);
  const [modalAddProject, setModalAddProject] = useState(false);
  const [isSucessMessage, setSucessMessage] = useState("");

  // requisições
  const BASE_URL = "https://hackaton-orange-app-backend.onrender.com";

  const dataUser = async () => {
    const endPoint = `${BASE_URL}/api/users`;

    await axios
      .get(endPoint, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        const user = resp.data;
        setLoggedUser(user);
        setCurrentUser(user);
        setProjectsDone(user.projects);
        setVisibleProjects(user.projects);
      })
      .catch((err) => {
        // usa o useContext para, caso dê erro, a pessoa receba notificação independente do componente onde esteja
        const { status } = err.response;
        if (status == 401 || status == 403) {
          navigate("/login");
        }
        console.error(err);
      });
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
    dataUser();
  };

  const toggleAddProjectModal = () => {
    setModalAddProject(!modalAddProject);
  };

  const addProject = async (project) => {
    const endPoint = `${BASE_URL}/projects/create`;

    const newProject = { ...project };
    newProject.tags = newProject.tags.split(/[,\s;\/-]+/);

    await axios
      .post(endPoint, newProject, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        setSucessMessage("Projeto adicionado com sucesso!");
      })
      .catch((err) => {
        const { status } = err.response;
        if (status == 401) {
          navigate("/login");
        }
        console.error(err);
      });
  };

  const editProject = async (project) => {
    const endPoint = `${BASE_URL}/projects/update/${project.id}`;
    const newProject = { ...project };

    if (typeof newProject.tags === "string") {
      newProject.tags = newProject.tags.split(/[,\s;\/-]+/);
    }

    await axios
      .put(endPoint, newProject, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        setSucessMessage("Projeto editado com sucesso!");
      })
      .catch((err) => {
        const { status } = err.response;
        if (status == 401) {
          navigate("/login");
        }
        console.error(err);
      });
  };

  const deleteProject = async (project) => {
    const endPoint = `${BASE_URL}/projects/delete/${project.id}`;

    await axios
      .delete(endPoint, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        console.log(resp);
        setSucessMessage("Projeto deletado com sucesso!");
      })
      .catch((err) => {
        const { status } = err.response;
        if (status == 401 || status == 403) {
          navigate("/login");
        }
        console.error(err);
      });
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
