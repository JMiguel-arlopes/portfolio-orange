import styles from "./login.module.css";
import img_login from "../../assets/img_login.svg";
import FormLogin from "../../components/form/FormLogin";
import ContainerImage from "../../components/layoult/ContainerImage";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/layoult/Notification";

export default function Login() {
  let navigate = useNavigate();
  const [dataInput, setDataInput] = useState({});
  const [notificationError, setNotificationError] = useState(false);
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const singIn = async () => {
    await axios
      .get("http://localhost:8080/users")
      .then((resp) => {
        const users = resp.data;

        users.forEach((user) => {
          const email = user.email;
          const password = user.password;

          if (email === dataInput.email && password === dataInput.password) {
            setLoggedUser(user);
            return navigate(`/home/${user.id}`);
          }
        });
      })
      .then(() => {
        toggleNotification();
        setDataInput({});
      })
      .catch((error) => console.log("Usuário não encontrado: ", error));
  };

  const handleChange = (e) => {
    setDataInput({ ...dataInput, [e.target.name]: e.target.value });
  };

  const toggleNotification = () => {
    setNotificationError(!notificationError);
  };

  return (
    <section className={styles.container_login}>
      <ContainerImage img={img_login} alt="Imagem do login" />
      <div className={styles.content_login}>
        {notificationError && (
          <Notification
            message="Email ou Senha não encontrados!"
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
