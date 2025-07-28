import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const AddProductForm = ({ onProductAdded }) => {
  const [nombre, setNombre] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = { nombre, stock: parseInt(stock, 10) };

    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });

      if (response.ok) {
        const data = await response.json();
        onProductAdded(data);
        setNombre('');
        setStock('');
      } else {
        console.error('Error al agregar producto:', await response.text());
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
