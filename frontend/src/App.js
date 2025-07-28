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

  const handleProductAdded = (producto) => {
    setProductos([...productos, producto]);
  };

  const handleProductDeleted = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const handleProductUpdated = (updatedProduct) => {
    setProductos(
      productos.map((producto) =>
        producto.id === updatedProduct.id ? updatedProduct : producto
      )
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📦 StockMaster</h1>
      <div className="row">
        <div className="col-md-6">
          <AddProductForm onProductAdded={handleProductAdded} />
        </div>
        <div className="col-md-6">
          <ProductTable
            productos={productos}
            onDelete={handleProductDeleted}
            onUpdate={handleProductUpdated}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

