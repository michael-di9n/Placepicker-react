export default function Places({ title, places, isLoading, loadingText, fallbackText, onSelectPlace, onMouseEnter, onMouseLeave }) {
  return (
    <section className="places-category" onMouseEnter={(event) => onMouseEnter(event.currentTarget)} onMouseLeave={(event) => onMouseLeave(event)}>
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {places.length === 0 && !isLoading && <p className="fallback-text">{fallbackText}</p>}
      {places.length > 0 && !isLoading && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onMouseDown={(event) => onSelectPlace(place, event.target)}>
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} draggable={false} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
