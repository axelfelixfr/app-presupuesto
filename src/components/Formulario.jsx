import React, { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Error } from './Error';

export const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [error, setError] = useState(false);

  const agregarGasto = e => {
    e.preventDefault();
    // Validar gasto
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
      setError(true);
      return;
    }
    // Pasa validación
    setError(false);

    // Construir el gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate()
    };

    // Pasar el gasto al componente principal
    guardarGasto(gasto);
    guardarCrearGasto(true);

    // Resetear el formulario
    setNombre('');
    setCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gastos aquí</h2>
      {error && (
        <Error mensaje="Ambos campos son obligatorios o presupuesto invalido" />
      )}
      <div className="campo">
        <label>Nombre del gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Cantidad del gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          value={cantidad}
          // Parseamos el elemento a entero con parseInt()
          onChange={e => setCantidad(parseInt(e.target.value) || cantidad)}
        />
      </div>

      <input
        type="submit"
        value="Agregar gasto"
        className="button-primary u-full-width"
      />
    </form>
  );
};

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired
};
