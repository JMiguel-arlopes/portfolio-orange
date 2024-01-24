import styles from "./cardprofile.module.css";
import img_profile from "../../assets/perfil.png";

export default function CardProfile({ toggleModal, img, name, nationality }) {
  return (
    <div className={styles.card_profile}>
      <div className={styles.content_img_profile}>
        <img src={img ? img : img_profile} alt="profile picture" />
      </div>
      <div className={styles.content_information_profile}>
        <div>
          <h2>Camila Soares</h2>
          <h4>Brasil</h4>
        </div>
        <button onClick={toggleModal}>Adicionar Projeto</button>
      </div>
    </div>
  );
}
