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
  };

  return (
    <div className={styles.container}>
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
