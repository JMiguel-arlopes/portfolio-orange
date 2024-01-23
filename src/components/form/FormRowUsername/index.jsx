import Input from "../Input";
import styles from "./formrowusername.module.css";

export default function FormRowUsername() {
  return (
    <div className={styles.row_username}>
      <Input
        text="First name"
        type="text"
        placeholder="Letícia"
        name="firstName"
      />
      <Input text="Last name" type="text" placeholder="Silva" name="lastName" />
    </div>
  );
}
