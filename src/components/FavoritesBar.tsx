import { useFavorites } from "../context/FavoritesContext";
import { useEffect, useState } from "react";
import { Product } from "../types";
import { Link } from "react-router-dom";

export default function FavoritesBar() {
  const { favorites, toggleFavorite } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (favorites.length === 0) {
      setProducts([]);
      return;
    }

    Promise.all(
      favorites.map((id) =>
        fetch(`http://localhost:3001/products/${id}`)
          .then((res) => res.json())
          .then((data) => data.product)
      )
    ).then(setProducts);
  }, [favorites]);

  return (
    <div className="bg-warning p-2 d-flex align-items-center gap-2 overflow-auto sticky-top">
      <strong className="me-2">⭐ Preferiti:</strong>
      {products.map((p) => (
        <div key={p.id} className="d-flex align-items-center bg-light px-2 py-1 rounded border border-dark me-2">
          <Link
            to={`/product/${p.id}`}
            className="text-dark text-decoration-none me-2"
          >
            {p.title}
          </Link>
          <button
            onClick={() => toggleFavorite(p.id)}
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
