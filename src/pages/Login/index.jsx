import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img_login from "../../assets/img_login.svg";
import FormLogin from "../../components/form/FormLogin";
import ContainerImage from "../../components/layoult/ContainerImage";
import Notification from "../../components/layoult/Notification";
import styles from "./login.module.css";

export default function Login() {
  let navigate = useNavigate();
  const [dataInput, setDataInput] = useState({});
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);
  const [notificationError, setNotificationError] = useState("");

  const singIn = async () => {
    const BASE_URL = "https://hackaton-orange-app-backend.onrender.com";
    const endPoint = `${BASE_URL}/api/users/authenticate`;
    setDisabledSubmit(true);
    try {
      await axios
        .post(endPoint, {
          email: dataInput.email,
          password: dataInput.password,
        })
        .then((resp) => {
          const token = resp.data.token;
          localStorage.setItem("token", token);
          navigate("/home");
        });
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 404) {
        setNotificationError("Usuário ou Senha não encontrados!");
      }
      console.error(err);
    } finally {
      setDataInput({});
      setDisabledSubmit(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, maxLength } = e.target;
    const newValue = value.slice(0, maxLength);
    setDataInput({ ...dataInput, [name]: newValue });
  };

  const toggleNotification = () => {
    setNotificationError("");
  };

  return (
    <section className={styles.container_login}>
      <ContainerImage img={img_login} alt="Imagem do login" />
      <div className={styles.content_login}>
        {notificationError && (
          <Notification
            message={notificationError}
            status="error"
            toggleNotification={toggleNotification}
          />
        )}
        <h2>Entre no Orange Portfólio</h2>
        <FormLogin
          handleSubmit={singIn}
          handleOnChange={handleChange}
          dataInput={dataInput}
          isDisabledSubmit={isDisabledSubmit}
        />
      </div>
    </section>
  );
}
