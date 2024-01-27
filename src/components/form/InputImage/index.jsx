import styles from "./inputImage.module.css";
import Collections from "../../../assets/collections.svg";

export default function InputImage() {
  return (
    <div className={styles.image}>
      <p>Selecione o conteúdo que você deseja fazer upload</p>
      <label htmlFor="upload">
        <div className={styles.uploudImage}>
          <img src={Collections} />
          <h2>Compartilhe seu talento com milhares de pessoas</h2>
          <input type="file" id="upload" name="upload" />
        </div>
      </label>
    </div>
  );
}
