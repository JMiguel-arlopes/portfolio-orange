import { useState } from "react";
import Collections from "../../../assets/collections.svg";
import styles from "./inputImage.module.css";

export default function InputImage({ handleUpload, dataImage }) {
  const [selectedFile, setSelectedFile] = useState(dataImage);

  const toggleDisplay = selectedFile ? { display: "none" } : { display: "block" };

  const handleChanges = (e) => {
    setSelectedFile(e)
    handleUpload(e);
  }

  const style = {
    backgroundImage: selectedFile ? `url(${URL.createObjectURL(dataImage)})` : "",
  };

  return (
    <div className={styles.image}>
      <p>Selecione o conteúdo que você deseja fazer upload</p>
      <label htmlFor="uploadImg">
        <div
          className={`${styles.uploudImage} ${selectedFile ? styles.withImage : ""
            }`}
          style={style}
        >
          <img src={Collections} style={toggleDisplay} />
          <h2 style={toggleDisplay}>
            Compartilhe seu talento com milhares de pessoas
          </h2>
          <input
            type="file"
            id="uploadImg"
            name="uploadImg"
            onChange={handleChanges}
          />
        </div>
      </label>
    </div>
  );
}
