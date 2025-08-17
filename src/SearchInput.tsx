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
    // console.log(value);
    if (value) {
      onSearch(value);
    }
  }, 300);

  return (
    <div>
      <input defaultValue={term} placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
}
