'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import TarjetasGestor from "../components/TarjetasGestor/TarjetasGestor";
import style from './Gestor.module.css';
import Titulo from "../components/Titulo/Titulo";
import Subtitulo from "../components/Subtitulo/Subtitulo";
import Mes from "../components/Mes/Mes";
import Popup from "../components/Popup/Popup";
import jsPDF from 'jspdf';
import { useSearchParams } from "next/navigation";

const Gestor = () => {
  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [ahorros, setAhorros] = useState(0);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [saldo, setSaldo] = useState([]);
  const [saldoTipo, setSaldoTipo] = useState([]);
  const [reporte, setReporte] = useState([]);
  const [idtipos, setIdTipos] = useState(null); // Agregar estado para idtipos

  useEffect(() => {
    axios.get("http://localhost:3001/gestor/2")
      .then(res => {
        console.log('Fetched data:', res.data);
        const saldoActual = res.data.map(item => item['Saldo actual']);
        console.log('Saldo actual:', saldoActual);
        setSaldo(saldoActual);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/gestor/operaciones/2")
      .then(res => {
        console.log('Fetched data:', res.data);
        setReporte(res.data);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const manejarClick = (motivo) => {
    setMotivo(motivo);
    
    if (motivo === 'gastos') {
      setIdTipos(1);
    } else if (motivo === 'ingresos') {
      setIdTipos(2);
    } else if (motivo === 'ahorros') {
      setIdTipos(3);
    }
    
    setMostrarPopup(true);
  };

  const enviarDatosPopup = (datos) => {
    console.log('Cantidad:', datos.cantidad);
    console.log('Motivo:', datos.motivo);
    
    if (!datos.cantidad || !datos.motivo) {
      console.error('Faltan datos en el formulario');
      return;
    }

    actualizarBalance(datos);
    cerrarPopup();

    axios.post("http://localhost:3001/gestor/addOperacion", {
      IdPerfil: 2,
      IdTipos: datos.motivo,
      IdSubTipo: datos.subtipo,
      Importe: datos.cantidad,
      Fecha: new Date().toISOString(),
      Observaciones: datos.observaciones || ""
    })
    .then(response => {
      console.log('Data inserted successfully:', response.data);
      setReporte(prevReporte => [...prevReporte, {
        importe: datos.cantidad,
        tipo: datos.motivo,
        subtipo: datos.subtipo,
        fecha: new Date().toISOString(),
        observaciones: datos.observaciones || ""
      }]);
    })
    .catch(error => {
      console.error('Error inserting data:', error);
    });
  };

  useEffect(() => {
    console.log('idtipos:', idtipos); // Verificar el valor de idtipos
    if (idtipos) {
      axios.get(`http://localhost:3001/gestor/2/${idtipos}`)
        .then(res => {
          console.log('Fetched saldoTipo data:', res.data);
          const saldoTpio = res.data.map(item => item['Saldo actual']);
          console.log('Saldo actual tipo:', saldoTpio);
          setSaldoTipo(saldoTpio);
        })
        .catch(err => console.error('Error fetching data:', err));
    }
  }, [idtipos]);

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

  const generarReportePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Reporte Mensual', 14, 22);

    doc.setFontSize(12);
    reporte.forEach((item, index) => {
      doc.text(`Importe: ${item.importe}, Tipo: ${item.tipo}, Subtipo: ${item.subtipo}`, 14, 40 + index * 10);
    });

    doc.save('Reporte_Mensual.pdf');
  };

  return (
    <main>
      <section className={style.ContenedorGestor}>
        <div className={style.tituloGestor}>
          <Titulo texto={"Gestor"} />
        </div>
        <div className={style.MesGestor}>
          <a href=""><Mes /></a>
        </div>
        <div className={style.balanceMensual}>
          <Subtitulo texto={"Balance Mensual"} />
          <h2>{saldo.length > 0 ? saldo.join(', ') : 'Cargando...'}</h2>
        </div>
        <div className={style.tarjetasGestor}>
          <TarjetasGestor
            imgSrc="/ingresos.png"
            altText="imagen ingresos"
            titulo="Ingresos"
            cantidad={`$${saldoTipo.length > 0 ? saldoTipo.join(', ') : 'Cargando...'}`}
            onAgregar={() => manejarClick('ingresos')}
          />
          <TarjetasGestor
            imgSrc="/gastos.png"
            altText="imagen gastos"
            titulo="Gastos"
            cantidad={`$${saldoTipo.length > 0 ? saldoTipo.join(', ') : 'Cargando...'}`}
            onAgregar={() => manejarClick('gastos')}
          />
          <TarjetasGestor
            imgSrc="/ahorros.png"
            altText="imagen ahorros"
            titulo="Ahorros"
            cantidad={`$${saldoTipo.length > 0 ? saldoTipo.join(', ') : 'Cargando...'}`}
            onAgregar={() => manejarClick('ahorros')}
          />
        </div>
        <div className={style.botonReporteMensual}>
          <a onClick={generarReportePDF}>
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
