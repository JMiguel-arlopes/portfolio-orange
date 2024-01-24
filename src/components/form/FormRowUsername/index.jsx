import Input from "../Input";
import styles from "./formrowusername.module.css";

export default function FormRowUsername({ handleOnChange, user }) {
  return (
    <div className={styles.row_username}>
      <Input
        text="First name"
        type="text"
        placeholder="Letícia"
        name="firstName"
        handleOnChange={handleOnChange}
        value={user.firstName ? user.firstName : ""}
      />
      <Input
        text="Last name"
        type="text"
        placeholder="Silva"
        name="lastName"
        handleOnChange={handleOnChange}
        value={user.lastName ? user.lastName : ""}
      />
    </div>
  );
}
