import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HealthStatus from './components/HealthStatus';
import ProductList from './components/ProductList';
import { checkHealth, fetchProductos, DEFAULT_API_URL } from './services/api';
import './App.css';

export default function App() {
  // Estado para la URL activa del Backend (con persistencia local opcional para pruebas de Render)
  const [activeApiUrl, setActiveApiUrl] = useState(() => {
    const saved = localStorage.getItem('veloce_custom_api_url') || localStorage.getItem('aura_custom_api_url');
    return saved || DEFAULT_API_URL;
  });

  // Estado para la salud del Backend
  const [healthData, setHealthData] = useState(null);
  const [healthLoading, setHealthLoading] = useState(true);

  // Estado para el catálogo de vehículos
  const [productos, setProductos] = useState([]);
  const [productosLoading, setProductosLoading] = useState(true);
  const [productosError, setProductosError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

  // Guardar cambio de URL en localStorage y recargar
  const handleUpdateApiUrl = (newUrl) => {
    const clean = newUrl.replace(/\/+$/, '');
    localStorage.setItem('veloce_custom_api_url', clean);
    setActiveApiUrl(clean);
  };

  // Función para consultar GET /api/health
  const loadHealth = useCallback(async () => {
    setHealthLoading(true);
    try {
      const data = await checkHealth(activeApiUrl);
      setHealthData(data);
    } catch (err) {
      setHealthData({
        ok: false,
        message: err.message || "Error al conectar con la API"
      });
    } finally {
      setHealthLoading(false);
    }
  }, [activeApiUrl]);

  // Función para consultar GET /api/productos (superdeportivos)
  const loadProductos = useCallback(async (categoria) => {
    setProductosLoading(true);
    setProductosError(null);
    try {
      const data = await fetchProductos(categoria, activeApiUrl);
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
  }, [activeApiUrl]);

  // Cargar datos iniciales al montar o cambiar activeApiUrl
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
  const isRenderCloud = activeApiUrl.includes('onrender.com');

  return (
    <div className="app-container">
      {/* Barra superior con monitoreo */}
      <Navbar apiUrl={activeApiUrl} isOnline={isConnected} />

      <main className="main-content">
        {/* Banner de Estado de Despliegue en Render */}
        <div className="render-deploy-banner glass-panel animate-fade-in">
          <div className="deploy-banner-left">
            <span className="deploy-banner-icon">🚀</span>
            <div>
              <div className="deploy-badge-status">
                <span className="status-dot"></span>
                Código Subido a GitHub: <strong>f866055/RENDER</strong> (Rama <code>main</code>)
              </div>
              <p className="deploy-banner-text">
                Tu proyecto ya está listo en GitHub para desplegarse en Render en 2 servicios separados (Web Service y Static Site).
              </p>
            </div>
          </div>
          <div className="deploy-banner-right">
            <a
              href="https://dashboard.render.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-open-render"
            >
              Abrir Render Dashboard ↗
            </a>
          </div>
        </div>

        {/* Hero Banner Automotriz de Alto Desempeño */}
        <section className="hero-banner">
          <div className="hero-badge-luxury">
            <span className="badge-sparkle">🏎️</span> Veloce Exotic Supercars Showroom
          </div>

          <h1 className="hero-title">
            Conduce el Desempeño Puro: <span className="text-gold-gradient">Superdeportivos de Élite</span>
          </h1>

          <p className="hero-subtitle">
            Modelos de colección, hiperhíbridos de más de 1,000 HP, V8 Twin-Turbo y V12 atmosféricos
            con entrega inmediata, certificación VIP y acceso a pista de pruebas.
          </p>

          <div className="hero-features-bar">
            <div className="hero-feat-item">
              <span className="feat-icon">⚡</span>
              <span>0 a 100 km/h en hasta 1.8s</span>
            </div>
            <div className="hero-feat-item">
              <span className="feat-icon">🐎</span>
              <span>Hasta 1,914 HP de Potencia</span>
            </div>
            <div className="hero-feat-item">
              <span className="feat-icon">🏁</span>
              <span>Certificación de Pista VIP</span>
            </div>
            <div className="hero-feat-item">
              <span className="feat-icon">☁️</span>
              <span>{isRenderCloud ? 'Conectado a Render Cloud' : 'Servidor Local Preparado para Render'}</span>
            </div>
          </div>
        </section>

        {/* Sección 1: Monitor de Conexión del Backend (GET /api/health) */}
        <HealthStatus
          healthData={healthData}
          loading={healthLoading}
          onRefresh={loadHealth}
          currentApiUrl={activeApiUrl}
          onChangeApiUrl={handleUpdateApiUrl}
          defaultEnvUrl={DEFAULT_API_URL}
        />

        {/* Sección 2: Catálogo de Superdeportivos en Venta (GET /api/productos) */}
        <ProductList
          productos={productos}
          loading={productosLoading}
          error={productosError}
          onRefresh={() => loadProductos(categoriaSeleccionada)}
          categoriaActiva={categoriaSeleccionada}
          onSelectCategoria={handleSelectCategoria}
        />

        {/* Sección 3: Guía Rápida para Activar tus 2 Servicios en Render */}
        <section className="deploy-guide-section glass-panel">
          <div className="guide-header-badge">
            <span className="sparkle">📋</span> Pasos para Ponerlo en Render
          </div>
          <h2 className="guide-title">Cómo Activar tus 2 Servicios en Render Ahora Mismo</h2>
          <p className="guide-intro">
            Como tu código está en el repositorio <strong>https://github.com/f866055/RENDER</strong>, solo debes seguir estos 2 pasos en tu cuenta de Render:
          </p>

          <div className="guide-grid">
            <div className="guide-card">
              <div className="guide-card-header">
                <span className="guide-step">1</span>
                <div>
                  <h3>Paso 1: Crear el Backend (Web Service)</h3>
                  <span className="guide-service-type">API en Node.js + Express</span>
                </div>
              </div>
              <ul className="guide-list">
                <li>1. Ve a <a href="https://dashboard.render.com" target="_blank" rel="noreferrer">dashboard.render.com</a> ➜ <strong>New +</strong> ➜ <strong>Web Service</strong>.</li>
                <li>2. Selecciona tu repositorio <strong>RENDER</strong>.</li>
                <li>3. <strong>Root Directory:</strong> escribe <code>backend</code></li>
                <li>4. <strong>Build Command:</strong> <code>npm install</code></li>
                <li>5. <strong>Start Command:</strong> <code>npm start</code></li>
                <li>6. Haz clic en <strong>Create Web Service</strong> y copia la URL generada (ej: <code>https://mi-backend.onrender.com</code>).</li>
              </ul>
            </div>

            <div className="guide-card">
              <div className="guide-card-header">
                <span className="guide-step">2</span>
                <div>
                  <h3>Paso 2: Crear el Frontend (Static Site)</h3>
                  <span className="guide-service-type">Web React + Vite</span>
                </div>
              </div>
              <ul className="guide-list">
                <li>1. En Render, haz clic en <strong>New +</strong> ➜ <strong>Static Site</strong>.</li>
                <li>2. Selecciona el mismo repositorio <strong>RENDER</strong>.</li>
                <li>3. <strong>Root Directory:</strong> escribe <code>frontend</code></li>
                <li>4. <strong>Build Command:</strong> <code>npm install && npm run build</code></li>
                <li>5. <strong>Publish Directory:</strong> <code>dist</code></li>
                <li>6. En <strong>Environment Variables</strong> añade:<br/>
                    <code>VITE_API_URL</code> = <code>https://TU-BACKEND.onrender.com</code>
                </li>
                <li>7. Haz clic en <strong>Create Static Site</strong> ¡y listo!</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-brand">🏎️ Veloce Motors • Showroom Automotriz Full-Stack preparado para Render</p>
          <p className="footer-sub">Repositorio: github.com/f866055/RENDER • Rama main</p>
        </div>
      </footer>
    </div>
  );
}
