'use client';
import React, { useEffect, useState } from "react";
import CatGastos from './components/CatGastos';
import SaldoPorMes from './components/SaldoPorMes';
import RealDiarioChart from "./components/RealDiario";
import styles from './estadisticas.module.css'; 
import axios from "axios";
import Footer from "../components/Footer/Footer";
import Titulo from "../components/Titulo/Titulo";
import PromedioDiario from './components/PromDiario';
import Top3Categorias from "./components/Top3Cat";
import { useRouter } from 'next/navigation';

const Estadisticas = () => {
    const [perfilData, setPerfilData] = useState({});  // Estado para almacenar los datos del perfil, incluida la foto
    const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario
    const router = useRouter();

    useEffect(() => {
        // Asegurarse de que se ejecuta solo en el cliente
        const id = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
        if (id) {
            setUserId(id);
        } else {
            // Redirigir al inicio de sesión si no hay userId en localStorage
            router.push('/iniciosesion');
        }
    }, [router]);

    useEffect(() => {
        // Solo fetch si existe userId
        const fetchPerfilData = async () => {
            try {
                if (userId) {
                    const res = await axios.get(`https://backmoneyminds.onrender.com/usuario/perfil/${userId}`); // URL actualizada aquí
                    const perfil = res.data[0]; // Accedemos al primer elemento del array
                    setPerfilData(perfil); // Guardamos el primer objeto en el estado
                }
            } catch (err) {
                console.error('Error fetching perfil data:', err);
            }
        };
        fetchPerfilData();
    }, [userId]);

    // Muestra un indicador de carga mientras se espera el ID del usuario
    if (!userId) {
        return <div>Cargando...</div>;
    }

    return (
        <section>
            <div className={styles.tituloGestor}>
                <Titulo texto={"Estadisticas"} />
                <div className={styles.fotoPerfilContainer}>
                    <img 
                        src={perfilData.foto ? perfilData.foto : "./fotoPerfil.png"}  // Usar la URL de la base de datos o una imagen por defecto
                        alt="Perfil" 
                        className={styles.fotoPerfil} 
                        onClick={() => router.push('/Perfil')}  // Redirige al perfil al hacer clic en la imagen
                    />
                </div>
            </div>
            <div className={styles.estadisticasContainer}>
                <Top3Categorias />
                <CatGastos />
                <SaldoPorMes />
                <RealDiarioChart />
                <PromedioDiario />
            </div>
            <Footer />
        </section>
    );
};

export default Estadisticas;
