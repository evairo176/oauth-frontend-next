import { useEffect, useState } from "react";

export function useSearchDebounce(
  delay: number = 1000
): [string, (searchQuery: string) => void] {
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Search logic

  useEffect(() => {
    const delayFn = setTimeout(() => setSearch(searchQuery), delay);
    return () => clearTimeout(delayFn);
  }, [searchQuery, delay]);

  return [search, setSearchQuery];
}
