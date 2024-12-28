'use client'
import React, { useEffect, useState } from 'react';
import styles from './Transaccion.module.css';
import Subtitulo from '../components/Subtitulo/Subtitulo';
import axios from 'axios';

const Transaccion = ({ onClose, onSubmit, motivo, idtipos }) => {
  const [cantidad, setCantidad] = useState('');
  const [subtipos, setSubtipos] = useState([]);
  const [subtipo, setSubtipo] = useState('');
  const [fecha, setFecha] = useState('');
  const [observaciones, setObservaciones] = useState('');

  useEffect(() => {
    if (idtipos) {
      axios.get(`https://backmoneyminds.onrender.com/gestor/subtipos/${idtipos}`)
        .then(res => {
          setSubtipos(res.data);
        })
        .catch(err => console.error('Error fetching subtipos:', err));
    }
  }, [idtipos]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    onSubmit({ cantidad: parseFloat(cantidad), motivo, subtipo, fecha, observaciones });
  };

  return (
    <div className={styles.contenedorPopup}>
      <div className={styles.popup}>
        <button className={styles.cerrar} onClick={onClose}>
          &times;
        </button>
        <div className={styles.encabezado}>
          <Subtitulo texto={`Agregar ${motivo}`} />
        </div>
        <form onSubmit={manejarEnvio}>
          <div className={styles.campo}>
            <label>Cantidad</label>
            <input
              type="number"
              step="0.01"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </div>
          <div className={styles.campo}>
            <label>Subtipo</label>
            <select
              value={subtipo}
              onChange={(e) => setSubtipo(e.target.value)}
              required
            >
              <option value="">Seleccionar subtipo</option>
              {subtipos.map(sub => (
                <option key={sub.idsubtipo} value={sub.idsubtipo}>
                  {sub.Subtipo}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.campo}>
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          <div className={styles.campo}>
            <label>Observaciones</label>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.boton}>Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default Transaccion;
