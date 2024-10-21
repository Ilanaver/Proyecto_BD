'use client';
import React, { useState } from 'react';
import axios from 'axios';
import styles from './leccionManager.module.css';
import { useRouter } from 'next/navigation';

const LeccionManager = () => {
    const [operation, setOperation] = useState('');  // 'agregar', 'actualizar', 'eliminar'
    const [leccionId, setLeccionId] = useState('');
    const [leccionData, setLeccionData] = useState({
        titulo: '',
        descripcion: '',
        contenido: '',
        fecha: ''
    });
    const router = useRouter();

    // Agregar lección
    const addLeccion = () => {
        axios.post('http://localhost:3000/leccion-diaria/agregar-leccion', leccionData)
            .then(res => {
                console.log('Lección agregada:', res.data);
                setLeccionData({ titulo: '', descripcion: '', contenido: '', fecha: '' });
                router.push('/diaria');
            })
            .catch(err => console.error('Error adding lección:', err));
    };

    // Actualizar lección
    const updateLeccion = () => {
        axios.patch(`http://localhost:3000/leccion-diaria/actualizar-leccion/${leccionId}`, {
            fieldName: 'descripcion',
            fieldValue: leccionData.descripcion
        })
            .then(res => {
                console.log('Lección actualizada:', res.data);
                setLeccionId('');
                setLeccionData({ titulo: '', descripcion: '', contenido: '', fecha: '' });
                router.push('/diaria');
            })
            .catch(err => console.error('Error updating lección:', err));
    };

    // Eliminar lección
    const deleteLeccion = () => {
        axios.delete(`http://localhost:3000/leccion-diaria/deleteleccion/${leccionId}`)
            .then(res => {
                console.log('Lección eliminada:', res.data);
                setLeccionId('');
                router.push('/diaria');
            })
            .catch(err => console.error('Error deleting lección:', err));
    };

    return (
        <section className={styles.managerContainer}>
            <h2>Gestionar Lección</h2>

            {/* Selector de operación */}
            <div className={styles.operationSelector}>
                <button onClick={() => setOperation('agregar')}>Agregar Lección</button>
                <button onClick={() => setOperation('actualizar')}>Actualizar Lección</button>
                <button onClick={() => setOperation('eliminar')}>Eliminar Lección</button>
            </div>

            {/* Formulario según la operación seleccionada */}
            {operation === 'agregar' && (
                <div className={styles.form}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={leccionData.titulo}
                        onChange={(e) => setLeccionData({ ...leccionData, titulo: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={leccionData.descripcion}
                        onChange={(e) => setLeccionData({ ...leccionData, descripcion: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Contenido"
                        value={leccionData.contenido}
                        onChange={(e) => setLeccionData({ ...leccionData, contenido: e.target.value })}
                    />
                    <input
                        type="date"
                        value={leccionData.fecha}
                        onChange={(e) => setLeccionData({ ...leccionData, fecha: e.target.value })}
                    />
                    <button onClick={addLeccion}>Agregar</button>
                </div>
            )}

            {operation === 'actualizar' && (
                <div className={styles.form}>
                    <input
                        type="text"
                        placeholder="ID Lección"
                        value={leccionId}
                        onChange={(e) => setLeccionId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nueva Descripción"
                        value={leccionData.descripcion}
                        onChange={(e) => setLeccionData({ ...leccionData, descripcion: e.target.value })}
                    />
                    <button onClick={updateLeccion}>Actualizar</button>
                </div>
            )}

            {operation === 'eliminar' && (
                <div className={styles.form}>
                    <input
                        type="text"
                        placeholder="ID Lección"
                        value={leccionId}
                        onChange={(e) => setLeccionId(e.target.value)}
                    />
                    <button onClick={deleteLeccion}>Eliminar</button>
                </div>
            )}
        </section>
    );
};

export default LeccionManager;
