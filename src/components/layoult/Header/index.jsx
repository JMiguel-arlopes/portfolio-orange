import styles from "./header.module.css";
import Logo from "../../../assets/Logo orange.svg";
import Perfil from "../../../assets/perfil.png";
import Icon from "../../../assets/icon.svg";
import Menu from "../../../assets/MenuFilled.svg";
import { Link } from "react-router-dom";
export default function Header() {
  function openSidebar() {
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("menu").style.display = "none";
    document.getElementById("logo").style.display = "none";
  }

  function closeSidebar() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("menu").style.display = "inline";
    document.getElementById("logo").style.display = "inline";
  }

  return (
    <div className={styles.container_header}>
      <div id="sidebar" className={styles.sidebar}>
        <div className={styles.menusidebar}>
          <button onClick={closeSidebar}>FECHAR MENU</button>
          <Link className={styles.linkssidebar} to={"/home"}>
            Meus projetos
          </Link>
          <Link className={styles.linkssidebar} to={"/explore"}>
            {" "}
            Descobrir
          </Link>

          <Link className={styles.linkssidebar} to={"/login"}>
            Sair
          </Link>
        </div>
      </div>

      <div className={styles.menuLogo}>
        <img
          id="menu"
          src={Menu}
          onClick={openSidebar}
          className={styles.menuList}
        />
        <img id="logo" src={Logo} />

        <div className={styles.menu}>
          <Link className={styles.links} to={"/home"}>
            Meus projetos
          </Link>
          <Link className={styles.links} to={"/explore"}>
            {" "}
            Descobrir
          </Link>
        </div>
      </div>

      <div className={styles.perfil}>
        <div className={styles.subnav}>
          <img className={styles.perfilImg} src={Perfil} />
          <Link className={styles.sair} to={"/login"}>
            Sair
          </Link>
        </div>
        <img src={Icon} />
      </div>
    </div>
  );
}
