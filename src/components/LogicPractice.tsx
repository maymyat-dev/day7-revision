import React, { useEffect, useMemo, useState } from "react";
import SearchInput from "./SearchInput";
import { useDebounce } from "../hooks/useDebounce";
import Pagination from "./pagination";

type Product = {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
};

function LogicPractice() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search, 500);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchData = async () => {
      if (searchDebounced) {
        setLoading(true);
      }

      try {
        const baseURL = searchDebounced
          ? `${import.meta.env.VITE_API_BASE_URL}/products/search`
          : `${import.meta.env.VITE_API_BASE_URL}/products`;

        const params = new URLSearchParams({
          ...(searchDebounced && { q: searchDebounced }),
          limit: String(limit),
          skip: String((page - 1) * limit),
        });

        const response = await fetch(`${baseURL}?${params}`);
        if (!response.ok) throw new Error("Network Error");

        const data = await response.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchDebounced]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.price - b.price);
  }, [products]);

  if (error) {
    return <p>Error...{error}</p>;
  }

  return (
    <div>
      <SearchInput
        value={search}
        onChange={(val) => {
          setSearch(val);
          setPage(1); 
        }}
      />

      {loading && <p>Loading...</p>}

      {sortedProducts.length === 0 ? (
        <p>No product found</p>
      ) : (
        <>
          <ul className="grid grid-cols-4 gap-3">
            {sortedProducts.map((p) => (
              <li key={p.id}>
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-50 h-50 object-contain"
                />
                <p>{p.title}</p>
                <p className="text-indigo-800">${p.price}</p>
              </li>
            ))}
          </ul>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
}

export default LogicPractice;