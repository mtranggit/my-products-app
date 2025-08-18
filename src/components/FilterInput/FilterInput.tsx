import styles from "./FilterInput.module.css";

export function FilterInput({
  label = "Filter",
  value,
  onFilter,
}: {
  label?: string;
  value: string;
  onFilter: (value: string) => void;
}) {
  const handleFilter = (value: string) => {
    onFilter(value);
  };
  return (
    <label>
      <span className={styles.label}>{label}:</span>
      <select value={value} onChange={(e) => handleFilter(e.target.value)}>
        <option value="">All</option>
        <option value="beer">Beer</option>
        <option value="wine">Wine</option>
        <option value="spirits">Spirits</option>
        <option value="cider">Cider</option>
      </select>
    </label>
  );
}
