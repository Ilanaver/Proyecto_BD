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
    const [perfilData, setPerfilData] = useState({});  // Estado para almacenar los datos del perfil
    const [userId, setUserId] = useState(null);  // Estado para almacenar el ID del usuario
    const router = useRouter();
    
    const fetchPerfilData = () => {
        if (userId) {
            axios.get(`http://localhost:3000/usuario/perfil/${userId}`)
                .then(res => {
                    const perfil = res.data[0]; // Accedemos al primer objeto del array
                    setPerfilData(perfil); // Guardamos los datos en el estado
                })
                .catch(err => console.error('Error fetching perfil data:', err));
        }
    };

    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) {
            setUserId(id);
        } else {
            // Redirigir al inicio de sesión si no hay userId en localStorage
            router.push('/iniciosesion');
        }
    }, [router]);

    useEffect(() => {
        fetchPerfilData();
    }, [userId]);

    return(
        <>
            <section>
                <div className={styles.headerContainer}>
                    <div className={styles.Titulo}>
                        <Titulo texto={"Lecciones diarias"} />
                    </div>
                    <div className={styles.fotoPerfilContainer}>
                        <img 
                            src={perfilData.foto ? perfilData.foto : "./fotoPerfil.png"}  // Usar la URL de la base de datos o una imagen predeterminada
                            alt="Perfil" 
                            className={styles.fotoPerfil} 
                            onClick={() => router.push('/Perfil')}  // Redirige al perfil al hacer clic en la imagen
                        />
                    </div>
                </div>
                <div className={styles.contenedortarjetas}>
                    <div className={styles.cards}>
                        <Subtitulo texto={"Lección 1"}/>
                        <Link href="https://forms.gle/PxGmZ7DoSsXvrvDi7" passHref>
                            <button className={styles.boton}>Ir a la lección diaria</button>
                        </Link>
                    </div>
                    <div className={styles.cards}>
                        <Subtitulo texto={"Lección 2"}/>
                        <Link href="https://forms.gle/mUJuCemviN8zqWap8" passHref>
                            <button className={styles.boton}>Ir a la lección diaria</button>
                        </Link>
                    </div>
                    <div className={styles.cards}>
                        <Subtitulo texto={"Lección 3"}/>
                        <Link href="https://forms.gle/GgqxQHJpAAKrN6Cr6" passHref>
                            <button className={styles.boton}>Ir a la lección diaria</button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    );
};

export default Diara;
