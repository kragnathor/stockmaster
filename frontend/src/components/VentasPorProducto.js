import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VentasPorProducto() {
  const [reporte, setReporte] = useState([]);

  // Llamada a la API al cargar el componente
  useEffect(() => {
    axios.get('http://localhost:5000/reportes/ventas_por_producto')
      .then(response => setReporte(response.data))
      .catch(error => console.error('Error al obtener reporte:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Ventas por Producto</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Cantidad Vendida</th>
            <th>Ventas Totales ($)</th>
          </tr>
        </thead>
        <tbody>
          {reporte.length > 0 ? (
            reporte.map((item, index) => (
              <tr key={index}>
                <td>{item.producto}</td>
                <td>{item.cantidad_total}</td>
                <td>{item.ventas_totales.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VentasPorProducto;
