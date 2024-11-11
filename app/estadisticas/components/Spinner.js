// /components/Spinner.js
import React from 'react';
import styles from '../estadisticas.module.css'; // Assumes this file has the .spinner styles

const Spinner = () => (
    <div className={styles.loader}>
        <div className={styles.spinner}></div>
        Cargando...
    </div>
);

export default Spinner;
