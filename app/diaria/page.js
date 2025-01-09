'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './diaria.module.css';
import Titulo from "../components/Titulo/Titulo";
import Footer from "../components/Footer/Footer";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Subtitulo from "../components/Subtitulo/Subtitulo";

const Diara = () => {
    const [perfilData, setPerfilData] = useState({});
    const [userId, setUserId] = useState(null);
    const [lecciones, setLecciones] = useState([]);
    const router = useRouter();

    // Obtener el perfil del usuario
    const fetchPerfilData = () => {
        if (userId) {
            axios.get(`https://backmoneyminds.onrender.com/usuario/perfil/${userId}`)
                .then(res => {
                    const perfil = res.data[0];
                    setPerfilData(perfil);
                })
                .catch(err => console.error('Error fetching perfil data:', err));
        }
    };

    // Obtener lecciones diarias por fecha
    const fetchLeccionesByFecha = (fecha) => {
        axios.get(`https://backmoneyminds.onrender.com/leccion-diaria/${fecha}`)
            .then(res => {
                setLecciones(res.data);
            })
            .catch(err => console.error('Error fetching lecciones:', err));
    };

    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) {
            setUserId(id);
        } else {
            router.push('/iniciosesion');
        }
    }, [router]);

    useEffect(() => {
        fetchPerfilData();
        const today = new Date().toISOString().split('T')[0];
        fetchLeccionesByFecha(today);
    }, [userId]);

    return (
        <>
            <section className={styles.contenedor}>
                <div className={styles.headerContainer}>
                    <div className={styles.Titulo}>
                        <Titulo texto={"Lección diaria"} />
                    </div>
                    <div className={styles.fotoPerfilContainer}>
                        <img 
                            src={perfilData.foto ? perfilData.foto : "./fotoPerfil.png"}
                            alt="Perfil" 
                            className={styles.fotoPerfil} 
                            onClick={() => router.push('/Perfil')}
                        />
                    </div>
                </div>
                
                {/* Mostrar lecciones diarias */}
                <div className={styles.contenedortarjetas}>
                    {lecciones.map((leccion, index) => (
                        <div className={styles.cards} key={index}>
                            <Subtitulo texto={leccion.titulo} />
                            <p className={styles.description}>{leccion.descripcion}</p>
                            <Link href={leccion.contenido} passHref>
                                <button className={styles.boton}>Ir a la lección diaria</button>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Mostrar botones solo si el usuario es admin */}
                {perfilData.admin && (
                    <div className={styles.botonContainer}>
                        <button className={styles.botonAccion} onClick={() => router.push('/leccionmanager')}>
                            Agregar Lección
                        </button>
                        <button className={styles.botonAccion} onClick={() => router.push('/leccionmanager')}>
                            Actualizar Lección
                        </button>
                        <button className={styles.botonAccion} onClick={() => router.push('/leccionmanager')}>
                            Eliminar Lección
                        </button>
                    </div>
                )}

                <Footer />
            </section>
        </>
    );
};

export default Diara;
