'use client';
import react from "react";
import style from './iniciosesion.module.css';
import Titulo from "../components/Titulo/Titulo";

const iniciosesion = () => {
    return(
    <>
        <section className={style.contenedorInicioSesion}>
        <div className={style.Titulo}>
            <Titulo texto={"Iniciar Sesión"}/>
        </div>
        <div className={style.padre}>
            <div className={style.inputRegistro}>
                    <input className={style.input} type="text" placeholder="Correo electronico"/>
                    <input className={style.input} type="text" placeholder="Contraseña"/>
                    <div className={style.contenedorP}>
                        <a href="">¿Olvidate tu contraseña?</a>
                    </div>
            </div>
        </div>
        <div className={style.contenedorInicioSesion}>
            <div className={style.botonRegistrarse}>
                <a href="./registro">Iniciar Sesión</a>
            </div>
        
        </div>
    </section>
    </> 
    )
}
export default iniciosesion;