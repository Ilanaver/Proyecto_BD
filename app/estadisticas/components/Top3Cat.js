'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../estadisticas.module.css'; // Aquí pueden estar tus estilos personalizados
import Spinner from "./Spinner";

const Top3Categorias = () => {
    const [tipo, setTipo] = useState(1); // 1 para gastos, 2 para ingresos
    const [categorias, setCategorias] = useState([]); // Almacena las 3 categorías
    const [loading, setLoading] = useState(true); // Indicador de carga

    // Obtener los datos de las top 3 categorías de la API
    const fetchTop3Categorias = async () => {
        try {
            setLoading(true);  // Indicador de carga activado
            const userId = localStorage.getItem('userId'); // ID del usuario almacenado en localStorage
            const mes = new Date().getMonth() + 1; // Mes actual
            const ano = new Date().getFullYear(); // Año actual
            const response = await axios.get(`https://backmoneyminds.onrender.com/estadisticas/top3cat/${userId}/${tipo}/${mes}/${ano}`); // URL actualizada aquí
            const data = response.data;

            setCategorias(data); // Asignamos las categorías recibidas de la API
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);  // Indicador de carga desactivado
        }
    };

    // Usamos useEffect para obtener las top 3 categorías al montar el componente
    useEffect(() => {
        fetchTop3Categorias();
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
                <h2>{tipo === 1 ? "Top 3 Categorías de Gastos" : "Top 3 Categorías de Ingresos"}</h2>
            </div>
            <div className={styles.cardContent}>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className={styles.top3Container}>
                        {categorias.length > 0 ? (
                            <ul className={styles.top3List}>
                                {categorias.map((categoria, index) => (
                                    <li key={index} className={styles.top3Item}>
                                        <strong>{categoria.categoria}:</strong> ${categoria.total}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay datos disponibles para mostrar.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Top3Categorias;
