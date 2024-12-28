import React, { useState } from 'react';
import Transaccion from '../../Transaccion/page.js'
import Cuenta from '../../Cuenta/page.js'

const Popup = ({ viewToShow, onClose, onSubmit, motivo, idtipos }) => {
  const [view, setView] = useState(viewToShow);

  // Actualiza la vista cuando cambia el prop
  React.useEffect(() => {
    setView(viewToShow);
  }, [viewToShow]);

  return (
    <div className="popup">
      <div className="popup-content">
        {view === 'transaccion' ? (
          <Transaccion 
            onClose={onClose} 
            onSubmit={onSubmit} 
            motivo={motivo} 
            idtipos={idtipos} 
          />
        ) : (
          <Cuenta />
        )}
      </div>
    </div>
  );
};

export default Popup;
