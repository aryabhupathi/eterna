import CandlestickChart from "@/components/charts/CandleStickChart";
import { Token } from "@/types/token";
import { useState } from "react";
export default function TokenChart({ token }: { token: Token }) {
  const [tf, setTf] = useState<"1s" | "1m" | "5m">("1s");
  if (!token.price) return null;
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="h-10 px-4 flex items-center gap-4 text-xs border-b border-white/5">
        {["1s", "1m", "5m"].map((x) => (
          <button
            key={x}
            onClick={() => setTf(x as any)}
            className={tf === x ? "text-emerald-400" : "text-slate-400"}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <CandlestickChart price={token.price} timeframe={tf} />
      </div>
    </div>
  );
}
