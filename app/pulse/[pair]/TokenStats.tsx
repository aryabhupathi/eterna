// import { Token } from "@/types/token";
// export default function TokenStats({ token }: { token: Token }) {
//   return (
//     <div className="w-[320px] bg-black/40 backdrop-blur border-l border-white/5 p-3">
//       <div className="flex gap-2 mb-4">
//         <button className="flex-1 py-1.5 rounded-md bg-emerald-400 text-black font-semibold text-sm">
//           Buy
//         </button>
//         <button className="flex-1 py-1.5 rounded-md bg-white/5 text-slate-300 text-sm">
//           Sell
//         </button>
//       </div>
//       <div className="space-y-3 text-sm">
//         <label className="text-slate-400">Amount</label>
//         <input
//           className="w-full bg-black/60 border border-white/10 rounded-md px-3 py-2
//   focus:outline-none focus:border-emerald-400/40"
//         />
//         <button className="w-full py-3 rounded bg-emerald-500 text-black font-bold">
//           Buy {token.symbol}
//         </button>
//       </div>
//     </div>
//   );
// }

// import { Token } from "@/types/token";


// export default function TokenStats({ token }: { token: Token }) {
//   return (
//     <div className="w-[340px] bg-[#0b0f14] border-l border-slate-800 p-4">
//       <div className="flex mb-3">
//         <button className="flex-1 bg-green-500 text-black py-2 rounded-l">
//           Buy
//         </button>
//         <button className="flex-1 bg-slate-800 text-white py-2 rounded-r">
//           Sell
//         </button>
//       </div>

//       <input
//         className="w-full bg-black border border-slate-700 p-2 text-sm mb-3"
//         placeholder="Amount"
//       />

//       <div className="grid grid-cols-4 gap-2 mb-3 text-xs">
//         {["0.025", "0.05", "0.1", "0.25"].map((p) => (
//           <button key={p} className="bg-slate-800 py-1 rounded">
//             {p}
//           </button>
//         ))}
//       </div>

//       <button className="w-full bg-green-500 py-3 rounded text-black font-semibold">
//         Buy 白龙
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Token } from "@/types/token";

export default function TokenStats({ token }: { token: Token }) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  const presets = [0.025, 0.05, 0.1, 0.25];

  const handlePreset = (v: number) => {
    setAmount(v.toString());
  };

  const handleSubmit = () => {
    const amt = Number(amount);
    if (!amt || amt <= 0) return;

    console.log("TRADE", {
      side,
      amount: amt,
      token: token.symbol,
      price: token.price,
      time: Date.now(),
    });

    setAmount("");
  };

  return (
    <div className="w-[340px] bg-[#0b0f14] border-l border-slate-800 p-4 text-sm">
      {/* BUY / SELL TOGGLE */}
      <div className="flex mb-3 rounded overflow-hidden">
        {(["buy", "sell"] as const).map((x) => (
          <button
            key={x}
            onClick={() => setSide(x)}
            className={`flex-1 py-2 font-semibold transition ${
              side === x
                ? x === "buy"
                  ? "bg-green-500 text-black"
                  : "bg-red-500 text-black"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            {x.toUpperCase()}
          </button>
        ))}
      </div>

      {/* AMOUNT INPUT */}
      <div className="mb-3">
        <div className="text-xs text-slate-400 mb-1">
          Amount ({side === "buy" ? "USD" : token.symbol})
        </div>
        {/* <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="w-full bg-black border border-slate-700 px-2 py-2 outline-none focus:border-slate-500"
        /> */}
        <input
  type="number"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  placeholder="0.0"
  className="
    w-full
    bg-black
    border border-slate-700
    px-2 py-2
    text-slate-200
    placeholder:text-slate-500
    caret-green-400
    outline-none
    focus:border-slate-500
  "
/>

      </div>

      {/* PRESETS */}
      <div className="grid grid-cols-4 gap-2 mb-4 text-xs">
        {presets.map((p) => (
          <button
  key={p}
  onClick={() => handlePreset(p)}
  className="
    bg-slate-800
    hover:bg-slate-700
    text-xs
    text-slate-400
    py-1
    rounded
    transition
    hover:text-slate-200
  "
>
  {p}
</button>
        ))}
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={!amount || Number(amount) <= 0}
        className={`w-full py-3 rounded font-semibold transition ${
          side === "buy"
            ? "bg-green-500 text-black hover:bg-green-400"
            : "bg-red-500 text-black hover:bg-red-400"
        } disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {side === "buy" ? "Buy" : "Sell"} {token.symbol}
      </button>
    </div>
  );
}
