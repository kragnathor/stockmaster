// src/components/VentasPorFecha.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function VentasPorFecha() {
  const [reporte, setReporte] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/reportes/ventas_por_fecha`)
      .then((res) => setReporte(res.data))
      .catch((err) => console.error('Error al obtener el reporte:', err));
  }, []);

  return (
    <div className="mt-4">
      <h4>Ventas por Fecha</h4>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Fecha</th>
            <th>Total Vendido (Cantidad)</th>
            <th>Total Vendido ($)</th>
          </tr>
        </thead>
        <tbody>
          {reporte.map((fila, index) => (
            <tr key={index}>
              <td>{new Date(fila.fecha).toLocaleDateString()}</td>
              <td>{fila.cantidad_total}</td>
              <td>${fila.ventas_totales.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VentasPorFecha;
