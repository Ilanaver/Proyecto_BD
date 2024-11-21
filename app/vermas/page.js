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
  const categoria = searchParams.get('categoria'); // Obtener la categoría desde los parámetros de la URL

  const [details, setDetails] = useState([]); // Detalles de los videos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Fetch los detalles del contenido
  useEffect(() => {
    if (!categoria || categoria === 'undefined') {
      setError('Categoría no especificada.');
      setLoading(false);
      return;  // Si no hay categoría válida, no hacemos la solicitud
    }

    // Realizamos la solicitud para obtener los detalles de la categoría
    axios.get(`https://backmoneyminds.onrender.com/contenido-multimedia/ver-mas/${categoria}`)
      .then(response => {
        setDetails(response.data); // Guardamos los datos obtenidos
        setLoading(false); // Indicamos que la carga ha terminado
      })
      .catch(error => {
        console.error('Error fetching data:', error); 
        setError('Error al cargar los datos.');
        setLoading(false); // Indicamos que la carga ha terminado con error
      });
  }, [categoria]);

  // Función para manejar el clic en las imágenes de los videos
  const handleImageClick = (idvideo) => {
    // Comprobamos si idvideo está definido antes de redirigir
    if (idvideo) {
      console.log('ID Video:', idvideo);  // Verificamos que idvideo tiene un valor válido
      router.push(`/infoVideo?idvideo=${idvideo}`); // Redirigimos a la página del video
    } else {
      console.error('ID de video no encontrado'); // Imprimimos el error en la consola si idvideo es undefined
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
                src={item.img || "https://media.tycsports.com/files/2024/09/01/761460/river-vs-independiente_416x234.webp?v=1"}  // Usa la imagen de la API si existe
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

export default VerMas;
