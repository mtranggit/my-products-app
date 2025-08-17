export function FilterInput({value, onFilter}: {value: string; onFilter: (value: string) => void}) {
  const handleFilter = (value: string) => {
    // console.log(value);
    onFilter(value);
  };
  return (
    <div>
      Filter:
      <select value={value} onChange={(e) => handleFilter(e.target.value)}>
        <option value="">All</option>
        <option value="beer">Beer</option>
        <option value="wine">Wine</option>
        <option value="spirits">Spirits</option>
        <option value="cider">Cider</option>
      </select>
    </div>
  );
}
