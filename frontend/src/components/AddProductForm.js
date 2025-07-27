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
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default AddProductForm;
