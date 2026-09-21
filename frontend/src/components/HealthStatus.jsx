import React from 'react';

export default function HealthStatus({
  healthData,
  loading,
  onRefresh,
  apiUrl
}) {
  const isOk = healthData && healthData.ok;

  return (
    <section className="health-section glass-panel animate-fade-in">
      <div className="health-header">
        <div className="health-title-group">
          <div className={`status-badge-icon ${isOk ? 'status-ok' : 'status-error'}`}>
            {loading ? '⏳' : isOk ? '🟢' : '🔴'}
          </div>
          <div>
            <h2 className="section-title">Estado de Conexión del Backend</h2>
            <p className="section-description">
              Monitoreo en tiempo real del endpoint <code>GET /api/health</code>
            </p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="btn-refresh"
          title="Reintentar o actualizar comprobación"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Comprobando...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              Comprobar Conexión
            </>
          )}
        </button>
      </div>

      <div className="health-grid">
        <div className="health-metric-card">
          <span className="metric-label">Estado</span>
          <span className={`metric-value ${isOk ? 'text-success' : 'text-danger'}`}>
            {loading ? 'Verificando...' : isOk ? 'En Línea (200 OK)' : 'Error de Conexión'}
          </span>
          <span className="metric-detail">
            {healthData?.message || (loading ? 'Consultando...' : 'No se pudo contactar al backend')}
          </span>
        </div>

        <div className="health-metric-card">
          <span className="metric-label">VITE_API_URL en Uso</span>
          <code className="metric-code" title={apiUrl}>
            {apiUrl || '(No definida en .env)'}
          </code>
          <span className="metric-detail">
            {apiUrl.includes('localhost') ? 'Modo Local (Desarrollo)' : 'Modo Remoto (Render / Cloud)'}
          </span>
        </div>

        <div className="health-metric-card">
          <span className="metric-label">Latencia</span>
          <span className="metric-value">
            {healthData?.latency !== undefined ? `${healthData.latency} ms` : '--'}
          </span>
          <span className="metric-detail">Tiempo de respuesta HTTP</span>
        </div>

        <div className="health-metric-card">
          <span className="metric-label">Ambiente Backend</span>
          <span className="metric-value capitalize">
            {healthData?.environment || 'Desconocido'}
          </span>
          <span className="metric-detail">
            {healthData?.timestamp ? new Date(healthData.timestamp).toLocaleTimeString() : '--:--:--'}
          </span>
        </div>
      </div>

      {!isOk && !loading && (
        <div className="connection-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <h4>No hay respuesta del Backend</h4>
            <p>
              Asegúrate de que el servidor backend esté corriendo en <code>{apiUrl || 'http://localhost:3000'}</code>.
              Si estás en desarrollo local, ejecuta <code>npm run dev</code> en la carpeta <code>/backend</code>.
              Si estás en Render, verifica que el Web Service esté activo y que <code>VITE_API_URL</code> apunte a la URL correcta.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
