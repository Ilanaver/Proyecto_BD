import { useEffect, useState } from 'react';

const Mes = () => {
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const [mesActual, setMesActual] = useState('');

  useEffect(() => {
    const actualizarMes = () => {
      const fecha = new Date();
      const mes = meses[fecha.getMonth()];
      setMesActual(mes);
    };

    actualizarMes();

    const intervalId = setInterval(actualizarMes, 60000); // Actualiza cada minuto

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonte
  }, [meses]);

  return mesActual;
};

export default Mes;
