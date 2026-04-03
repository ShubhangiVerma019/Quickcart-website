import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);


return { products, loading, error};
};
