import React, { useState } from 'react';
import ProductCard from './ProductCard';

const CATEGORIAS_INMOBILIARIAS = [
  { id: 'todos', label: '🏙️ Todos los Apartamentos' },
  { id: 'Penthouse', label: '👑 Penthouses' },
  { id: 'Loft', label: '🏢 Lofts' },
  { id: 'Dúplex', label: '🪜 Dúplex' },
  { id: 'Estudio', label: '🛋️ Estudios Smart' },
  { id: 'Familiar', label: '👨‍👩‍👧‍👦 Residencias Familiares' }
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

  // Filtrado reactivo en el frontend por texto de búsqueda (nombre, ubicación, descripción)
  const apartamentosFiltrados = productos.filter((apt) => {
    const query = searchTerm.toLowerCase();
    const coincideNombre = apt.nombre?.toLowerCase().includes(query);
    const coincideUbicacion = apt.ubicacion?.toLowerCase().includes(query);
    const coincideDescripcion = apt.descripcion?.toLowerCase().includes(query);
    const coincideCategoria = apt.categoria?.toLowerCase().includes(query);

    return coincideNombre || coincideUbicacion || coincideDescripcion || coincideCategoria;
  });

  return (
    <section className="products-section">
      <div className="products-toolbar glass-panel">
        <div className="toolbar-header">
          <div>
            <div className="section-badge-inline">
              <span className="sparkle">✨</span> Catálogo Exclusivo
            </div>
            <h2 className="section-title">Apartamentos en Venta</h2>
            <p className="section-description">
              Propiedades listas para entrega inmediata obtenidas dinámicamente vía <code>GET /api/productos</code>
            </p>
          </div>

          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Buscar por zona, torre, tipo o amenidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>
        </div>

        {/* Barra de Tipologías Inmobiliarias */}
        <div className="categories-bar">
          {CATEGORIAS_INMOBILIARIAS.map((cat) => (
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
          <h3>Cargando apartamentos desde el servidor...</h3>
          <p className="text-muted">Obteniendo disponibilidades, fotografías y amenidades en tiempo real</p>
        </div>
      ) : error ? (
        <div className="products-state-box glass-panel state-error animate-fade-in">
          <div className="state-icon">⚠️</div>
          <h3>Error al obtener el catálogo de apartamentos</h3>
          <p className="text-muted">{error}</p>
          <button onClick={onRefresh} className="btn-retry">
            Reintentar Consulta
          </button>
        </div>
      ) : apartamentosFiltrados.length === 0 ? (
        <div className="products-state-box glass-panel animate-fade-in">
          <div className="state-icon">🏢</div>
          <h3>No se encontraron apartamentos con esos criterios</h3>
          <p className="text-muted">Prueba buscando otra tipología o borrando el filtro de búsqueda.</p>
        </div>
      ) : (
        <>
          <div className="products-meta">
            <span>
              Mostrando <strong>{apartamentosFiltrados.length}</strong> de {productos.length} propiedades disponibles
            </span>
            <span className="meta-badge-currency">Precios expresados en USD</span>
          </div>

          <div className="apartments-grid animate-fade-in">
            {apartamentosFiltrados.map((item) => (
              <ProductCard key={item.id} producto={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
