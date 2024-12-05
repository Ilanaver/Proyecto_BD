'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios'; // Si usas axios para las APIs
import styles from './page.module.css';

const Home = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0); // Estado para la barra de progreso
  const [loading, setLoading] = useState(true); // Controla el estado de carga

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    // Configurar el temporizador para completar la barra en 75 segundos
    const duration = 75000; // 1 minuto y 15 segundos en milisegundos
    const interval = 100; // Intervalo de actualización en milisegundos
    const increment = 100 / (duration / interval); // Porcentaje de incremento por intervalo

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 100 ? 100 : next; // No sobrepasar el 100%
      });
    }, interval);

    // Lógica para las llamadas a las APIs
    const fetchData = async () => {
      if (userId) {
        try {
          await Promise.all([
            axios.get(`https://backmoneyminds.onrender.com/usuario/perfil/${userId}`),
            // Agrega más llamadas a APIs si es necesario
          ]);
          // APIs completadas correctamente: completar barra y redirigir
          setProgress(100);
          clearInterval(timer); // Detener la actualización de la barra
          setLoading(false);
          router.push('/Gestor');
        } catch (error) {
          console.error('Error al cargar los datos:', error);
          // En caso de error, redirigir a inicio de sesión
          setLoading(false);
          router.push('/iniciosesion');
        }
      } else {
        // Si no hay userId, redirigir a inicio de sesión
        setLoading(false);
        clearInterval(timer);
        router.push('/iniciosesion');
      }
    };

    fetchData();

    // Redirigir automáticamente si se completa el temporizador
    const completeTimeout = setTimeout(() => {
      if (loading) {
        clearInterval(timer);
        if (userId) {
          router.push('/Gestor');
        } else {
          router.push('/iniciosesion');
        }
      }
    }, duration);

    // Limpiar los temporizadores al desmontar el componente
    return () => {
      clearInterval(timer);
      clearTimeout(completeTimeout);
    };
  }, [router]);

  return (
    <section>
      <div className={styles.PaginaPrincipal}>
        <div className={styles.contenedorParteArriba}>
          <div className={styles.contenedorImagen}>
            <img className={styles.ImagenPrincipal} src="./logo.png" alt="logo página" />
          </div>
          <div className={styles.contenedorTexto}>
            <h2>
              <span className={styles.palabrasInicio}>Cargando</span> tu experiencia...
            </h2>
          </div>
          <div className={styles.contenedorBarra}>
            <div className={styles.barraProgreso}>
              <div
                className={styles.barraAvance}
                style={{ width: `${progress}%` }} // Ajusta el ancho según el progreso
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
