import './Loading.css';

export const Loading = () => (
  <div className="loadingOverlay" role="status" aria-live="polite">
    <div className="loadingSpinner" aria-hidden="true"></div>
    <p className="loadingText">Cargando productos...</p>
  </div>
);
