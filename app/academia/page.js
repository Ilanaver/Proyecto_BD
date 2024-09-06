'use client';
import React, { useEffect, useState } from "react";
import style from './academia.module.css';
import Titulo from "../components/Titulo/Titulo";
import Footer from "../components/Footer/Footer";
const Academia = () => {
    return(
        <main>
        <section  className={style.contenedorAcademia}>
            <Titulo texto={"Academia"}/>
            <div className={style.contenedorCards}>
                <div className={style.card}>
                    <div className={style.cardimg}>
                        <img src="/definicion.png" alt="Definición de términos"/>
                    </div>
                    <div className={style.cardcontent}>
                        <h3>Definición de términos</h3>
                        <p>Simple y sin vueltas</p>
                    </div>
                    <div className={style.cardarrow}>
<<<<<<< HEAD
                    <a href="./definiciones"><img  src="/flechaderecha.png" alt="Flecha"/></a>
=======
                        <a href="../definiciones"><img  src="/flechaderecha.png" alt="Flecha"/></a>
>>>>>>> 29a2b95e794f33518fe0d0dfff49970da8a3ff11
                    </div>
                </div>
                <div className={style.card}>
                    <div className={style.cardimg}>
                       <a href="./definicion"> <img src="/contenidoaudiovisual.png" alt="Contenido Audiovisual"/></a>
                    </div>
                    <div className={style.cardcontent}>
                        <h3>Contenido Audiovisual</h3>
                        <p>Con tus influencers favoritos</p>
                    </div>
                    <div className={style.cardarrow}>
<<<<<<< HEAD
                        <a href="./contenido"><img  src="/flechaderecha.png" alt="Flecha"/></a>
=======
                       <a href="../contenido"> <img src="/flechaderecha.png" alt="Flecha"/></a>
>>>>>>> 29a2b95e794f33518fe0d0dfff49970da8a3ff11
                    </div>
                </div>
                <div className={style.card}>
                    <div className={style.cardimg}>
                        <img src="./leccion.png" alt="Lección diaria"/>
                    </div>
                    <div className={style.cardcontent}>
                        <h3>Lección diaria</h3>
                        <p>Aprendé algo nuevo todos los días</p>
                    </div>
                    <div className={style.cardarrow}>
<<<<<<< HEAD
                        <img href="../#" src="/flechaderecha.png" alt="Flecha"/>
=======
                       <a href="../#"><img  src="/flechaderecha.png" alt="Flecha"/></a> 
>>>>>>> 29a2b95e794f33518fe0d0dfff49970da8a3ff11
                    </div>
                </div>
                <div className={style.card}>
                    <div className={style.cardimg}>
                        <img src="/asesor.png" alt="Tu asesor"/>
                    </div>
                    <div className={style.cardcontent}>
                        <h3>Tu asesor</h3>
                        <p>Resolvé todas tus inquietudes</p>
                    </div>
                    <div className={style.cardarrow}>
<<<<<<< HEAD
                        <img href="../asesor" src="/flechaderecha.png" alt="Flecha"/>
=======
                       <a href="../asesor"> <img  src="/flechaderecha.png" alt="Flecha"/></a>
>>>>>>> 29a2b95e794f33518fe0d0dfff49970da8a3ff11
                    </div>
                </div>
                <div className={style.card}>
                    <div className={style.cardimg}>
                        <img src="/definicion.png" alt="ChatBot inversor"/>
                    </div>
                    <div className={style.cardcontent}>
                        <h3>ChatBot inversor</h3>
                        <p>Posibles inversiones</p>
                    </div>
                    <div className={style.cardarrow}>
<<<<<<< HEAD
                        <img href="../chatbot" src="/flechaderecha.png" alt="Flecha"/>
=======
                       <a href="../chatbot"> <img  src="/flechaderecha.png" alt="Flecha"/></a>
>>>>>>> 29a2b95e794f33518fe0d0dfff49970da8a3ff11
                    </div>
                </div>
            </div>
    
        </section>
        
            <Footer></Footer>
    </main>
    );
}
export default Academia ;