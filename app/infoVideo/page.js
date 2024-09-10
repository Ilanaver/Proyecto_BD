'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    console.log("idvideo", idvideo)
    if (idvideo) {
      axios.get(`http://localhost:3000/contenido-multimedia/video/${idvideo}`)
        .then(response => {
          setVideoDetails(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching video details:', error);
          setError('Error al cargar los datos.');
          setLoading(false);
        });
    } else {
      setError('ID de video no especificado.');
      setLoading(false);
    }
  }, [idvideo]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.titulo}>
        <div className={styles.flecha}>
          <img onClick={() => router.back()} src="./flechaatras.png" alt=""/>
        </div>
        <Titulo texto={`Informacion sobre el video`} />
      </div>
      <main className={styles.main}>
      {videoDetails.length === 0 ? (
          <p>No se encontraron detalles.</p>
        ) : (
            videoDetails.map((item, index) => (
            <div key={index} className={styles.videoInfo}>
              <h2>{item.titulo}</h2>
              <img src={item.img} alt={item.titulo} className={styles.image} />
              <p>{item.descripcion}</p>
              <p><strong>Categoria:</strong> {item.categoria}</p>
              <a href={item.videolink} target="_blank" rel="noopener noreferrer" className={styles.videoLink}>Ver Video</a>

            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
};

export default InfoVideo;
