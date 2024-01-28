import styles from "./formregister.module.css";
import InputsEmailPassword from "../InputsEmailPassword";
import Submit from "../Submit";
import FormRowUsername from "../FormRowUsername";

export default function FormRegister({
  handleSubmit,
  handleOnChange,
  dataUser,
  textSubmit,
}) {
  const submit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form className={styles.container_form_register} onSubmit={submit}>
      <FormRowUsername handleOnChange={handleOnChange} user={dataUser} />
      <InputsEmailPassword handleOnChange={handleOnChange} user={dataUser} />
      <Submit textSubmit={textSubmit} />
    </form>
  );
}
