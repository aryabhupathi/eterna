export type SortKey = "price" | "volume24h" | "liquidity";
export type SortOrder = "asc" | "desc";
export interface SortState {
  key: SortKey;
  order: SortOrder;
}
