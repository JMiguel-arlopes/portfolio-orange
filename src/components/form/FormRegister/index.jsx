import styles from "./formregister.module.css";
import InputsEmailPassword from "../InputsEmailPassword";
import Submit from "../Submit";
import FormRowUsername from "../FormRowUsername";

export default function FormRegister() {
  return (
    <div className={styles.container_form_register}>
      <FormRowUsername />
      <InputsEmailPassword />
      <Submit textSubmit="cadastrar" />
    </div>
  );
}