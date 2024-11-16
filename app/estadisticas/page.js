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
    const [isClient, setIsClient] = useState(false); // Estado para manejar el lado del cliente

    const router = useRouter();

    // Asegurarse de que el código se ejecuta solo en el cliente
    useEffect(() => {
        setIsClient(true); // Esto asegura que el código solo se ejecuta en el cliente
    }, []);

    useEffect(() => {
        if (isClient) {
            const id = localStorage.getItem('userId');
            if (id) {
                setUserId(id);
            } else {
                // Redirigir al inicio de sesión si no hay userId en localStorage
                router.push('/iniciosesion');
            }
        }
    }, [isClient, router]);

    const fetchPerfilData = () => {
        if (userId) {
            axios.get(`https://backmoneyminds.onrender.com/usuario/perfil/${userId}`) // URL actualizada aquí
                .then(res => {
                    const perfil = res.data[0]; // Accedemos al primer elemento del array
                    setPerfilData(perfil); // Guardamos el primer objeto en el estado
                })
                .catch(err => console.error('Error fetching perfil data:', err));
        }
    };

    useEffect(() => {
        if (userId) {
            fetchPerfilData();
        }
    }, [userId]);

    // Solo renderizar el componente si estamos en el cliente (ya que dependemos de window)
    if (!isClient) {
        return null; // o un loading spinner si prefieres mostrar algo mientras se carga
    }

    return (
        <section>
            <div className={styles.tituloGestor}>
                <Titulo texto={"Estadisticas"}/>
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
