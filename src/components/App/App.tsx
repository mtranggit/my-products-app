import {useState} from "react";

import {FilterInput} from "../FilterInput";
import {ProductList} from "../ProductList";
import {SearchInput} from "../SearchInput";
import styles from "./App.module.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function ProductsApp() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  return (
    <main className={styles.main_wrapper}>
      <div className={styles.main_content}>
        <header className={styles.header}>
          <div className={styles.title}>Products</div>
          <div className={styles.search_filter}>
            <SearchInput placeholder="Enter product name" term={query} onSearch={(term) => setQuery(term)} />
            <FilterInput value={type} onFilter={(value) => setType(value)} />
          </div>
        </header>
        <ProductList query={query} type={type} />
      </div>
    </main>
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
