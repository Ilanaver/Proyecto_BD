import React, { useState } from 'react';
import styles from './Popup.module.css'
import Subtitulo from '../Subtitulo/Subtitulo';

const Popup = ({ onClose, onSubmit }) => {
  const [cantidad, setCantidad] = useState('');
  const [motivo, setMotivo] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    onSubmit({ cantidad: parseFloat(cantidad), motivo });
  };

  return (
    <div className={styles.contenedorPopup}>
      <div className={styles.popup}>
        <button className={styles.cerrar} onClick={onClose}>
          &times;
        </button>
        <Subtitulo texto={"Haga su ingreso"}></Subtitulo>
        <div className={styles.inputsPopup}>
          <div className={styles.input}>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="Ingrese cantidad"
            />
          </div>
          <div className={styles.input}>
            <input
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ingrese motivo"
            />
          </div>
        </div>
        <div className={styles.botonEnviar}>
          <button onClick={manejarEnvio}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
