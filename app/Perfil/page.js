'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from './perfil.module.css';
import Footer from "../components/Footer/Footer";
import Titulo from "../components/Titulo/Titulo";
import { useSearchParams, useRouter } from 'next/navigation';

const Perfil = () => {
    const [perfilData, setPerfilData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isInputVisible, setIsInputVisible] = useState(false); // Estado para mostrar/ocultar el input
    const [newImage, setNewImage] = useState(null); // Estado para la nueva imagen (URL o archivo)
    const [file, setFile] = useState(null); // Para manejar archivos desde el dispositivo
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem('userId');
            setUserId(storedUserId);
        }
    }, []);

    const fetchPerfilData = () => {
        if (userId) {
            axios.get(`http://localhost:3000/usuario/perfil/${userId}`)
                .then(res => {
                    const perfil = res.data[0];
                    setPerfilData(perfil);
                })
                .catch(err => console.error('Error fetching perfil data:', err));
        }
    };

    useEffect(() => {
        fetchPerfilData();
    }, [userId]);

    // Manejar el cambio de imagen
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // Guardamos el archivo seleccionado en el estado
        } else {
            alert('No se ha seleccionado ninguna imagen');
        }
    };
    
    // Enviar la nueva foto de perfil
    const cambiarFotoPerfil = () => {
        if (!file) {
            alert('Por favor selecciona una imagen antes de intentar cambiar la foto de perfil.');
            return;
        }
    
        const formData = new FormData();
        formData.append('idperfil', userId);
        formData.append('foto', file);
    
        axios.patch('http://localhost:3000/usuario/cambiar-foto-perfil', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            alert('Foto de perfil actualizada exitosamente');
            fetchPerfilData();  // Actualizamos los datos del perfil
        })
        .catch(err => {
            console.error('Error al cambiar la foto de perfil:', err);
            alert('Error al cambiar la foto de perfil. Por favor intenta nuevamente.');
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
                        onClick={() => setIsInputVisible(!isInputVisible)} // Al hacer clic muestra el input
                    />
                </div>

                {/* Mostrar input para subir la foto si se hace clic en la imagen */}
                {isInputVisible && (
                    <div className={style.inputContainer}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
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
                {/* Otras opciones del perfil */}
                <Footer />
            </div>
        </>
    );
};

export default Perfil;
