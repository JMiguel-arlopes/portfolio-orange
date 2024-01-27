import ContainerModal from "../ContainerModal";
import styles from "./modalSucess.module.css";
import { FaCheck } from "react-icons/fa6";

export default function ModalSucess({ message, handleOnClick }) {
  return (
    <ContainerModal>
      <div className={styles.container_modal_sucess}>
        <p>{message}</p>
        <div className={styles.icon}>
          <FaCheck />
        </div>
        <button onClick={handleOnClick}>Voltar para Projetos</button>
      </div>
    </ContainerModal>
  );
}
