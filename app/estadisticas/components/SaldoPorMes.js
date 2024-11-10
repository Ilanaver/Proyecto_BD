// /components/SaldoPorMes.js
'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import styles from '../estadisticas.module.css';

const SaldoPorMes = () => {
    const [tipo, setTipo] = useState(1); // 1 para ingresos, 2 para gastos
    const [saldoMesesData, setSaldoMesesData] = useState([]); 
    const [months, setMonths] = useState([]);
    const [loading, setLoading] = useState(false); // Indicador de carga

    // Array con los nombres de los meses
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const fetchSaldoMeses = async () => {
        try {
            setLoading(true); // Activar indicador de carga
            const userId = localStorage.getItem('userId'); 
            const ano = new Date().getFullYear();
            const response = await axios.get(`http://localhost:3000/estadisticas/saldoMeses/${userId}/${tipo}/${ano}`);
            const data = response.data;

            // Convertir los números de los meses en nombres de meses
            const series = data.map(item => item.saldo);
            const labels = data.map(item => monthNames[item.mes - 1]); // Convertimos mes número a nombre

            setSaldoMesesData(series);
            setMonths(labels);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Desactivar indicador de carga
        }
    };

    useEffect(() => {
        fetchSaldoMeses();  // Cargar los datos cuando se monta el componente o cambia el tipo
    }, [tipo]);  // Dependencia: solo cambia cuando el tipo cambia

    const maxSaldo = Math.max(...saldoMesesData); // Obtener el valor máximo de la serie de datos

    const saldoMesesOptions = {
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
                show: false, // Oculta la barra de herramientas del gráfico
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,  // Los valores aparecerán encima de las barras
            formatter: function (val) {
                return `$${val}`;  // Mostrar el valor como está, sin porcentaje o formato extra
            },
            offsetY: -20,  // Aumentamos el espacio entre los valores y las barras
            style: {
                fontSize: '12px',
                colors: ["#304758"],
            },
        },
        xaxis: {
            categories: months,  // Usamos los nombres de los meses en el eje X
            position: 'bottom',  // Colocamos las etiquetas de los meses en la parte inferior
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,  // Deshabilitamos los números del eje Y
            },
            max: Math.ceil(maxSaldo * 1.2), // Establecer el máximo del eje Y (un poco más alto que el máximo valor de saldo)
        },
        annotations: {
            yaxis: [
                {
                    y: maxSaldo, // Mostrar una línea en el valor máximo
                    borderColor: '#FF0000', // Color de la línea
                    label: {
                        text: `Máximo: $${maxSaldo}`, // Etiqueta con el valor máximo
                        style: {
                            color: '#FF0000',
                            background: '#FFF',
                        },
                    },
                },
            ],
        },
        title: {
            text: 'Saldo Mensual',
            floating: true,
            offsetY: 350,  // Cambiar para dar espacio entre la barra y el título
            align: 'center',
            style: {
                color: '#444',
            },
        },
        grid: {
            show: true,
            borderColor: '#f1f1f1',
            strokeDashArray: 4,
        },
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
                <h2>{tipo === 1 ? "Gastos por Mes" : "Ingresos por Mes"}</h2>
            </div>
            {loading ? (
                <div className={styles.loader}>Cargando...</div>  // Indicador de carga
            ) : (
                <div className={styles.chartContainer}>
                    <ReactApexChart
                        options={saldoMesesOptions}
                        series={[{ name: 'Saldo', data: saldoMesesData }]}
                        type="bar"
                        height={350}
                    />
                </div>
            )}
        </div>
    );
};

export default SaldoPorMes;
