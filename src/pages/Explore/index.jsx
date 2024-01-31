import styles from "./explore.module.css";
import { useState, useEffect } from "react";
import Header from "../../components/layoult/Header";
import ContainerProjects from "../../components/layoult/ContainerProjects";
import ProjectCardExplore from "../../components/cards/ProjectCardExplore";
import img_project from "../../assets/img_projeto.png";
import img_profile from "../../assets/perfil.png";
import Input from "../../components/form/Input";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Explore() {
  const { id } = useParams();
  const url = `http://localhost:8080/users`;

  const [allUsers, setAllUsers] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);

  useEffect(() => {
    const dataUser = async () => {
      await axios
        .get(url)
        .then((response) => {
          const users = response.data;
          const otherUsers = users.filter((user) => user.id !== id);

          const projects = otherUsers
            .map((user) => user.projects)
            .flat(Infinity);

          setAllUsers(otherUsers);
          setCurrentProjects(projects);
          setVisibleProjects(projects);
        })
        .catch((err) => console.error(err));
    };

    dataUser();
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
      <Header id={id} />
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
              const user = allUsers.find((u) =>
                u.projects.some((p) => p === project)
              );

              return (
                <ProjectCardExplore
                  name={user.firstName + " " + user.lastName}
                  imgBackground={img_project}
                  imgUser={img_profile}
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
