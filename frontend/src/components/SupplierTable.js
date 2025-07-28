import React from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const SupplierTable = ({ proveedores, onDelete, onUpdate }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/proveedores/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(id);
      } else {
        console.error('Error al eliminar proveedor:', await response.text());
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  const handleUpdate = async (proveedor) => {
    const nuevoNombre = prompt('Nuevo nombre:', proveedor.nombre);
    const nuevoContacto = prompt('Nuevo contacto:', proveedor.contacto);
    const nuevoTelefono = prompt('Nuevo teléfono:', proveedor.telefono);
    const nuevoEmail = prompt('Nuevo email:', proveedor.email);

    if (
      nuevoNombre !== null &&
      nuevoContacto !== null &&
      nuevoTelefono !== null &&
      nuevoEmail !== null
    ) {
      try {
        const response = await fetch(`${API_URL}/proveedores/${proveedor.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: nuevoNombre,
            contacto: nuevoContacto,
            telefono: nuevoTelefono,
            email: nuevoEmail,
          }),
        });

        if (response.ok) {
          onUpdate();
        } else {
          console.error('Error al actualizar proveedor:', await response.text());
        }
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
      }
    }
  };

  return (
    <div>
      <h2>Lista de Proveedores</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.id}>
              <td>{prov.nombre}</td>
              <td>{prov.contacto}</td>
              <td>{prov.telefono}</td>
              <td>{prov.email}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleUpdate(prov)}
                >
                  Actualizar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(prov.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;
