import {FilterInput} from "../FilterInput";
import {ProductList} from "../ProductList";
import {SearchInput} from "../SearchInput";
import styles from "./App.module.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function ProductsApp() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Products</h1>
        <div className={styles.search_filter}>
          <SearchInput placeholder="Search product name" />
          <FilterInput />
        </div>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
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
