'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../estadisticas.module.css'; // Aquí pueden estar tus estilos personalizados
import Spinner from "./Spinner";

const PromedioDiario = () => {
    const [tipo, setTipo] = useState(1); // 1 para gastos, 2 para ingresos
    const [promedio, setPromedio] = useState(null); // Promedio diario
    const [loading, setLoading] = useState(true); // Carga

    // Obtener los datos del promedio diario de la API
    const fetchPromedioDiario = async () => {
        try {
            setLoading(true);  // Indicador de carga activado
            const userId = localStorage.getItem('userId'); // ID del usuario almacenado en localStorage
            const mes = new Date().getMonth() + 1; // Mes actual
            const ano = new Date().getFullYear(); // Año actual
            const response = await axios.get(`https://backmoneyminds.onrender.com/estadisticas/promedioDiario/${userId}/${tipo}/${mes}/${ano}`);
            const data = response.data;

            setPromedio(data); // Asignamos el promedio recibido de la API
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);  // Indicador de carga desactivado
        }
    };

    // Usamos useEffect para obtener el promedio al montar el componente
    useEffect(() => {
        fetchPromedioDiario();
    }, [tipo]); // Se vuelve a cargar si el tipo cambia

    const handleSelectChange = (selectedTipo) => {
        setTipo(selectedTipo);
    };

    return (
        <div className={styles.card}>
            <div className={styles.selectorContainer}>
                <button
                    className={`${styles.selectorButton} ${tipo === 1 ? styles.selected : ''}`}
                    onClick={() => handleSelectChange(1)}
                >
                    Gastos
                </button>
                <button
                    className={`${styles.selectorButton} ${tipo === 2 ? styles.selected : ''}`}
                    onClick={() => handleSelectChange(2)}
                >
                    Ingresos
                </button>
            </div>
            <div className={styles.cardHeader}>
                <h2>{tipo === 1 ? "Promedio Diario de Gastos" : "Promedio Diario de Ingresos"}</h2>
            </div>
            <div className={styles.cardContent}>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className={styles.promedioContainer}>
                        <p className={styles.promedioText}>
                            {promedio !== null && promedio !== undefined
                                ? `$${promedio}`
                                : 'No hay datos disponibles'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromedioDiario;
