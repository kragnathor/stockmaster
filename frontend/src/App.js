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

  return (
    <div>
      <h1>StockMaster</h1>
      <AddProductForm />
      <ProductTable productos={productos} />
    </div>
  );
}

export default App;

