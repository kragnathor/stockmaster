import React from 'react';
import AddSupplierForm from '../components/AddSupplierForm';
import SupplierTable from '../components/SupplierTable';

const ProveedoresView = () => {
  return (
    <div>
      <h2>Gestión de Proveedores</h2>
      <AddSupplierForm onProveedorAgregado={() => window.location.reload()} />
      <SupplierTable />
    </div>
  );
};

export default ProveedoresView;
