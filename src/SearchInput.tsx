export function SearchInput({
  placeholder,
  term,
  onSearch,
}: {
  placeholder: string;
  term: string;
  onSearch: (value: string) => void;
}) {
  const handleSearch = (value: string) => {
    // console.log(value);
    if (value) {
      onSearch(value);
    }
  };
  return (
    <div>
      <input value={term} placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
}
