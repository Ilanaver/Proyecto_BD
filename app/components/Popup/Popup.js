import React, { useState } from 'react';
import styles from './Popup.module.css'
import Subtitulo from '../Subtitulo/Subtitulo';

const Popup = ({ onClose, onSubmit, motivo }) => {
  const [cantidad, setCantidad] = useState('');
  const [subtipo, setSubtipo] = useState('');
  const [fecha, setFecha] = useState('');
  const [observaciones, setObservaciones] = useState('');

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
            <input
              type="text"
              value={subtipo}
              onChange={(e) => setSubtipo(e.target.value)}
              required
            />
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
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
