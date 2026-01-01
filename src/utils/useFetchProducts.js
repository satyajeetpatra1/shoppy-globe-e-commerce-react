import { useEffect, useState } from "react";

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => setError("Failed to load products"));
  }, []);

  return { products, error };
};
