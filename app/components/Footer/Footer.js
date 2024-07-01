import React from "react";
import styles from './Footer.module.css';
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
    return (
      <footer>
        <nav>
          <ul className={styles.footerPagina}>
            <li className={styles.navegadorFooter}>
                <div className={styles.textoFooter}>
                  <Link href={"#"}>
                    <a>
                      <Image
                        src={"/gestor.png"}
                        width={75}
                        height={75}
                      />
                      <p>Gestor</p>
                    </a>
                  </Link>
                </div>
            </li>
            <li className={styles.navegadorFooter}>
              <div className={styles.textoFooter}>
                <Link href={"#"}>
                  <a>
                    <Image
                      src={"/academia.png"}
                      width={75}
                      height={75}
                    /> 
                    <p>Academia</p>
                  </a>
                </Link>
              </div>          
            </li>
            <li className={styles.navegadorFooter}>
              <div className={styles.textoFooter}>
                <Link href={"#"}>
                  <a>
                <Image
                  src={"/estadisticas.png"}
                  width={75}
                  height={75}
                />
                <p>Estadisticas</p>
                  </a>
                </Link>
              </div>            
            </li>
          </ul>
        </nav>
      </footer>
    );
  };
  export default Footer;