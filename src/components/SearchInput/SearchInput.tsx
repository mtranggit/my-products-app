import {useProductsStore} from "../../store/productsStore";
import styles from "./SearchInput.module.css";
import {useDebouncedCallback} from "use-debounce";

export function SearchInput({placeholder = "Search"}: {placeholder?: string}) {
  const handleSearch = useDebouncedCallback((value: string) => {
    setProductName(value);
  }, 300); // only callback stop typing for 300ms

  const name = useProductsStore((state) => state.name);
  const setProductName = useProductsStore((state) => state.setProductName);

  return (
    <div>
      <label htmlFor="search" className={styles.visually_hidden}>
        Search:
      </label>
      <input id="search" defaultValue={name} placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
}
