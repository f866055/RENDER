import React, { useState } from 'react';

export default function ProductCard({ producto }) {
  const [showModal, setShowModal] = useState(false);

  const {
    id,
    nombre,
    categoria,
    precio,
    ubicacion,
    habitaciones,
    banos,
    area,
    estacionamientos,
    piso,
    descripcion,
    rating,
    imagen,
    destacado,
    estado
  } = producto;

  const precioFormateado = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(precio);

  return (
    <>
      <article className="apartment-card glass-panel">
        {/* Imagen y Badges de la Propiedad */}
        <div className="card-image-wrap">
          <img
            src={imagen}
            alt={nombre}
            loading="lazy"
            className="card-image"
          />
          <div className="card-overlay-gradient"></div>

          <div className="card-badge-top-left">
            <span className="badge-category">{categoria}</span>
            {piso && <span className="badge-piso">{piso}</span>}
          </div>

          <div className="card-badge-top-right">
            {destacado && <span className="badge-destacado">★ Destacado</span>}
            <span className="badge-estado">{estado || 'En Venta'}</span>
          </div>

          <div className="card-price-overlay">
            <span className="price-tag">{precioFormateado}</span>
            <span className="price-term">USD • Entrega Inmediata</span>
          </div>
        </div>

        {/* Contenido de la Propiedad */}
        <div className="card-body">
          <div className="card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{ubicacion || 'Ubicación Exclusiva'}</span>
          </div>

          <h3 className="card-title">{nombre}</h3>
          <p className="card-description">{descripcion}</p>

          {/* Características Clave (Habitaciones, Baños, Metraje, Garaje) */}
          <div className="card-specs-grid">
            <div className="spec-item" title={`${habitaciones} Habitaciones`}>
              <span className="spec-icon">🛏️</span>
              <span className="spec-text"><strong>{habitaciones}</strong> Hab</span>
            </div>

            <div className="spec-item" title={`${banos} Baños`}>
              <span className="spec-icon">🚿</span>
              <span className="spec-text"><strong>{banos}</strong> Baños</span>
            </div>

            <div className="spec-item" title={`${area} Metros Cuadrados`}>
              <span className="spec-icon">📐</span>
              <span className="spec-text"><strong>{area}</strong> m²</span>
            </div>

            <div className="spec-item" title={`${estacionamientos} Estacionamientos`}>
              <span className="spec-icon">🚗</span>
              <span className="spec-text"><strong>{estacionamientos}</strong> Pk</span>
            </div>
          </div>
        </div>

        {/* Pie de Tarjeta con Calificación y Botón de Contacto */}
        <div className="card-footer">
          <div className="rating-wrap">
            <span className="rating-star">★</span>
            <span className="rating-score">{rating || '4.9'}</span>
            <span className="rating-label">Exclusivo</span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn-schedule"
            title="Agendar una visita personalizada"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Agendar Visita
          </button>
        </div>
      </article>

      {/* Modal de Agendamiento de Visita */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-box glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <div className="modal-header">
              <span className="modal-icon">🏛️</span>
              <h3>Agendar Visita Inmobiliaria</h3>
              <p className="modal-property-name">{nombre} — {ubicacion}</p>
            </div>
            
            <div className="modal-body">
              <p className="modal-info">
                Has seleccionado el apartamento con <strong>{area} m²</strong> y valor de <strong>{precioFormateado}</strong>.
                Un asesor senior de <strong>Aura Residences</strong> coordinará tu recorrido privado con acceso exclusivo a las amenidades.
              </p>
              
              <div className="modal-form-dummy">
                <input type="text" placeholder="Tu Nombre Completo" className="modal-input" />
                <input type="email" placeholder="Tu Correo Electrónico" className="modal-input" />
                <input type="tel" placeholder="Tu Teléfono / WhatsApp" className="modal-input" />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-modal-confirm"
                onClick={() => {
                  alert(`¡Solicitud enviada para ${nombre}! Un asesor se comunicará contigo.`);
                  setShowModal(false);
                }}
              >
                Confirmar Visita VIP
              </button>
              <button className="btn-modal-cancel" onClick={() => setShowModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
