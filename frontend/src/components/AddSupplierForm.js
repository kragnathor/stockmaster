import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const AddSupplierForm = ({ onSupplierAdded }) => {
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoProveedor = { nombre, contacto, telefono, email };

    try {
      const response = await fetch(`${API_URL}/proveedores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProveedor),
      });

      if (response.ok) {
        const data = await response.json();
        onSupplierAdded({ id: data.id, ...nuevoProveedor });
        setNombre('');
        setContacto('');
        setTelefono('');
        setEmail('');
      } else {
        console.error('Error al agregar proveedor:', await response.text());
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Agregar Proveedor</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Contacto"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Proveedor</button>
    </form>
  );
};

export default AddSupplierForm;
