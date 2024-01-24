import styles from "./header.module.css";
import Logo from "../../assets/Logo orange.svg"
import Perfil from "../../assets/perfil.png"
import Icon from "../../assets/icon.svg"
import { Link } from 'react-router-dom'
export default function Header() {
  return ( 
    <div className={styles.container_header}>
       <div className={styles.menuLogo}>
            <img src={Logo} />

            <div className={styles.menu}>
                <Link className={styles.links} to={"/home"}>Meus projetos</Link>
                <Link className={styles.links} to={"/descobrir"}> Descobrir</Link>
            </div>
       </div>

       <div className={styles.perfil}>
            <div className={styles.subnav}>
              <img className={styles.perfilImg} src={Perfil}/>
              <Link className={styles.sair} to={'/login'}>Sair</Link>
            </div> 
            <img src={Icon} />
       </div>
    </div>
  );
}
