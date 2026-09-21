import React from 'react';

export default function ProductCard({ producto }) {
  const {
    nombre,
    categoria,
    precio,
    stock,
    descripcion,
    rating,
    icono,
    destacado
  } = producto;

  return (
    <article className="product-card glass-panel">
      {destacado && <div className="product-badge-destacado">⭐ Destacado</div>}
      
      <div className="product-header">
        <div className="product-icon-wrap">
          <span className="product-emoji" role="img" aria-label={nombre}>
            {icono || '📦'}
          </span>
        </div>
        <div className="product-tags">
          <span className="tag-category">{categoria}</span>
          <span className={`tag-stock ${stock < 10 ? 'stock-low' : 'stock-ok'}`}>
            {stock > 0 ? `${stock} disponibles` : 'Agotado'}
          </span>
        </div>
      </div>

      <div className="product-body">
        <h3 className="product-title">{nombre}</h3>
        <p className="product-description">{descripcion}</p>
      </div>

      <div className="product-footer">
        <div className="product-price-group">
          <span className="price-currency">$</span>
          <span className="price-amount">{Number(precio).toFixed(2)}</span>
          {rating && (
            <span className="product-rating">
              ★ {rating}
            </span>
          )}
        </div>

        <button className="btn-action" title="Agregar al carrito">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Comprar
        </button>
      </div>
    </article>
  );
}
