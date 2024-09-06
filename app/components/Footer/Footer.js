import React from "react";
import styles from './Footer.module.css';

const Footer = () => {
    return (
<<<<<<< HEAD
      <footer>
          <nav className={styles.navegador}>
            <ul className={styles.footerPagina}>
              <li className={styles.navegadorFooter}>
              <a href="../academia"><img src="/academia.png" alt="Foto Academia"/></a>Academia
              </li>
              <li className={styles.navegadorFooter}>
              <a href="../gestor"><img src="/gestor.png" alt="Foto Gestor"/></a>Gestor
              </li>
              <li className={styles.navegadorFooter}>
              <a href="../estadisticas"><img src="/estadisticas.png" alt="Foto Estadisticas"/></a>Estadisticas
              </li>
            </ul>
          </nav>
      </footer>
=======
        <footer className={styles.footerFixed}>
            <nav className={styles.navegador}>
                <ul className={styles.footerPagina}>
                    <li className={styles.navegadorFooter}>
                        <a href="../gestor"><img src="/gestor.png" alt="Foto Academia"/></a>Gestor
                    </li>
                    <li className={styles.navegadorFooter}>
                        <a href="../academia"><img src="/academia.png" alt="Foto Academia"/></a>Academia
                    </li>
                    <li className={styles.navegadorFooter}>
                        <a href="../estadisticas"><img src="/estadisticas.png" alt="Foto Estadisticas"/></a>Estadisticas
                    </li>
                </ul>
            </nav>
        </footer>
>>>>>>> 29a2b95e794f33518fe0d0dfff49970da8a3ff11
    );
};

export default Footer;
