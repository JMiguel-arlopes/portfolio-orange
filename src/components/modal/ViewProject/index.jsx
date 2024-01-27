import styles from "./viewProject.module.css";
import MiniatureProfile from "../../layoult/MiniatureProfile";
import Tag from "../../layoult/Tag";
import ContainerModal from "../ContainerModal";
import { IoClose } from "react-icons/io5";

import img_bg from "../../../assets/img_projeto.png";

export default function ViewProject({ handleOnClick }) {
  const outModal = "outmodal";

  const disabledModal = (e) => {
    if (e.target.id === outModal) {
      console.log(e.target);
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
          <MiniatureProfile />
          <h2>Ecommerce One Page</h2>
          <div className={styles.tags}>
            <Tag text="Tag1" />
            <Tag text="Tag2" />
            <Tag text="Tag3" />
          </div>
        </div>
        <div className={styles.image_project}>
          <img src={img_bg} alt="image project" />
        </div>
        <div className={styles.general_description}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima
            ullam temporibus autem odit inventore nihil, molestias illum eveniet
            illo nisi corporis? Distinctio numquam maiores minima placeat.
            Placeat voluptates laborum eveniet!
          </p>
          <h5>Download</h5>
          <a href="/">www.exemplo.com/kiplin</a>
        </div>
      </div>
    </ContainerModal>
  );
}
