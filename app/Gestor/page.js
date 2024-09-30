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
  const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario
  const [perfilData, setPerfilData] = useState({});  // Estado para almacenar los datos del perfil, incluida la foto

  const router = useRouter();

  // Obtener el ID del usuario del localStorage
  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(id);
    } else {
      // Redirigir al inicio de sesión si no hay userId en localStorage
      router.push('/iniciosesion');
    }
  }, [router]);

  const fetchPerfilData = () => {
    if (userId) {
      axios.get(`http://localhost:3000/usuario/perfil/${userId}`)
        .then(res => {
          const perfil = res.data[0]; // Accedemos al primer elemento del array
          setPerfilData(perfil); // Guardamos el primer objeto en el estado
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
      axios.get(`http://localhost:3000/gestor/${userId}/${mesSeleccionado}/${anioSeleccionado}`)
        .then(res => {
          console.log('Fetched saldo actual:', res.data);
          const saldoActual = res.data.map(item => item['Saldo actual']);
          setSaldo(saldoActual);
        })
        .catch(err => console.error('Error fetching saldo actual:', err));
    }
  };

  const fetchReporte = () => {
    if (userId && mesSeleccionado && anioSeleccionado) {
      axios.get(`http://localhost:3000/gestor/operaciones/${userId}/${mesSeleccionado}/${anioSeleccionado}`)
        .then(res => {
          console.log('Fetched reporte:', res.data);
          setReporte(res.data);
        })
        .catch(err => console.error('Error fetching reporte:', err));
    }
  };

  const fetchSaldosPorTipo = async (idTipo) => {
    if (userId && mesSeleccionado && anioSeleccionado) {
      try {
        const res = await axios.get(`http://localhost:3000/gestor/${userId}/${idTipo}/${mesSeleccionado}/${anioSeleccionado}`);
        console.log(`Fetched saldoTipo data for idTipo ${idTipo}:`, res.data);
        const saldoTipo = res.data.map(item => item['Saldo actual']);
        setSaldoTipo(prevSaldoTipo => ({ ...prevSaldoTipo, [idTipo]: saldoTipo }));
      } catch (err) {
        console.error(`Error fetching saldoTipo data for idTipo ${idTipo}:`, err);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPerfilData();  // Llamar la función para obtener el perfil
      fetchSaldos();
      fetchReporte();
      fetchSaldosPorTipo(1); // Gastos
      fetchSaldosPorTipo(2); // Ingresos
      fetchSaldosPorTipo(3); // Ahorros
    }
  }, [userId, mesSeleccionado, anioSeleccionado]);

  const manejarClick = (idTipo) => {
    let motivo;
    if (idTipo === 1) {
      motivo = 'gastos';
    } else if (idTipo === 2) {
      motivo = 'ingresos';
    } else if (idTipo === 3) {
      motivo = 'ahorros';
    }
    setMotivo(motivo);
    setIdTipos(idTipo); // Set the idtipos for the selected option
    setMostrarPopup(true);
  };

  const enviarDatosPopup = (datos) => {
    console.log('Cantidad:', datos.cantidad);
    console.log('Motivo:', datos.motivo);
    console.log('Subtipo:', datos.subtipo);
    console.log('Fecha:', datos.fecha);
    console.log('Observaciones:', datos.observaciones);

    if (!datos.cantidad || !datos.motivo || !datos.subtipo || !datos.fecha) {
      console.error('Faltan datos en el formulario');
      return;
    }

    let tipo = null;
    let cantidad = datos.cantidad;

    if (datos.motivo === "ingresos") {
      tipo = 2;
    } else if (datos.motivo === "gastos") {
      tipo = 1;
      // Convertir la cantidad a negativa para gastos
      cantidad = -Math.abs(datos.cantidad);
    } else {
      tipo = 3;
    }

    const requestData = {
      "idperfil_fk": userId,
      "idtipos_fk": tipo,
      "idsubtipo_fk": datos.subtipo,
      "importe": cantidad,
      "fecha": datos.fecha,
      "observaciones": datos.observaciones
    };

    console.log('Datos a enviar:', requestData);

    axios.post("http://localhost:3000/gestor/addOperacion", requestData)
      .then(response => {
        console.log('Data inserted successfully:', response.data);
        setReporte(prevReporte => [...prevReporte, {
          importe: cantidad,
          tipo: datos.motivo,
          subtipo: datos.subtipo,
          fecha: datos.fecha,
          observaciones: datos.observaciones || ""
        }]);

        // Actualiza los saldos después de agregar la operación
        fetchSaldos();
        fetchSaldosPorTipo(1); // Gastos
        fetchSaldosPorTipo(2); // Ingresos
        fetchSaldosPorTipo(3); // Ahorros
        fetchReporte();

      })
      .catch(error => {
        console.error('Error inserting data:', error);
        console.log('Error details:', error.response ? error.response.data : error.message);
      });
    console.log(datos.motivo);
    actualizarBalance(cantidad, datos.motivo);
    cerrarPopup();
  };

  const cerrarPopup = () => {
    setMostrarPopup(false);
  };

  const actualizarBalance = (cantidad, motivo) => {
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

    doc.save(`Reporte_Mensual_${meses[mesSeleccionado]}_${anioSeleccionado}.pdf`);
  };

  return (
    <main>
      <section className={style.ContenedorGestor}>
        <div className={style.tituloGestor}>
          <Titulo texto={"Gestor"}/>
          <div className={style.fotoPerfilContainer}>
            <img 
              src={perfilData.foto ? perfilData.foto : "./fotoPerfil.png"}  // Usar la URL de la base de datos o una imagen por defecto
              alt="Perfil" 
              className={style.fotoPerfil} 
              onClick={() => router.push('/Perfil')}  // Redirige al perfil al hacer clic en la imagen
            />
          </div>
        </div>
        <div className={style.MesGestor}>
          <Mes onMesChange={handleMesChange} />
        </div>
        <div className={style.balanceMensual}>
          <Subtitulo texto={"Balance Mensual"} />
          <h2>{saldo == 0 ? '$0' : `$${saldo}`}</h2>
        </div>
        <div className={style.tarjetasGestor}>
          <TarjetasGestor
            id={2}
            imgSrc="/gastos.png"
            altText="imagen ingresos"
            titulo="Ingresos"
            onAgregar={manejarClick}
            balanceInicial={saldoTipo[2] == 0 ? 0 : saldoTipo[2]}
          />
          <TarjetasGestor
            id={1}
            imgSrc="/gastos.png"
            altText="imagen gastos"
            titulo="Gastos"
            onAgregar={manejarClick}
            balanceInicial={saldoTipo[1] == 0 ? 0 : saldoTipo[1]}
          />
          <TarjetasGestor
            id={3}
            imgSrc="/gastos.png"
            altText="imagen ahorros"
            titulo="Ahorros"
            onAgregar={manejarClick}
            balanceInicial={saldoTipo[3] == 0 ? 0 : saldoTipo[3]}
          />
        </div>
        <div className={style.botonReporteMensual}>
          <a onClick={generarReportePDF}>
            Descargar Reporte Mensual
          </a>
        </div>
        {mostrarPopup && (
          <Popup onClose={cerrarPopup} onSubmit={enviarDatosPopup} motivo={motivo} idtipos={idtipos} />
        )}
      </section>
      <Footer />
    </main>
  );
};

export default Gestor;
