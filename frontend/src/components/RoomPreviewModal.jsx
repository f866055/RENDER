import React, { useState } from 'react';

export default function RoomPreviewModal({ apartamento, onClose, onScheduleVisit }) {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

  if (!apartamento) return null;

  const rooms = apartamento.habitacionesDetalle || [];
  const currentRoom = rooms[selectedRoomIndex] || {
    nombre: "Habitación Principal",
    tipo: "Dormitorio",
    area: `${Math.round(apartamento.area / (apartamento.habitaciones || 1))} m²`,
    camas: "King / Queen Size",
    caracteristicas: "Acabados de lujo, iluminación LED empotrada, clóset de diseño y climatización independiente.",
    imagen: apartamento.imagen
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedRoomIndex((prev) => (prev > 0 ? prev - 1 : rooms.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedRoomIndex((prev) => (prev < rooms.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="room-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="room-modal-box glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Botón de Cerrar */}
        <button className="room-modal-close" onClick={onClose} title="Cerrar vista previa">
          ✕
        </button>

        {/* Encabezado del Modal */}
        <div className="room-modal-header">
          <div className="room-header-title-wrap">
            <span className="room-badge-category">{apartamento.categoria}</span>
            <h2 className="room-modal-title">
              Vista Previa de Habitaciones: <span className="text-gold">{apartamento.nombre}</span>
            </h2>
            <p className="room-modal-subtitle">
              📍 {apartamento.ubicacion} • {apartamento.habitaciones} Habitaciones • {apartamento.banos} Baños • {apartamento.area} m²
            </p>
          </div>
        </div>

        {/* Selector de Pestañas por Habitación */}
        <div className="room-tabs-container">
          {rooms.map((room, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRoomIndex(idx)}
              className={`room-tab-pill ${idx === selectedRoomIndex ? 'room-tab-active' : ''}`}
            >
              <span className="room-tab-icon">
                {room.tipo.includes('Baño') ? '🚿' : room.tipo.includes('Social') || room.tipo.includes('Living') ? '🛋️' : room.tipo.includes('Cocina') ? '🍳' : room.tipo.includes('Terraza') ? '🌿' : '🛏️'}
              </span>
              <span className="room-tab-text">{room.nombre}</span>
            </button>
          ))}
        </div>

        {/* Visor Principal de la Habitación Seleccionada */}
        <div className="room-viewer-main">
          <div className="room-image-frame">
            <img
              src={currentRoom.imagen}
              alt={currentRoom.nombre}
              className="room-large-img"
            />
            <div className="room-gradient-scrim"></div>

            {/* Controles de Navegación Flechas */}
            {rooms.length > 1 && (
              <>
                <button
                  className="room-arrow-btn arrow-prev"
                  onClick={handlePrev}
                  title="Habitación anterior"
                >
                  ❮
                </button>
                <button
                  className="room-arrow-btn arrow-next"
                  onClick={handleNext}
                  title="Siguiente habitación"
                >
                  ❯
                </button>
              </>
            )}

            {/* Badges de Información de la Habitación */}
            <div className="room-overlay-badges">
              <span className="room-badge-area">📐 {currentRoom.area}</span>
              {currentRoom.camas && <span className="room-badge-bed">🛏️ {currentRoom.camas}</span>}
              <span className="room-badge-counter">
                {selectedRoomIndex + 1} de {rooms.length}
              </span>
            </div>
          </div>

          {/* Ficha descriptiva de la Habitación */}
          <div className="room-details-card">
            <div className="room-details-header">
              <div>
                <span className="room-type-tag">{currentRoom.tipo}</span>
                <h3 className="room-name-heading">{currentRoom.nombre}</h3>
              </div>

              <button
                className="btn-schedule-from-room"
                onClick={() => {
                  onClose();
                  onScheduleVisit(apartamento);
                }}
              >
                📅 Agendar Visita a este Apartamento
              </button>
            </div>

            <p className="room-features-desc">
              {currentRoom.caracteristicas}
            </p>
          </div>
        </div>

        {/* Galería Inferior de Miniaturas (Thumbnails) */}
        {rooms.length > 1 && (
          <div className="room-thumbnails-slider">
            {rooms.map((room, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedRoomIndex(idx)}
                className={`room-thumb-btn ${idx === selectedRoomIndex ? 'thumb-active' : ''}`}
                title={room.nombre}
              >
                <img src={room.imagen} alt={room.nombre} className="room-thumb-img" />
                <div className="thumb-info-layer">
                  <span className="thumb-title">{room.nombre}</span>
                  <span className="thumb-area">{room.area}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
