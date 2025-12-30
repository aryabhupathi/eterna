"use client";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Token } from "@/types/token";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAvatarColor, getTokenAvatarText } from "@/services/ImageUtil";
export const TokenRow = React.memo(function TokenRow({
  token,
}: {
  token: Token;
}) {
  const router = useRouter();
  const prevPriceRef = useRef<number | null>(null);
  const flashRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (typeof token.price !== "number") return;
    const prev = prevPriceRef.current;
    prevPriceRef.current = token.price;
    if (prev == null || token.price === prev) return;
    const el = flashRef.current;
    if (!el) return;
    const cls = token.price > prev ? "flash-up" : "flash-down";
    el.classList.add(cls);
    const t = setTimeout(() => {
      el.classList.remove(cls);
    }, 300);
    return () => clearTimeout(t);
  }, [token.price]);
  function handleClick() {
    router.push(`/pulse/${token.id}`);
  }
  function formatCompact(n?: number) {
    if (typeof n !== "number") return "—";
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
    return n.toString();
  }
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={clsx(
        "group flex items-start gap-2",
        "h-14.5 px-2 py-1.5",
        "rounded-[10px] border border-white/5 bg-white/2",
        "transition-transform duration-150 transform-gpu",
        "hover:border-teal-400/30",
        "active:scale-[0.98]"
      )}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center
          text-[10px] font-bold text-white shrink-0"
        style={{ backgroundColor: getAvatarColor(token.name) }}
      >
        {getTokenAvatarText(token.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="truncate text-[13px] font-medium">{token.name}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
            {token.age}
          </span>
        </div>
        <div className="flex gap-2 text-[11px] mt-0.5 text-slate-500">
          <span>MC ${formatCompact(token.marketCap)}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help">
                Liq ${formatCompact(token.liquidity)}
              </span>
            </TooltipTrigger>
            <TooltipContent>Liquidity locked: 95%</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              ref={flashRef}
              className={clsx(
                "text-[11px] font-semibold transition-colors",
                token.buyRatio >= 0.7
                  ? "text-emerald-400"
                  : token.buyRatio >= 0.55
                  ? "text-teal-400"
                  : token.buyRatio >= 0.45
                  ? "text-yellow-400"
                  : "text-red-400"
              )}
            >
              {(token.buyRatio * 100).toFixed(0)}% Buy
            </span>
          </TooltipTrigger>
          <TooltipContent>Buy vs Sell ratio</TooltipContent>
        </Tooltip>
        <span className="text-[11px] font-semibold text-slate-400">
          {token.txCount} tx
        </span>
      </div>
    </div>
  );
});
