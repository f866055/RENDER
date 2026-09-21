import React, { useState } from 'react';
import ProductCard from './ProductCard';

const CATEGORIAS = ['todos', 'Periféricos', 'Monitores', 'Audio', 'Mobiliario'];

export default function ProductList({
  productos,
  loading,
  error,
  onRefresh,
  categoriaActiva,
  onSelectCategoria
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrado reactivo en el frontend por texto de búsqueda
  const productosFiltrados = productos.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return coincideTexto;
  });

  return (
    <section className="products-section">
      <div className="products-toolbar glass-panel">
        <div className="toolbar-header">
          <div>
            <h2 className="section-title">Catálogo de Productos</h2>
            <p className="section-description">
              Datos dinámicos consumidos mediante <code>GET /api/productos</code>
            </p>
          </div>

          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>
        </div>

        {/* Filtro por categorías */}
        <div className="categories-bar">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategoria(cat)}
              className={`cat-pill ${categoriaActiva === cat ? 'cat-active' : ''}`}
            >
              {cat === 'todos' ? '📦 Todos los productos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Manejo de estados de carga, error y lista vacía */}
      {loading ? (
        <div className="products-state-box glass-panel animate-fade-in">
          <div className="spinner large-spinner"></div>
          <h3>Cargando productos desde el Backend...</h3>
          <p className="text-muted">Esperando respuesta de la API REST</p>
        </div>
      ) : error ? (
        <div className="products-state-box glass-panel state-error animate-fade-in">
          <div className="state-icon">⚠️</div>
          <h3>Error al obtener los productos</h3>
          <p className="text-muted">{error}</p>
          <button onClick={onRefresh} className="btn-retry">
            Reintentar Carga
          </button>
        </div>
      ) : productosFiltrados.length === 0 ? (
        <div className="products-state-box glass-panel animate-fade-in">
          <div className="state-icon">🔍</div>
          <h3>No se encontraron productos</h3>
          <p className="text-muted">Intenta cambiar el término de búsqueda o selecciona otra categoría.</p>
        </div>
      ) : (
        <>
          <div className="products-meta">
            <span>
              Mostrando <strong>{productosFiltrados.length}</strong> de {productos.length} productos
            </span>
          </div>
          <div className="products-grid animate-fade-in">
            {productosFiltrados.map((item) => (
              <ProductCard key={item.id} producto={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
