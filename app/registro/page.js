'use client';
import react from "react";
import style from './registro.module.css';
import Titulo from "../components/Titulo/Titulo";

const registro =() =>{

    return(
        <>
            <section className={style.contenedorRegistro}>
                <div className={style.Titulo}>
                    <Titulo texto={"Registro"}/>
                </div>
                <div className={style.padre}>
                    <div className={style.inputRegistro}>
                        <input className={style.input} type="text" placeholder="Correo electronico"/>
                        <input className={style.input} type="text" placeholder="Nombre"/>
                        <input className={style.input} type="text" placeholder="Contraseña"/>
                    </div>
                </div>
                <div className={style.contenedorInicioSesion}>
                    <div className={style.botonRegistrarse}>
                        <a href="./academia.html">Registrarse</a>
                    </div>
                    <div className={style.contenedorP}>
                        <a href="#">¿Ya tenés una cuenta?</a>
                        <a href="./iniciosesion">Inicio Sesion</a>
                    </div>
                </div>
            </section>
        </>
    )
}
export default registro;