'use client';
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';  // Import dynamic
import axios from "axios";
import Footer from "../components/Footer/Footer";
import Titulo from "../components/Titulo/Titulo";
import { useRouter } from 'next/navigation';
import styles from './estadisticas.module.css';

// Dynamically load components that depend on client-side functionality
const CatGastos = dynamic(() => import('./components/CatGastos'), { ssr: false });
const SaldoPorMes = dynamic(() => import('./components/SaldoPorMes'), { ssr: false });
const RealDiarioChart = dynamic(() => import("./components/RealDiario"), { ssr: false });
const PromedioDiario = dynamic(() => import('./components/PromDiario'), { ssr: false });
const Top3Categorias = dynamic(() => import("./components/Top3Cat"), { ssr: false });

const Estadisticas = () => {
    const [perfilData, setPerfilData] = useState({});  
    const [userId, setUserId] = useState(null); 
    const [isClient, setIsClient] = useState(false);  
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        const id = localStorage.getItem('userId');
        if (id) {
            setUserId(id);
        } else {
            router.push('/iniciosesion');
        }
    }, [router]);

    useEffect(() => {
        const fetchPerfilData = async () => {
            try {
                if (userId) {
                    const res = await axios.get(`https://backmoneyminds.onrender.com/usuario/perfil/${userId}`);
                    const perfil = res.data[0];
                    setPerfilData(perfil);
                }
            } catch (err) {
                console.error('Error fetching perfil data:', err);
            }
        };
        fetchPerfilData();
    }, [userId]);

    if (!userId || !isClient) {  
        return <div>Cargando...</div>;
    }

    return (
        <section>
            <div className={styles.tituloGestor}>
                <Titulo texto={"Estadisticas"} />
                <div className={styles.fotoPerfilContainer}>
                    <img 
                        src={perfilData.foto ? perfilData.foto : "./fotoPerfil.png"}  
                        alt="Perfil" 
                        className={styles.fotoPerfil} 
                        onClick={() => router.push('/Perfil')}  
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
