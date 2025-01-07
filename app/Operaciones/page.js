"use client";
import { useEffect, useState } from "react";
import styles from './Operaciones.module.css';

const OperacionesTipoPage = ({ onClose }) => {
  const [operaciones, setOperaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idtipos, setTipo] = useState(1); // 1 para gastos, 2 para ingresos

  const [cuentaNombre, setCuentaNombre] = useState("Ninguna cuenta seleccionada");
  const [cuentaId, setCuentaId] = useState(null);

  useEffect(() => {
    const cuentaPrincipal = JSON.parse(localStorage.getItem("cuentaPrincipal"));
    if (cuentaPrincipal) {
      const { idcuenta, nombre } = cuentaPrincipal;
      setCuentaNombre(nombre);
      setCuentaId(idcuenta);
    } else {
      setLoading(false);
      setError("No se ha seleccionado ninguna cuenta principal.");
    }
  }, []);

  useEffect(() => {
    const fetchOperaciones = async () => {
      if (!cuentaId) return;

      try {
        const idusuario = localStorage.getItem("userId");
        const mes = new Date().getMonth() + 1;
        const ano = new Date().getFullYear();

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
  }, [cuentaId, idtipos]);

  const handleSelectChange = (selectedTipo) => {
    setTipo(selectedTipo);
  };

  const handleDelete = async (idgestor) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta operación?")) return;

    try {
      const response = await fetch(`https://backmoneyminds.onrender.com/gestor/operaciones/${idgestor}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la operación");
      }

      setOperaciones((prevOperaciones) => prevOperaciones.filter(op => op.idgestor !== idgestor));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <p>Cargando operaciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <button className={styles.popupClose} onClick={onClose}>
          &times;
        </button>
        <div className={styles.selectorContainer}>
          <button
            className={`${styles.selectorButton} ${idtipos === 1 ? styles.selected : ''}`}
            onClick={() => handleSelectChange(1)}
          >
            Gastos
          </button>
          <button
            className={`${styles.selectorButton} ${idtipos === 2 ? styles.selected : ''}`}
            onClick={() => handleSelectChange(2)}
          >
            Ingresos
          </button>
        </div>
        <div className={styles.cardHeader}>
          <h2>
            {idtipos === 1
              ? `Operaciones gastos para la cuenta: ${cuentaNombre}`
              : `Operaciones ingresos para la cuenta: ${cuentaNombre}`}
          </h2>
        </div>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {operaciones.map((op, index) => (
                <tr key={index}>
                  <td>{op.importe}</td>
                  <td>{op.tipo}</td>
                  <td>{op.subtipo}</td>
                  <td>{op.fecha}</td>
                  <td>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleDelete(op.idgestor)}
                    >
                      Eliminar
                    </button>
                  </td>
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