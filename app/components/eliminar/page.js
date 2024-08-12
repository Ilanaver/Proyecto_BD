'use client';
import React, { useEffect, useState } from "react";
import style from './academia.module.css';
import Titulo from "../components/Titulo/Titulo";
import Footer from "../components/Footer/Footer";
const Eliminar = () => {
return(
    <div className={styles.container}>
      <div>
      <Link href="../definiciones">Volver</Link>
      <Titulo texto={"Eliminar Contenido"} />
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
export default Eliminar;