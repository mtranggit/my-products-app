import {useFetchFilteredProduct} from "../../hooks";
import {useProductsStore} from "../../store/productsStore";
import {ProductCard} from "../ProductCard";
import {ProductListSkeleton} from "../Skeletons";
import styles from "./ProductList.module.css";

export function ProductList() {
  const name = useProductsStore((state) => state.name);
  const type = useProductsStore((state) => state.type);

  const {data: products, isPending, error} = useFetchFilteredProduct(name, type);

  if (isPending) {
    return (
      <main className={styles.main_wrapper} data-testid="skeleton-loading">
        <ProductListSkeleton />
      </main>
    );
  }

  if (error) {
    return <div data-testid="error">{`Something went wrong: ${error}`}</div>;
  }

  return (
    <div className={styles.product_container}>
      {products.length > 0 &&
        products.map((product) => (
          <div className={styles.product_wrapper} key={product.index}>
            <ProductCard
              name={product.productName}
              imageSrc={product.productImage}
              isSale={product.isSale}
              price={product.price}
            />
          </div>
        ))}
      {!products.length && <p>No products found</p>}
    </div>
  );
}
