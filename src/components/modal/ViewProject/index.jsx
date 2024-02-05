import styles from "./viewProject.module.css";
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

  const openLink = () => {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      return link;
    } else {
      return "http://" + link;
    }
  };

  const disabledModal = (e) => {
    if (e.target.id === outModal) {
      handleOnClick();
    }
  };

  const finalLink = openLink();

  return (
    <ContainerModal
      id={outModal}
      handleOnCLick={disabledModal}
      bottomMobile={true}
    >
      <div className={styles.modal_view_project}>
        <div className={styles.close} onClick={handleOnClick}>
          <IoClose size={24} />
        </div>

        <div className={styles.column_information_image}>
          <div className={styles.row_information}>
            <MiniatureProfile name={name} />
            <h2 className={styles.visibleDesktop}>{title}</h2>
            <div className={styles.tags}>
              {tags.map((tag, index) => {
                return <Tag text={tag} key={index} />;
              })}
            </div>
          </div>
          <div className={styles.image_project}>
            <img src={imgBackground || img_bg} alt="image project" />
          </div>
          <h2 className={styles.visibleMobile}>{title}</h2>
        </div>

        <div className={styles.general_description}>
          <p>{description}</p>
          {link && (
            <>
              <h5>Download</h5>
              <a href={finalLink} target="_blank">
                {finalLink}
              </a>
            </>
          )}
        </div>
      </div>
    </ContainerModal>
  );
}
