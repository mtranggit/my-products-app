import {useEffect, useState} from "react";

import {fetchFilteredProducts} from "../data";
import type {Product} from "../types";
import {FilterInput} from "./FilterInput";
import {SearchInput} from "./SearchInput";

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <SearchInput placeholder="Enter product name" term={query} onSearch={(term) => setQuery(term)} />
      <FilterInput value={type} onFilter={(value) => setType(value)} />
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
