'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Titulo from '../components/Titulo/Titulo'; // Ajusta la ruta según tu estructura
import Footer from '../components/Footer/Footer'; // Ajusta la ruta según tu estructura
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './ver-mas.module.css'; // Ajusta la ruta según tu estructura

const VerMas = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoria = searchParams.get('categoria');

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoria) {
      axios.get(`http://localhost:3000/contenido-multimedia/ver-mas/${categoria}`)
        .then(response => {
          setDetails(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Error al cargar los datos.');
          setLoading(false);
        });
    } else {
      setError('Categoría no especificada.');
      setLoading(false);
    }
  }, [categoria]);

  const handleImageClick = (idvideo) => {
    router.push(`/infoVideo?idvideo=${idvideo}`);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <Titulo texto={`Más sobre ${categoria}`} />
      <main className={styles.main}>
        {details.length === 0 ? (
          <p>No se encontraron detalles.</p>
        ) : (
          details.map((item, index) => (
            <div key={index} className={styles.item} onClick={() => handleImageClick(item.idvideo)}>
              <h2>{item.titulo}</h2>
              <img src={item.img} alt={item.titulo} className={styles.image} />
              <p>{item.descripcion}</p>
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VerMas;
