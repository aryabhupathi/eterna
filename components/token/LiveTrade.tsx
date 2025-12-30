"use client";
import { useEffect, useRef, useState } from "react";
import { Trade, TradeSide } from "@/types/trade";
type TradeUI = Trade & { isNew?: boolean };
function randomAmount() {
  return +(Math.random() * 1.5 + 0.05).toFixed(3);
}
export default function LiveTrades({ price }: { price: number }) {
  const [trades, setTrades] = useState<TradeUI[]>([]);
  const priceRef = useRef(price);
  useEffect(() => {
    priceRef.current = price;
  }, [price]);
  useEffect(() => {
    const id = setInterval(() => {
      const side: TradeSide = Math.random() > 0.5 ? "buy" : "sell";
      const amount = randomAmount();
      const tradePrice =
        priceRef.current +
        (side === "buy" ? 1 : -1) * Math.floor(Math.random() * 20);
      const total = Math.round(tradePrice * amount);
      setTrades((prev) =>
        [
          {
            id: crypto.randomUUID(),
            side,
            price: tradePrice,
            amount,
            total,
            time: new Date().toISOString(),
            timestamp: Date.now(),
            wallet: "0x" + Math.random().toString(16).slice(2, 8),
            isNew: true,
          },
          ...prev.map((t) => ({ ...t, isNew: false })),
        ].slice(0, 40)
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full h-full overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
      <div className="min-w-175 text-xs">
        <div
          className="
          sticky top-0 z-10
          bg-black/90 backdrop-blur
          border-b border-white/5
          px-4 py-2
          grid
          grid-cols-[80px_120px_120px_120px_1fr]
          text-slate-400
        "
        >
          <span>Type</span>
          <span>Price</span>
          <span>Amount</span>
          <span>Total</span>
          <span>Wallet</span>
        </div>
        {trades.map((t) => (
          <div
            key={t.id}
            className="
            border-b border-white/5
            px-4 py-2
            grid
            grid-cols-[80px_120px_120px_120px_1fr]
            items-center
          "
          >
            <span
              className={`font-semibold ${
                t.side === "buy" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {t.side.toUpperCase()}
            </span>
            <span className="tabular-nums text-slate-300">${t.price}</span>
            <span className="tabular-nums text-slate-300">{t.amount}</span>
            <span className="tabular-nums text-slate-300">${t.total}</span>
            <span className="text-slate-500 truncate">
              {t.wallet.slice(0, 6)}…{t.wallet.slice(-4)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
