'use client';
import React from 'react';
import styles from './EnMantenimiento.module.css'; // Archivo CSS para estilos (opcional)
import Titulo from "../Titulo/Titulo"; // Componente de título
import Footer from "../Footer/Footer"; // Componente de pie de página

const EnMantenimiento = ({ pagina }) => {
    return (
        <div className={styles.contenedor}>
            <Titulo texto={"Página en Mantenimiento"} />
            <div className={styles.contenido}>
                <img 
                    src="/mantenimiento.webp" // Ruta de una imagen de mantenimiento (personalizable)
                    alt="Mantenimiento"
                    className={styles.imagen}
                />
                <p className={styles.mensaje}>
                    La página <strong>{pagina}</strong> se encuentra actualmente en mantenimiento. Estamos trabajando para volver pronto.
                </p>
                <p className={styles.mensajeAdicional}>
                    Gracias por tu paciencia. Por favor, regresa más tarde.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default EnMantenimiento;
