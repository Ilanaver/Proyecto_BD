'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Para redirigir programáticamente
import styles from './page.module.css'; // Asegúrate de que el archivo de estilos esté en la misma ubicación o ajusta la ruta si es necesario.

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Estado para manejar la pantalla de carga

  useEffect(() => {
    // Simula una pantalla de carga mientras verificas el localStorage
    const timer = setTimeout(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        // Si hay un userId en el localStorage, redirige a la pantalla principal
        router.push('/Gestor');
      } else {
        // Si no hay userId, redirige a la pantalla de inicio de sesión
        router.push('/iniciosesion');
      }
    }, 1000); // Tiempo de espera para simular la carga

    // Limpiar el temporizador en caso de desmontar el componente
    return () => clearTimeout(timer);
  }, [router]);

  // Mientras se verifica el localStorage, muestra una pantalla de carga
  if (loading) {
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
          </div>
        </div>
      </section>
    );
  }


  return null; // No renderiza nada porque siempre redirige
};

export default Home;
