import { useEffect, useState } from "react";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<"title" | "category">("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");



  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetch(`http://localhost:3001/products?search=${search}&category=${category}`)
        .then((res) => res.json())
        .then((data) => {
          let sorted = [...data];
          sorted.sort((a, b) => {
            const aVal = a[sort].toLowerCase();
            const bVal = b[sort].toLowerCase();
            return order === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
          });
          setProducts(sorted);
        });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, category, sort, order]);




  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista Prodotti</h1>

      {/* FILTRI */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Cerca per titolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Tutte le categorie</option>
            <option value="gaming">Gaming</option>
            <option value="tech">Tech</option>
            <option value="accessories">Accessori</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value as any)}>
            <option value="title">Ordina per titolo</option>
            <option value="category">Ordina per categoria</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={order} onChange={(e) => setOrder(e.target.value as "asc" | "desc")}>
            <option value="asc">Crescente (A-Z)</option>
            <option value="desc">Decrescente (Z-A)</option>
          </select>
        </div>
      </div>

      {/* LISTA PRODOTTI */}
      <div className="row">
        {products.map((p) => (
          <div className="col-md-6" key={p.id}>
            <ProductCard
              product={p}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
