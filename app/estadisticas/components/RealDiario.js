'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import styles from '../estadisticas.module.css';
import Spinner from "./Spinner";

const ApexChart = () => {
    const [tipo, setTipo] = useState(1); // 1 para ingresos, 2 para gastos
    const [seriesData, setSeriesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxMonto, setMaxMonto] = useState(0); // Almacenar el máximo del mes
    const [rango25, setRango25] = useState(0); // 25% del máximo
    const [rango50, setRango50] = useState(0); // 50% del máximo
    const [rango75, setRango75] = useState(0); // 75% del máximo

    // Función para obtener el día de mayor ingreso o gasto
    const fetchDiaMayor = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const mes = new Date().getMonth() + 1; // Mes actual (1-12)
            const ano = new Date().getFullYear(); // Año actual
            const response = await axios.get(`https://backmoneyminds.onrender.com/estadisticas/diamayor/${userId}/${tipo}/${mes}/${ano}`);
            const data = response.data;

            // Obtener el monto del día de mayor ingreso/gasto
            if (data && data.totalDia) {
                const maxMontoTemp = data.totalDia;
                setMaxMonto(maxMontoTemp); // Establecer el máximo

                // Dividir el máximo en 4 rangos de 25%
                setRango25(maxMontoTemp * 0.25);
                setRango50(maxMontoTemp * 0.50);
                setRango75(maxMontoTemp * 0.75);
            }
        } catch (error) {
            console.error("Error fetching dia mayor:", error);
        }
    };

    // Función para obtener y procesar los datos de la API de los ingresos/gastos diarios
    const fetchData = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem('userId');
            const mes = new Date().getMonth() + 1; // Mes actual (1-12)
            const ano = new Date().getFullYear(); // Año actual
            const response = await axios.get(`https://backmoneyminds.onrender.com/estadisticas/realDiario/${userId}/${tipo}/${mes}/${ano}`);
            const data = response.data;

            if (data && data.length > 0) {
                // Generar todos los días del mes y asignar un valor de monto
                const diasDelMes = Array.from({ length: 31 }, (_, i) => i + 1); // Días del 1 al 31

                // Mapeo de días de la semana
                const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
                
                // Crear una estructura para el gráfico, cada fila corresponde a un día de la semana
                const groupedData = diasSemana.map(diaSemana => {
                    const valoresDia = diasDelMes.map(diaMes => {
                        // Buscar si existe un monto para este día
                        const monto = data.find(item => item.dia === diaMes && item.nombreDia === diaSemana)?.monto || 0;

                        let rango = 0; // Definir un valor por defecto si no se asigna ningún monto
                        if (monto !== null && monto > 0) {
                            // Asignar el rango basado en el valor del monto
                            if (monto <= rango25) {
                                rango = 0; // 0-25%
                            } else if (monto <= rango50) {
                                rango = 0.25; // 26-50%
                            } else if (monto <= rango75) {
                                rango = 0.5; // 51-75%
                            } else {
                                rango = 0.75; // 76-100%
                            }
                        } else {
                            rango = -1; // Para valores 0
                        }

                        return {
                            x: `Día ${diaMes}`,
                            y: monto,
                            rango: rango // Agregar el rango calculado
                        };
                    });

                    return {
                        name: diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1),
                        data: valoresDia
                    };
                });

                setSeriesData(groupedData);
            } else {
                // Si no hay datos, mostrar series vacías
                setSeriesData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setSeriesData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiaMayor();  // Cargar el día de mayor ingreso o gasto
        fetchData();      // Cargar los datos cuando se monta el componente o cambia el tipo
    }, [tipo]);  // Dependencia: solo cambia cuando el tipo cambia

    // Configuración del gráfico
    const chartOptions = {
        chart: {
            width: '100%',  // Aumentamos el ancho para que ocupe todo el espacio horizontal disponible
            height: 450,    // Mantuvimos la altura igual
            type: 'heatmap',
            toolbar: {
                show: false, // Ocultar la barra de herramientas
            },
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        { from: 0, to: rango25, color: '#008FFB' }, // Color para el rango 0-25%
                        { from: rango25, to: rango50, color: '#00FF00' }, // Color para el rango 26-50%
                        { from: rango50, to: rango75, color: '#FF9800' }, // Color para el rango 51-75%
                        { from: rango75, to: maxMonto, color: '#FF0000' }, // Color para el rango 76-100%
                        { from: 0, to: 0, color: '#FFFFFF', name: 'Sin datos' } // Blanco para valores 0
                    ],
                    inverse: false
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            title: {
                text: 'Día del Mes'
            },
            labels: {
                rotate: -45,
                show: true
            }
        },
        yaxis: {
            title: {
                text: 'Día de la Semana'
            },
            labels: {
                formatter: (value) => value // Muestra el día de la semana
            }
        },
    };

    const handleSelectChange = (selectedTipo) => {
        setTipo(selectedTipo);  // Cambiar tipo entre ingresos (1) y gastos (2)
    };

    return (
        <div className={styles.card}>
            <div className={styles.selectorContainer}>
                <button
                    className={`${styles.selectorButton} ${tipo === 1 ? styles.selected : ''}`}
                    onClick={() => handleSelectChange(1)} // Ingresos
                >
                    Gastos
                </button>
                <button
                    className={`${styles.selectorButton} ${tipo === 2 ? styles.selected : ''}`}
                    onClick={() => handleSelectChange(2)} // Gastos
                >
                    Ingresos
                </button>
            </div>
            <div className={styles.cardHeader}>
                <h2>{tipo === 1 ? "Gastos Diarios por Día del Mes" : "Ingresos Diarios por Día del Mes"}</h2>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <div className={styles.chartContainer}>
                    <ReactApexChart options={chartOptions} series={seriesData} type="heatmap" height={350} width={350}/>
                </div>
            )}
        </div>
    );
};

export default ApexChart;
