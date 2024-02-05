import styles from "./formregister.module.css";
import InputsEmailPassword from "../InputsEmailPassword";
import Submit from "../Submit";
import FormRowUsername from "../FormRowUsername";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

export default function FormRegister({
  handleSubmit,
  handleOnChange,
  dataUser,
  textSubmit,
  disabled,
}) {
  const submit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form className={styles.container_form_register} onSubmit={submit}>
      <FormRowUsername handleOnChange={handleOnChange} user={dataUser} />
      <InputsEmailPassword handleOnChange={handleOnChange} user={dataUser} />
      <Submit textSubmit={textSubmit} disabled={disabled} />
      <div className={styles.sign_in}>
        <Link to={"/login"}>
          <IoArrowBackSharp />
          Voltar para Login
        </Link>
      </div>
    </form>
  );
}
