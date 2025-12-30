"use client";
import { useState } from "react";
import { Token } from "@/types/token";
import LiveTrades from "@/components/token/LiveTrade";
type Tab = "trades" | "holders" | "dev";
export default function TokenTabs({
  token,
  price,
}: {
  token: Token;
  price: number;
}) {
  const [active, setActive] = useState<Tab>("trades");
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-black/30">
      <div className="shrink-0 flex gap-4 px-3 py-2 text-xs border-b border-white/5 overflow-x-auto scrollbar-none">
        <TabButton
          active={active === "trades"}
          onClick={() => setActive("trades")}
        >
          Trades
        </TabButton>
        <TabButton
          active={active === "holders"}
          onClick={() => setActive("holders")}
        >
          Holders ({token.holders})
        </TabButton>
        <TabButton active={active === "dev"} onClick={() => setActive("dev")}>
          Dev Tokens
        </TabButton>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        {active === "trades" && <LiveTrades price={price} />}
        {active !== "trades" && (
          <div className="p-4 text-slate-400">Coming soon</div>
        )}
      </div>
    </div>
  );
}
function TabButton({ active, children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 transition ${
        active
          ? "text-white border-b-2 border-emerald-400"
          : "text-slate-400 hover:text-slate-300"
      }`}
    >
      {children}
    </button>
  );
}
