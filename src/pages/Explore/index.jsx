import styles from "./explore.module.css";
import { useState, useEffect, useContext } from "react";
import Header from "../../components/layoult/Header";
import ContainerProjects from "../../components/layoult/ContainerProjects";
import ProjectCardExplore from "../../components/cards/ProjectCardExplore";
import img_project from "../../assets/img_projeto.png";
import img_profile from "../../assets/perfil.png";
import Input from "../../components/form/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Explore() {
  let navigate = useNavigate();
  const { loggedUser } = useContext(UserContext);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const BASE_URL = "https://hackaton-orange-app-backend.onrender.com";

  const getProjects = async () => {
    const endPoint = `${BASE_URL}/projects/all`;
    await axios
      .get(endPoint, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        const allProjects = resp.data;
        const projectsUser = loggedUser.projects;
        let filteredProjects = allProjects.filter(
          (project) => !projectsUser.includes(project)
        );
        setVisibleProjects(filteredProjects);
      })
      .catch((err) => {
        // const { status } = err.response;
        // if (status === 401 || status === 403) {
        // coloca notification em login
        // navigate("/login");
        console.error(err);
        // }
        // coloca notification de erro aqui em response
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const filterProjectsByTag = (e) => {
    const word = e.target.value.toLowerCase();

    const updateProjects = currentProjects.filter((project) => {
      const tagsProject = project.tags.map((tag) => tag.toLowerCase());
      return tagsProject.some((tag) => tag.includes(word));
    });

    setVisibleProjects(updateProjects);
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
          {currentProjects.length > 0 ? (
            visibleProjects.map((project) => {
              return (
                <ProjectCardExplore
                  name={project.user.name}
                  imgBackground={img_project}
                  imgUser={project.user.photo || img_profile}
                  tags={project.tags}
                  title={project.title}
                  link={project.link}
                  description={project.description}
                />
              );
            })
          ) : (
            <h3>Sem Projetos de outros usuários, no momento..</h3>
          )}
        </ContainerProjects>
      </section>
    </div>
  );
}
