import styles from "./editAndDelete.module.css";
import { FaPencilAlt, FaRegEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

export default function EditAndDelete({ handleEdit, handleDelete, view }) {
  return (
    <div className={styles.container_edit_delete}>
      <span className={styles.triangle} />
      <div onClick={handleEdit}>
        <FaPencilAlt />
        <h2>Editar</h2>
      </div>
      <div onClick={handleDelete}>
        <FaTrash />
        <h2>Excluir</h2>
      </div>
      <div onClick={view}>
        <FaRegEye />
        <h2>Visualizar</h2>
      </div>
    </div>
  );
}
