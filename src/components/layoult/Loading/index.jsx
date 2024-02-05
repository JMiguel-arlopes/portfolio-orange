import ContainerModal from "../../modal/ContainerModal";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <ContainerModal>
      <span className={styles.loader}></span>
    </ContainerModal>
  );
}
