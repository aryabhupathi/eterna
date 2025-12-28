"use client";
import clsx from "clsx";
import { Token } from "@/types/token";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
export function TokenRow({ token }: { token: Token }) {
  const router = useRouter();
  const prevPriceRef = useRef<number | null>(null);
  function formatCompact(n?: number) {
    if (typeof n !== "number" || isNaN(n)) return "—";
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
    return n.toString();
  }
  useEffect(() => {
    if (typeof token.price !== "number") return;
    const prev = prevPriceRef.current;
    prevPriceRef.current = token.price;
    if (prev === null) return;
    const delta = token.price - prev;
    const direction = delta > 0 ? "🟢 UP" : delta < 0 ? "🔴 DOWN" : "➖ FLAT";
  }, [token.price]);
  function handleClick() {
    router.push(`/pulse/${token.id}`);
  }
  return (
    <div
      onClick={handleClick}
      className={clsx(
        "group flex items-start gap-2",
        "h-14 px-2 py-1.5",
        "rounded-[10px] border border-white/5",
        "bg-white/2",
        "transition-all duration-150 ease-out",
        "hover:-translate-y-px",
        "hover:border-teal-400/30 hover:bg-white/[0.035]",
        "hover:shadow-[0_0_0_1px_rgba(45,212,191,0.08)]"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 leading-3.5">
          <span className="truncate text-[13px] font-medium">{token.name}</span>
          <span className="text-[10px] text-slate-500">{token.age}</span>
        </div>
        <div className="flex gap-2 text-[11px] leading-3.5 text-slate-500 mt-0.5">
          <span>MC ${formatCompact(token.marketCap)}</span>
          <span>Vol ${formatCompact(token.volume)}</span>
          <span>Liq ${formatCompact(token.liquidity)}</span>
        </div>
      </div>
      <div className="flex flex-col items-end text-right mt-0.5">
        <span
          className={clsx(
            "text-[11px] font-medium",
            token.buyRatio >= 0.6
              ? "text-emerald-400"
              : token.buyRatio >= 0.45
              ? "text-amber-400"
              : "text-red-400"
          )}
        >
          {(token.buyRatio * 100).toFixed(0)}% Buy
        </span>
        <span className="text-[10px] text-slate-500 leading-tight">
          {token.txCount} tx
        </span>
      </div>
    </div>
  );
}
