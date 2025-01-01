import React, { useState } from 'react';
import Transaccion from '../../Transaccion/page.js';
import Cuenta from '../../Cuenta/page.js';
import Operaciones from '../../Operaciones/page.js'; // Asegúrate de importar el componente correcto

const Popup = ({ viewToShow, onClose, onSubmit, motivo, idtipos }) => {
  const [view, setView] = useState(viewToShow);

  // Actualiza la vista cuando cambia el prop
  React.useEffect(() => {
    setView(viewToShow);
  }, [viewToShow]);

  return (
    <div className="popup">
      <div className="popup-content">
        {view == 'transaccion' ? (
          <Transaccion 
            onClose={onClose} 
            onSubmit={onSubmit} 
            motivo={motivo} 
            idtipos={idtipos} 
          />
        ) : view == 'operaciones' ? (
          <Operaciones 
            onClose={onClose}
          />
        ) : (
          <Cuenta 
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default Popup;
