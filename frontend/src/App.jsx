import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HealthStatus from './components/HealthStatus';
import ProductList from './components/ProductList';
import { checkHealth, fetchProductos, API_BASE_URL } from './services/api';
import './App.css';

export default function App() {
  // Estado para la salud del Backend
  const [healthData, setHealthData] = useState(null);
  const [healthLoading, setHealthLoading] = useState(true);

  // Estado para la lista de productos
  const [productos, setProductos] = useState([]);
  const [productosLoading, setProductosLoading] = useState(true);
  const [productosError, setProductosError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

  // Función para consultar GET /api/health
  const loadHealth = useCallback(async () => {
    setHealthLoading(true);
    try {
      const data = await checkHealth();
      setHealthData(data);
    } catch (err) {
      setHealthData({
        ok: false,
        message: err.message || "Error al conectar"
      });
    } finally {
      setHealthLoading(false);
    }
  }, []);

  // Función para consultar GET /api/productos
  const loadProductos = useCallback(async (categoria) => {
    setProductosLoading(true);
    setProductosError(null);
    try {
      const data = await fetchProductos(categoria);
      if (data && data.productos) {
        setProductos(data.productos);
      } else {
        setProductos([]);
      }
    } catch (err) {
      setProductosError(err.message);
      setProductos([]);
    } finally {
      setProductosLoading(false);
    }
  }, []);

  // Cargar datos iniciales al montar la aplicación
  useEffect(() => {
    loadHealth();
  }, [loadHealth]);

  useEffect(() => {
    loadProductos(categoriaSeleccionada);
  }, [categoriaSeleccionada, loadProductos]);

  const handleSelectCategoria = (cat) => {
    setCategoriaSeleccionada(cat);
  };

  const isConnected = healthData?.ok === true;

  return (
    <div className="app-container">
      {/* Barra de navegación superior con badges tecnológicos */}
      <Navbar apiUrl={API_BASE_URL} isOnline={isConnected} />

      <main className="main-content">
        {/* Banner Hero */}
        <section className="hero-banner">
          <div className="hero-badge">
            <span className="badge-sparkle">✨</span> Monorepo Listo para Despliegue en Render
          </div>
          <h1 className="hero-title">
            Arquitectura Desacoplada: <span className="text-gradient">Frontend + Backend</span>
          </h1>
          <p className="hero-subtitle">
            Frontend servido como <strong>Static Site</strong> y API servida como <strong>Web Service</strong>.
            La comunicación se realiza exclusivamente a través de <code>import.meta.env.VITE_API_URL</code>.
          </p>
        </section>

        {/* Sección 1: Monitor de Estado (GET /api/health) */}
        <HealthStatus
          healthData={healthData}
          loading={healthLoading}
          onRefresh={loadHealth}
          apiUrl={API_BASE_URL}
        />

        {/* Sección 2: Catálogo de Productos (GET /api/productos) */}
        <ProductList
          productos={productos}
          loading={productosLoading}
          error={productosError}
          onRefresh={() => loadProductos(categoriaSeleccionada)}
          categoriaActiva={categoriaSeleccionada}
          onSelectCategoria={handleSelectCategoria}
        />

        {/* Guía Rápida Integrada de Despliegue para Render */}
        <section className="deploy-guide-section glass-panel">
          <h2 className="guide-title">🚀 Configuración Rápida en Render</h2>
          <div className="guide-grid">
            <div className="guide-card">
              <div className="guide-card-header">
                <span className="guide-step">1</span>
                <h3>Backend (Web Service)</h3>
              </div>
              <ul className="guide-list">
                <li><strong>Root Directory:</strong> <code>backend</code></li>
                <li><strong>Build Command:</strong> <code>npm install</code></li>
                <li><strong>Start Command:</strong> <code>npm start</code></li>
                <li><strong>Variable Render:</strong> Asigna puerto automáticamente con <code>process.env.PORT</code></li>
              </ul>
            </div>

            <div className="guide-card">
              <div className="guide-card-header">
                <span className="guide-step">2</span>
                <h3>Frontend (Static Site)</h3>
              </div>
              <ul className="guide-list">
                <li><strong>Root Directory:</strong> <code>frontend</code></li>
                <li><strong>Build Command:</strong> <code>npm install && npm run build</code></li>
                <li><strong>Publish Directory:</strong> <code>dist</code></li>
                <li><strong>Variable de Entorno:</strong> <code>VITE_API_URL=https://TU-BACKEND.onrender.com</code></li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Proyecto Full-Stack preparado para Render • Estructura independiente en monorepositorio</p>
      </footer>
    </div>
  );
}
