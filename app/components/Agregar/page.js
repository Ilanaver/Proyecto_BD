'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './agregar.module.css';
import Link from 'next/link'
import Titulo from '../Titulo/Titulo';
import Footer from '../Footer/Footer';

export default function Agregar() {
  const [category, setCategory] = useState('definicion');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [categoriaVideo, setCategoriaVideo] = useState('');

  const addContent = async () => {
    if (category === 'definicion') {
      const payload = {
        titulo: title,
        contenido: content,
      };

      console.log('Datos enviados:', payload);

      try {
        const response = await axios.post('http://localhost:3000/definiciones/agregar-definicion', payload);

        if (response.status === 200 || response.status === 201) {
          console.log('Definición agregada con éxito:', response.data);
        } else {
          console.log('Error inesperado:', response.status);
        }
      } catch (error) {
        if (error.response) {
          console.error('Error en la solicitud:', error.response.data);
        } else {
          console.error('Error en la solicitud:', error.message);
        }
      }
    } else if (category === 'audiovisual') {
      const videoPayload = {
        titulo: title,
        videolink: videoLink,
        img: img,
        descripcion: description,
        categoria: categoriaVideo,
      };

      console.log('Datos del video enviados:', videoPayload);

      try {
        const response = await axios.post('http://localhost:3000/contenido-multimedia/agregar-video', videoPayload);

        if (response.status === 200 || response.status === 201) {
          console.log('Video agregado con éxito:', response.data);
        } else {
          console.log('Error inesperado:', response.status);
        }
      } catch (error) {
        if (error.response) {
          console.error('Error en la solicitud:', error.response.data);
        } else {
          console.error('Error en la solicitud:', error.message);
        }
      }
    } else {
      console.log('Selección inválida');
    }
  };

  return (
    <div className={styles.container}>
      <div>
      <Link href="../academia">Volver</Link>
      <Titulo texto={"Agregar Contenido"} />
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

          {category === 'audiovisual' && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="videoLink">Enlace del video</label>
                <input
                  type="text"
                  id="videoLink"
                  placeholder="Ingrese el enlace del video aquí"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="img">Imagen</label>
                <input
                  type="text"
                  id="img"
                  placeholder="Ingrese la URL de la imagen aquí"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  placeholder="Ingrese la descripción aquí"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="categoriaVideo">Categoría del video</label>
                <input
                  type="text"
                  id="categoriaVideo"
                  placeholder="Ingrese la categoría del video aquí"
                  value={categoriaVideo}
                  onChange={(e) => setCategoriaVideo(e.target.value)}
                />
              </div>
            </>
          )}

          {category === 'definicion' && (
            <div className={styles.inputGroup}>
              <label htmlFor="content">Contenido</label>
              <textarea
                id="content"
                placeholder="Ingrese el contenido aquí"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          )}

          <button onClick={addContent}>Agregar Contenido</button>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
