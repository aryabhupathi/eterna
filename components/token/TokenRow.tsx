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

function formatCompact(n?: number) {
  if (typeof n !== "number") return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toString();
}
function TxBar({ ratio }: { ratio: number }) {
  const buy = Math.round(ratio * 100);
  const sell = 100 - buy;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="mt-0.5 h-0.5 w-14 rounded bg-white/10 overflow-hidden flex cursor">
          <div className="h-full bg-emerald-400" style={{ width: `${buy}%` }} />
          <div className="h-full bg-red-400" style={{ width: `${sell}%` }} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        Buy {buy}% / Sell {sell}%
      </TooltipContent>
    </Tooltip>
  );
}
function Pill({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    green: "text-emerald-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
    blue: "text-sky-400",
  };
  const descriptions: Record<string, string> = {
    Buy: "Buy transaction ratio",
    Sell: "Sell transaction ratio",
    Tax: "Buy / Sell tax",
    Lock: "Liquidity lock percentage",
    H: "Total holders",
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={clsx(
            "px-1.5 py-0.5 rounded-md text-[10px] font-medium cursor",
            "bg-white/5",
            colorMap[color]
          )}
        >
          {label} {value}
        </div>
      </TooltipTrigger>
      <TooltipContent>{descriptions[label] ?? label}</TooltipContent>
    </Tooltip>
  );
}
export const TokenRow = React.memo(function TokenRow({
  token,
}: {
  token: Token;
}) {
  const router = useRouter();
  const prevPriceRef = useRef<number | null>(null);
  const flashRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const prev = prevPriceRef.current;
    prevPriceRef.current = token.price;
    if (prev == null || token.price === prev) return;
    const el = flashRef.current;
    if (!el) return;
    const cls = token.price > prev ? "flash-up" : "flash-down";
    el.classList.add(cls);
    const t = setTimeout(() => el.classList.remove(cls), 300);
    return () => clearTimeout(t);
  }, [token.price]);
  function handleClick() {
    router.push(`/pulse/${token.id}`);
  }
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={clsx(
        "group w-full",
        "rounded-[10px] border border-white/5 bg-white/2",
        "px-3 py-2",
        "hover:bg-white/4 hover:border-teal-400/30",
        "transition-all duration-150"
      )}
    >
      <div className="flex items-start gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center
          text-[10px] font-bold text-white shrink-0"
          style={{ backgroundColor: getAvatarColor(token.name) }}
        >
          {getTokenAvatarText(token.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate text-[13px] font-semibold tracking-[-0.01em] cursor-pointer">
                  {token.name}
                </span>
              </TooltipTrigger>
              <TooltipContent>View token details</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-[10px] px-1.5 py-px rounded bg-white/5 text-slate-400 cursor">
                  {token.age}
                </span>
              </TooltipTrigger>
              <TooltipContent>Token age since launch</TooltipContent>
            </Tooltip>
          </div>
          <div className="mt-0.5 text-[11px] text-slate-500 flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <span>MC ${formatCompact(token.marketCap)}</span>
              </TooltipTrigger>
              <TooltipContent>Market capitalization</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>Liq ${formatCompact(token.liquidity)}</span>
              </TooltipTrigger>
              <TooltipContent>Liquidity in pool</TooltipContent>
            </Tooltip>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mt-0.5 text-[10px] text-slate-600 cursor-copy">
                {token.shortAddress}
              </div>
            </TooltipTrigger>
            <TooltipContent>Click to copy address</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-col items-end text-[11px] font-medium">
          <Tooltip>
            <TooltipTrigger asChild>
              <span ref={flashRef} className="text-slate-200">
                ${token.price.toFixed(2)}
              </span>
            </TooltipTrigger>
            <TooltipContent>Latest traded price</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-slate-400">TX {token.txCount}</span>
            </TooltipTrigger>
            <TooltipContent>Total transactions</TooltipContent>
          </Tooltip>
          <TxBar ratio={token.txRatio} />
        </div>
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {token.pills?.map((p) => (
          <Pill key={p.key} label={p.label} value={p.value} color={p.color} />
        ))}
      </div>
    </div>
  );
});
