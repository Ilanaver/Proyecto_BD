'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from './perfil.module.css';
import Footer from "../components/Footer/Footer";
import Titulo from "../components/Titulo/Titulo";
import { useSearchParams, useRouter } from 'next/navigation';

const Perfil = () => {
    const [perfilData, setPerfilData] = useState(null); // Cambiamos el estado inicial a null
    const [userId, setUserId] = useState(null);  // Almacenamos el userId aquí
    const router = useRouter();

    // Verificar si estamos en el entorno del navegador
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem('userId');
            setUserId(storedUserId);  // Establecemos el userId desde localStorage
        }
    }, []);

    const fetchPerfilData = () => {
        if (userId) {
            axios.get(`http://localhost:3000/usuario/perfil/${userId}`)
                .then(res => {
                    console.log('Fetched perfil data:', res.data);
                    const perfil = res.data[0]; // Accedemos al primer elemento del array
                    setPerfilData(perfil); // Guardamos el primer objeto en el estado
                })
                .catch(err => console.error('Error fetching perfil data:', err));
        }
    };

    useEffect(() => {
        fetchPerfilData();  // Llamamos a la API si hay un userId
    }, [userId]);

    // Función para copiar el enlace al portapapeles
    const handleShareClick = () => {
        const appLink = "https://tuaplicacion.com/invitar"; // Enlace de tu aplicación
        navigator.clipboard.writeText(appLink)
            .then(() => {
                alert("Enlace copiado al portapapeles");
            })
            .catch(err => {
                console.error("Error al copiar el enlace: ", err);
            });
    };

    // Mostramos un indicador de carga mientras esperamos la respuesta de la API
    if (!perfilData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={style.navegador}>
            <Titulo texto={"Perfil"}/>
            </div>
            <div className={style.info}>
                <div className={style.imagen}>
                    <img src={perfilData.foto || "./fotoPerfil.png"} alt="Foto de perfil" onClick={() => router.push('./components/FotoPerfil')}/>
                </div>
                <div className={style.nombre}>
                    <h2>{perfilData.usuario}</h2>
                    <p className={style.mail}>{perfilData.mail}</p>
                </div>
            </div>
            <div className={style.contenedor}>
                <div className={style.opciones}>
                    <img src="./configuracion.png" alt="configuracion"/>
                    <h3 className={style.h3}>Configuracion</h3>
                </div>
                <div className={style.opciones}>
                    <img src="./cambiarContraseña.png" alt="cambiar contraseña"/>
                    <h3 className={style.h3}><a href="../components/cambiarContrasena">Cambiar Contraseña</a></h3>
                </div>
                <div className={style.opciones} onClick={handleShareClick}>
                    <img src="./compartir.png" alt="compartir"/>
                    <h3 className={style.h3}>Compartir</h3>
                </div>
            </div>
            <div className={style.cerrarSesion}>
                <a href="./iniciosesion" className={style.h3}>Cerrar Sesion</a>
            </div>
            <Footer />
        </>
    );
}

export default Perfil;
