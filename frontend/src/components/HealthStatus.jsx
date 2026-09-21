import React, { useState } from 'react';

export default function HealthStatus({
  healthData,
  loading,
  onRefresh,
  currentApiUrl,
  onChangeApiUrl,
  defaultEnvUrl
}) {
  const [showUrlEditor, setShowUrlEditor] = useState(false);
  const [customInputUrl, setCustomInputUrl] = useState(currentApiUrl);

  const isOk = healthData && healthData.ok;
  const isRenderUrl = currentApiUrl && currentApiUrl.includes('onrender.com');

  const handleSaveUrl = (e) => {
    e.preventDefault();
    if (customInputUrl.trim()) {
      onChangeApiUrl(customInputUrl.trim());
      setShowUrlEditor(false);
    }
  };

  const handleResetToLocal = () => {
    onChangeApiUrl(defaultEnvUrl);
    setCustomInputUrl(defaultEnvUrl);
    setShowUrlEditor(false);
  };

  return (
    <section className="health-section glass-panel animate-fade-in">
      <div className="health-header">
        <div className="health-title-group">
          <div className={`status-badge-icon ${isOk ? 'status-ok' : 'status-error'}`}>
            {loading ? '⏳' : isOk ? (isRenderUrl ? '☁️' : '🟢') : '🔴'}
          </div>
          <div>
            <div className="status-tags-row">
              <h2 className="section-title">Estado de Conexión del Backend</h2>
              {isRenderUrl ? (
                <span className="render-cloud-badge">☁️ Conectado a Render Cloud</span>
              ) : (
                <span className="render-local-badge">💻 Entorno Local (Desarrollo)</span>
              )}
            </div>
            <p className="section-description">
              Monitoreo en tiempo real del endpoint <code>GET /api/health</code>
            </p>
          </div>
        </div>

        <div className="health-actions-group">
          <button
            onClick={() => setShowUrlEditor(!showUrlEditor)}
            className="btn-edit-url"
            title="Cambiar URL de Backend para probar con Render"
          >
            ⚙️ {isRenderUrl ? 'Cambiar URL de Render' : 'Conectar URL de Render'}
          </button>

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
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                Verificar Conexión
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor rápido para probar URL de Render directamente */}
      {showUrlEditor && (
        <form onSubmit={handleSaveUrl} className="url-editor-box animate-fade-in">
          <div className="url-editor-label">
            <span>🌐 Configura la URL del Backend (Local o Render):</span>
          </div>
          <div className="url-editor-input-group">
            <input
              type="text"
              value={customInputUrl}
              onChange={(e) => setCustomInputUrl(e.target.value)}
              placeholder="https://tu-backend.onrender.com o http://localhost:3000"
              className="url-editor-input"
            />
            <button type="submit" className="btn-save-url">
              Aplicar y Probar
            </button>
            <button type="button" onClick={handleResetToLocal} className="btn-reset-url">
              Restablecer a Local
            </button>
          </div>
          <p className="url-editor-hint">
            💡 Cuando tu backend termine de crearse en Render, pega su URL aquí (ej: <code>https://mi-backend.onrender.com</code>) para probar la conexión en vivo.
          </p>
        </form>
      )}

      {/* Métricas en Tiempo Real */}
      <div className="health-grid">
        <div className="health-metric-card">
          <span className="metric-label">Estado de la API</span>
          <span className={`metric-value ${isOk ? 'text-success' : 'text-danger'}`}>
            {loading ? 'Verificando...' : isOk ? (isRenderUrl ? 'En Línea en Render' : 'En Línea (200 OK)') : 'Error de Conexión'}
          </span>
          <span className="metric-detail">
            {healthData?.message || (loading ? 'Consultando...' : 'No se pudo contactar al backend')}
          </span>
        </div>

        <div className="health-metric-card">
          <span className="metric-label">URL del Backend en Uso</span>
          <code className="metric-code" title={currentApiUrl}>
            {currentApiUrl || '(No definida)'}
          </code>
          <span className="metric-detail">
            {isRenderUrl ? '☁️ Servicio en la Nube (Render)' : '💻 localhost:3000 (Servidor local)'}
          </span>
        </div>

        <div className="health-metric-card">
          <span className="metric-label">Latencia HTTP</span>
          <span className="metric-value">
            {healthData?.latency !== undefined ? `${healthData.latency} ms` : '--'}
          </span>
          <span className="metric-detail">Tiempo de respuesta del servidor</span>
        </div>

        <div className="health-metric-card">
          <span className="metric-label">Modo / Timestamp</span>
          <span className="metric-value capitalize">
            {healthData?.environment || 'development'}
          </span>
          <span className="metric-detail">
            {healthData?.timestamp ? new Date(healthData.timestamp).toLocaleTimeString() : '--:--:--'}
          </span>
        </div>
      </div>

      {/* Alerta de Desconexión */}
      {!isOk && !loading && (
        <div className="connection-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <h4>No hay respuesta del Backend en {currentApiUrl}</h4>
            <p>
              {isRenderUrl ? (
                <>
                  Verifica que tu <strong>Web Service</strong> en Render haya finalizado el despliegue. Recuerda que el plan gratuito de Render suspende los servicios tras inactividad y la primera petición tarda unos 40 segundos en responder.
                </>
              ) : (
                <>
                  Asegúrate de que el servidor backend esté corriendo localmente ejecutando <code>npm run dev</code> en la carpeta <code>/backend</code>.
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
