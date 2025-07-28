import React from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const SupplierTable = ({ proveedores, onDelete, onUpdate }) => {
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/proveedores/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onDelete(id);
      } else {
        console.error('Error al eliminar proveedor:', await res.text());
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Proveedores</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.nombre || '(sin nombre)'}</td>
              <td>{proveedor.contacto}</td>
              <td>{proveedor.telefono}</td>
              <td>{proveedor.email}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(proveedor.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={onUpdate}
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

export default SupplierTable;
