import React from 'react';

export default function Navbar({ apiUrl, isOnline }) {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <div className="logo-group">
          <div className="logo-icon">⚡</div>
          <div>
            <h1 className="logo-title">CloudStack</h1>
            <span className="logo-subtitle">Full-Stack Monorepo para Render</span>
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
