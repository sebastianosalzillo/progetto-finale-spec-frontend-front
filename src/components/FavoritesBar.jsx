import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

export default function FavoritesBar() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="bg-warning p-2 d-flex align-items-center gap-2 overflow-auto sticky-top">
      <strong className="me-2">⭐ Preferiti:</strong>
      {favorites.map((p) => (
        <div key={p.id} className="d-flex align-items-center bg-light px-2 py-1 rounded border border-dark me-2">
          <Link to={`/product/${p.id}`} className="text-dark text-decoration-none me-2">
            {p.title}
          </Link>
          <button
            onClick={() => toggleFavorite({ id: p.id, title: p.title })}
            className="btn btn-sm btn-danger"
            title="Rimuovi dai preferiti"
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
