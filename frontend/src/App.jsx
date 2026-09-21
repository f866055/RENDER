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

  // Estado para el catálogo de apartamentos
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
        message: err.message || "Error al conectar con la API"
      });
    } finally {
      setHealthLoading(false);
    }
  }, []);

  // Función para consultar GET /api/productos (apartamentos)
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
      {/* Barra superior inmobiliaria con monitoreo en tiempo real */}
      <Navbar apiUrl={API_BASE_URL} isOnline={isConnected} />

      <main className="main-content">
        {/* Banner Hero Inmobiliario de Lujo */}
        <section className="hero-banner">
          <div className="hero-badge-luxury">
            <span className="badge-sparkle">💎</span> Desarrollos Inmobiliarios Exclusivos
          </div>

          <h1 className="hero-title">
            Encuentra tu Próximo Hogar: <span className="text-gold-gradient">Apartamentos de Lujo</span>
          </h1>

          <p className="hero-subtitle">
            Penthouses de doble altura, residencias familiares y lofts ejecutivos con acabados de autor,
            domótica integrada y ubicaciones privilegiadas.
          </p>

          <div className="hero-features-bar">
            <div className="hero-feat-item">
              <span className="feat-icon">🔑</span>
              <span>Entrega Inmediata</span>
            </div>
            <div className="hero-feat-item">
              <span className="feat-icon">📐</span>
              <span>Desde 52 m² hasta 260 m²</span>
            </div>
            <div className="hero-feat-item">
              <span className="feat-icon">🏊</span>
              <span>Amenidades Premium</span>
            </div>
            <div className="hero-feat-item">
              <span className="feat-icon">⚡</span>
              <span>Monitoreo API en Tiempo Real</span>
            </div>
          </div>
        </section>

        {/* Sección 1: Monitor de Conexión del Backend (GET /api/health) */}
        <HealthStatus
          healthData={healthData}
          loading={healthLoading}
          onRefresh={loadHealth}
          apiUrl={API_BASE_URL}
        />

        {/* Sección 2: Catálogo de Apartamentos en Venta (GET /api/productos) */}
        <ProductList
          productos={productos}
          loading={productosLoading}
          error={productosError}
          onRefresh={() => loadProductos(categoriaSeleccionada)}
          categoriaActiva={categoriaSeleccionada}
          onSelectCategoria={handleSelectCategoria}
        />

        {/* Sección 3: Guía de Despliegue en Render para Arquitectura Desacoplada */}
        <section className="deploy-guide-section glass-panel">
          <div className="guide-header-badge">
            <span className="sparkle">🚀</span> Guía de Despliegue en Render
          </div>
          <h2 className="guide-title">Configuración de Servicios Independientes</h2>
          <p className="guide-intro">
            Esta aplicación inmobiliaria se compone de dos servicios independientes desplegados desde el mismo repositorio de GitHub:
          </p>

          <div className="guide-grid">
            <div className="guide-card">
              <div className="guide-card-header">
                <span className="guide-step">1</span>
                <div>
                  <h3>Backend API (Web Service)</h3>
                  <span className="guide-service-type">Node.js + Express REST API</span>
                </div>
              </div>
              <ul className="guide-list">
                <li><strong>Root Directory:</strong> <code>backend</code></li>
                <li><strong>Build Command:</strong> <code>npm install</code></li>
                <li><strong>Start Command:</strong> <code>npm start</code></li>
                <li><strong>Variable de Entorno:</strong> Puerto dinámico gestionado con <code>PORT = process.env.PORT || 3000</code></li>
              </ul>
            </div>

            <div className="guide-card">
              <div className="guide-card-header">
                <span className="guide-step">2</span>
                <div>
                  <h3>Frontend Web (Static Site)</h3>
                  <span className="guide-service-type">React + Vite SPA</span>
                </div>
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
        <div className="footer-content">
          <p className="footer-brand">🏛️ Aura Residences • Inmobiliaria Full-Stack preparada para Render</p>
          <p className="footer-sub">Frontend Static Site + Backend Web Service en Monorepo</p>
        </div>
      </footer>
    </div>
  );
}
