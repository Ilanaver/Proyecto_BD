'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './eliminar.module.css';
import Titulo from '../Titulo/Titulo';
import Footer from '../Footer/Footer';
import { useRouter } from 'next/navigation';

export default function Eliminar() {
  const [category, setCategory] = useState('definicion');
  const [contentList, setContentList] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si es admin
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/usuario/perfil/${userId}`);
          const perfil = response.data[0]; // Accedemos al primer objeto del array
          setIsAdmin(perfil.admin); // Establecemos si el usuario es admin
        } catch (error) {
          console.error('Error fetching perfil data:', error);
        }
      } else {
        router.push('/iniciosesion'); // Redirigir al inicio de sesión si no hay userId
      }
    };

    fetchUserProfile();
  }, [router]);

  useEffect(() => {
    // Fetch the list of content based on selected category
    const fetchData = async () => {
      if (!isAdmin) return; // No realizar la búsqueda si no es admin
      try {
        let response;
        if (category === 'definicion') {
          response = await axios.get('http://localhost:3000/definiciones/todas');
        } else if (category === 'audiovisual') {
          response = await axios.get('http://localhost:3000/contenido-multimedia/todos');
        }
        setContentList(response.data);
      } catch (error) {
        console.error(`Error fetching ${category === 'definicion' ? 'definitions' : 'audiovisual content'}:`, error);
      }
    };

    fetchData();
  }, [category, isAdmin]);

  const deleteContent = async () => {
    console.log(selectedItem);
    if (!selectedItem) {
      alert('Seleccione un ítem para eliminar.');
      return;
    }

    try {
      let response;
      if (category === 'definicion') {
        response = await axios.delete(`http://localhost:3000/definiciones/deleteTermino/${selectedItem}`);
      } else if (category === 'audiovisual') {
        response = await axios.delete(`http://localhost:3000/contenido-multimedia/borrar-video/${selectedItem}`);
      }

      if (response.status === 200) {
        alert(`${category === 'definicion' ? 'Definición' : 'Video'} eliminado con éxito`);
        // Remove deleted item from content list
        setContentList(contentList.filter(item => item.idtermino !== parseInt(selectedItem) && item.idvideo !== parseInt(selectedItem)));
        setSelectedItem('');
      } else {
        alert(`Error inesperado: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al eliminar el contenido:', error.response ? error.response.data : error.message);
      alert('Ocurrió un error al eliminar el contenido');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header1}>
        <button onClick={() => router.back()} className={styles.returnLink}>Volver</button>
      </div>
      <div className={styles.header2}>
        <Titulo texto={"Eliminar Contenido"} className={styles.titulo} />
      </div>

      <main className={styles.main}>
        {isAdmin ? ( // Condición para mostrar el formulario o el mensaje
          <div className={styles.formContainer}>
            <div className={styles.inputGroup}>
              <label htmlFor="category">Seleccione una opción:</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
                <option value="definicion">Definición de términos</option>
                <option value="audiovisual">Audiovisual</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="content">Seleccione el ítem a eliminar:</label>
              <select
                id="content"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className={styles.select}
              >
                <option value="">Seleccione...</option>
                {contentList.map((item, index) => (
                  <option key={index} value={category === 'definicion' ? item.idtermino : item.idvideo}>
                    {item.titulo}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={deleteContent} className={styles.button}>Eliminar Contenido</button>
          </div>
        ) : (
          <div className={styles.accessDenied}>
            <h2>No tiene permiso para acceder a esta página.</h2>
            <p>Solo los administradores pueden eliminar contenido.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
