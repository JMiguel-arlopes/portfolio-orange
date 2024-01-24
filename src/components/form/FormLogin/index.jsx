import styles from "./formlogin.module.css";
import { FcGoogle } from "react-icons/fc";
import InputsEmailPassword from "../InputsEmailPassword";
import Submit from "../Submit";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function FormLogin({ handleSubmit }) {
  const [user, setUser] = useState({});

  const handleTextChange = (e) => {
    setUser({ ...user, [e.target.name]: [e.target.value] });
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(user);
  };

  return (
    <form className={styles.container_form_login} onSubmit={submit}>
      <a href="/" className={styles.sign_in_google}>
        <FcGoogle />
        Entrar com Google
      </a>
      <h3>Faça login com email</h3>
      <InputsEmailPassword handleOnChange={handleTextChange} user={user} />
      <Submit textSubmit="entrar" />
      <div className={styles.sign_up}>
        <Link to={"/register"}>Cadastre-se</Link>
      </div>
    </form>
  );
}
