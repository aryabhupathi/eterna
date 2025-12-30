import Image from "next/image";
import { Token } from "@/types/token";
import { getAvatarColor, getTokenAvatarText } from "@/services/ImageUtil";
export default function TokenHeader({ token }: { token: Token }) {
  const hasImage = Boolean(token.image);
  return (
    <div
      className="flex flex-col md:flex-row md:h-14 gap-2 md:gap-0
      md:items-center md:justify-between
      px-3 md:px-4 py-2
      border-b border-white/5
      bg-black/40 backdrop-blur"
    >
      <div className="flex items-center gap-3 min-w-0">
        {hasImage ? (
          <Image
            src={token.image}
            alt={token.name}
            width={28}
            height={28}
            className="rounded-full"
          />
        ) : (
          <TokenAvatar name={token.name} />
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-yellow-400 truncate">
              {token.name}
            </span>
            <span className="text-xs text-slate-400">({token.symbol})</span>
          </div>
          <div className="flex gap-2 text-[11px] text-slate-400">
            <span>{token.age}</span>
            <StageBadge stage={token.stage} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-5 text-[11px]">
        <Stat label="Price" value={formatPrice(token.price)} />
        <Stat label="Liquidity" value={`$${formatNumber(token.liquidity)}`} />
        <Stat label="MC" value={`$${formatNumber(token.marketCap)}`} />
        <Stat label="Tax" value={`${token.buyTax}% / ${token.sellTax}%`} />
        <Stat label="Holders" value={formatNumber(token.holders)} />
      </div>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col items-end leading-tight">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className="text-slate-200 font-medium tabular-nums">
        {value ?? "—"}
      </span>
    </div>
  );
}
function StageBadge({ stage }: { stage: Token["stage"] }) {
  const map: Record<Token["stage"], string> = {
    new: "bg-green-500/20 text-green-400",
    final: "bg-blue-500/20 text-blue-400",
    migrated: "bg-purple-500/20 text-purple-400",
  };
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded ${map[stage]}`}>
      {stage.toUpperCase()}
    </span>
  );
}
function TokenAvatar({ name }: { name: string }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center
                 text-[11px] font-bold text-white shrink-0"
      style={{ backgroundColor: getAvatarColor(name) }}
    >
      {getTokenAvatarText(name)}
    </div>
  );
}
function formatNumber(n?: number) {
  if (!n && n !== 0) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
  return n.toString();
}
function formatPrice(p?: number) {
  if (!p && p !== 0) return "—";
  return p < 0.01 ? `$${p.toFixed(6)}` : `$${p.toFixed(4)}`;
}
