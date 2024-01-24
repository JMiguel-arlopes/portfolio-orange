import styles from "./firstprojectcard.module.css";
import img_collections from "../../assets/collections.svg";

export default function FirstProjectCard({ toggleModal }) {
  return (
    <div className={styles.first_card_container} onClick={toggleModal}>
      <img src={img_collections} alt="collections" />
      <h3>Adicione seu primeiro projeto</h3>
      <p>Compartilhe seu talento com milhares de pessoas</p>
    </div>
  );
}
