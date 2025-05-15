import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";
import { useNavigate, Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCompare } = useCompare();
  const navigate = useNavigate();

  const handleCompare = async () => {
    try {
      const res = await fetch(`http://localhost:3001/products/${product.id}`);
      const data = await res.json();
      if (data && data.product) {
        addToCompare(data.product);
        navigate("/compare");
      } else {
        console.error("Prodotto non trovato");
      }
    } catch (error) {
      console.error("Errore nella fetch del prodotto per confronto:", error);
    }
  };

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        {product.imageUrl && (
          <div className="col-md-4">
            <img src={product.imageUrl} className="img-fluid rounded-start" alt={product.title} />
          </div>
        )}
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/product/${product.id}`} className="text-decoration-none">
                {product.title}
              </Link>
            </h5>
            <p className="card-text"><strong>Categoria:</strong> {product.category}</p>
            {product.price && <p className="card-text"><strong>Prezzo:</strong> {product.price}€</p>}
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary btn-sm" onClick={handleCompare}>
                Confronta
              </button>
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={() => toggleFavorite({ id: product.id, title: product.title })}
              >
                {isFavorite(product.id) ? "★" : "☆"} Preferito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
