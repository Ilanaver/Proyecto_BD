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
import dynamic from 'next/dynamic';

// Desactiva el prerenderizado estático
export const dynamic = 'force-dynamic';

const Estadisticas = () => {
    const [perfilData, setPerfilData] = useState({});  
    const [userId, setUserId] = useState(null); 
    const router = useRouter();

    useEffect(() => {
        // Solo accede al localStorage en el cliente
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

    if (!userId) {
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
