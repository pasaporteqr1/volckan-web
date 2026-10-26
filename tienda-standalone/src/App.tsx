import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { StoreConfigProvider } from './context/StoreConfigContext';
import StorePage from './pages/StorePage';
import AdminStorePage from './pages/AdminStorePage';
import './App.css';

export default function App() {
  return (
    <StoreConfigProvider>
      <div className="store-app-root">
        <Routes>
          <Route path="/" element={<StorePage />} />
          <Route path="/mercado" element={<StorePage />} />
          <Route path="/tienda" element={<StorePage />} />
          <Route path="/catalogo" element={<StorePage />} />
          <Route path="/producto/:productId" element={<StorePage />} />
          <Route path="/admin" element={<AdminStorePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </StoreConfigProvider>
  );
}
