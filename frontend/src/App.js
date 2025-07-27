import React, { useEffect, useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('Cargando...');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => setMensaje(data.mensaje))
      .catch(error => {
        console.error('Error al conectar con la API:', error);
        setMensaje('Error al conectar con la API');
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Frontend de StockMaster</h1>
      <p>{mensaje}</p>
    </div>
  );
}

export default App;
