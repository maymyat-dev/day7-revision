import React, { useEffect, useMemo, useState } from "react";
import SearchInput from "./SearchInput";
import { useDebounce } from "../hooks/useDebounce";
import Pagination from "./Pagination";

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
  <div className="p-4">
    <SearchInput
      value={search}
      onChange={(val) => {
        setSearch(val);
        setPage(1); 
      }}
    />


    {loading ? (
      <div className="flex justify-center py-20">
        <p className="text-lg font-semibold animate-pulse text-indigo-600">Loading products...</p>
      </div>
    ) : (
      <>
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No product found for "{search}"</p>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-4 gap-4 mt-6">
              {sortedProducts.map((p) => (
                <li key={p.id} className="border p-3 rounded-lg hover:shadow-md transition bg-white">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-48 object-contain mb-2"
                  />
                  <h3 className="font-medium truncate">{p.title}</h3>
                  <p className="text-indigo-700 font-bold mt-1">${p.price}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          </>
        )}
      </>
    )}
  </div>
);
}

export default LogicPractice;