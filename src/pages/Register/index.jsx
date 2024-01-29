import styles from "./register.module.css";
import ContainerImage from "../../components/layoult/ContainerImage";
import img_register from "../../assets/img_cadastro.png";
import FormRegister from "../../components/form/FormRegister";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/layoult/Notification";

export default function Register() {
  let navigate = useNavigate();
  const [newUser, setNewUser] = useState({});
  const [textSubmit, setTextSubmit] = useState("Cadastrar");
  const [notificationSucess, SetNotificationSucess] = useState(false);

  const signUp = async () => {
    setTextSubmit("Aguarde...");

    newUser.projects = [];

    await axios
      .post("http://localhost:8080/users", newUser)
      .then(() => {
        SetNotificationSucess(true);
        setTimeout(() => {
          setTextSubmit("Cadastrar");
          navigate("/login");
        }, 100);
      })
      .catch((error) => {
        console.log("erro ao cadastrar: ", error);
      });
  };

  const handleChangeText = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.container_register}>
      <ContainerImage img={img_register} alt="imagem do cadastro" />
      <div className={styles.content_register}>
        {notificationSucess && (
          <Notification status="sucess" message="Cadastro feito com sucesso" />
        )}
        <h2>Cadastre-se</h2>
        <FormRegister
          handleSubmit={signUp}
          handleOnChange={handleChangeText}
          dataUser={newUser}
          textSubmit={textSubmit}
        />
      </div>
    </section>
  );
}
