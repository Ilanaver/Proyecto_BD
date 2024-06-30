import React, {useState} from "react";
import TarjetasGestor from "../components/TarjetasGestor/TarjetasGestor";
import './Gestor.module.css';
import Titulo from "../components/Titulo/Titulo";
import Subtitulo from "../components/Subtitulo/Subtitulo";
import Mes from "../components/Mes/Mes";
import Popup from "../components/Popup/Popup";
const Gestor = () => {

    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [datosPopup, setDatosPopup] = useState(null);
  
    const abrirPopup = (balanceInicial) => {
      setDatosPopup({balanceInicial})
      setMostrarPopup(true);
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
    <main>
      <section className= "ContenedorGestor">
        <div className= "tituloGestor">
          <Titulo texto = {"Gestor"}></Titulo>    
        </div>            
        <div className="MesGestor">
          <a href=""><Mes/></a>
        </div>
        <div className= "balanceMensual">
          <Subtitulo texto={"Balance Mensual"}></Subtitulo>
          <h2>$300000</h2>
        </div>
        <div className= "tarjetasGestor">
          <TarjetasGestor 
            imgSrc="/assets/img/gastos.png" 
            altText="imagen gastos" 
            titulo="Ingresos" 
            cantidad="$2000" 
            onAgregar={abrirPopup}
          />
          <TarjetasGestor 
            imgSrc="/assets/img/gastos.png" 
            altText="imagen gastos" 
            titulo="Gastos" 
            cantidad="$500" 
            onAgregar={abrirPopup}
          />
          <TarjetasGestor
            imgSrc="/assets/img/ahorros.png" 
            altText="imagen ahorros" 
            titulo="Ahorros" 
            cantidad="$1000" 
            onAgregar={abrirPopup}
          />
        </div>
        <div className= "botonReporteMensual">
          <a href="" download="Reporte de este mes">
            Descargar Reporte Mensual
          </a>
        </div>
        {mostrarPopup && (
          <Popup onClose={cerrarPopup} onSubmit={enviarDatosPopup}/>
        )}
      </section>
    </main>
  );
};

export default Gestor;
