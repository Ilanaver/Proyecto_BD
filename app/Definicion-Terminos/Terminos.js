<<<<<<< HEAD

=======
import React, {useEffect, useState} from "react";
import Titulo from "../components/Titulo/Titulo";
import style from './Terminos.module.css';


const Terminos = () => {
    return(
        <body> 
            <main>
                <div className={style.Titulo}>
                    <Titulo>Definicion de terminos</Titulo>
                </div>
                <div className={style.ContenedorBuscador}>
                    <div className={style.Buscador}>
                        <img src="" alt=""/>
                        <input type="submit"/>
                    </div>
                    </div>
                    <div className={style.ContenedorTarjetas}>
                        <div className={style.tarjeta}>
                            <h2>¿Que es el dolar MEP?</h2>
                            <img src="../assets/img/FlechitaAbajo.png" alt=""/>
                        </div>
                    <div className={style.tarjeta}>
                        <h2>¿Que es el dolar MEP?</h2>
                        <img src="../assets/img/FlechitaAbajo.png" alt=""/>
                    </div>
                    <div className={style.tarjeta}>
                        <h2>¿Que es el dolar MEP?</h2>
                        <img src="../assets/img/FlechitaAbajo.png" alt=""/>
                    </div>
                    <div>
                        <h2>¿Que es el dolar MEP?</h2>
                        <img src="../assets/img/FlechitaAbajo.png" alt=""/>
                    </div>
                    <div className={style.tarjeta}>
                        <h2>¿Que es el dolar MEP?</h2>
                        <img src="../assets/img/FlechitaAbajo.png" alt=""/>
                    </div>
                    </div>
            </main>
    
        </body>
    );



};
export default Terminos;
>>>>>>> 87fca397ba470274e87553a5318dfd08f5f868d9
