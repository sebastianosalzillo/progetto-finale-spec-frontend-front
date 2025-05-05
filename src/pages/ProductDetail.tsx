import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const { toggleFavorite, isFavorite } = useFavorites();
    const { addToCompare } = useCompare();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.product);
            });
    }, [id]);

    if (!product) return <div className="container mt-4">Caricamento...</div>;

    const handleCompare = () => {
        addToCompare(product.id);
        navigate("/compare");
    };

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-secondary mb-3">&larr; Torna alla lista</Link>

            <div className="card">
                <div className="row g-0">
                    {product.imageUrl && (
                        <div className="col-md-4">
                            <img src={product.imageUrl} className="img-fluid rounded-start" alt={product.title} />
                        </div>
                    )}
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{product.title}</h2>
                            <p><strong>Categoria:</strong> {product.category}</p>
                            {product.price && <p><strong>Prezzo:</strong> {product.price}€</p>}
                            {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
                            {product.releaseYear && <p><strong>Anno di uscita:</strong> {product.releaseYear}</p>}
                            {product.description && <p><strong>Descrizione:</strong> {product.description}</p>}
                            {product.features && (
                                <>
                                    <p><strong>Caratteristiche:</strong></p>
                                    <ul>
                                        {product.features.map((feat, i) => <li key={i}>{feat}</li>)}
                                    </ul>
                                </>
                            )}
                            {product.availability !== undefined && (
                                <p><strong>Disponibilità:</strong> {product.availability ? "✅ Sì" : "❌ No"}</p>
                            )}
                            {product.rating && (
                                <p><strong>Rating:</strong> ⭐ {product.rating}/5</p>
                            )}

                            <div className="d-flex gap-3 mt-4">
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => toggleFavorite(product.id)}
                                >
                                    {isFavorite(product.id) ? "★ Rimuovi dai preferiti" : "☆ Aggiungi ai preferiti"}
                                </button>

                                <button className="btn btn-outline-primary" onClick={handleCompare}>
                                    🔄 Confronta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
