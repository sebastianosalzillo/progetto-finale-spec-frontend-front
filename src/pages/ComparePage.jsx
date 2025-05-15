import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";
import { Link, useNavigate } from "react-router-dom";

export default function ComparePage() {
  const { selected, clearCompare, addToCompare } = useCompare();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const firstProduct = selected[0] || null;
  const secondProduct = selected[1] || null;

  useEffect(() => {
    if (selected.length === 1) {
      fetch("http://localhost:3001/products")
        .then((res) => res.json())
        .then(setProducts)
        .catch((err) => console.error("Errore nel fetch dei prodotti:", err));
    }
  }, [selected]);

  const secondOptions = products.filter(p => p.id !== firstProduct?.id);

  const renderField = (label, value1, value2) => (
    <tr>
      <th style={{ width: "30%" }}>{label}</th>
      <td>{value1 ?? "—"}</td>
      <td>{value2 ?? "—"}</td>
    </tr>
  );

  const handleReset = () => {
    clearCompare();
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Confronto prodotti</h2>
        <div>
          <Link to="/" className="btn btn-secondary me-2">← Torna alla Home</Link>
          <button className="btn btn-outline-danger" onClick={handleReset}>
            🔁 Resetta confronto
          </button>
        </div>
      </div>

      {selected.length === 1 && (
        <div className="alert alert-info d-flex flex-column flex-md-row justify-content-between align-items-center">
          <span>Hai selezionato: <strong>{firstProduct?.title}</strong></span>
          <div className="mt-3 mt-md-0 d-flex align-items-center gap-2">
            <label className="me-2 mb-0">Scegli il secondo prodotto:</label>
            <select
              className="form-select d-inline-block w-auto"
              onChange={async (e) => {
                const secondId = Number(e.target.value);
                if (secondId) {
                  const res = await fetch(`http://localhost:3001/products/${secondId}`);
                  const data = await res.json();
                  addToCompare(data.product);
                }
              }}
            >
              <option value="">-- Seleziona --</option>
              {secondOptions.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {firstProduct && secondProduct && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Caratteristica</th>
                <th>{firstProduct.title}</th>
                <th>{secondProduct.title}</th>
              </tr>
            </thead>
            <tbody>
              {renderField("Categoria", firstProduct.category, secondProduct.category)}
              {renderField("Prezzo (€)", firstProduct.price, secondProduct.price)}
              {renderField("Brand", firstProduct.brand, secondProduct.brand)}
              {renderField("Anno", firstProduct.releaseYear, secondProduct.releaseYear)}
              {renderField("Descrizione", firstProduct.description, secondProduct.description)}
              {renderField("Rating", `⭐ ${firstProduct.rating}/5`, `⭐ ${secondProduct.rating}/5`)}
              {renderField(
                "Disponibilità",
                firstProduct.availability ? "✅ Sì" : "❌ No",
                secondProduct.availability ? "✅ Sì" : "❌ No"
              )}
              {renderField(
                "Caratteristiche",
                firstProduct.features?.join(", "),
                secondProduct.features?.join(", ")
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
