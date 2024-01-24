import styles from "./login.module.css";
import img_login from "../../assets/img_login.svg";
import FormLogin from "../../components/form/FormLogin";
import ContainerImage from "../../components/layoult/ContainerImage";

export default function Login() {
  const singIn = (user) => {
    console.log("Registro feito com sucesso: ", user);
  };

  return (
    <section className={styles.container_login}>
      <ContainerImage img={img_login} alt="Imagem do login" />
      <div className={styles.content_login}>
        <h2>Entre no Orange Portfólio</h2>
        <FormLogin handleSubmit={singIn} />
      </div>
    </section>
  );
}
