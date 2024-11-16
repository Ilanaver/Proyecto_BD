'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from './contvideo.module.css';
import Titulo from "../components/Titulo/Titulo";
import Footer from "../components/Footer/Footer";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Audiovisual = () => {
    const [categories, setCategories] = useState([]);  // Estado para categorías dinámicas
    const [content, setContent] = useState({});
    const [perfilData, setPerfilData] = useState({});  // Estado para almacenar los datos del perfil
    const [userId, setUserId] = useState(null);  // Estado para almacenar el ID del usuario
    const router = useRouter();

    // Obtener el ID del usuario del localStorage
    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) {
            setUserId(id);
            // Obtener los datos del perfil una vez que el ID esté disponible
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
                })
                .catch(err => console.error('Error fetching perfil data:', err));
        }
    };

    // Obtener todas las categorías desde la API
    useEffect(() => {
        axios.get('https://backmoneyminds.onrender.com/contenido-multimedia/')
            .then(response => {
                console.log(response.data);
                const categoriasUnicas = [...new Set(response.data.map(item => item.categoria))];
                setCategories(categoriasUnicas);

                // Para cada categoría, obtener los videos correspondientes
                categoriasUnicas.forEach(category => {
                    axios.get(`https://backmoneyminds.onrender.com/contenido-multimedia/${category}`)
                        .then(response => {
                            setContent(prevContent => ({
                                ...prevContent,
                                [category]: response.data.slice(0, 4), // Top 4 videos por categoría
                            }));
                        })
                        .catch(error => {
                            console.error(`Error fetching data for ${category}:`, error);
                        });
                });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleVerMasClick = (category) => {
        router.push(`/vermas?categoria=${category}`);
    };

    const handleImageClick = (idvideo) => {
        router.push(`/infoVideo?idvideo=${idvideo}`);
    };

    useEffect(() => {
        fetchPerfilData();
    }, [userId]);

    return (
        <main>
            <section className={style.contenedor}>    
                <div className={style.headerContainer}>
                    <div className={style.Titulo}>
                        <Titulo texto={"Contenido audiovisual"} />
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
                <div className={style.contenedorContenido}>
                    {/* Renderizar dinámicamente las categorías y sus videos */}
                    {categories.map(category => (
                        <div key={category} className={style.contenido}>
                            <div className={style.tituloContenido}>
                                <h2>{category}</h2>
                                <button onClick={() => handleVerMasClick(category)} className={style.verMasButton}>Ver más</button>
                            </div>
                            <div className={style.imagenesContenido}>
                                {(content[category] || []).map((item, index) => (
                                    <div key={index} className={style.item} onClick={() => handleImageClick(item.idvideo)}>
                                        <img
                                            src='/audiovisual.png'
                                            alt={item.titulo}
                                            className={style.image}
                                        />
                                        <p className={style.itemTitle}>{item.titulo}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mostrar los botones de "Agregar" y "Eliminar" solo si admin es true */}
                {perfilData.admin && (
                    <>
                        <Link href="./components/Agregar" className={style.Agregar}>Agregar Video</Link>
                        <Link href="./components/eliminar" className={style.Agregar}>Eliminar Video</Link>
                    </>
                )}
            </section>
            <Footer />
        </main>
    );
};

export default Audiovisual;
