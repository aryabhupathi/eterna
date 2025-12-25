import { Token } from "@/types/token";
import { SortState } from "@/types/sort";
export function sortTokens(tokens: Token[], sort: SortState): Token[] {
  const { key, order } = sort;
  return [...tokens].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal === bVal) return 0;
    return order === "asc" ? aVal - bVal : bVal - aVal;
  });
}
