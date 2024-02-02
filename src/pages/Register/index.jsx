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
  const url = "http://localhost:8080/users";
  const [newUser, setNewUser] = useState({});
  const [textSubmit, setTextSubmit] = useState("Cadastrar");
  const [notificationSucess, setNotificationSucess] = useState(false);
  const [notificationError, setNotificationError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);

  const signUp = async () => {
    setTextSubmit("Aguarde...");
    setDisabledSubmit(true);

    await verificationEmail();

    if (emailError) {
      setNotificationError(true);
      setTextSubmit("Cadastrar");
      setEmailError(false);
      setDisabledSubmit(false);
      return;
    } else {
      await createUser();
      setDisabledSubmit(false);
    }
  };

  const createUser = async () => {
    newUser.projects = [];

    await axios
      .post(url, newUser)
      .then(() => {
        setNotificationSucess(true);
        setTimeout(() => {
          setTextSubmit("Cadastrar");
          navigate("/login");
        }, 100);
      })
      .catch((error) => {
        console.log("erro ao cadastrar: ", error);
      });
  };

  const verificationEmail = async () => {
    await axios
      .get(url)
      .then((resp) => {
        const users = resp.data;
        const isRepeatEmail = users.some(
          (user) => newUser.email === user.email
        );
        setEmailError(isRepeatEmail);
      })
      .catch((error) => {
        console.log("erro ao cadastrar: ", error);
      });
  };

  const handleChangeText = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const toggleSucess = () => {
    setNotificationSucess(!notificationSucess);
  };

  const toggleError = () => {
    setNotificationError(!notificationError);
  };

  return (
    <section className={styles.container_register}>
      <ContainerImage img={img_register} alt="imagem do cadastro" />
      <div className={styles.content_register}>
        {notificationSucess && (
          <Notification
            status="sucess"
            message="Cadastro feito com sucesso"
            toggleNotification={toggleSucess}
          />
        )}
        {notificationError && (
          <Notification
            status="error"
            message="Email já cadastrado"
            toggleNotification={toggleError}
          />
        )}
        <h2>Cadastre-se</h2>
        <FormRegister
          handleSubmit={signUp}
          handleOnChange={handleChangeText}
          dataUser={newUser}
          textSubmit={textSubmit}
          disabled={isDisabledSubmit}
        />
      </div>
    </section>
  );
}
