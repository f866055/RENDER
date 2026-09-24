import React, { useState } from 'react';
import ProductCard from './ProductCard';

const CATEGORIAS_VEHICULOS = [
  { id: 'todos', label: '🏎️ Toda la Colección' },
  { id: 'Superdeportivos', label: '🚀 Superdeportivos' },
  { id: 'Hiperdeportivos', label: '🦁 Hiperdeportivos' },
  { id: 'Gran Turismo', label: '✨ Gran Turismo' },
  { id: 'SUVs de Rendimiento', label: '🚙 SUVs de Lujo' },
  { id: 'Eléctricos & Híbridos', label: '⚡ Eléctricos & Híbridos' }
];

export default function ProductList({
  productos,
  loading,
  error,
  onRefresh,
  categoriaActiva,
  onSelectCategoria
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrado reactivo en el frontend por texto de búsqueda (nombre, marca, motor, categoría, descripción)
  const vehiculosFiltrados = productos.filter((car) => {
    const query = searchTerm.toLowerCase();
    const coincideNombre = car.nombre?.toLowerCase().includes(query);
    const coincideMarca = car.marca?.toLowerCase().includes(query);
    const coincideUbicacion = car.ubicacion?.toLowerCase().includes(query);
    const coincideMotor = car.motor?.toLowerCase().includes(query);
    const coincideDescripcion = car.descripcion?.toLowerCase().includes(query);
    const coincideCategoria = car.categoria?.toLowerCase().includes(query);

    return coincideNombre || coincideMarca || coincideUbicacion || coincideMotor || coincideDescripcion || coincideCategoria;
  });

  return (
    <section className="products-section">
      <div className="products-toolbar glass-panel">
        <div className="toolbar-header">
          <div>
            <div className="section-badge-inline">
              <span className="sparkle">✨</span> Inventario Exclusivo 2024 / 2025
            </div>
            <h2 className="section-title">Vehículos y Superdeportivos en Venta</h2>
            <p className="section-description">
              Unidades listas para entrega inmediata y prueba en circuito obtenidas vía <code>GET /api/productos</code>
            </p>
          </div>

          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Buscar por marca, modelo, motor (V8, V12) o specs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>
        </div>

        {/* Barra de Categorías Automotrices */}
        <div className="categories-bar">
          {CATEGORIAS_VEHICULOS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategoria(cat.id)}
              className={`cat-pill ${categoriaActiva.toLowerCase() === cat.id.toLowerCase() ? 'cat-active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Estados de Carga, Error y Grid */}
      {loading ? (
        <div className="products-state-box glass-panel animate-fade-in">
          <div className="spinner large-spinner"></div>
          <h3>Cargando superdeportivos desde el servidor...</h3>
          <p className="text-muted">Obteniendo fichas técnicas de potencia, aceleración y fotografías de inspección</p>
        </div>
      ) : error ? (
        <div className="products-state-box glass-panel state-error animate-fade-in">
          <div className="state-icon">⚠️</div>
          <h3>Error al obtener el catálogo de vehículos</h3>
          <p className="text-muted">{error}</p>
          <button onClick={onRefresh} className="btn-retry">
            Reintentar Consulta
          </button>
        </div>
      ) : vehiculosFiltrados.length === 0 ? (
        <div className="products-state-box glass-panel animate-fade-in">
          <div className="state-icon">🏎️</div>
          <h3>No se encontraron vehículos con esos criterios</h3>
          <p className="text-muted">Prueba seleccionando otra categoría o borrando el término de búsqueda.</p>
        </div>
      ) : (
        <>
          <div className="products-meta">
            <span>
              Mostrando <strong>{vehiculosFiltrados.length}</strong> de {productos.length} superdeportivos en catálogo
            </span>
            <span className="meta-badge-currency">Precios expresados en USD • Entrega Inmediata</span>
          </div>

          <div className="apartments-grid animate-fade-in">
            {vehiculosFiltrados.map((item) => (
              <ProductCard key={item.id} producto={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
