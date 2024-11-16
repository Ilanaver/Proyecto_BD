'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Titulo from '../components/Titulo/Titulo'; // Ajusta la ruta según tu estructura
import Footer from '../components/Footer/Footer'; // Ajusta la ruta según tu estructura
import styles from './infoVideo.module.css'; // Ajusta la ruta según tu estructura

const InfoVideo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idvideo = searchParams.get('idvideo');

  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false); // Verifica si es cliente

  useEffect(() => {
    setIsClient(true); // Esto asegura que el código solo se ejecute en el cliente
  }, []);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!idvideo) {
        setError('ID de video no especificado.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://backmoneyminds.onrender.com/contenido-multimedia/video/${idvideo}`);
        setVideoDetails(response.data);
      } catch (error) {
        console.error('Error fetching video details:', error);
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    if (idvideo) {
      fetchVideoDetails();
    }
  }, [idvideo]);

  if (!isClient) {
    return null; // Renderiza null o un loading spinner mientras el cliente se carga
  }

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.titulo}>
        <div className={styles.flecha}>
          <img onClick={() => router.back()} src="./flechaatras.png" alt="Volver" />
        </div>
        <Titulo texto="Informacion sobre el video" />
      </div>
      <main className={styles.main}>
        {Array.isArray(videoDetails) && videoDetails.length > 0 ? (
          videoDetails.map((item, index) => (
            <div key={index} className={styles.videoInfo}>
              <h2>{item.titulo}</h2>
              <img src={item.img} alt={item.titulo} className={styles.image} />
              <p>{item.descripcion}</p>
              <p><strong>Categoria:</strong> {item.categoria}</p>
              <a href={item.videolink} target="_blank" rel="noopener noreferrer" className={styles.videoLink}>
                Ver Video
              </a>
            </div>
          ))
        ) : (
          <p>No se encontraron detalles.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default InfoVideo;
