'use client';
import { useEffect, useState } from "react";
import styles from './Operaciones.module.css'

const OperacionesTipoPage = ({onClose}) => {
  const [operaciones, setOperaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cuentaNombre, setCuentaNombre] = useState("Ninguna cuenta seleccionada");
  const [cuentaId, setCuentaId] = useState(null);

  useEffect(() => {
    const cuentaPrincipal = JSON.parse(localStorage.getItem("cuentaPrincipal"));
    if (cuentaPrincipal) {
      const { idcuenta, nombre } = cuentaPrincipal;
      setCuentaNombre(nombre);
      setCuentaId(idcuenta); // Aquí asignamos el idcuenta
    } else {
      setLoading(false);
      setError("No se ha seleccionado ninguna cuenta principal.");
    }
  }, []);

  useEffect(() => {
    const fetchOperaciones = async () => {
      if (!cuentaId) return; // Evita hacer la llamada si cuentaId es null

      try {
        const idusuario = localStorage.getItem("userId");
        const idtipos = 2; // Cambia este valor según el tipo deseado (1: Gastos, 2: Ingresos, 3: Ahorros)
        const mes = new Date().getMonth() + 1; // Mes actual
        const ano = new Date().getFullYear(); // Año actual

        const response = await fetch(
          `https://backmoneyminds.onrender.com/gestor/operacionesTipo/${idusuario}/${mes}/${ano}/${cuentaId}/${idtipos}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener las operaciones");
        }

        const data = await response.json();
        setOperaciones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOperaciones();
  }, [cuentaId]); // Este efecto depende de cuentaId

  if (loading) return <p>Cargando operaciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <button className={styles.popupClose} onClick={onClose}>
          &times;
        </button>
        <h1>Operaciones para la cuenta: {cuentaNombre}</h1>
        {loading && <p>Cargando operaciones...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Importe</th>
                <th>Tipo</th>
                <th>Subtipo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {operaciones.map((op, index) => (
                <tr key={index}>
                  <td>{op.importe}</td>
                  <td>{op.tipo}</td>
                  <td>{op.subtipo}</td>
                  <td>{op.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OperacionesTipoPage;
