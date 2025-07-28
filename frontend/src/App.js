// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VentasPorProducto from './components/VentasPorProducto';
import VentasPorFecha from './components/VentasPorFecha';
import ProductosView from './views/ProductosView';
import ProveedoresView from './views/ProveedoresView';
import Home from './views/Home';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4">StockMaster</h1>

        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Inicio</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">Productos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/proveedores">Proveedores</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ventas-producto">Reporte por Producto</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ventas-fecha">Reporte por Fecha</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosView />} />
          <Route path="/proveedores" element={<ProveedoresView />} />
          <Route path="/ventas-producto" element={<VentasPorProducto />} />
          <Route path="/ventas-fecha" element={<VentasPorFecha />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




