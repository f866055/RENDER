import React from 'react';

export default function Navbar({ apiUrl, isOnline }) {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <div className="logo-group">
          <div className="logo-icon motors-logo">🏎️</div>
          <div>
            <h1 className="logo-title">
              VELOCE <span className="text-gold">MOTORS</span>
            </h1>
            <span className="logo-subtitle">Showroom Exclusivo • Superdeportivos & Hiperdeportivos</span>
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
