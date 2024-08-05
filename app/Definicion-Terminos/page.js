
import React, {useEffect, useState} from "react";
import Titulo from "../components/Titulo/Titulo";
import style from './Terminos.module.css';
import Link from 'next/link'


const Terminos = () => {
    return(
        <body> 
            <main>
                <div className={style.Titulo}>
                    <Titulo texto={"Definicion de Terminos"}/>
                    <Link  href="./components/agregar"className={style.Agregar}>Agregar Definicion</Link>
                </div>
                    <div className={style.ContenedorBuscador}>
                        <div className={style.Buscador}>
                            <img src="/lupa.png" alt=""/>
                            <input type="submit" value="buscar algo" />
                        </div>
                    </div>
                    <div className={style.ContenedorTarjetas}>
                        <div className={style.tarjeta}>
                            <h2>¿Que es el dolar MEP?</h2>
                            <img src="/flechaabajo.png" alt=""/>
                        </div>
                        <div className={style.tarjeta}>
                            <h2>¿Que es el dolar MEP?</h2>
                            <img src="/flechaabajo.png" alt=""/>
                        </div>
                        <div className={style.tarjeta}>
                            <h2>¿Que es el dolar MEP?</h2>
                            <img src="/flechaabajo.png" alt=""/>
                        </div>
                        <div>
                            <h2>¿Que es el dolar MEP?</h2>
                            <img src="/flechaabajo.png" alt=""/>
                        </div>
                        <div className={style.tarjeta}>
                            <h2>¿Que es el dolar MEP?</h2>
                            <img src="/flechaabajo.png" alt=""/>
                        </div>
                    </div>
            </main>
    
        </body>
    );



};
export default Terminos;
