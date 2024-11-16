import {React, useEffect, useState } from 'react';
import style from './Mes.module.css';

const Mes = ({ onMesChange }) => {
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const [mesActual, setMesActual] = useState('');
  const [mostrarLista, setMostrarLista] = useState(false);
  const anioActual = new Date().getFullYear();

  useEffect(() => {
    const fecha = new Date();
    const mes = meses[fecha.getMonth()];
    setMesActual(mes);
    onMesChange(fecha.getMonth() + 1, anioActual); // Envía el mes y el año al cargar el componente
  }, []);

  const handleMesClick = () => {
    setMostrarLista(!mostrarLista);
  };

  const handleMesSeleccionado = (mes, index) => {
    setMesActual(mes);
    setMostrarLista(false);
    onMesChange(index + 1, anioActual); // Envía el mes (index + 1) y el año
  };

  return (
    <div className={style.mesContenedor}>
      <div onClick={handleMesClick} className={style.mesActual}>
        {mesActual} {anioActual}
      </div>
      {mostrarLista && (
        <ul className={style.listaMeses}>
          {meses.map((mes, index) => (
            <li
              key={index}
              onClick={() => handleMesSeleccionado(mes, index)}
              className={style.mesItem}
            >
              {mes}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mes;
