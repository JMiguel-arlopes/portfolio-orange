import Input from "../Input";
import styles from "./formrowusername.module.css";

export default function FormRowUsername({ handleOnChange, user }) {

  return (
    <div className={styles.row_username}>
      <Input
        text="Nome"
        type="text"
        name="firstName"
        handleOnChange={handleOnChange}
        value={user.firstName ? user.firstName : ""}
        maxLength={32}
      />
      <Input
        text="Sobrenome"
        type="text"
        name="lastName"
        handleOnChange={handleOnChange}
        value={user.lastName ? user.lastName : ""}
        maxLength={32}
      />
    </div>
  );
}
