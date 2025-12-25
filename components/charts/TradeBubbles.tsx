"use client";
import clsx from "clsx";
export default function TradeBubbles({
  trades,
}: {
  trades: {
    id: string;
    side: "buy" | "sell";
    price: number;
    x: number;
    y: number;
  }[];
}) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {trades.map((t) => (
        <div
          key={t.id}
          className={clsx(
            "absolute rounded-full text-xs font-semibold px-2 py-1",
            t.side === "buy"
              ? "bg-emerald-500/90 text-black"
              : "bg-rose-500/90 text-white"
          )}
          style={{
            left: `${t.x}%`,
            top: `${t.y}%`,
          }}
        >
          {t.side === "buy" ? "DB" : "DS"}
        </div>
      ))}
    </div>
  );
}
