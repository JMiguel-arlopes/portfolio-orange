import styles from "./formregister.module.css";
import InputsEmailPassword from "../InputsEmailPassword";
import Submit from "../Submit";
import FormRowUsername from "../FormRowUsername";
import { useState } from "react";

export default function FormRegister({ handleSubmit }) {
  const [newUser, setNewUser] = useState({});

  const handleChangeText = (e) => {
    setNewUser({ ...newUser, [e.target.name]: [e.target.value] });
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(newUser);
  };

  return (
    <form className={styles.container_form_register} onSubmit={submit}>
      <FormRowUsername handleOnChange={handleChangeText} user={newUser} />
      <InputsEmailPassword handleOnChange={handleChangeText} user={newUser} />
      <Submit textSubmit="cadastrar" />
    </form>
  );
}
