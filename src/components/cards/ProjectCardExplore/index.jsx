import axios from "axios";
import { useEffect, useState } from "react";
import img_project from "../../../assets/img_projeto.png";
import Tag from "../../layoult/Tag";
import ViewProject from "../../modal/ViewProject";
import styles from "../ProjectCardHome/projectCard.module.css";

export default function ProjectCardExplore({
  name,
  imgBackground,
  imgUser,
  title,
  tags,
  link,
  description,
}) {
  const [viewProject, setViewProject] = useState(false);
  const [imgData, setImgData] = useState(false);

  function toggleViewProject() {
    setViewProject(!viewProject);
  }

  const DownloadImage = async () => {
    const token = localStorage.getItem("token");

    if (imgBackground === null || imgBackground == undefined) {
      setImgData(img_project);
      return;
    }

    if (imgBackground.length === 0) {
      setImgData(img_project);
      return;
    }

    await axios
      .get(
        "https://hackaton-orange-app-backend.onrender.com/image/" +
        `${imgBackground}`,
        {
          headers: {
            Authorization: `${token}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        if (response) {
          const file = new Blob([response.data], { type: "image/png" });
          var image = URL.createObjectURL(file);
          setImgData(image);
          return;
        }
      })
      .catch((err) => {
        setImgData(img_project);
        return;
      });
  };

  useEffect(() => {
    DownloadImage();
  }, [imgBackground]);


  return (
    <>
      <div className={styles.card_project} onClick={toggleViewProject}>
        <img src={imgData} alt="Background card" />
        <div className={styles.row_information_project}>
          <div>
            <img src={imgUser} alt="image User" />
            <h5>{name}</h5>
          </div>
          <div>
            {tags.map((item, index) => {
              return <Tag key={index} text={item} />;
            })}
          </div>
        </div>
      </div>

      {viewProject && (
        <ViewProject
          name={name}
          title={title}
          tags={tags}
          link={link}
          description={description}
          imgBackground={imgData}
          imgUser={imgUser}
          handleOnClick={toggleViewProject}
        />
      )}
    </>
  );
}
