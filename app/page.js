'use client'
import Image from "next/image";
import './page.module.css';
import Link from "next/link";
import InicioSesion from "@/app/iniciosesion/page.js";
import styles from './page.module.css';

export default function Home() {
  return (
   <>
      <section>
          <div className={styles.PaginaPrincipal}>
              <div className={styles.contenedorParteArriba}>
                  <div className={styles.contenedorImagen}>
                     <img className={styles.ImagenPrincipal} src="./logo.png" alt="logo pagina"/> 
                  </div>
                  <div className={styles.contenedorTexto}>
                      <h2> <span className={styles.palabrasInicio}>Aprendé</span>, <span className={styles.palabrasInicio}>gestioná</span> y <span className={styles.palabrasInicio}>consultá</span> en un mismo lugar</h2>
                  </div>
                  <div className={styles.contenedorInicioSesion}>
                      <div className={styles.botonRegistrarse}>
                        <button type="submit" onClick={() => window.location.href = '/registro'}>Registrarse</button>
                      </div>
                      <div className={styles.contenedorP}>
                          <a href="./iniciosesion">¿Ya tenés una cuenta? <br /> InicioSesion</a>
                      </div>
                  </div>
              </div>
          </div>  
      </section>
   </>
  );
}
