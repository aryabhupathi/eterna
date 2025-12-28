import { Trade } from "@/types/trade";

export function tradesToMarkers(trades: Trade[]) {
  return trades.map((t) => ({
    time: t.time,
    position: t.side === "buy" ? "belowBar" : "aboveBar",
    color: t.side === "buy" ? "#22c55e" : "#ef4444",
    shape: "circle" as const,
    text: t.side === "buy" ? "B" : "S",
  }));
}
