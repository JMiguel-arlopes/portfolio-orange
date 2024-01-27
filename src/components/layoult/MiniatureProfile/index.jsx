import styles from "./miniatureProfile.module.css";
import img_profile from "../../../assets/perfil.png";

export default function MiniatureProfile() {
  return (
    <div className={styles.container_miniature_profile}>
      <img src={img_profile} alt="image profile" />
      <div className={styles.information_text}>
        <h3>Camila Soares</h3>
        <span>12/03</span>
      </div>
    </div>
  );
}
