import React from "react";
import styles from './Footer.module.css';
const Footer = () => {
    return (
      <footer>
        <nav>
          <ul className={styles.footerPagina}>
            <li className={styles.navegadorFooter}>
              <a href=""><img src="/assets/img/academia.png" alt="Foto Academia" /></a>Academia
            </li>
            <li className={styles.navegadorFooter}>
              <a href=""><img src="/assets/img/gestor.png" alt="Foto Gestor" /></a>Gestor
            </li>
            <li className={styles.navegadorFooter}>
              <a href=""><img src="/assets/img/estadisticas.png" alt="Foto Estadisticas" /></a>Estadisticas
            </li>
          </ul>
        </nav>
      </footer>
    );
  };
  export default Footer;