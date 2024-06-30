import Subtitulo from '../Subtitulo/Subtitulo';
import './Popup.css'
import React, { useState } from 'react';
import Subtitulo from '../Subtitulo/Subtitulo';

const Popup = ({ onClose, onSubmit }) => {
  const [cantidad, setCantidad] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cantidad: parseFloat(cantidad), motivo });
    setCantidad('');
    setMotivo('');
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <Subtitulo texto={"Ingrese el ingreso"}></Subtitulo>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Cantidad:</p>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </label>
          <label>
            <p>Motivo:</p>
            <input
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            />
          </label>
          <button type="submit" onClick={onClose}>Guardar</button>
        </form>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Popup;
