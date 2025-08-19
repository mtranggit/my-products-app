import {useProductsStore} from "../../store/productsStore";
import styles from "./FilterInput.module.css";

export function FilterInput({label = "Filter"}: {label?: string}) {
  const handleFilter = (value: string) => {
    setProductType(value);
  };

  const value = useProductsStore((state) => state.type);
  const setProductType = useProductsStore((state) => state.setProductType);

  return (
    <label htmlFor="select_category">
      <span className={styles.label}>{label}:</span>
      <select id="select_category" value={value} onChange={(e) => handleFilter(e.target.value)}>
        <option value="">All</option>
        <option value="beer">Beer</option>
        <option value="wine">Wine</option>
        <option value="spirits">Spirits</option>
        <option value="cider">Cider</option>
      </select>
    </label>
  );
}
