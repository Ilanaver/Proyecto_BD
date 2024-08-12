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
                  <Link href={"/gestor"}>
                    
                      <Image
                        src={"/gestor.png"}
                        width={75}
                        height={75}
                      />
                      <p>Gestor</p>
                  </Link>
                </div>
            </li>
            <li className={styles.navegadorFooter}>
              <div className={styles.textoFooter}>
                <Link href={"/academia"}>
                    <Image
                      src={"/academia.png"}
                      width={75}
                      height={75}
                    /> 
                    <p>Academia</p>
                </Link>
              </div>          
            </li>
            <li className={styles.navegadorFooter}>
              <div className={styles.textoFooter}>
                <Link href={"#"}>
                <Image
                  src={"/estadisticas.png"}
                  width={75}
                  height={75}
                />
                <p>Estadisticas</p>
                </Link>
              </div>            
            </li>
          </ul>
        </nav>
      </footer>
    );
  };
  export default Footer;