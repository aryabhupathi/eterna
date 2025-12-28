// import Image from "next/image";
// import { Token } from "@/types/token";
// export default function TokenHeader({ token }: { token: Token }) {
//   return (
//     <div className="h-12 flex items-center justify-between px-3 border-b border-white/5 bg-black/40 backdrop-blur">
//       <div className="flex items-center gap-3">
//         <Image
//           src={token.image}
//           alt={token.name}
//           width={28}
//           height={28}
//           className="rounded-full"
//         />
//         <div className="flex flex-col">
//           <span className="text-sm font-medium">
//             {token.name} ({token.symbol})
//           </span>
//           <span className="text-xs text-slate-400">
//             Liquidity ${token.liquidity.toLocaleString()}
//           </span>
//         </div>
//       </div>
//       <div className="flex items-center gap-4 text-[11px]">
//         <Stat label="MC" value={`$${token.marketCap}`} />
//         <Stat label="Tax" value={`${token.buyTax}% / ${token.sellTax}%`} />
//         <Stat label="Holders" value={token.holders} />
//       </div>
//     </div>
//   );
// }
// function Stat({ label, value }: any) {
//   return (
//     <div className="flex flex-col items-end leading-tight">
//       <span className="text-[10px] text-slate-500">{label}</span>
//       <span className="text-slate-200 font-medium">{value}</span>
//     </div>
//   );
// }


// "use client";

// export default function TokenHeader() {
//   return (
//     <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#0b0f14]">
//       {/* LEFT */}
//       <div className="flex items-center gap-3">
//         <img src="/token.png" className="w-8 h-8 rounded-full" />
//         <div>
//           <div className="text-sm font-semibold text-white">
//             白龙 <span className="text-yellow-400">White Dragon</span>
//           </div>
//           <div className="text-xs text-slate-400">USD / BNB</div>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="flex gap-6 text-xs">
//         <Stat label="Price" value="$0.0055" />
//         <Stat label="Liquidity" value="$10.8K" />
//         <Stat label="Supply" value="1B" />
//         <Stat label="B.Curve" value="5.36%" green />
//         <Stat label="Tax" value="1%" />
//       </div>

//       {/* ACTIONS */}
//       <div className="flex gap-2">
//         <IconBtn icon="⭐" />
//         <IconBtn icon="🔔" />
//         <IconBtn icon="⚙️" />
//       </div>
//     </div>
//   );
// }

// const Stat = ({ label, value, green }: any) => (
//   <div>
//     <div className="text-slate-400">{label}</div>
//     <div className={green ? "text-green-400" : "text-white"}>{value}</div>
//   </div>
// );

// const IconBtn = ({ icon }: any) => (
//   <button className="px-2 py-1 text-slate-400 hover:text-white">
//     {icon}
//   </button>
// );


import Image from "next/image";
import { Token } from "@/types/token";

export default function TokenHeader({ token }: { token: Token }) {
  return (
    <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-black/40 backdrop-blur">
      {/* LEFT — TOKEN IDENTITY */}
      <div className="flex items-center gap-3 min-w-0">
        <Image
          src={token.image}
          alt={token.name}
          width={30}
          height={30}
          className="rounded-full"
        />

        <div className="flex flex-col leading-tight min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold truncate">
              {token.name}
            </span>
            <span className="text-xs text-slate-400">
              ({token.symbol})
            </span>

            {token.trending && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
                🔥 Trending
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>{token.age}</span>
            <StageBadge stage={token.stage} />
          </div>
        </div>
      </div>

      {/* RIGHT — STATS */}
      <div className="flex items-center gap-5 text-[11px]">
        <Stat label="Price" value={formatPrice(token.price)} />
        <Stat
          label="Liquidity"
          value={`$${formatNumber(token.liquidity)}`}
        />
        <Stat
          label="MC"
          value={`$${formatNumber(token.marketCap)}`}
        />
        <Stat
          label="Tax"
          value={`${token.buyTax}% / ${token.sellTax}%`}
        />
        <Stat label="Holders" value={token.holders} />
      </div>
    </div>
  );
}

/* ----------------- SUB COMPONENTS ----------------- */

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col items-end leading-tight">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className="text-slate-200 font-medium tabular-nums">
        {value}
      </span>
    </div>
  );
}

function StageBadge({ stage }: { stage: Token["stage"] }) {
  const map: Record<string, string> = {
    new: "bg-green-500/20 text-green-400",
    final: "bg-blue-500/20 text-blue-400",
    migrated: "bg-purple-500/20 text-purple-400",
  };

  return (
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded ${map[stage]}`}
    >
      {stage.toUpperCase()}
    </span>
  );
}

/* ----------------- HELPERS ----------------- */

function formatNumber(n?: number) {
  if (!n) return "—";
  return n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(2)}K`
    : n.toString();
}

function formatPrice(p?: number) {
  if (!p) return "—";
  return p < 0.01 ? `$${p.toFixed(6)}` : `$${p.toFixed(4)}`;
}
