import Chart from "./Chart";

export default function SavedSeriesList({ savedSeries, onSelect, onRemove }) {
  if (!savedSeries.length) {
    return (
      <section className="saved-series">
        <h2>Historial</h2>
        <p>Todavia no hay busquedas en el historial.</p>
      </section>
    );
  }

  return (
    <section className="saved-series">
      <h2>Historial</h2>
      <ul>
        {savedSeries.map(({ seriesId, savedAt, data }) => (
          <li key={seriesId} className="history-card">
            <div className="history-card-header">
              <button type="button" onClick={() => onSelect(seriesId)}>
                {seriesId}
              </button>
              <span>{new Date(savedAt).toLocaleDateString()}</span>
            </div>

            {data?.observations?.length ? (
              <Chart data={data} seriesId={seriesId} compact />
            ) : (
              <p>Vista previa no disponible.</p>
            )}

            <button
              type="button"
              onClick={() => onRemove(seriesId)}
              aria-label={`Eliminar ${seriesId}`}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
