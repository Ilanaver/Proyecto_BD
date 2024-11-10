// /page.js
'use client';
import React from 'react';
import CatGastos from './components/CatGastos';
import SaldoPorMes from './components/SaldoPorMes';
import styles from './estadisticas.module.css'; 
import Footer from "../components/Footer/Footer";
import Titulo from "../components/Titulo/Titulo";
import PromedioDiario from './components/PromDiario';


const Estadisticas = () => {
    return (
        <section>
            <Titulo texto={"Estadisticas"} />
            <div className={styles.estadisticasContainer}>
                <CatGastos />
                <SaldoPorMes />
                <PromedioDiario />
            </div>
            <Footer />

        </section>
        
    );
};

export default Estadisticas;
