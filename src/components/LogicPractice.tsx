import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { useDebounce } from "../hooks/useDebounce";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("")

  const searchDebounced = useDebounce(search, 500)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/products`,
        );
        if (!response.ok) {
          throw new Error("Network Error");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAndSortedProducts = products
    .filter((p)=>p.title.toLowerCase().includes(searchDebounced.toLowerCase()))
    .filter((p) => p.stock > 0)
        .sort((a, b) => a.price - b.price);
    
    if (loading) {
        <p>Loading....</p>
    }
    if (error) {
        <p>Error...{ error }</p>
    }

  return (
    <div>
      {filteredAndSortedProducts?.length === 0 ? (
        <p>No product found</p>
      ) : (
          <>
            <SearchInput value={search} onChange={setSearch} />
          <ul className="grid grid-cols-4 gap-3">
          {filteredAndSortedProducts?.map((p) => (
            <li key={p.id}>
              <img src={p.images[0]} alt={p.title} className="w-50 h-50 object-contain" />
              <p>{p.title}</p>
              <p className="text-indigo-800">${p.price}</p>
            </li>
          ))}
        </ul></>
      )}
    </div>
  );
}

export default LogicPractice;
