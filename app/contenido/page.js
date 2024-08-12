'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import style from './contvideo.module.css';
import Titulo from "../components/Titulo/Titulo";
import Footer from "../components/Footer/Footer";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const categories = ["Ahorro", "Inversiones", "Impuestos"];

const Audiovisual = () => {
    const [content, setContent] = useState({
        Ahorro: [],
        Inversiones: [],
        Impuestos: [],
    });
    const router = useRouter();

    useEffect(() => {
        categories.forEach(category => {
            axios.get(`http://localhost:3000/contenido-multimedia/${category}`)
                .then(response => {
                    setContent(prevContent => ({
                        ...prevContent,
                        [category]: response.data,
                    }));
                })
                .catch(error => {
                    console.error(`Error fetching data for ${category}:`, error);
                });
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
            <Titulo texto={"Contenido Audiovisual"} />
            <div className={style.contenedorContenido}>
                {categories.map(category => (
                    <div key={category} className={style.contenido}>
                        <div className={style.tituloContenido}>
                            <h2>{category}</h2>
                            <button onClick={() => handleVerMasClick(category)} className={style.verMasButton}>Ver más</button>
                        </div>
                        <div className={style.imagenesContenido}>
                            {content[category].map((item, index) => (
                                <div key={index} className={style.item} onClick={() => handleImageClick(item.idvideo)}>
                                    <img
                                        src={item.img}
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
            <Link href="./components/agregar" className={style.Agregar}>Agregar Definicion</Link>
            <Footer />
        </main>
    );
};

export default Audiovisual;
