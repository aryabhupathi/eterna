export const mapTradesToMarkers = (trades: any[]) =>
  trades.map((t) => ({
    time: t.time,
    position: t.side === "buy" ? "belowBar" : "aboveBar",
    color: t.side === "buy" ? "#22c55e" : "#ef4444",
    shape: "circle",
    text: t.isDev ? (t.side === "buy" ? "DB" : "DS") : "",
  }));
