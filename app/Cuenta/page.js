'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './cuenta.module.css';

export default function CuentasPage({onClose}) {
  const [mostrarPopup, setMostrarPopup] = useState(true);
  const [cuentas, setCuentas] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cuentaPrincipal, setCuentaPrincipal] = useState('');
  const [idCuentaPrincipal, setIdCuentaPrincipal] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [opcionesVisibles, setOpcionesVisibles] = useState({});
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_cuenta: '',
    saldo_inicial: '',
    moneda: '',
    banco: '',
    descripcion: '',
    activa: true,
    campo: '', // Campo seleccionado en modo edición
  });

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(id);
      fetchCuentas(id);
    } else {
      console.error('No se encontró el userId en localStorage.');
    }
  }, []);

  const fetchCuentas = async (id) => {
    try {
      const response = await axios.get(`https://backmoneyminds.onrender.com/cuenta/todas/${id}`);
      const cuentasAPI = response.data.map((cuenta) => ({
        idcuenta: cuenta.idcuenta,
        nombre: cuenta.nombre,
        saldo_actual: parseFloat(cuenta.saldo_actual),
      }));
      setCuentas(cuentasAPI);
    } catch (error) {
      console.error('Error al obtener las cuentas:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    if (modoEdicion) {
      try {
        await axios.patch(
          `https://backmoneyminds.onrender.com/cuenta/actualizar-cuenta/${idCuentaPrincipal}`,
          {
            fieldName: formData.campo,
            fieldValue: formData[formData.campo],
          }
        );
        setCuentas((prevCuentas) =>
          prevCuentas.map((cuenta) => {
            if (cuenta.idcuenta === idCuentaPrincipal) {
              const updatedCuenta = { ...cuenta, [formData.campo]: formData[formData.campo] };
              if (formData.campo === 'saldo_inicial') {
                updatedCuenta.saldo_actual = parseFloat(formData.saldo_inicial);
              }
              return updatedCuenta;
            }
            return cuenta;
          })
        );
        alert('Cuenta actualizada con éxito');
      } catch (error) {
        console.error('Error al actualizar la cuenta:', error);
        alert('Ocurrió un error al actualizar la cuenta');
      }
    } else {
      const nuevaCuenta = { ...formData, idperfil_fk: userId };
      try {
        const response = await axios.post(
          'https://backmoneyminds.onrender.com/cuenta/agregar-cuenta',
          nuevaCuenta
        );
        setCuentas([
          ...cuentas,
          { idcuenta: response.data.idcuenta, nombre: nuevaCuenta.nombre, saldo_actual: parseFloat(nuevaCuenta.saldo_inicial) },
        ]);
        alert('Cuenta creada con éxito');
      } catch (error) {
        console.error('Error al agregar la cuenta:', error);
        alert('Ocurrió un error al agregar la cuenta');
      }
    }

    setFormData({
      nombre: '',
      tipo_cuenta: '',
      saldo_inicial: '',
      moneda: '',
      banco: '',
      descripcion: '',
      activa: true,
      campo: '',
    });
    setMostrarFormulario(false);
    setModoEdicion(false);
  };

  const handleUpdate = (cuenta) => {
    setFormData({
      nombre: cuenta.nombre,
      tipo_cuenta: '',
      saldo_inicial: cuenta.saldo_actual,
      moneda: '',
      banco: cuenta.banco,
      descripcion: cuenta.descripcion,
      activa: cuenta.activa,
      campo: '',
    });
    setIdCuentaPrincipal(cuenta.idcuenta);
    setMostrarFormulario(true);
    setModoEdicion(true);
  };

  const handleDelete = async (idcuenta) => {
    try {
      await axios.delete(`https://backmoneyminds.onrender.com/cuenta/deleteGestor/${idcuenta}`);
      await axios.delete(`https://backmoneyminds.onrender.com/cuenta/deleteCuenta/${idcuenta}`);
      setCuentas((prevCuentas) => prevCuentas.filter((cuenta) => cuenta.idcuenta !== idcuenta));
      alert('Cuenta eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      alert('Ocurrió un error al eliminar la cuenta');
    }
  };

  const toggleOpciones = (idcuenta) => {
    setOpcionesVisibles((prev) => ({
      ...prev,
      [idcuenta]: !prev[idcuenta],
    }));
  };

  const handleSeleccionarCuentaPrincipal = (cuenta) => {
    setCuentaPrincipal(cuenta.nombre);
    setIdCuentaPrincipal(cuenta.idcuenta);
    localStorage.setItem('cuentaPrincipal', JSON.stringify({ idcuenta: cuenta.idcuenta, nombre: cuenta.nombre }));
    alert(`Cuenta principal seleccionada: ${cuenta.nombre}`);
  };

  return (
    <div>
      

      {mostrarPopup && (
        <div className={styles.contenedorPopup}>
          <div className={styles.popup}>
          <button className={styles.cerrar} onClick={onClose}>
            &times;
          </button>
            <h2 className={styles.encabezado}>Lista de Cuentas</h2>
            <div>
              {cuentas.map((cuenta) => (
                <div key={cuenta.idcuenta} className={styles.campo}>
                  <span>{cuenta.nombre}</span>
                  <span style={{ fontWeight: 'bold' }}>${cuenta.saldo_actual.toFixed(2)}</span>
                  <button
                    className={styles.tresPuntos}
                    onClick={() => toggleOpciones(cuenta.idcuenta)}
                  >
                    &#x22EE;
                  </button>
                  {opcionesVisibles[cuenta.idcuenta] && (
                    <div className={styles.opciones}>
                      <button onClick={() => handleUpdate(cuenta)}>Actualizar</button>
                      <button onClick={() => handleDelete(cuenta.idcuenta)}>Eliminar</button>
                      <button onClick={() => handleSeleccionarCuentaPrincipal(cuenta)}>Seleccionar como principal</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {!mostrarFormulario ? (
              <button
                className={styles.boton}
                onClick={() => setMostrarFormulario(true)}
              >
                Agregar Cuenta
              </button>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formulario}>
                {modoEdicion && (
                  <select
                    name="campo"
                    value={formData.campo}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione un campo para actualizar</option>
                    <option value="nombre">Nombre</option>
                    <option value="saldo_inicial">Saldo Inicial</option>
                    <option value="banco">Banco</option>
                    <option value="descripcion">Descripción</option>
                  </select>
                )}
                {!modoEdicion && (
                  <>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Nombre de la cuenta"
                      required
                    />
                    <input
                      type="text"
                      name="tipo_cuenta"
                      value={formData.tipo_cuenta}
                      onChange={handleInputChange}
                      placeholder="Tipo de cuenta (e.g., Billetera Virtual)"
                      required
                    />
                    <input
                      type="number"
                      name="saldo_inicial"
                      value={formData.saldo_inicial}
                      onChange={handleInputChange}
                      placeholder="Saldo inicial"
                      required
                    />
                    <input
                      type="text"
                      name="moneda"
                      value={formData.moneda}
                      onChange={handleInputChange}
                      placeholder="Moneda (e.g., ARS)"
                      required
                    />
                    <input
                      type="text"
                      name="banco"
                      value={formData.banco}
                      onChange={handleInputChange}
                      placeholder="Banco (e.g., Nacion)"
                    />
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      placeholder="Descripción de la cuenta"
                      rows={3}
                    />
                    <label>
                      <input
                        type="checkbox"
                        name="activa"
                        checked={formData.activa}
                        onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
                      />
                      Activa
                    </label>
                  </>
                )}
                {modoEdicion && formData.campo && (
                  <input
                    type="text"
                    name={formData.campo}
                    value={formData[formData.campo] || ''}
                    onChange={handleInputChange}
                    placeholder={`Nuevo valor para ${formData.campo}`}
                  />
                )}
                <button type="submit" className={styles.boton}>
                  {modoEdicion ? 'Actualizar Cuenta' : 'Guardar Cuenta'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
