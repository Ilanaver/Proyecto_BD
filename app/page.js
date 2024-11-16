'use client';
import React from "react";
import styles from './page.module.css'; // Asegúrate de que el archivo de estilos esté en la misma ubicación o ajusta la ruta si es necesario.

const Home = () => {
  return (
    <>
      <section>
        <div className={styles.PaginaPrincipal}>
          <div className={styles.contenedorParteArriba}>
            <div className={styles.contenedorImagen}>
              <img className={styles.ImagenPrincipal} src="./logo.png" alt="logo página" />
            </div>
            <div className={styles.contenedorTexto}>
              <h2>
                <span className={styles.palabrasInicio}>Aprendé</span>, <span className={styles.palabrasInicio}>gestioná</span> y{' '}
                <span className={styles.palabrasInicio}>consultá</span> en un mismo lugar
              </h2>
            </div>
            <div className={styles.contenedorInicioSesion}>
              <div className={styles.botonRegistrarse}>
                <button type="submit" onClick={() => window.location.href = '/registro'}>
                  Registrarse
                </button>
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
};

export default Home;
