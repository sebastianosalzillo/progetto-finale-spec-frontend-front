import { useEffect, useState } from "react";
import { Product } from "../types";
import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";

export default function ComparePage() {
  const { selected, clearCompare, addToCompare } = useCompare();
  const [products, setProducts] = useState<Product[]>([]);
  const [firstProduct, setFirstProduct] = useState<Product | null>(null);
  const [secondProduct, setSecondProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    if (selected[0]) {
      fetch(`http://localhost:3001/products/${selected[0]}`)
        .then((res) => res.json())
        .then((data) => setFirstProduct(data.product));
    } else setFirstProduct(null);

    if (selected[1]) {
      fetch(`http://localhost:3001/products/${selected[1]}`)
        .then((res) => res.json())
        .then((data) => setSecondProduct(data.product));
    } else setSecondProduct(null);
  }, [selected]);

  const renderField = (label: string, value1: any, value2: any) => (
    <tr>
      <th style={{ width: "30%" }}>{label}</th>
      <td>{value1 ?? "—"}</td>
      <td>{value2 ?? "—"}</td>
    </tr>
  );

  const secondOptions = products.filter(p => p.id !== selected[0]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Confronto prodotti</h2>
        <div>
          <Link to="/" className="btn btn-secondary me-2">← Torna alla Home</Link>
          <button className="btn btn-outline-danger" onClick={clearCompare}>
            🔁 Resetta confronto
          </button>
        </div>
      </div>

      {/* Se manca il secondo prodotto, mostra il selettore */}
      {selected.length === 1 && (
        <div className="alert alert-info d-flex flex-column flex-md-row justify-content-between align-items-center">
          <span>Hai selezionato: <strong>{firstProduct?.title}</strong></span>
          <div className="mt-2 mt-md-0">
            <label className="me-2">Scegli il secondo prodotto:</label>
            <select
              className="form-select d-inline-block w-auto"
              onChange={(e) => {
                const secondId = Number(e.target.value);
                if (secondId) addToCompare(secondId);
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

      {/* Mostra il confronto affiancato se entrambi i prodotti sono selezionati */}
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
