import ContainerImage from "../../components/layoult/ContainerImage";
import styles from "./register.module.css";
import img_register from "../../assets/img_cadastro.png";
import FormRegister from "../../components/form/FormRegister";

export default function Register() {
  return (
    <section className={styles.container_register}>
      <ContainerImage img={img_register} alt="imagem do cadastro" />
      <div className={styles.content_register}>
        <h2>Cadastre-se</h2>
        <FormRegister />
      </div>
    </section>
  );
}
