import React, { useState } from 'react';

export default function VehicleDetailsModal({ vehiculo, onClose, onScheduleTestDrive }) {
  const [selectedViewIndex, setSelectedViewIndex] = useState(0);

  if (!vehiculo) return null;

  const galeria = vehiculo.galeriaDetalle || [];
  const currentView = galeria[selectedViewIndex] || {
    nombre: "Vista Exterior Principal",
    tipo: "Carrocería Exterior",
    especificacion: vehiculo.categoria,
    caracteristicas: vehiculo.descripcion,
    imagen: vehiculo.imagen
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedViewIndex((prev) => (prev > 0 ? prev - 1 : galeria.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedViewIndex((prev) => (prev < galeria.length - 1 ? prev + 1 : 0));
  };

  const precioFormateado = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(vehiculo.precio);

  return (
    <div className="room-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="room-modal-box glass-panel vehicle-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Botón de Cerrar */}
        <button className="room-modal-close" onClick={onClose} title="Cerrar vista de inspección">
          ✕
        </button>

        {/* Encabezado del Modal */}
        <div className="room-modal-header">
          <div className="room-header-title-wrap">
            <div className="modal-header-badges">
              <span className="room-badge-category">{vehiculo.categoria}</span>
              <span className="badge-hp">🐎 {vehiculo.potencia}</span>
              <span className="badge-accel">⚡ {vehiculo.aceleracion}</span>
            </div>
            <h2 className="room-modal-title">
              Inspección y Especificaciones: <span className="text-gold">{vehiculo.nombre}</span>
            </h2>
            <p className="room-modal-subtitle">
              📍 {vehiculo.ubicacion} • Año {vehiculo.ano} • Odómetro: {vehiculo.kilometraje} • Valor: {precioFormateado}
            </p>
          </div>
        </div>

        {/* Selector de Pestañas por Sección de Inspección */}
        <div className="room-tabs-container">
          {galeria.map((view, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedViewIndex(idx)}
              className={`room-tab-pill ${idx === selectedViewIndex ? 'room-tab-active' : ''}`}
            >
              <span className="room-tab-icon">
                {view.tipo.includes('Interior') || view.tipo.includes('Cockpit') ? '💺' : 
                 view.tipo.includes('Motor') || view.tipo.includes('Tren') ? '⚙️' : 
                 view.tipo.includes('Ruedas') || view.tipo.includes('Frenado') ? '🛑' : '🏎️'}
              </span>
              <span className="room-tab-text">{view.nombre}</span>
            </button>
          ))}
        </div>

        {/* Visor Principal de la Sección Seleccionada */}
        <div className="room-viewer-main">
          <div className="room-image-frame">
            <img
              src={currentView.imagen}
              alt={currentView.nombre}
              className="room-large-img"
            />
            <div className="room-gradient-scrim"></div>

            {/* Controles de Navegación Flechas */}
            {galeria.length > 1 && (
              <>
                <button
                  className="room-arrow-btn arrow-prev"
                  onClick={handlePrev}
                  title="Vista anterior"
                >
                  ❮
                </button>
                <button
                  className="room-arrow-btn arrow-next"
                  onClick={handleNext}
                  title="Siguiente vista"
                >
                  ❯
                </button>
              </>
            )}

            {/* Badges de Información de la Toma */}
            <div className="room-overlay-badges">
              <span className="room-badge-area">🔍 {currentView.especificacion}</span>
              <span className="room-badge-counter">
                {selectedViewIndex + 1} de {galeria.length}
              </span>
            </div>
          </div>

          {/* Ficha técnica y descriptiva */}
          <div className="room-details-card">
            <div className="room-details-header">
              <div>
                <span className="room-type-tag">{currentView.tipo}</span>
                <h3 className="room-name-heading">{currentView.nombre}</h3>
              </div>

              <button
                className="btn-schedule-from-room btn-testdrive-primary"
                onClick={() => {
                  onClose();
                  onScheduleTestDrive(vehiculo);
                }}
              >
                🏁 Solicitar Test Drive VIP
              </button>
            </div>

            <p className="room-features-desc">
              {currentView.caracteristicas}
            </p>

            {/* Ficha de Especificaciones Rápidas */}
            <div className="modal-specs-table">
              <div className="spec-table-row">
                <span className="spec-row-label">Motorización:</span>
                <span className="spec-row-val">{vehiculo.motor}</span>
              </div>
              <div className="spec-table-row">
                <span className="spec-row-label">Transmisión:</span>
                <span className="spec-row-val">{vehiculo.transmision}</span>
              </div>
              <div className="spec-table-row">
                <span className="spec-row-label">Tracción:</span>
                <span className="spec-row-val">{vehiculo.traccion}</span>
              </div>
              <div className="spec-table-row">
                <span className="spec-row-label">Velocidad Máxima:</span>
                <span className="spec-row-val text-gold">{vehiculo.velocidadMax}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Galería Inferior de Miniaturas (Thumbnails) */}
        {galeria.length > 1 && (
          <div className="room-thumbnails-slider">
            {galeria.map((view, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedViewIndex(idx)}
                className={`room-thumb-btn ${idx === selectedViewIndex ? 'thumb-active' : ''}`}
                title={view.nombre}
              >
                <img src={view.imagen} alt={view.nombre} className="room-thumb-img" />
                <div className="thumb-info-layer">
                  <span className="thumb-title">{view.nombre}</span>
                  <span className="thumb-area">{view.especificacion}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
