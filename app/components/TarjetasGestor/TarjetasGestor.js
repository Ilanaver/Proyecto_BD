import React from 'react';
import styles from './TarjetasGestor.module.css';

const TarjetasGestor = ({ imgSrc, altText, titulo, cantidad }) => {
  return (
    <div className={styles.tarjetas}>
      <div className={styles.ContenedorimagenIngresos}>
        <img className={styles.imagenIngresos} src={imgSrc} alt={altText} />
      </div>
      <div className={styles.Infotarjetas}>
        <div className={styles.contenido}>
          <p>{titulo}</p>
          <p>{cantidad}</p>
        </div>
        <img src="/assets/img/signomas.webp" alt="signo mas" />
      </div>
    </div>
  );
};

export default TarjetasGestor;
