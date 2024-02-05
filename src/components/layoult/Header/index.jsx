import styles from "./header.module.css";
import Logo from "../../../assets/Logo orange.svg";
import Perfil from "../../../assets/perfil.png";
import Icon from "../../../assets/icon.svg";
import Menu from "../../../assets/MenuFilled.svg";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { RxExit } from "react-icons/rx";

export default function Header() {
  const { loggedUser } = useContext(UserContext);
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={styles.container_header}>
      {isOpen && (
        <div id="sidebar" className={styles.sidebar}>
          <div className={styles.information_user}>
            <h4>{loggedUser.name}</h4>
            <h5>{loggedUser.email}</h5>
          </div>
          <div className={styles.menusidebar}>
            <Link className={styles.linksidebar} to={`/home`}>
              Meus projetos
            </Link>
            <Link className={styles.linksidebar} to={`/explore`}>
              Descobrir
            </Link>
          </div>
          <div className={styles.exitSideBar}>
            <RxExit />
            <Link className={styles.linksidebar} to={"/login"}>
              Sair
            </Link>
          </div>
        </div>
      )}

      <div className={styles.menuLogo}>
        <img
          id="menu"
          src={Menu}
          onClick={toggleMenu}
          className={styles.menuList}
        />
        <img id="logo" src={Logo} />

        <div className={styles.menu}>
          <Link className={styles.link} to={`/home`}>
            Meus projetos
          </Link>
          <Link className={styles.link} to={`/explore`}>
            {" "}
            Descobrir
          </Link>
        </div>
      </div>

      <div className={styles.perfil}>
        <div className={styles.subnav}>
          <img className={styles.perfilImg} src={Perfil} />
          <Link className={styles.exit} to={"/login"}>
            Sair
          </Link>
        </div>
        <img src={Icon} />
      </div>
    </div>
  );
}
