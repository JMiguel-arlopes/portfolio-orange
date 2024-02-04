import styles from "./viewProject.module.css";
import { useContext } from "react";
import MiniatureProfile from "../../layoult/MiniatureProfile";
import Tag from "../../layoult/Tag";
import ContainerModal from "../ContainerModal";
import { IoClose } from "react-icons/io5";

import img_bg from "../../../assets/img_projeto.png";

export default function ViewProject({
  name,
  title,
  tags = [],
  link,
  description,
  imgBackground,
  imgUserhandleOnClick,
  handleOnClick,
}) {
  const outModal = "outmodal";

  const disabledModal = (e) => {
    if (e.target.id === outModal) {
      handleOnClick();
    }
  };

  return (
    <ContainerModal id={outModal} handleOnCLick={disabledModal}>
      <div className={styles.modal_view_project}>
        <div className={styles.close} onClick={handleOnClick}>
          <IoClose size={24} />
        </div>
        <div className={styles.row_information}>
          <MiniatureProfile name={name} />
          <h2>{title}</h2>
          <div className={styles.tags}>
            {tags.map((tag, index) => {
              return <Tag text={tag} key={index} />;
            })}
          </div>
        </div>
        <div className={styles.image_project}>
          <img src={imgBackground || img_bg} alt="image project" />
        </div>
        <div className={styles.general_description}>
          <p>{description}</p>
          <h5>Download</h5>
          <a href={link}>{link}</a>
        </div>
      </div>
    </ContainerModal>
  );
}
