import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styles from "./home.module.css";

import CardProfile from "../../components/cards/CardProfile";
import FirstProjectCard from "../../components/cards/FirstProjectCard";
import ProjectCardHome from "../../components/cards/ProjectCardHome";
import Input from "../../components/form/Input";
import ContainerProjects from "../../components/layoult/ContainerProjects";
import Header from "../../components/layoult/Header";
import ModalSucess from "../../components/modal/ModalSucess";
import SetProjectModal from "../../components/modal/SetProjectModal";

import { useNavigate } from "react-router-dom";
import img_profile from "../../assets/perfil.png";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/layoult/Loading";

export default function Home() {
  let navigate = useNavigate();

  const { setLoggedUser } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState({});
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [projectsDone, setProjectsDone] = useState([]);
  const [modalAddProject, setModalAddProject] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSucessMessage, setSucessMessage] = useState("");

  const BASE_URL = "https://hackaton-orange-app-backend.onrender.com";
  const dataUser = async () => {
    const endPoint = `${BASE_URL}/api/users`;
    setLoading(true);
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
        console.error(err);
        const { status } = err.response;
        if (status === 401 || status === 403) {
          navigate("/login");
        }
      })
      .finally(() => {
        setLoading(false);
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

  const addProject = (project) => {
    const endPoint = `${BASE_URL}/projects/create`;

    const newProject = { ...project };
    if (typeof newProject.tags === "string") {
      newProject.tags = newProject.tags.split(/[,\s;\/-]+/);
    }
    setLoading(true);

    axios
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
        if (status === 401) {
          navigate("/login");
        }
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editProject = async (project) => {
    const endPoint = `${BASE_URL}/projects/update/${project.id}`;
    const newProject = { ...project };

    if (typeof newProject.tags === "string") {
      newProject.tags = newProject.tags.split(/[,\s;\/-]+/);
    }
    setLoading(true);
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
        if (status === 401) {
          navigate("/login");
        }
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteProject = async (project) => {
    const endPoint = `${BASE_URL}/projects/delete/${project.id}`;
    setLoading(true);
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
        if (status === 401 || status === 403) {
          navigate("/login");
        }
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
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
                  imgBackground={project.photo}
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
      {isLoading && <Loading />}
      {isSucessMessage && (
        <ModalSucess
          message={isSucessMessage}
          handleOnClick={disabledModalSucess}
        />
      )}
    </>
  );
}