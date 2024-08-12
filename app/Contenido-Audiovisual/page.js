'use client';
import React, { useEffect, useState } from "react";
import style from './contvideo.module.css';
import Titulo from "../components/Titulo/Titulo";
import Footer from "../components/Footer/Footer";
import Agregar from "../components/Agregar/page";
const Audiovisual = () => {
    return(
        <main>
            <Titulo texto={"Contenido Audiovisual"}/>
            <Agregar/>
    <div className={style.contenedorContenido}>
        <div className={style.contenido}>
            <div className={style.tituloContenido}>
                <h2>Ahorro</h2>
                <a href="">Ver mas</a>
            </div>
            <div className={style.imagenesContenido}>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
            </div>
        </div>
        <div className={style.contenido}>
            <div className={style.tituloContenido}>
                <h2>Invertir</h2>
                <a href="">Ver mas</a>
            </div> 
            <div className={style.imagenesContenido}>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
            </div>
        </div>
        <div className={style.contenido}>
            <div  className={style.tituloContenido}>
                <h2>Impuestos</h2>
                <a href="">Ver mas</a>
            </div>
            <div className={style.imagenesContenido}>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
            </div>
        </div>
        <div className={style.contenido}>
            <div className={style.tituloContenido}>
                <h2>Ahorro</h2>
                <a href="">Ver mas</a>
            </div>
            <div className={style.imagenesContenido}>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
                <img src="../assets/img/Audiovizual.png" alt=""/>
            </div>
            
        </div>
        
    </div>
    <Footer></Footer>
        </main>
    );
}
export default Audiovisual;
