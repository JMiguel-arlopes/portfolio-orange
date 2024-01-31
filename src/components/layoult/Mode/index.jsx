import styles from "./mode.module.css";
import mode from "../../../assets/mode.svg";
import EditAndDelete from "../../layoult/EditAndDelete";
import { useState } from "react";

export default function Mode({ handleEdit, handleDelete, view }) {
  const [isVisible, setVisible] = useState(false);

  const toggleMode = () => {
    setVisible(!isVisible);
  };

  return (
    <div className={styles.mode} onClick={toggleMode}>
      <img src={mode} alt="modo" />
      {isVisible && (
        <div className={styles.container_modes}>
          <EditAndDelete
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            view={view}
          />
        </div>
      )}
    </div>
  );
}
