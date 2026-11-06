import React from 'react';
import { createRoot } from 'react-dom/client';
import LotificacionApp from './components/LotificacionApp';

const container = document.getElementById('lotificacion-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <LotificacionApp />
    </React.StrictMode>
  );
} else {
  console.error("No element with id 'lotificacion-root' found");
}
