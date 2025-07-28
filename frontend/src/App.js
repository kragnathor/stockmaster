import React, { useEffect, useState } from 'react';
import ProductTable from './components/ProductTable';
import AddProductForm from './components/AddProductForm';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/productos')
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener productos:', error));
  }, []);

  // ✅ Función para agregar un producto nuevo
  const handleProductAdded = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };

  // ✅ Función para eliminar un producto
  const handleProductDeleted = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  // ✅ Función para actualizar un producto
  const handleProductUpdated = (productoActualizado) => {
    setProductos(productos.map((p) => p.id === productoActualizado.id ? productoActualizado : p));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">StockMaster</h1>
      <AddProductForm onProductAdded={handleProductAdded} />
      <ProductTable
        productos={productos}
        onDelete={handleProductDeleted}
        onUpdate={handleProductUpdated}
      />
    </div>
  );
}

export default App;

