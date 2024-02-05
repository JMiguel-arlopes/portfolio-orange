import styles from "./miniatureProfile.module.css";
import img_profile from "../../../assets/perfil.png";

export default function MiniatureProfile({ name }) {
  return (
    <div className={styles.container_miniature_profile}>
      <img src={img_profile} alt="image profile" />
      <div className={styles.information_text}>
        <h3>{name}</h3>
        <span>12/03</span>
      </div>
    </div>
  );
}
