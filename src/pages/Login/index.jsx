import styles from "./login.module.css";
import img_login from "../../assets/img_login.svg";
import FormLogin from "../../components/form/FormLogin";
import ContainerImage from "../../components/layoult/ContainerImage";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/layoult/Notification";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  let navigate = useNavigate();
  const [dataInput, setDataInput] = useState({});
  const [notificationError, setNotificationError] = useState("");

  const singIn = async () => {
    const BASE_URL = "https://hackaton-orange-app-backend.onrender.com";
    const endPoint = `${BASE_URL}/api/users/authenticate`;

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
      setDataInput({});
      if (err.response.status === 401 || err.response.status === 404) {
        setNotificationError("Usuário ou Senha não encontrados!");
      }
      console.log(err);
    }
    // await axios
    //   .get("http://localhost:8080/users")
    //   .then((resp) => {
    //     const users = resp.data;

    //     users.forEach((user) => {
    //       const email = user.email;
    //       const password = user.password;

    //       if (email === dataInput.email && password === dataInput.password) {
    //         // setLoggedUser(user);
    //         return navigate(`/home/${user.id}`);
    //       }
    //     });
    //   })
    //   .then(() => {
    //     toggleNotification();
    //     setDataInput({});
    //   })
    //   .catch((error) => console.error("Usuário não encontrado: ", error));
  };

  const handleChange = (e) => {
    const { name, value, maxLength } = e.target;
    const newValue = e.target.value.slice(0, maxLength);
    setDataInput({ ...dataInput, [name]: value });
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
        />
      </div>
    </section>
  );
}
