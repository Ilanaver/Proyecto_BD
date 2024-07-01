import React from "react";
import styles from './Footer.module.css';
import Image from "next/image";
const Footer = () => {
    return (
      <footer>
        <nav>
          <ul className={styles.footerPagina}>
            <li className={styles.navegadorFooter}>
                <div className={styles.textoFooter}>
                  <Image
                    src={"/gestor.png"}
                    width={75}
                    height={75}
                  />
                  <p>Gestor</p>
                </div>
            </li>
            <li className={styles.navegadorFooter}>
              <div className={styles.textoFooter}>
                <Image
                  src={"/academia.png"}
                  width={75}
                  height={75}
                /> 
                <p>Academia</p>
              </div>          
            </li>
            <li className={styles.navegadorFooter}>
              <div className={styles.textoFooter}>
                <Image
                  src={"/estadisticas.png"}
                  width={75}
                  height={75}
                />
                <p>Estadisticas</p>
              </div>            
            </li>
          </ul>
        </nav>
      </footer>
    );
  };
  export default Footer;