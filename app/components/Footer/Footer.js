import React from "react";
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footerFixed}>
            <nav className={styles.navegador}>
                <ul className={styles.footerPagina}>
                    <li className={styles.navegadorFooter}>
                        <a href="../Gestor"><img src="/gestor.png" alt="Foto Academia"/></a>Gestor
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
    );
};

export default Footer;
