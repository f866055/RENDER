import React from 'react';

export default function Navbar({ apiUrl, isOnline }) {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <div className="logo-group">
          <div className="logo-icon real-estate-logo">🏛️</div>
          <div>
            <h1 className="logo-title">AURA <span className="text-gold">RESIDENCES</span></h1>
            <span className="logo-subtitle">Venta Exclusiva de Apartamentos & Penthouses</span>
          </div>
        </div>

        <div className="badges-group">
          <div className="tech-badge">
            <span className="dot dot-vite"></span>
            Frontend: React + Vite
          </div>

          <div className="tech-badge">
            <span className="dot dot-node"></span>
            Backend: Node.js + Express
          </div>

          <div className={`status-pill ${isOnline ? 'pill-online' : 'pill-offline'}`}>
            <span className="pulse-indicator"></span>
            {isOnline ? 'API Conectada' : 'API Desconectada'}
          </div>
        </div>
      </div>
    </header>
  );
}
