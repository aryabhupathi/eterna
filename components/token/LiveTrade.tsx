"use client";
import { useEffect, useRef, useState } from "react";
import { Trade, TradeSide } from "@/types/trade";
import { PRICE_SCALE, toDisplayPrice } from "@/services/price";
type TradeUI = Trade & { isNew?: boolean };
function randomAmount() {
  return +(Math.random() * 1.2 + 0.05).toFixed(3);
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
      const total = Math.round((tradePrice * amount) / PRICE_SCALE);
      console.log("💱 TRADE", {
        tradePrice,
        amount,
        total,
      });
      setTrades((prev) =>
        [
          {
            id: crypto.randomUUID(),
            side,
            price: tradePrice,
            amount,
            total,
            timestamp: Date.now(),
            wallet: "0x" + Math.random().toString(16).slice(2, 8),
            isNew: true,
          },
          ...prev.map((t) => ({ ...t, isNew: false })),
        ].slice(0, 40)
      );
    }, 600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="text-[11px]">
      {trades.map((t) => (
        <div
          key={t.id}
          className={`grid grid-cols-5 px-4 py-1 border-b ${
            t.side === "buy" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          <span>{t.side.toUpperCase()}</span>
          <span>${toDisplayPrice(t.price)}</span>
          <span>{t.amount}</span>
          <span>${t.total}</span>
          <span className="text-right">{t.wallet}</span>
        </div>
      ))}
    </div>
  );
}
