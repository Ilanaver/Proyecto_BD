// /components/CatGastos.js
'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import styles from '../estadisticas.module.css';

const CatGastos = () => {
    const [tipo, setTipo] = useState(1); // 1 para gastos, 2 para ingresos
    const [seriesData, setSeriesData] = useState([]); 
    const [categories, setCategories] = useState([]);

    // Obtener datos de la API
    const fetchData = async () => {
        try {
            const userId = localStorage.getItem('userId'); 
            const mes = new Date().getMonth() + 1; // Mes actual
            const ano = new Date().getFullYear(); // Año actual
            const response = await axios.get(`http://localhost:3000/estadisticas/catgastos/${userId}/${tipo}/${mes}/${ano}`);
            const data = response.data;

            const series = data.map(item => item.total_categoria);
            const labels = data.map(item => item.categoria);

            setSeriesData(series);
            setCategories(labels);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tipo]);

    const chartOptions = {
        chart: {
            type: 'donut',
            height: 350
        },
        labels: categories,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 250
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

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
                <h2>{tipo === 1 ? "Gastos por Categoría" : "Ingresos por Categoría"}</h2>
            </div>
            <div className={styles.chartContainer}>
                <ReactApexChart
                    options={chartOptions}
                    series={seriesData}
                    type="donut"
                    height={350}
                />
            </div>
        </div>
    );
};

export default CatGastos;
