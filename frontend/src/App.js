import React, { useEffect, useState } from 'react';
import ProductTable from './components/ProductTable';
import AddProductForm from './components/AddProductForm';
import SupplierTable from './components/SupplierTable';
import AddSupplierForm from './components/AddSupplierForm';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  // ----- Productos -----
  const fetchProductos = () => {
    fetch(`${API_URL}/productos`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error('Error al obtener productos:', err));
  };

  const handleProductoAgregado = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };

  const handleProductoEliminado = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  const handleProductoActualizado = (actualizado) => {
    setProductos(productos.map((p) => (p.id === actualizado.id ? actualizado : p)));
  };

  // ----- Proveedores -----
  const fetchProveedores = () => {
    fetch(`${API_URL}/proveedores`)
      .then((res) => res.json())
      .then((data) => setProveedores(data))
      .catch((err) => console.error('Error al obtener proveedores:', err));
  };

  const handleProveedorAgregado = (nuevoProveedor) => {
    setProveedores([...proveedores, nuevoProveedor]);
  };

  const handleProveedorEliminado = (id) => {
    setProveedores(proveedores.filter((p) => p.id !== id));
  };

  const handleProveedoresActualizados = () => {
    fetchProveedores(); // recarga todos los proveedores desde la base de datos
  };

  useEffect(() => {
    fetchProductos();
    fetchProveedores();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">StockMaster</h1>

      <AddProductForm onProductAdded={handleProductoAgregado} />
      <ProductTable
        productos={productos}
        onDelete={handleProductoEliminado}
        onUpdate={handleProductoActualizado}
      />

      <hr className="my-5" />

      <AddSupplierForm onSupplierAdded={handleProveedorAgregado} />
      <SupplierTable
        proveedores={proveedores}
        onDelete={handleProveedorEliminado}
        onUpdate={handleProveedoresActualizados}
      />
    </div>
  );
}

export default App;

