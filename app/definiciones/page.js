'use client';

import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import Titulo from "../components/Titulo/Titulo";
import style from './Terminos.module.css';
import Link from 'next/link';
import Footer from "../components/Footer/Footer";
import { useRouter } from 'next/navigation';

const Terminos = () => {
    const [definiciones, setDefiniciones] = useState([]);
    const [buscador, setBuscador] = useState('');
    const [resultadoBusqueda, setResultadoBusqueda] = useState([]);
    const [expandedIndices, setExpandedIndices] = useState([]); // Estado para controlar las tarjetas expandidas
    const [perfilData, setPerfilData] = useState({});  // Estado para almacenar los datos del perfil, incluida la foto
    const [userId, setUserId] = useState(null);  // Estado para almacenar el ID del usuario
    const router = useRouter();

    // Obtener el ID del usuario del localStorage
    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) {
            setUserId(id);
            fetchPerfilData();  // Obtener los datos del perfil una vez que el ID esté disponible
        } else {
            // Redirigir al inicio de sesión si no hay userId en localStorage
            router.push('/iniciosesion');
        }
    }, [router]);

    // Obtener los datos del perfil
    const fetchPerfilData = () => {
        if (userId) {
            axios.get(`https://backmoneyminds.onrender.com/usuario/perfil/${userId}`)
                .then(res => {
                    const perfil = res.data[0]; // Accedemos al primer objeto del array
                    setPerfilData(perfil); // Guardamos los datos en el estado
                    console.log(perfil);
                })
                .catch(err => console.error('Error fetching perfil data:', err));
        }
    };

    // Obtener las primeras 6 definiciones
    const fetchTop6 = () => {
        axios.get("https://backmoneyminds.onrender.com/definiciones")
            .then(res => {
                console.log('Fetched definiciones:', res.data);
                setDefiniciones(res.data); // Guarda las definiciones
            })
            .catch(err => console.error('Error fetching definiciones:', err));
    };

    // Obtener las definiciones según la búsqueda
    const fetchBuscador = (titulo) => {
        axios.get(`https://backmoneyminds.onrender.com/definiciones/${titulo}`)
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
        fetchPerfilData();
        fetchTop6();
    }, [userId]);

    const definicionesToShow = resultadoBusqueda.length > 0 ? resultadoBusqueda : definiciones;

    return (
        <main>
            <section className={style.contenedor}>
                <div className={style.headerContainer}>
                    <div className={style.Titulo}>
                        <Titulo texto={"Glosario"} />
                    </div>
                    <div className={style.fotoPerfilContainer}>
                        <img 
                          src={perfilData.foto ? perfilData.foto : "./fotoPerfil.png"}  // Usar la URL de la base de datos o una imagen predeterminada
                          alt="Perfil" 
                          className={style.fotoPerfil} 
                          onClick={() => router.push('/Perfil')}  // Redirige al perfil al hacer clic en la imagen
                        />
                    </div>
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

                {/* Mostrar los botones de "Agregar Definición" y "Eliminar Definición" solo si admin es true */}
                {perfilData.admin && (
                    <>
                        <Link href="./components/Agregar" className={style.Agregar}>Agregar Definición</Link>
                        <Link href="./components/eliminar" className={style.Agregar}>Eliminar Definición</Link>
                    </>
                )}
            </section>
            <Footer />
        </main>
    );
};

export default Terminos;
