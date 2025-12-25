"use client";
import clsx from "clsx";
import { Token } from "@/types/token";
import { useRouter } from "next/navigation";
export function TokenRow({ token }: { token: Token }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/pulse/${token.address}`)}
      className={clsx(
        "rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-sm transition",
        "hover:bg-slate-800/60 hover:border-slate-700"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold ring-2 ring-emerald-500/60">
          {token.symbol.slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{token.symbol}</span>
            <span className="text-[11px] text-emerald-400">
              {token.createdAt ? "LIVE" : ""}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {token.name}
          </div>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-[11px] text-slate-400">
        <div>
          MC{" "}
          <span className="text-slate-200">
            ${(token.marketCap / 1e6).toFixed(2)}M
          </span>
        </div>
        <div>
          Vol{" "}
          <span className="text-slate-200">
            ${(token.volume / 1e3).toFixed(0)}K
          </span>
        </div>
        <div>
          Liq{" "}
          <span className="text-slate-200">
            {Number.isFinite(token.liquidity)
              ? `$${(token.liquidity / 1e3).toFixed(0)}K`
              : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
