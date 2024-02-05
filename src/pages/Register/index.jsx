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
  const BASE_URL = "https://hackaton-orange-app-backend.onrender.com";
  const endPoint = `${BASE_URL}/api/users/register`;
  const [newUser, setNewUser] = useState({});
  const [notificationSucess, setNotificationSucess] = useState(false);
  const [notificationError, setNotificationError] = useState("");
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);

  const signUp = async () => {
    setDisabledSubmit(true);
    joinName();

    newUser.projects = [];

    await axios
      .post(endPoint, newUser)
      .then(() => {
        setNotificationSucess(true);
        setTimeout(() => {
          navigate("/login");
        }, 100);
      })
      .catch((err) => {
        const { status } = err.response;
        if (status == 400) {
          setNotificationError("Essa conta já foi criada!");
        } else {
          setNotificationError(err.message);
        }
      })
      .finally(() => {
        setNewUser({});
        setDisabledSubmit(false);
      });
  };

  const joinName = () => {
    const username = newUser.firstName + " " + newUser.lastName;
    newUser.name = username;
    delete newUser.firstName;
    delete newUser.lastName;
  };

  const handleChangeText = (e) => {
    const { name, value, maxLength } = e.target;
    const newValue = value.slice(0, maxLength);
    setNewUser({ ...newUser, [name]: newValue });
  };

  const toggleSucess = () => {
    setNotificationSucess(!notificationSucess);
  };

  const toggleError = () => {
    setNotificationError("");
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
            message={notificationError}
            toggleNotification={toggleError}
          />
        )}
        <h2>Cadastre-se</h2>
        <FormRegister
          handleSubmit={signUp}
          handleOnChange={handleChangeText}
          dataUser={newUser}
          textSubmit="Cadastrar"
          disabled={isDisabledSubmit}
        />
      </div>
    </section>
  );
}
