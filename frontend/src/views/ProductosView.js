import React from 'react';
import AddProductForm from '../components/AddProductForm';
import ProductTable from '../components/ProductTable';

const ProductosView = () => {
  return (
    <div>
      <h2>Gestión de Productos</h2>
      <AddProductForm onProductoAgregado={() => window.location.reload()} />
      <ProductTable />
    </div>
  );
};

export default ProductosView;
