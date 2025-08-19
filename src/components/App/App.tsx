import {FilterInput} from "../FilterInput";
import {ProductList} from "../ProductList";
import {SearchInput} from "../SearchInput";
import styles from "./App.module.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function ProductsApp() {
  return (
    <main className={styles.main_wrapper}>
      <div className={styles.main_content}>
        <header className={styles.header}>
          <div className={styles.title}>Products</div>
          <div className={styles.search_filter}>
            <SearchInput placeholder="Search product name" />
            <FilterInput />
          </div>
        </header>
        <ProductList />
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
