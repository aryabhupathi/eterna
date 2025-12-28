// // "use client";
// // import clsx from "clsx";
// // import { Token } from "@/types/token";
// // import { useRouter } from "next/navigation";
// // import { useEffect, useRef } from "react";
// // export function TokenRow({ token }: { token: Token }) {
// //   const router = useRouter();
// //   const prevPriceRef = useRef<number | null>(null);
// //   function formatCompact(n?: number) {
// //     if (typeof n !== "number" || isNaN(n)) return "—";
// //     if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
// //     if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
// //     return n.toString();
// //   }
// //   useEffect(() => {
// //     if (typeof token.price !== "number") return;
// //     const prev = prevPriceRef.current;
// //     prevPriceRef.current = token.price;
// //     if (prev === null) return;
// //     const delta = token.price - prev;
// //     const direction = delta > 0 ? "🟢 UP" : delta < 0 ? "🔴 DOWN" : "➖ FLAT";
// //   }, [token.price]);
// //   function handleClick() {
// //     router.push(`/pulse/${token.id}`);
// //   }
// //   return (
// //     <div
// //       onClick={handleClick}
// //       className={clsx(
// //         "group flex items-start gap-2",
// //         "h-14 px-2 py-1.5",
// //         "rounded-[10px] border border-white/5",
// //         "bg-white/2",
// //         "transition-all duration-150 ease-out",
// //         "hover:-translate-y-px",
// //         "hover:border-teal-400/30 hover:bg-white/[0.035]",
// //         "hover:shadow-[0_0_0_1px_rgba(45,212,191,0.08)]"
// //       )}
// //     >
// //       <div className="flex-1 min-w-0">
// //         <div className="flex items-center gap-1 leading-3.5">
// //           <span className="truncate text-[13px] font-medium">{token.name}</span>
// //           <span className="text-[10px] text-slate-500">{token.age}</span>
// //         </div>
// //         <div className="flex gap-2 text-[11px] leading-3.5 text-slate-500 mt-0.5">
// //           <span>MC ${formatCompact(token.marketCap)}</span>
// //           <span>Vol ${formatCompact(token.volume)}</span>
// //           <span>Liq ${formatCompact(token.liquidity)}</span>
// //         </div>
// //       </div>
// //       <div className="flex flex-col items-end text-right mt-0.5">
// //         <span
// //           className={clsx(
// //             "text-[11px] font-medium",
// //             token.buyRatio >= 0.6
// //               ? "text-emerald-400"
// //               : token.buyRatio >= 0.45
// //               ? "text-amber-400"
// //               : "text-red-400"
// //           )}
// //         >
// //           {(token.buyRatio * 100).toFixed(0)}% Buy
// //         </span>
// //         <span className="text-[10px] text-slate-500 leading-tight">
// //           {token.txCount} tx
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }


//   "use client";

//   import clsx from "clsx";
//   import { Token } from "@/types/token";
//   import { useRouter } from "next/navigation";
//   import { useEffect, useRef, useState } from "react";
//   import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
//   } from "@/components/ui/tooltip";
//   import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

//   export function TokenRow({ token }: { token: Token }) {
//     const router = useRouter();
//     const prevPriceRef = useRef<number | null>(null);
//     const [priceDir, setPriceDir] = useState<"up" | "down" | null>(null);

//     function formatCompact(n?: number) {
//       if (typeof n !== "number" || isNaN(n)) return "—";
//       if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
//       if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
//       return n.toString();
//     }

//     // ✅ PRICE FLASH (REQUIRED)
//     useEffect(() => {
//       if (typeof token.price !== "number") return;
//       const prev = prevPriceRef.current;
//       prevPriceRef.current = token.price;
//       if (prev == null) return;

//       if (token.price > prev) setPriceDir("up");
//       else if (token.price < prev) setPriceDir("down");

//       const t = setTimeout(() => setPriceDir(null), 400);
//       return () => clearTimeout(t);
//     }, [token.price]);

//     function handleClick() {
//       router.push(`/pulse/${token.id}`);
//     }

//     return (
//       <div
//         onClick={handleClick}
//         className={clsx(
//           "group flex items-start gap-2",
//           "h-14 px-2 py-1.5",
//           "rounded-[10px] border border-white/5",
//           "bg-white/2",
//           "transition-all duration-150",
//           "hover:-translate-y-px hover:border-teal-400/30"
//         )}
//       >
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-1 leading-3.5">
//             <span className="truncate text-[13px] font-medium">
//               {token.name}
//             </span>
//             {/* <span className="text-[10px] text-slate-500">
//               {token.age}
//             </span> */}
//             <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
//   {token.age}
// </span>

//           </div>

//           <div className="flex gap-2 text-[11px] mt-0.5 text-slate-500">
//             <span>MC ${formatCompact(token.marketCap)}</span>

//             {/* ✅ TOOLTIP */}
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <span className="cursor-help">
//                   Liq ${formatCompact(token.liquidity)}
//                 </span>
//               </TooltipTrigger>
//               <TooltipContent side="top">
//                 <div className="text-xs">
//                   Liquidity locked: 95%
//                 </div>
//               </TooltipContent>
//             </Tooltip>
//           </div>
//         </div>
//         <div className="flex flex-col items-end mt-0.5 gap-0.5">
//   <Popover>
//     <PopoverTrigger asChild>
//       <button
//         onClick={(e) => e.stopPropagation()}
//         className="text-slate-500 hover:text-white text-xs leading-none"
//         aria-label="More actions"
//       >
//         ⋮
//       </button>
//     </PopoverTrigger>

//     <PopoverContent
//       align="end"
//       sideOffset={4}
//       className="w-40 text-xs"
//     >
//       <div className="space-y-2">
//         <button className="w-full text-left hover:underline">
//           Copy Address
//         </button>
//         <button className="w-full text-left hover:underline">
//           View Details
//         </button>
//       </div>
//     </PopoverContent>
//   </Popover>

// </div>
//         <div className="flex flex-col items-end mt-0.5">
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <span
//                 className={clsx(
//                   "text-[11px] font-medium transition-colors",
//                   token.buyRatio >= 0.6
//                     ? "text-emerald-400"
//                     : token.buyRatio >= 0.45
//                     ? "text-amber-400"
//                     : "text-red-400"
//                 )}
//               >
//                 {(token.buyRatio * 100).toFixed(0)}% Buy
//               </span>
//             </TooltipTrigger>
//             <TooltipContent>
//               Buy vs Sell ratio
//             </TooltipContent>
//           </Tooltip>

//           {/* ✅ PRICE FLASH */}
//           <span
//             className={clsx(
//   "text-[11px] font-medium transition-colors",
//   priceDir === "up" && "text-emerald-400",
//   priceDir === "down" && "text-red-400",
//   priceDir === null &&
//     (token.buyRatio >= 0.6
//       ? "text-emerald-400"
//       : token.buyRatio >= 0.45
//       ? "text-amber-400"
//       : "text-red-400")
// )}

//           >
//             {token.txCount} tx
//           </span>
//         </div>
//       </div>
//     );
//   }


"use client";

import clsx from "clsx";
import { Token } from "@/types/token";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TokenRow({ token }: { token: Token }) {
  const router = useRouter();

  /* ---------------- PRICE FLASH (CORRECT WAY) ---------------- */
  const prevPriceRef = useRef<number | null>(null);
  const [flashDir, setFlashDir] = useState<"up" | "down" | null>(null);

  // useEffect(() => {
  //   if (typeof token.price !== "number") return;

  //   const prev = prevPriceRef.current;
  //   prevPriceRef.current = token.price;

  //   if (prev == null) return;

  //   if (token.price > prev) {
  //     setFlashDir("up");
  //   } else if (token.price < prev) {
  //     setFlashDir("down");
  //   }

  //   const t = setTimeout(() => {
  //     setFlashDir(null);
  //   }, 400);

  //   return () => clearTimeout(t);
  // }, [token.price]);

  useEffect(() => {
  if (typeof token.price !== "number") return;

  const prev = prevPriceRef.current;
  prevPriceRef.current = token.price;

  if (prev == null) return;

  // ✅ Defer state update to avoid cascading render warning
  const id = requestAnimationFrame(() => {
    if (token.price > prev) {
      setFlashDir("up");
    } else if (token.price < prev) {
      setFlashDir("down");
    }
  });

  const t = setTimeout(() => {
    setFlashDir(null);
  }, 400);

  return () => {
    cancelAnimationFrame(id);
    clearTimeout(t);
  };
}, [token.price]);

  /* ---------------- HELPERS ---------------- */
  function formatCompact(n?: number) {
    if (typeof n !== "number" || isNaN(n)) return "—";
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
    return n.toString();
  }

  function handleClick() {
    router.push(`/pulse/${token.id}`);
  }

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={clsx(
        "group flex items-start gap-2",
        "h-[58px] px-2 py-1.5",
        "rounded-[10px] border border-white/5",
        "bg-white/2",
        "transition-all duration-150",
        "hover:-translate-y-px hover:border-teal-400/30"
      )}
    >
      {/* LEFT */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 leading-3.5">
          <span className="truncate text-[13px] font-medium">
            {token.name}
          </span>
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
            <TooltipContent>
              Liquidity locked: 95%
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-0.5">
        <Popover>
          <PopoverTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="text-slate-500 hover:text-white text-xs leading-none"
              aria-label="More actions"
            >
              ⋮
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={4}
            className="w-40 text-xs"
          >
            <button className="block w-full text-left hover:underline">
              Copy Address
            </button>
            <button className="block w-full text-left hover:underline">
              View Details
            </button>
          </PopoverContent>
        </Popover>

        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={clsx(
                "text-[11px] font-semibold transition-colors duration-300",
                flashDir === "up" && "text-emerald-400",
                flashDir === "down" && "text-red-400",
                flashDir == null &&
                  (token.buyRatio >= 0.7
                    ? "text-emerald-400"
                    : token.buyRatio >= 0.55
                    ? "text-teal-400"
                    : token.buyRatio >= 0.45
                    ? "text-yellow-400"
                    : "text-red-400")
              )}
            >
              {(token.buyRatio * 100).toFixed(0)}% Buy
            </span>
          </TooltipTrigger>
          <TooltipContent>
            Buy vs Sell ratio
          </TooltipContent>
        </Tooltip>

        <span className="text-[11px] font-semibold text-slate-400">
          {token.txCount} tx
        </span>
      </div>
    </div>
  );
}
