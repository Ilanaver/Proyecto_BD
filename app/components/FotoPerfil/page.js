'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FotoPerfil.module.css';
import Titulo from '../Titulo/Titulo';
import Footer from '../Footer/Footer';
import { useRouter } from 'next/navigation';

const FotoPerfil = () => {
  const [newPhotoUrl, setNewPhotoUrl] = useState(''); // Para URL de nueva foto
  const [newPhotoFile, setNewPhotoFile] = useState(null); // Para archivo de nueva foto
  const [previewImage, setPreviewImage] = useState(''); // Previsualización de la nueva imagen
  const [userId, setUserId] = useState(null); // Almacenamos el userId aquí
  const router = useRouter(); // Para redirección

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId); // Establecemos el userId desde localStorage
    }
  }, []);

  // Maneja el cambio de URL de la foto de perfil
  const handleUrlChange = (e) => {
    setNewPhotoUrl(e.target.value);
    setPreviewImage(e.target.value); // Mostramos la URL como previsualización
  };

  // Maneja el cambio de archivo de foto de perfil
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPhotoFile(file);
    const fileUrl = URL.createObjectURL(file); // Creamos una URL para previsualizar la imagen cargada
    setPreviewImage(fileUrl);
  };

  // Maneja el envío para cambiar la foto de perfil
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData(); // Creamos un FormData para enviar los datos

    if (newPhotoFile) {
      formData.append('photo', newPhotoFile); // Si se seleccionó un archivo, lo añadimos
    } else if (newPhotoUrl) {
      formData.append('photoUrl', newPhotoUrl); // Si se ingresó una URL, la añadimos
    }

    try {
      const response = await axios.put(
        `https://backmoneyminds.onrender.com/usuario/perfil/cambiar-foto/${userId}`, // Cambié la URL aquí
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        alert('Foto de perfil actualizada con éxito');
        router.push('/perfil'); // Redirigimos de vuelta a la página de perfil
      }
    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
      alert('Hubo un error al actualizar la foto de perfil');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.returnLink}>
          Volver
        </button>
        <Titulo texto={'Cambiar Foto de Perfil'} />
      </div>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Input para cargar una nueva URL */}
            <div className={styles.inputGroup}>
              <label htmlFor="photoUrl">Ingresar URL de nueva foto:</label>
              <input
                type="text"
                id="photoUrl"
                placeholder="https://example.com/foto"
                value={newPhotoUrl}
                onChange={handleUrlChange}
                className={styles.input}
              />
            </div>

            {/* Input para subir una nueva foto */}
            <div className={styles.inputGroup}>
              <label htmlFor="photoFile">Subir una nueva foto:</label>
              <input
                type="file"
                id="photoFile"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.input}
              />
            </div>

            {/* Previsualización de la nueva imagen */}
            {previewImage && (
              <div className={styles.preview}>
                <h4>Previsualización de la nueva imagen:</h4>
                <img src={previewImage} alt="Previsualización" />
              </div>
            )}

            {/* Botón para enviar el formulario */}
            <button type="submit" className={styles.button}>
              Cambiar Foto
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FotoPerfil;
