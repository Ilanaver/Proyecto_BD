'use client';

import { useState } from 'react';
import styles from './agregar.module.css';
import Titulo from '../Titulo/Titulo';

export default function Agregar() {
  const [category, setCategory] = useState('definicion');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addContent = () => {
    if (category === 'definicion') {
      console.log('Contenido agregado a Definición de términos');
    } else if (category === 'audiovisual') {
      console.log('Contenido agregado a Audiovisual');
    } else {
      console.log('Selección inválida');
    }
    console.log('Título:', title);
    console.log('Contenido:', content);
  };

  return (
    <div className={styles.container}>
      <div>
        <Titulo texto={"Agregar Contenido"}/>
        <meta name="description" content="Formulario para agregar contenido" />
        <link rel="icon" href="/favicon.ico" />
      </div>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="category">Seleccione una opción:</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="definicion">Definición de términos</option>
              <option value="audiovisual">Audiovisual</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              placeholder="Ingrese el título aquí"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="content">Contenido</label>
            <textarea
              id="content"
              placeholder="Ingrese el contenido aquí"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button onClick={addContent}>Agregar Contenido</button>
          
        </div>
      </main>
    </div>
  );
}