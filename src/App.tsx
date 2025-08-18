import {useState} from "react";

import {fetchFilteredProducts} from "../data";
import {FilterInput} from "./FilterInput";
import {SearchInput} from "./SearchInput";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function ProductsApp() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ["products", {type, query}],
    queryFn: () => fetchFilteredProducts(query, type),
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return `Something went wrong: ${error}`;
  }

  return (
    <>
      <SearchInput placeholder="Enter product name" term={query} onSearch={(term) => setQuery(term)} />
      <FilterInput value={type} onFilter={(value) => setType(value)} />
      <main className="main">
        <div className="product-container">
          {products.length > 0 &&
            products.map((product) => (
              <div className="product-wrapper" key={product.index}>
                <div className="product-card">
                  {product.isSale && <div className="on-sale">Sale</div>}
                  <img alt={product.productName} src={`assets/${product.productImage}`} className="" />
                  <p>Name: {product.productName}</p>
                  <p>Price: {product.price}</p>
                </div>
              </div>
            ))}
          {!products.length && <p>No products found</p>}
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
