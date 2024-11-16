'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './cambiarContraseña.module.css';
import Titulo from '../Titulo/Titulo';
import Footer from '../Footer/Footer';
import { useRouter } from 'next/navigation';

export default function CambiarContraseña() {
    const [userId, setUserId] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    // Función para obtener el userId del localStorage
    const fetchUserId = () => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem('userId');
            setUserId(storedUserId);
        }
    };

    // Llamada al cargar el componente
    useEffect(() => {
        fetchUserId();
    }, []);

    // Función para enviar el PATCH a la API
    const cambiarContraseña = () => {
        if (userId) {
            axios.patch('https://backmoneyminds.onrender.com/usuario/cambiar-contrasena', { // Cambio aquí
                idperfil: userId, // Convertimos el userId a número
                contraseñaActual: currentPassword,
                nuevaContraseña: newPassword
            })
            .then(res => {
                console.log('Respuesta recibida de la API:', res.data);

                // Verificar el estado de la respuesta
                if (res.status === 200) {
                    setSuccessMessage('Contraseña cambiada exitosamente');
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    console.log('Contraseña cambiada con éxito');
                }
            })
            .catch(err => {
                console.error('Error al cambiar la contraseña:', err);
                setErrorMessage('Error al cambiar la contraseña. Por favor verifica tu contraseña actual.');
                if (err.response) {
                    console.log('Detalles del error:', err.response.data);
                } else {
                    console.log('Error de conexión o solicitud:', err.message);
                }
            });
        }
    };

    // Manejador del formulario que valida y llama a cambiarContraseña
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de las contraseñas
        if (newPassword !== confirmPassword) {
            setErrorMessage('Las nuevas contraseñas no coinciden');
            console.log('Error: Las nuevas contraseñas no coinciden');
            return;
        }

        if (!currentPassword || !newPassword || !confirmPassword) {
            setErrorMessage('Por favor completa todos los campos');
            console.log('Error: Campos vacíos en el formulario');
            return;
        }

        // Limpiar mensajes anteriores
        setErrorMessage('');
        setSuccessMessage('');

        // Llamar a la función para cambiar la contraseña
        cambiarContraseña();
    };

    // Mostramos un indicador de carga si no tenemos el userId
    if (!userId) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.container}>
            <div className={styles.header1}>
      <button onClick={() => router.back()} className={styles.returnLink}>Volver</button>     
    </div>  
      <div className={styles.header2}>
        <Titulo texto={"Cambiar Contraseña"} className={styles.titulo}/>
      </div>
                
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="currentPassword">Contraseña Actual</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="newPassword">Nueva Contraseña</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    {successMessage && <p className={styles.success}>{successMessage}</p>}

                    <button type="submit" className={styles.submitButton}>Cambiar Contraseña</button>
                </form>
            </div>

            <Footer />
        </>
    );
}
