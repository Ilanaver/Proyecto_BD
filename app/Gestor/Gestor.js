import React from "react";
import TarjetasGestor from "../components/TarjetasGestor/TarjetasGestor";
import './Gestor.module.css';
import Titulo from "../components/Titulo/Titulo";
import Subtitulo from "../components/Subtitulo/Subtitulo";
import Mes from "../components/Mes/Mes";
const Gestor = () => {
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
            title="Ingresos" 
            amount="$2000" 
          />
          <TarjetasGestor 
            imgSrc="/assets/img/gastos.png" 
            altText="imagen gastos" 
            title="Gastos" 
            amount="$500" 
          />
          <TarjetasGestor
            imgSrc="/assets/img/ahorros.png" 
            altText="imagen ahorros" 
            title="Ahorros" 
            amount="$1000" 
          />
        </div>
        <div className= "botonReporteMensual">
          <a href="" download="Reporte de este mes">
            Descargar Reporte Mensual
          </a>
        </div>
      </section>
    </main>
  );
};

export default Gestor;
