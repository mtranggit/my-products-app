import {useEffect, useState} from "react";

import {fetchFilteredProducts, PRODUCTS} from "../data";
import type {Product} from "../types";

function App() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetching = async () => {
      setProducts([]);
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchFilteredProducts(query, type);
        if (ignore) {
          return;
        }

        setProducts(response);
        setIsLoading(false);
        setError(null);
      } catch (e) {
        setError("Unable to fetch products");
        setIsLoading(false);
      }
      return () => {
        ignore = true;
      };
    };
    fetching();
  }, [query, type]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return `Something went wrong: ${error}`;
  }

  return (
    <>
      {products.length > 0 &&
        products.map((product) => (
          // {PRODUCTS.map((product) => (
          <div key={product.index}>
            <img alt={product.productName} src={`assets/${product.productImage}`} className="" />
            <p>Name: {product.productName}</p>
            <p>Price: {product.price}</p>
          </div>
        ))}
      {!products.length && <p>No products found</p>}
    </>
  );
}

export default App;
