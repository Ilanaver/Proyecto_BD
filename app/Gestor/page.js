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
    const [viewToShow, setViewToShow] = useState("transaccion");
    const router = useRouter();
    const [cuentaNombre, setCuentaNombre] = useState("Ninguna cuenta seleccionada");
    const [cuentaId, setcuentaId] = useState(null);
    const [reloadFlag, setReloadFlag] = useState(false);
    const [cuentas, setCuentas] = useState([]);

    
    useEffect(() => {
      const id = localStorage.getItem('userId');
      if (id) {
        setUserId(id);
      } else {
        router.push('/iniciosesion');
      }
    }, [router]);
    
    useEffect(() => {
      const cuentaPrincipal = JSON.parse(localStorage.getItem('cuentaPrincipal'));
      if (cuentaPrincipal) {
        const { idcuenta, nombre } = cuentaPrincipal;
        // Asigna los valores a las nuevas variables y actualiza el estado
        setCuentaNombre(nombre);
        setcuentaId(idcuenta)
        // Puedes usar cuentaId si es necesario
        console.log(idcuenta, nombre);
      }
    }, [reloadFlag]);

    
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
    const fetchCuentas = () => {
      if (userId) {
        axios.get(`https://backmoneyminds.onrender.com/cuenta/todas/${userId}`)
          .then(res => {
            setCuentas(res.data);
          })
          .catch(err => console.error('Error fetching cuentas:', err));
      }
    };

    const handleMesChange = (nuevoMes, nuevoAnio) => {
      setMesSeleccionado(nuevoMes);
      setAnioSeleccionado(nuevoAnio);
    };

    const fetchSaldos = () => {
      if (userId && cuentaId && mesSeleccionado && anioSeleccionado) {
        axios.get(`https://backmoneyminds.onrender.com/gestor/${userId}/${cuentaId}/${mesSeleccionado}/${anioSeleccionado}`)
          .then(res => {
            if (res.data && res.data.length > 0) {
              const saldoActual = res.data[0]['Saldo Mensual']; // Obtén el valor directamente
              const saldoNumerico = parseFloat(saldoActual) || 0; // Convierte y maneja valores no numéricos
              setSaldo(saldoNumerico.toLocaleString('es-ES')); // Formatea el número
            } else {
              setSaldo(0); // Maneja el caso donde no haya datos
            }
          })
          .catch(err => {
            console.error('Error fetching saldo actual:', err);
            setSaldo(0); // En caso de error, establece el saldo en 0
          });
      }
    };
    

    const fetchReporte = async () => {
      if (userId && mesSeleccionado && anioSeleccionado) {
        try {
          const operacionesPorCuenta = await Promise.all(
            cuentas.map(cuenta =>
              axios.get(`https://backmoneyminds.onrender.com/gestor/operaciones/${userId}/${mesSeleccionado}/${anioSeleccionado}/${cuenta.idcuenta}`)
            )
          );
    
          // Combina las operaciones de todas las cuentas
          const todasLasOperaciones = operacionesPorCuenta.flatMap((res, index) => 
            res.data.map(operacion => ({
              ...operacion, // Copia las propiedades de la operación
              nombreCuenta: cuentas[index].nombre // Añade el nombre de la cuenta correspondiente
            }))
          );
    
          setReporte(todasLasOperaciones);
        } catch (err) {
          console.error('Error fetching operaciones:', err);
        }
      }
    };
    
    

    const fetchSaldosPorTipo = async (idTipo) => {
      if (userId && mesSeleccionado && anioSeleccionado) {
        try {
          const res = await axios.get(`https://backmoneyminds.onrender.com/gestor/${userId}/${idTipo}/${cuentaId}/${mesSeleccionado}/${anioSeleccionado}`);
          const saldoTipo = res.data[0]?.["Saldo Mensual"];
          const saldoNumerico = parseFloat(saldoTipo) || 0;
          setSaldoTipo(prevSaldoTipo => ({ ...prevSaldoTipo, [idTipo]: saldoNumerico }));

        } catch (err) {
          console.error(`Error fetching saldoTipo data for idTipo ${idTipo}:`, err);
        }
      }
    };

    useEffect(() => {
      if (userId) {
        fetchPerfilData();
        fetchCuentas(); // Llama a fetchCuentas aquí
        fetchSaldos();
        fetchReporte();
        fetchSaldosPorTipo(1);
        fetchSaldosPorTipo(2);
        fetchSaldosPorTipo(3);
      }
    }, [userId, mesSeleccionado, anioSeleccionado, cuentaId]);

    const manejarClick = (idTipo) => {
      const motivos = { 1: 'gastos', 2: 'ingresos', 3: 'ahorros' };
      setMotivo(motivos[idTipo]);
      setIdTipos(idTipo);
      setMostrarPopup(true);
      setViewToShow("transaccion");    

    };
    const manejarClickBalanceMensual = () => {
      console.log("Abriendo Popup de Balance Mensual");
      setViewToShow("cuenta");    
      setMostrarPopup(true); // Muestra el Popup
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
      } else {
        tipo = 3;
      }

      const requestData = {
        "idperfil_fk": userId,
        "idcuenta_fk": cuentaId,
        "idtipos_fk": tipo,
        "idsubtipo_fk": datos.subtipo,
        "importe": cantidad,
        "fecha": datos.fecha,
        "observaciones": datos.observaciones
      };

      console.log('Datos a enviar:', requestData);

      axios.post("https://backmoneyminds.onrender.com/gestor/addOperacion", requestData)
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
    useEffect(() => {
      if (cuentas.length > 0) {
        fetchReporte();
      }
    }, [cuentas, mesSeleccionado, anioSeleccionado]);
    
    const cerrarPopup = () => {
      setMostrarPopup(false);
      setViewToShow(null); // Restablece la vista
      setMotivo('');       // Limpia el motivo
      setIdTipos(null);    // Limpia el tipo de transacción
      
      // Cambiar el estado para forzar el renderizado
      setReloadFlag(prev => !prev);
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
      const pageHeight = doc.internal.pageSize.height;
      const marginTop = 40;
      const lineHeight = 10;
      let y = marginTop;
    
      // Título del reporte
      doc.setFontSize(18);
      doc.text('Reporte Mensual', 14, 22);
        
      doc.setFontSize(12);
      reporte.forEach((item) => {
        // Estilo de texto basado en el tipo de operación
        if (item.tipo.toLowerCase() === 'gastos') {
          doc.setTextColor(255, 0, 0);
        } else if (item.tipo.toLowerCase() === 'ingreso') {
          doc.setTextColor(0, 128, 0);
        } else {
          doc.setTextColor(0, 0, 0);
        }
    
        // Control para agregar nuevas páginas si es necesario
        if (y + lineHeight > pageHeight - 10) {
          doc.addPage();
          y = marginTop;
        }
    
        // Detalles de cada transacción
        doc.text(
          `Cuenta: ${item.nombreCuenta}, Importe: ${item.importe}, Tipo: ${item.tipo}, Subtipo: ${item.subtipo}, Fecha: ${item.fecha}`,
          14,
          y
        );
      
        y += lineHeight;
      });
    
      // Guarda el archivo
      doc.save(`Reporte_Mensual_${meses[mesSeleccionado]}_${anioSeleccionado}.pdf`);
    };
    

    const generarReporteExcel = () => {
      const datosExcel = reporte.map(item => ({
        Cuenta: item.nombreCuenta,
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
    setMostrarOpcionesDescarga(prevEstado => !prevEstado); // Alterna entre mostrar y ocultar
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
            <h2 onClick={manejarClickBalanceMensual}>{cuentaNombre}</h2>
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
              balanceInicial={`${saldoTipo[2]}`}
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
            <Popup 
              key={viewToShow} // Forzar recreación del componente
              viewToShow={viewToShow}  // Pasamos el valor de viewToShow
              onClose={cerrarPopup} 
              onSubmit={enviarDatosPopup} 
              motivo={motivo} 
              idtipos={idtipos} 
            />
          )}
        </section>
        <Footer />
      </main>
    );
  };

  export default Gestor;
