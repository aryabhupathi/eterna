import { useMemo, useState } from "react";
import { Token } from "@/types/token";
export type SortKey = "price" | "volume" | "newest";
export function useTokenSorting(tokens: Token[]) {
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const sortedTokens = useMemo(() => {
    const copy = [...tokens];
    switch (sortKey) {
      case "price":
        return copy.sort((a, b) => b.price - a.price);
      case "volume":
        return copy.sort((a, b) => b.volume24h - a.volume24h);
      case "newest":
      default:
        return copy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [tokens, sortKey]);
  return { sortKey, setSortKey, sortedTokens };
}
