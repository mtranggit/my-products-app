import styles from "./SearchInput.module.css";
import {useDebouncedCallback} from "use-debounce";

export function SearchInput({
  placeholder,
  term,
  onSearch,
}: {
  placeholder: string;
  term: string;
  onSearch: (value: string) => void;
}) {
  const handleSearch = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, 300); // only callback stop typing for 300ms

  return (
    <div>
      <label htmlFor="search" className={styles.visually_hidden}>
        Search:
      </label>
      <input id="search" defaultValue={term} placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
}
