'use client';
import React, { useState } from "react";
import axios from 'axios'; // Importar Axios
import style from './iniciosesion.module.css';
import Titulo from "../components/Titulo/Titulo";
import { useRouter } from 'next/navigation'; // Importar useRouter

const InicioSesion = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState(null); // Para manejar mensajes de éxito o error

    const router = useRouter(); // Hook para manejar la navegación

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el refresh de la página

        // Crear el objeto con los datos del login
        const usuario = {
            mail: correo,
            contraseña: contraseña
        };

        try {
            // Enviar solicitud POST al backend usando Axios
            const response = await axios.post('http://localhost:3000/usuario/login', usuario);

            if (response.status === 200) {
                const userId = response.data.userId;
                // Si el login es exitoso, redirigir a la página del Gestor
                localStorage.setItem('userId', userId); // Guarda el ID del usuario en localStorage
                router.push('/Gestor'); // Redirige al usuario a la página del gestor
            } else {
                // Si hay algún error, mostrar el mensaje
                setMensaje(response.data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            setMensaje(error.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <>
            <section className={style.contenedorInicioSesion}>
                <div className={style.Titulo}>
                    <Titulo texto={"Iniciar Sesión"} />
                </div>
                <form className={style.padre} onSubmit={handleSubmit}>
                    <div className={style.inputRegistro}>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Correo electrónico"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)} // Capturar el valor del correo
                        />
                        <input
                            className={style.input}
                            type="password"
                            placeholder="Contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)} // Capturar la contraseña
                        />
                        <div className={style.contenedorP}>
                            <a href="./components/NuevaContrasena">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                    <div className={style.botonRegistrarse}>
                        <button type="submit">Iniciar Sesión</button>
                    </div>
                    <div className={style.contenedorP}>
                        <a href="./registro">¿Todavia no tienes cuenta?</a>
                    </div>
                </form>
                {mensaje && <p className={style.mensaje}>{mensaje}</p>} {/* Mostrar el mensaje de éxito o error */}
            </section>
        </>
    );
};

export default InicioSesion;
