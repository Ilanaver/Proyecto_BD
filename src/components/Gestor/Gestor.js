import React from "react";
import TarjetasGestor from "../TarjetasGestor/TarjetasGestor";
import styles from'./Gestor.module.css';
const Gestor = () => {
  return (
    <main>
      <section className={styles.ContenedorGestor}>
        <div className={styles.tituloGestor}>
          <h1>Gestor</h1>
        </div>            
        <div className={styles.MesGestor}>
          <a href="">Julio</a>
        </div>
        <div className={styles.balanceMensual}>
          <h3>Balance mensual</h3>
          <h2>$300000</h2>
        </div>
        <div className={styles.tarjetasGestor}>
          <TarjetasGestor 
            imgSrc="/assets/img/gastos.png" 
            altText="imagen gastos" 
            title="Ingresos" 
            amount="$2000" 
          />
          <TarjetasGestor 
            imgSrc="/assets/img/gastos.png" 
            altText="imagen gastos" 
            title="Gastos" 
            amount="$500" 
          />
          <TarjetasGestor
            imgSrc="/assets/img/ahorros.png" 
            altText="imagen ahorros" 
            title="Ahorros" 
            amount="$1000" 
          />
        </div>
        <div className={styles.botonReporteMensual}>
          <a href="">Descargar Reporte Mensual</a>
        </div>
      </section>
    </main>
  );
};

export default Gestor;
