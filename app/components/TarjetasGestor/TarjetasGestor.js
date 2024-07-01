'use client';
import React, {useState} from 'react';
import style from './TarjetasGestor.module.css';
import Image from 'next/image';
import Popup from '../Popup/Popup';

const TarjetasGestor = ({ imgSrc, altText, titulo, cantidad, onAgregar, balanceInicial}) => {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const manejarClick = () =>{
    onAgregar(balanceInicial);
  };
  const cerrarPopup = () => {
    setMostrarPopup(false);
  };

  const enviarDatosPopup = (datos) => {
    console.log('Cantidad:', datos.cantidad);
    console.log('Motivo:', datos.motivo);
    cerrarPopup();
  };
    
  return (
    <div className= {style.tarjetas}>
      <div className= {style.ContenedorimagenIngresos}>
        <Image
         className= {style.imagenIngresos} 
         src={imgSrc} 
         alt={altText}
         width={100}
         height={100} />
      </div>
      <div className= {style.Infotarjetas}>
        <div className= {style.contenido}>
          <p>{titulo}</p>
          <p>{cantidad}</p>
        </div>
        
          <Image src="/signomas.webp"
           alt="signo mas"
           width={50}
           height={50}
           onClick={manejarClick}
            />
      </div>
      {mostrarPopup && (
        <Popup onClose={cerrarPopup} onSubmit={enviarDatosPopup} />
      )}
    </div>
  );
};

export default TarjetasGestor;
