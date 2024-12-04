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
import * as XLSX from 'xlsx'; // Importar biblioteca para Excel
import Footer from "../components/Footer/Footer";
import { useRouter } from 'next/navigation';

const meses = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre"
};

const Gestor = () => {
  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [ahorros, setAhorros] = useState(0);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [saldo, setSaldo] = useState(0);
  const [saldoTipo, setSaldoTipo] = useState({ 1: 0, 2: 0, 3: 0 });
  const [reporte, setReporte] = useState([]);
  const [idtipos, setIdTipos] = useState(null);
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
  const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());
  const [userId, setUserId] = useState(null);
  const [perfilData, setPerfilData] = useState({});
  const [mostrarOpcionesDescarga, setMostrarOpcionesDescarga] = useState(false); // Nueva variable de estado

  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(id);
    } else {
      router.push('/iniciosesion');
    }
  }, [router]);

  const fetchPerfilData = () => {
    if (userId) {
      axios.get(`https://backmoneyminds.onrender.com/usuario/perfil/${userId}`)
        .then(res => {
          const perfil = res.data[0];
          setPerfilData(perfil);
        })
        .catch(err => console.error('Error fetching perfil data:', err));
    }
  };

  const handleMesChange = (nuevoMes, nuevoAnio) => {
    setMesSeleccionado(nuevoMes);
    setAnioSeleccionado(nuevoAnio);
  };

  const fetchSaldos = () => {
    if (userId && mesSeleccionado && anioSeleccionado) {
      axios.get(`https://backmoneyminds.onrender.com/gestor/${userId}/${mesSeleccionado}/${anioSeleccionado}`)
        .then(res => {
          const saldoActual = res.data.map(item => {
            const saldoSinFormato = parseFloat(item['Saldo actual']);
            return saldoSinFormato.toLocaleString('es-ES');
          });
          setSaldo(saldoActual[0] || 0);
        })
        .catch(err => console.error('Error fetching saldo actual:', err));
    }
  };

  const fetchReporte = () => {
    if (userId && mesSeleccionado && anioSeleccionado) {
      axios.get(`https://backmoneyminds.onrender.com/gestor/operaciones/${userId}/${mesSeleccionado}/${anioSeleccionado}`)
        .then(res => setReporte(res.data))
        .catch(err => console.error('Error fetching reporte:', err));
    }
  };

  const fetchSaldosPorTipo = async (idTipo) => {
    if (userId && mesSeleccionado && anioSeleccionado) {
      try {
        const res = await axios.get(`https://backmoneyminds.onrender.com/gestor/${userId}/${idTipo}/${mesSeleccionado}/${anioSeleccionado}`);
        const saldoTipo = res.data.map(item => {
          const saldoSinFormato = parseFloat(item['Saldo actual']);
          return saldoSinFormato.toLocaleString('es-ES');
        });
        setSaldoTipo(prevSaldoTipo => ({ ...prevSaldoTipo, [idTipo]: saldoTipo[0] || 0 }));
      } catch (err) {
        console.error(`Error fetching saldoTipo data for idTipo ${idTipo}:`, err);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPerfilData();
      fetchSaldos();
      fetchReporte();
      fetchSaldosPorTipo(1);
      fetchSaldosPorTipo(2);
      fetchSaldosPorTipo(3);
    }
  }, [userId, mesSeleccionado, anioSeleccionado]);

  const manejarClick = (idTipo) => {
    const motivos = { 1: 'gastos', 2: 'ingresos', 3: 'ahorros' };
    setMotivo(motivos[idTipo]);
    setIdTipos(idTipo);
    setMostrarPopup(true);
  };

  const cerrarPopup = () => {
    setMostrarPopup(false);
  };

  const generarReportePDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const marginTop = 40;
    const lineHeight = 10;
    let y = marginTop;

    doc.setFontSize(18);
    doc.text('Reporte Mensual', 14, 22);

    doc.setFontSize(12);
    reporte.forEach((item) => {
      if (item.tipo.toLowerCase() === 'gastos') {
        doc.setTextColor(255, 0, 0);
      } else if (item.tipo.toLowerCase() === 'ingreso') {
        doc.setTextColor(0, 128, 0);
      } else {
        doc.setTextColor(0, 0, 0);
      }

      if (y + lineHeight > pageHeight - 10) {
        doc.addPage();
        y = marginTop;
      }

      doc.text(`Importe: ${item.importe}, Tipo: ${item.tipo}, Subtipo: ${item.subtipo}, Fecha: ${item.fecha}`, 14, y);
      y += lineHeight;
    });

    doc.save(`Reporte_Mensual_${meses[mesSeleccionado]}_${anioSeleccionado}.pdf`);
  };

  const generarReporteExcel = () => {
    const datosExcel = reporte.map(item => ({
      Fecha: item.fecha,
      Importe: item.importe,
      Tipo: item.tipo,
      Subtipo: item.subtipo,
    }));

    const hoja = XLSX.utils.json_to_sheet(datosExcel);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, `Reporte_${meses[mesSeleccionado]}`);

    XLSX.writeFile(libro, `Reporte_Mensual_${meses[mesSeleccionado]}_${anioSeleccionado}.xlsx`);
  };

  const mostrarOpciones = () => {
    setMostrarOpcionesDescarga(true); // Mostrar opciones al hacer clic
  };

  const descargarReporte = (tipo) => {
    if (tipo === "pdf") {
      generarReportePDF();
    } else if (tipo === "excel") {
      generarReporteExcel();
    }
    setMostrarOpcionesDescarga(false); // Cerrar el menú después de la descarga
  };

  return (
    <main>
      <section className={style.ContenedorGestor}>
        <div className={style.tituloGestor}>
          <Titulo texto={"Gestor"} />
          <div className={style.fotoPerfilContainer}>
            <img
              src={perfilData.foto ? perfilData.foto : "./fotoPerfil.png"}
              alt="Perfil"
              className={style.fotoPerfil}
              onClick={() => router.push('/Perfil')}
            />
          </div>
        </div>
        <div className={style.MesGestor}>
          <Mes onMesChange={handleMesChange} />
        </div>
        <div className={style.balanceMensual}>
          <Subtitulo texto={"Balance Mensual"} />
          <h2>{`$${saldo}`}</h2>
        </div>
        <div className={style.tarjetasGestor}>
          <TarjetasGestor
            id={2}
            imgSrc="/ingresos.png"
            altText="imagen ingresos"
            titulo="Ingresos"
            onAgregar={manejarClick}
            balanceInicial={` ${saldoTipo[2]}`}
          />
          <TarjetasGestor
            id={1}
            imgSrc="/gastos.png"
            altText="imagen gastos"
            titulo="Gastos"
            onAgregar={manejarClick}
            balanceInicial={`-${saldoTipo[1]}`}
          />
          <TarjetasGestor
            id={3}
            imgSrc="/ahorros.png"
            altText="imagen ahorros"
            titulo="Ahorros"
            onAgregar={manejarClick}
            balanceInicial={`${saldoTipo[3]}`}
          />
        </div>
        <div className={style.botonReporteMensual}>
          <a onClick={mostrarOpciones}>Descargar Reporte</a>
        </div>

        {mostrarOpcionesDescarga && (
          <div className={style.opcionesDescarga}>
            <button onClick={() => descargarReporte("pdf")}>PDF</button>
            <button onClick={() => descargarReporte("excel")}>Excel</button>
          </div>
        )}

        {mostrarPopup && (
          <Popup onClose={cerrarPopup} motivo={motivo} />
        )}
      </section>
      <Footer />
    </main>
  );
};

export default Gestor;
