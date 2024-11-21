'use client';

import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import Titulo from '../components/Titulo/Titulo';
import Footer from '../components/Footer/Footer';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './ver-mas.module.css';

const VerMas = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoria = searchParams.get('categoria');

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoria || categoria === 'undefined') {
      setError('Categoría no especificada.');
      setLoading(false);
      return;
    }

    axios.get(`https://backmoneyminds.onrender.com/contenido-multimedia/ver-mas/${categoria}`)
      .then(response => {
        setDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error); 
        setError('Error al cargar los datos.');
        setLoading(false);
      });
  }, [categoria]);

  const handleImageClick = (idvideo) => {
    if (idvideo) {
      console.log('ID Video:', idvideo);  
      router.push(`/infoVideo?idvideo=${idvideo}`);
    } else {
      console.error('ID de video no encontrado');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className={styles.main}>
      <div className={styles.titulo}>
        <div className={styles.flecha}>
          <img onClick={() => router.back()} src="./flechaatras.png" alt="Volver" />
        </div>
        <Titulo texto={`Más sobre ${categoria}`} />
      </div>
      <div className={styles.container}>
        {details.length === 0 ? (
          <p>No se encontraron detalles.</p>
        ) : (
          details.map((item, index) => (
            <div key={index} className={styles.item} onClick={() => handleImageClick(item.idvideo)}>
              <h2>{item.titulo}</h2>
              <img
                src={item.img || "https://media.tycsports.com/files/2024/09/01/761460/river-vs-independiente_416x234.webp?v=1"}
                alt={item.titulo}
                className={styles.image}
              />
              <p>{item.descripcion}</p>
            </div>
          ))
        )}
      </div>
      <Footer />
    </main>
  );
};

const VerMasWithSuspense = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <VerMas />
  </Suspense>
);

export default VerMasWithSuspense;
