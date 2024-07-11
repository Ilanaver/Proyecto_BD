'use client';
import React, {useEffect, useState} from "react";
import TarjetasGestor from "../components/TarjetasGestor/TarjetasGestor";
import style from './Gestor.module.css';
import Titulo from "../components/Titulo/Titulo";
import Subtitulo from "../components/Subtitulo/Subtitulo";
import Mes from "../components/Mes/Mes";
import Popup from "../components/Popup/Popup";
//import {axios} from "axios"

const Gestor = () => {
  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [ahorros, setAhorros] = useState(0);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [motivo, setMotivo] = useState('');
  /* AXIOS, TERMINAR DESPUES
  const [pokemones, setpokemon] = useState([])

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then(response => {
      setpokemon(response.data)
    })
      
  }, [])

  const cargarMas () => {

  }
  */
  //EJEMPLO DE FLECHA:
  const [dolares, setDolares] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/gestor/2")
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        const saldoActual = data.map(item => item['Saldo actual']); // Adjust this line based on the actual structure of your data
        console.log('Saldo actual:', saldoActual); // Log the extracted saldo
        setDolares(saldoActual);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  //Para que fucione tengo que tener el proyecto back corriendo y la bdd abierta
  
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
          <h2>{dolares.length > 0 ? dolares.join(', ') : 'Cargando...'}</h2> 
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
