import styles from "./Skeletons.module.css";

export function ProductCardSkeleton() {
  return (
    <div>
      <div className={`${styles.skeleton} ${styles.skeleton_image}`} />
      <div className={`${styles.skeleton} ${styles.skeleton_text}`} />
    </div>
  );
}

export function ListingHeaderSkeleton() {
  return (
    <div className={styles.header}>
      <div className={`${styles.skeleton} ${styles.skeleton_25}`} />
      <div className={`${styles.skeleton} ${styles.skeleton_50}`} />
    </div>
  );
}

export function ProductListSkeleton() {
  const products = [...Array.from({length: 9})];
  return (
    <div className={styles.product_container}>
      {products.map((_, index) => (
        <div className={styles.product_wrapper} key={index}>
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
