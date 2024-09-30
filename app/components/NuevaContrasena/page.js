'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './nuevacontrasena.module.css'; // Crea este archivo CSS para los estilos
import Titulo from '../Titulo/Titulo'; // Asumiendo que tienes este componente
import Footer from '../Footer/Footer';
import { useRouter } from 'next/navigation';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Por favor ingrese un correo electrónico válido.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/usuario/recuperar-contrasena/${email}`);

      if (response.status === 200) {
        // Aquí asumimos que si se recibe un id, significa que el email existe
        const userId = response.data; // Asegúrate de que esta sea la estructura correcta de la respuesta
        if (userId) {
          setMessage('Se ha enviado un correo de recuperación si el email existe.');
        } else {
          setMessage('El correo electrónico no está registrado.');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('El correo electrónico no está registrado.');
      } else {
        setMessage('Error al procesar la solicitud.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.returnLink}>Volver</button>  
        <Titulo texto={"Recuperar Contraseña"} />
      </div>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            
            <button type="submit" className={styles.button}>Recuperar Contraseña</button>
          </form>

          {message && <p className={styles.message}>{message}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecuperarContrasena;
