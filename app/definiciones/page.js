'use client';

import React, { useEffect, useState } from "react";
import axios from 'axios'; // Asegúrate de tener axios importado
import Titulo from "../components/Titulo/Titulo";
import style from './Terminos.module.css';
import Link from 'next/link'
import Footer from "../components/Footer/Footer";

const Terminos = () => {
    const [definiciones, setDefiniciones] = useState([]);
    const [buscador, setBuscador] = useState('');
    const [resultadoBusqueda, setResultadoBusqueda] = useState([]);
    const [expandedIndices, setExpandedIndices] = useState([]); // Estado para controlar las tarjetas expandidas

    const fetchTop6 = () => {
        axios.get("http://localhost:3000/definiciones")
            .then(res => {
                console.log('Fetched definiciones:', res.data);
                setDefiniciones(res.data); // Guarda las definiciones
            })
            .catch(err => console.error('Error fetching definiciones:', err));
    };

    const fetchBuscador = (titulo) => {
        axios.get(`http://localhost:3000/definiciones/${titulo}`)
            .then(res => {
                console.log('Fetched busqueda:', res.data);
                setResultadoBusqueda(res.data); 
            })
            .catch(err => console.error('Error fetching busqueda:', err));
    };

    const handleSearchChange = (e) => {
        setBuscador(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchBuscador(buscador);
    };

    const toggleContentVisibility = (index) => {
        setExpandedIndices(prevIndices => 
            prevIndices.includes(index) 
                ? prevIndices.filter(i => i !== index) 
                : [...prevIndices, index]
        );
    };

    useEffect(() => {
        fetchTop6();
    }, []);

    const definicionesToShow = resultadoBusqueda.length > 0 ? resultadoBusqueda : definiciones;

    return (
        <main>
            <section className={style.contenedor}>
                <div className={style.Titulo}>
                    <Titulo texto={"Definicion de Terminos"} />
                </div>
                <div className={style.ContenedorBuscador}>
                    <form className={style.Buscador} onSubmit={handleSearchSubmit}>
                        <img src="/lupa.png" alt="" />
                        <input 
                            type="text" 
                            value={buscador} 
                            onChange={handleSearchChange} 
                            placeholder="Buscar algo" 
                        />
                        <button type="submit">Buscar</button>
                    </form>
                </div>
                <div className={style.ContenedorTarjetas}>
                    {definicionesToShow.map((definicion, index) => (
                        <div className={style.tarjeta} key={index}>
                            <div className={style.tarjetaHeader}>
                                <h2>{definicion.titulo}</h2>
                                <img 
                                    src="/flechaabajo.png" 
                                    alt="" 
                                    onClick={() => toggleContentVisibility(index)} 
                                    style={{ cursor: 'pointer' }} 
                                />
                            </div>
                            {expandedIndices.includes(index) && (
                                <div className={style.contenido}>
                                    {definicion.contenido}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <Link href="./components/agregar" className={style.Agregar}>Agregar Definicion</Link>
                <Link href="./components/eliminar" className={style.Agregar}>Eliminar Definicion</Link>
            </section>
            <Footer></Footer>
        </main>
    );
};

export default Terminos;
