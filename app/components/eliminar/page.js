<<<<<<< HEAD
'use client'
import React, { useState } from "react";
import styles from './eliminar.module.css.module.css';

const DeleteForm = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Se ha eliminado "${title}" de la categoría "${category}".`);
=======
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
  const router = useRouter();

  useEffect(() => {
    // Fetch the list of content based on selected category
    const fetchData = async () => {
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
  }, [category]);

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
>>>>>>> 29a2b95e794f33518fe0d0dfff49970da8a3ff11
  };

  return (
    <div className={styles.container}>
<<<<<<< HEAD
      <h2>Eliminar Elemento</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="category">Categoría</label>
          <select id="category" value={category} onChange={handleCategoryChange} className={styles.input} required>
            <option value="">Selecciona una categoría</option>
            <option value="Definición de términos">Definición de términos</option>
            <option value="Audiovisual">Audiovisual</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className={styles.input}
            placeholder="Ingresa el título a borrar"
            required
          />
        </div>
        <button type="submit" className={styles.button}>Confirmar</button>
      </form>
    </div>
  );
};

export default DeleteForm;
=======
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.returnLink}>Volver</button>      
        <Titulo texto={"Eliminar Contenido"} />
      </div>

      <main className={styles.main}>
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
      </main>
      <Footer />
    </div>
  );
}
>>>>>>> 29a2b95e794f33518fe0d0dfff49970da8a3ff11
