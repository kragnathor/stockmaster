import React from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const ProductTable = ({ productos, onDelete, onUpdate }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(id);
      } else {
        console.error('Error al eliminar producto:', await response.text());
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  const handleUpdate = async (id, newStock) => {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        onUpdate(updatedProduct);
      } else {
        console.error('Error al actualizar producto:', await response.text());
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Stock Actual</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.stock}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(producto.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const nuevoStock = prompt('Nuevo stock:', producto.stock);
                    if (nuevoStock !== null && !isNaN(nuevoStock)) {
                      handleUpdate(producto.id, parseInt(nuevoStock, 10));
                    }
                  }}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
