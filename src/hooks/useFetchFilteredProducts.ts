import {fetchFilteredProducts} from "../lib/data";
import {useQuery} from "@tanstack/react-query";

export function useFetchFilteredProduct(query: string, type: string) {
  return useQuery({
    queryKey: ["products", {type, query}],
    queryFn: () => fetchFilteredProducts(query, type),
  });
}
