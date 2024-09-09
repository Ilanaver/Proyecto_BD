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
    const router = useRouter();

    useEffect(() => {
        // Obtener todas las categorías desde la API
        axios.get('http://localhost:3000/contenido-multimedia/')
            .then(response => {
                console.log(response.data)
                // Extraer categorías únicas de la respuesta
                const categoriasUnicas = [...new Set(response.data.map(item => item.categoria))];
                setCategories(categoriasUnicas);

                // Para cada categoría, obtener los videos correspondientes
                categoriasUnicas.forEach(category => {
                    axios.get(`http://localhost:3000/contenido-multimedia/${category}`)
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

    return (
        <main>
            <section className={style.contenedor}>    
                <div className={style.tituloaudiovisual}>
                    <Titulo texto={"Contenido Audiovisual"}/>
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
                <Link href="./components/Agregar" className={style.Agregar}>Agregar Definicion</Link>
                <Link href="./components/eliminar" className={style.Agregar}>Eliminar Definicion</Link>
            </section>
            <Footer />
        </main>
    );
};

export default Audiovisual;
