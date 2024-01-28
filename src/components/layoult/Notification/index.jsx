import styles from "./notification.module.css";
import check from "../../../assets/CheckCircleOutlined.svg";

export default function Notification({ status, message }) {
  return (
    <div className={`${styles.notification} ${styles[status]}`}>
      <img src={check} alt="check" />
      <p>{message}</p>
    </div>
  );
}
