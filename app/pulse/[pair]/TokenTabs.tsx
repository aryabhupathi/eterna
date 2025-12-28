"use client";
import { useState } from "react";
import { Token } from "@/types/token";
import LiveTrades from "@/components/token/LiveTrade";
type Tab = "trades" | "holders" | "positions" | "dev";
export default function TokenTabs({
  token,
  price,
}: {
  token: Token;
  price: number;
}) {
  const [active, setActive] = useState<Tab>("trades");
  return (
    <div className="h-48 border-t border-white/5 bg-black/30 backdrop-blur flex flex-col">
      <div className="flex gap-5 px-4 py-2 text-[12px] border-b border-white/5">
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
      <div className="flex-1 min-h-0">
  {active === "trades" && typeof price === "number" && (
    <LiveTrades price={price} />
  )}
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
