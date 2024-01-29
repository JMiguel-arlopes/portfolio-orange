import styles from "./notification.module.css";
import check from "../../../assets/CheckCircleOutlined.svg";

export default function Notification({ status, message, toggleNotification }) {
  setTimeout(() => {
    toggleNotification();
  }, 3200);

  return (
    <div className={`${styles.notification} ${styles[status]}`}>
      <img src={check} alt="check" />
      <p>{message}</p>
    </div>
  );
}
