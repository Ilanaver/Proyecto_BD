'use client';
import React, {useEffect, useState} from "react";
import TarjetasGestor from "../components/TarjetasGestor/TarjetasGestor";
import style from './Gestor.module.css';
import Titulo from "../components/Titulo/Titulo";
import Subtitulo from "../components/Subtitulo/Subtitulo";
import Mes from "../components/Mes/Mes";
import Popup from "../components/Popup/Popup";

const Gestor = () => {
  const [data, setData] = useState(null); // Estado para almacenar los datos de la API
  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [ahorros, setAhorros] = useState(0);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    const idusuario = 1; // Reemplaza con el ID de usuario que necesitas
    const url = `http://localhost:3001/gestor/${idusuario}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data); // Almacenar los datos en el estado
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const manejarClick = (motivo) => {
    setMotivo(motivo);
    setMostrarPopup(true);
  };
  const enviarDatosPopup = (datos) => {
    console.log('Cantidad:', datos.cantidad);
    console.log('Motivo:', datos.motivo);
    actualizarBalance(datos);
    cerrarPopup();
  };
  const cerrarPopup = () => {
    setMostrarPopup(false);
  };

  const actualizarBalance = (datos) => {
    const { cantidad, motivo } = datos;

    if (motivo.toLowerCase() === 'ingresos') {
      setIngresos(prevIngresos => prevIngresos + cantidad);
    } else if (motivo.toLowerCase() === 'gastos') {
      setGastos(prevGastos => prevGastos + cantidad);
    } else if (motivo.toLowerCase() === 'ahorros') {
      setAhorros(prevAhorros => prevAhorros + cantidad);
    }
  };

  return (
    <main>
      <section className= {style.ContenedorGestor}>
        <div className= {style.tituloGestor}>
          <Titulo texto = {"Gestor"}></Titulo>    
        </div>            
        <div className={style.MesGestor}>
          <a href=""><Mes/></a>
        </div>
        <div className= {style.balanceMensual}>
          <Subtitulo texto={"Balance Mensual"}></Subtitulo>
          <h2>{JSON.stringify(data)}</h2>
        </div>
        <div className= {style.tarjetasGestor}>
          <TarjetasGestor 
            imgSrc={"/ingresos.png"}
            altText="imagen ingresos" 
            titulo="Ingresos" 
            cantidad={`$${ingresos}`}
            onAgregar={() => manejarClick ('ingresos')}
          />
          <TarjetasGestor 
            imgSrc={"/gastos.png"} 
            altText="imagen gastos" 
            titulo="Gastos" 
            cantidad={`$${gastos}`} 
            onAgregar={() => manejarClick ('gastos')}
          />
          <TarjetasGestor
            imgSrc={"/ahorros.png"}
            altText="imagen ahorros" 
            titulo="Ahorros" 
            cantidad={`$${ahorros}`} 
            onAgregar={() => manejarClick ('ahorros')}
          />
        </div>
        <div className= {style.botonReporteMensual}>
          <a href="" download="Reporte de este mes">
            Descargar Reporte Mensual
          </a>
        </div>
        {mostrarPopup && (
          <Popup onClose={cerrarPopup} onSubmit={enviarDatosPopup} motivo={motivo} />
        )}
      </section>
    </main>
  );
};

export default Gestor;
