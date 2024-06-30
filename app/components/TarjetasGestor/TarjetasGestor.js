import React from 'react';
import './TarjetasGestor.module.css';

const TarjetasGestor = ({ imgSrc, altText, titulo, cantidad, onAgregar, balanceInicial}) => {
  const manejarClick = () =>{
    onAgregar(balanceInicial);
  };
  return (
    <div className= "tarjetas">
      <div className= "ContenedorimagenIngresos">
        <img className= "imagenIngresos" src={imgSrc} alt={altText} />
      </div>
      <div className= "Infotarjetas">
        <div className= "contenido">
          <p>{titulo}</p>
          <p>{cantidad}</p>
        </div>
        <button onClick={manejarClick}>
          <img src="/assets/img/signomas.webp" alt="signo mas" />
        </button>
      </div>
    </div>
  );
};

export default TarjetasGestor;
