'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from './perfil.module.css';
import Footer from "../components/Footer/Footer";
import Titulo from "../components/Titulo/Titulo";
import { useRouter } from 'next/navigation';

const Perfil = () => {
    const [perfilData, setPerfilData] = useState(null); // Cambiamos el estado inicial a null
    const [userId, setUserId] = useState(null);  // Almacenamos el userId aquí
    const [isInputVisible, setIsInputVisible] = useState(false);  // Controla la visibilidad del input
    const [newImageUrl, setNewImageUrl] = useState('');  // Almacenamos la URL de la nueva imagen
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
                    const perfil = res.data[0]; // Accedemos al primer elemento del array
                    setPerfilData(perfil); // Guardamos el primer objeto en el estado
                })
                .catch(err => console.error('Error fetching perfil data:', err));
        }
    };

    useEffect(() => {
        fetchPerfilData();  // Llamamos a la API si hay un userId
    }, [userId]);

    // Función para cambiar la foto de perfil
    const cambiarFotoPerfil = () => {
        if (!newImageUrl) {
            alert('Por favor ingresa una URL válida.');
            return;
        }

        const formData = {
            idperfil: userId,
            foto: newImageUrl  // Enviar la URL en lugar de un archivo
        };

        axios.patch('http://localhost:3000/usuario/cambiar-foto-perfil', formData)
            .then(res => {
                alert('Foto de perfil actualizada exitosamente');
                fetchPerfilData(res);  // Actualizamos los datos del perfil
                setIsInputVisible(false);  // Ocultar el input al actualizar la imagen
            })
            .catch(err => {
                console.error('Error al cambiar la foto de perfil:', err);
                alert('Error al cambiar la foto de perfil. Por favor intenta nuevamente.');
            });
    };

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
                <Titulo texto={"Perfil"} />
            </div>
            <div className={style.info}>
                <div className={style.imagen}>
                    <img
                        src={perfilData.foto || "./fotoPerfil.png"}
                        alt="Foto de perfil"
                        className={style.fotoPerfil}  // Aplicamos la clase circular
                        onClick={() => setIsInputVisible(!isInputVisible)}  // Al hacer clic muestra el input
                    />
                </div>

                {/* Mostrar input para ingresar la URL si se hace clic en la imagen */}
                {isInputVisible && (
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            placeholder="Pega aquí el enlace de la imagen"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}  // Guardar el valor de la URL
                        />
                        <button onClick={cambiarFotoPerfil}>Actualizar Foto</button>
                    </div>
                )}

                <div className={style.nombre}>
                    <h2>{perfilData.usuario}</h2>
                    <p className={style.mail}>{perfilData.mail}</p>
                </div>
            </div>
            <div className={style.contenedor}>
                <div className={style.opciones}>
                    <img src="./configuracion.png" alt="configuración" />
                    <h3 className={style.h3}>Configuración</h3>
                </div>
                <div className={style.opciones}>
                    <img src="./cambiarContraseña.png" alt="cambiar contraseña" />
                    <h3 className={style.h3}><a href="../components/cambiarContrasena">Cambiar Contraseña</a></h3>
                </div>
                <div className={style.opciones} onClick={handleShareClick}>
                    <img src="./compartir.png" alt="compartir" />
                    <h3 className={style.h3}>Compartir</h3>
                </div>
            </div>
            <div className={style.cerrarSesion}>
                <a href="./iniciosesion" className={style.h3}>Cerrar Sesión</a>
            </div>
            <Footer />
        </>
    );
};

export default Perfil;
