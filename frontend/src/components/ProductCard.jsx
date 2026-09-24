import React, { useState } from 'react';
import VehicleDetailsModal from './VehicleDetailsModal';

export default function ProductCard({ producto }) {
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const [tipoInteres, setTipoInteres] = useState('test-drive');

  const {
    id,
    nombre,
    marca,
    categoria,
    precio,
    ubicacion,
    potencia,
    aceleracion,
    velocidadMax,
    motor,
    transmision,
    traccion,
    kilometraje,
    ano,
    descripcion,
    rating,
    imagen,
    destacado,
    estado,
    galeriaDetalle
  } = producto;

  const totalVistas = galeriaDetalle ? galeriaDetalle.length : 3;

  const precioFormateado = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(precio);

  return (
    <>
      <article className="apartment-card vehicle-card glass-panel">
        {/* Imagen y Badges del Superdeportivo */}
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
            {ano && <span className="badge-ano">Año {ano}</span>}
          </div>

          <div className="card-badge-top-right">
            {destacado && <span className="badge-destacado">★ Destacado</span>}
            <span className="badge-estado">{estado || 'Disponible'}</span>
          </div>

          <div className="card-price-overlay">
            <span className="price-tag">{precioFormateado}</span>
            <span className="price-term">USD • Certificación VIP</span>
          </div>

          {/* Botón flotante para inspeccionar vistas directamente en la foto */}
          <button
            onClick={() => setShowVehicleDetails(true)}
            className="btn-quick-room-preview"
            title="Abrir galería de inspección 360°"
          >
            🔍 Inspeccionar Vistas ({totalVistas})
          </button>
        </div>

        {/* Contenido del Vehículo */}
        <div className="card-body">
          <div className="card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{ubicacion || 'Showroom Veloce Motors'}</span>
          </div>

          <h3 className="card-title">{nombre}</h3>
          <p className="card-description">{descripcion}</p>

          {/* Especificaciones de Rendimiento Clave (HP, 0-100, Vel. Máx, Transmisión) */}
          <div className="card-specs-grid vehicle-specs-grid">
            <div
              className="spec-item spec-item-interactive"
              onClick={() => setShowVehicleDetails(true)}
              title="Potencia neta del motor"
            >
              <span className="spec-icon">🐎</span>
              <span className="spec-text"><strong>{potencia}</strong></span>
              <span className="spec-subtag">Potencia</span>
            </div>

            <div className="spec-item" title="Aceleración de 0 a 100 km/h">
              <span className="spec-icon">⚡</span>
              <span className="spec-text"><strong>{aceleracion}</strong></span>
              <span className="spec-subtag">Aceleración</span>
            </div>

            <div className="spec-item" title="Velocidad Máxima Homologada">
              <span className="spec-icon">🏁</span>
              <span className="spec-text"><strong>{velocidadMax}</strong></span>
              <span className="spec-subtag">Vel. Punta</span>
            </div>

            <div className="spec-item" title="Caja de cambios y transmisión">
              <span className="spec-icon">⚙️</span>
              <span className="spec-text"><strong>{kilometraje}</strong></span>
              <span className="spec-subtag">Odómetro</span>
            </div>
          </div>

          {/* Ficha técnica compacta */}
          <div className="vehicle-tech-pill">
            <span className="tech-pill-icon">🔧</span>
            <span className="tech-pill-text">{motor}</span>
          </div>
        </div>

        {/* Pie de Tarjeta con Calificación y Botones */}
        <div className="card-footer">
          <div className="rating-wrap">
            <span className="rating-star">★</span>
            <span className="rating-score">{rating || '5.0'}</span>
            <span className="rating-label">Elite Class</span>
          </div>

          <div className="card-actions-row">
            <button
              onClick={() => setShowVehicleDetails(true)}
              className="btn-rooms-outline"
              title="Ver fotografías de inspección técnica"
            >
              🔍 Vistas 360°
            </button>

            <button
              onClick={() => setShowTestDriveModal(true)}
              className="btn-schedule"
              title="Solicitar cotización o test drive VIP"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              Test Drive VIP
            </button>
          </div>
        </div>
      </article>

      {/* Modal Visor de Inspección de Vehículo */}
      {showVehicleDetails && (
        <VehicleDetailsModal
          vehiculo={producto}
          onClose={() => setShowVehicleDetails(false)}
          onScheduleTestDrive={() => setShowTestDriveModal(true)}
        />
      )}

      {/* Modal de Agendamiento de Test Drive / Cotización */}
      {showTestDriveModal && (
        <div className="modal-backdrop" onClick={() => setShowTestDriveModal(false)}>
          <div className="modal-box glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowTestDriveModal(false)}>✕</button>
            <div className="modal-header">
              <span className="modal-icon">🏎️</span>
              <h3>Solicitud de Adquisición & Test Drive</h3>
              <p className="modal-property-name">{nombre} — {precioFormateado}</p>
            </div>
            
            <div className="modal-body">
              <p className="modal-info">
                Has seleccionado el <strong>{nombre}</strong> ({potencia}, {aceleracion}). 
                Un concierge especializado de <strong>Veloce Motors</strong> coordinará tu experiencia privada en pista o showroom.
              </p>

              {/* Selector de Interés */}
              <div className="inquiry-type-selector">
                <button
                  type="button"
                  onClick={() => setTipoInteres('test-drive')}
                  className={`inquiry-btn ${tipoInteres === 'test-drive' ? 'inquiry-active' : ''}`}
                >
                  🏁 Test Drive en Pista
                </button>
                <button
                  type="button"
                  onClick={() => setTipoInteres('compra')}
                  className={`inquiry-btn ${tipoInteres === 'compra' ? 'inquiry-active' : ''}`}
                >
                  💳 Compra Directa
                </button>
                <button
                  type="button"
                  onClick={() => setTipoInteres('leasing')}
                  className={`inquiry-btn ${tipoInteres === 'leasing' ? 'inquiry-active' : ''}`}
                >
                  📑 Leasing Corporativo
                </button>
              </div>
              
              <div className="modal-form-dummy">
                <input type="text" placeholder="Tu Nombre Completo" className="modal-input" />
                <input type="email" placeholder="Tu Correo Electrónico" className="modal-input" />
                <input type="tel" placeholder="Teléfono / WhatsApp de Contacto" className="modal-input" />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-modal-confirm"
                onClick={() => {
                  alert(`¡Solicitud recibida para el ${nombre}! Un concierge de Veloce Motors te contactará en menos de 2 horas.`);
                  setShowTestDriveModal(false);
                }}
              >
                Confirmar Solicitud VIP
              </button>
              <button className="btn-modal-cancel" onClick={() => setShowTestDriveModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
