import styles from "./formlogin.module.css";
import { FcGoogle } from "react-icons/fc";
import InputsEmailPassword from "../InputsEmailPassword";
import Submit from "../Submit";

import { Link } from 'react-router-dom'

export default function FormLogin() {
  return (
    <div className={styles.container_form_login}>
      <a href="/" className={styles.sign_in_google}>
        <FcGoogle />
        Entrar com Google
      </a>
      <h3>Faça login com email</h3>
      <InputsEmailPassword />
      <Submit textSubmit="entrar" />
      <div className={styles.sign_up}>
        <Link to={"/register"}>Cadastre-se</Link>
      </div>
    </div>
  );
}
