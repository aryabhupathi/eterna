import { Token } from "@/types/token";
import { SortState } from "./sort";
  export function sortTokens(tokens: Token[], sort: SortState): Token[] {
  const { key, order } = sort;

  return [...tokens].sort((a, b) => {
    const aVal = Number(a[key]);
    const bVal = Number(b[key]);

    if (Number.isNaN(aVal) || Number.isNaN(bVal)) return 0;
    return order === "asc" ? aVal - bVal : bVal - aVal;
  });
}
