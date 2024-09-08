'use client';
import react from "react";
import style from './perfil.module.css';
import Footer from "../components/Footer/Footer";

const perfil = () =>{
    return(
        <>
            <body>
            <div className={style.navegador}>
                <img src="" alt=""/>
                <h1>Perfil</h1>
                <img src="" alt=""/>
            </div>
            <div className={style.info}>
                <div className={style.imagen}>
                    <img src="./fotoPerfil.png" alt=""/>
                </div>
                <div className={style.nombre}>
                    <h2>Martin</h2>
                    <p className={style.mail}>martingonzalez@gmail.com</p>
                </div>
        
            </div>
            <div className={style.contenedor}>
                <div className={style.opciones}>
                        <img src="./configuracion.png" alt="configuracion"/>
                        <h3 className={style.h3}>Configuracion</h3>
                </div>
                <div className={style.opciones}>
                        <img src="./cambiarContraseña.png" alt="cambiar contraseña"/>
                        <h3 className={style.h3}>Cambiar Contraseña</h3>
                </div>
                <div className={style.opciones}>
                        <img src="./compartir.png" alt="compratir"/>
                        <h3 className={style.h3}>compratir</h3>
                </div>
            </div>
            <div className={style.cerrarSesion}>
                <a href="./iniciosesion" className={style.h3}>Cerrar Sesion</a>
            </div>
        </body>
        <Footer></Footer>
        </>
    );
}
export default perfil