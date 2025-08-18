import {slugify} from "../../utils/slugify";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  name: string;
  imageSrc: string;
  price: string;
  isSale?: boolean;
}

export function ProductCard({name, imageSrc, price, isSale}: ProductCardProps) {
  const slug = slugify(name);

  return (
    <a href={`/products/${slug}`} className={styles.product_wrapper}>
      <article className={styles.product_card}>
        <div className={styles.image_wrapper}>
          {isSale && <div className={styles.on_sale}>Sale</div>}
          <img alt={name} src={`/assets/${imageSrc}`} className={`${styles.product_image} skeleton`} />
        </div>
        <div className={styles.name_and_price}>
          <h3 className={styles.name}>{name}</h3>
          <span>{price}</span>
        </div>
      </article>
    </a>
  );
}
