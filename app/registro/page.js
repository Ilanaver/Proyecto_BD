'use client';
import React, { useState } from "react";
import axios from 'axios'; // Importar Axios
import style from './registro.module.css';
import Titulo from "../components/Titulo/Titulo";
import { useRouter } from 'next/navigation'; // Importar useRouter

const Registro = () => {
    // Estados para capturar los valores de los inputs
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState(null); // Para manejar mensajes de éxito o error
    const router = useRouter(); // Hook para manejar la navegación

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el refresh de la página

        // Crear el objeto con los datos del usuario
        const usuario = {
            mail: correo,
            usuario: nombre,
            contraseña: contraseña
        };

        try {
            // Enviar solicitud POST al backend usando Axios
            const response = await axios.post('http://localhost:3000/usuario/registro', usuario);

            if (response.status === 201) {
                // Si el registro es exitoso
                setMensaje('Usuario registrado exitosamente');
                // Aquí podrías redirigir a otra página, por ejemplo:
                window.location.href = '/iniciosesion'
            } else {
                // Si hay algún error, mostrar el mensaje
                setMensaje(response.data.message || 'Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setMensaje(error.response?.data?.message || 'Error al registrar el usuario');
        }
    };

    return (
        <>
            <section className={style.contenedorRegistro}>
                <div className={style.Titulo}>
                    <Titulo texto={"Registro"} />
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
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} // Capturar el valor del nombre
                        />
                        <input
                            className={style.input}
                            type="password"
                            placeholder="Contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)} // Capturar la contraseña
                        />
                    </div>
                    <div className={style.contenedorInicioSesion}>
                        <div className={style.botonRegistrarse}>
                            <button type="submit">Registrarse</button>
                        </div>
                        <div className={style.contenedorP}>
                            <a href="./iniciosesion">¿Ya tenés una cuenta?</a>
                            <a href="./iniciosesion">Inicio Sesión</a>
                        </div>
                    </div>
                </form>
                {mensaje && <p>{mensaje}</p>} {/* Mostrar el mensaje de éxito o error */}
            </section>
        </>
    );
};

export default Registro;
