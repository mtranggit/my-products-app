import type {Product} from "../../../types";
import {ProductCard} from "../ProductCard";
import styles from "./ProductList.module.css";

interface ProductListProps {
  products?: Product[];
}

export function ProductList({products = []}: ProductListProps) {
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
