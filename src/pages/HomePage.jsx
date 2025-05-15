import { useEffect, useState, useCallback, useMemo } from "react";
import ProductCard from "../components/ProductCard";


function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("title");
  const [order, setOrder] = useState("asc");

  const fetchProducts = useCallback(({ search, category }) => {
    fetch(`http://localhost:3001/products?search=${search}&category=${category}`)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella risposta del server");
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => {
        console.error("Errore nella fetch dei prodotti:", err);
        setAllProducts([]);
      });
  }, []);

  const debouncedFetch = useCallback(
    debounce((params) => fetchProducts(params), 500),
    [fetchProducts]
  );

  useEffect(() => {
    debouncedFetch({ search, category });
  }, [search, category, debouncedFetch]);

 
  const sortedProducts = useMemo(() => {
    const sorted = [...allProducts];
    sorted.sort((a, b) => {
      const aVal = a[sort]?.toLowerCase?.() ?? "";
      const bVal = b[sort]?.toLowerCase?.() ?? "";
      return order === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
    return sorted;
  }, [allProducts, sort, order]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista Prodotti</h1>

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
          <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="title">Ordina per titolo</option>
            <option value="category">Ordina per categoria</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">Crescente (A-Z)</option>
            <option value="desc">Decrescente (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="row">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((p) => (
            <div className="col-md-6" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <h2>Errore prodotti non trovati</h2>
        )}
      </div>
    </div>
  );
}
