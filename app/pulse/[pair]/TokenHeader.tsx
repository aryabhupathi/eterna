import Image from "next/image";
import { Token } from "@/types/token";
export default function TokenHeader({ token }: { token: Token }) {
  return (
    <div className="h-12 flex items-center justify-between px-3 border-b border-white/5 bg-black/40 backdrop-blur">
      <div className="flex items-center gap-3">
        <Image
          src={token.image}
          alt={token.name}
          width={28}
          height={28}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {token.name} ({token.symbol})
          </span>
          <span className="text-xs text-slate-400">
            Liquidity ${token.liquidity.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-[11px]">
        <Stat label="MC" value={`$${token.marketCap}`} />
        <Stat label="Tax" value={`${token.buyTax}% / ${token.sellTax}%`} />
        <Stat label="Holders" value={token.holders} />
      </div>
    </div>
  );
}
function Stat({ label, value }: any) {
  return (
    <div className="flex flex-col items-end leading-tight">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className="text-slate-200 font-medium">{value}</span>
    </div>
  );
}
