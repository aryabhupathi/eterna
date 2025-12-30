"use client";
import { useState } from "react";
import { Token } from "@/types/token";
import clsx from "clsx";
export default function TokenStats({ token }: { token: Token }) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [openMobile, setOpenMobile] = useState(false);
  const presets = [0.025, 0.05, 0.1, 0.25];
  function submitTrade() {
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
    setOpenMobile(false);
  }
  const TradeForm = (
    <>
      <div className="flex mb-3 rounded overflow-hidden">
        {(["buy", "sell"] as const).map((x) => (
          <button
            key={x}
            onClick={() => setSide(x)}
            className={clsx(
              "flex-1 py-2 font-semibold transition",
              side === x
                ? x === "buy"
                  ? "bg-green-500 text-black"
                  : "bg-red-500 text-black"
                : "bg-slate-800 text-slate-300"
            )}
          >
            {x.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="mb-3">
        <div className="text-xs text-slate-400 mb-1">
          Amount ({side === "buy" ? "USD" : token.symbol})
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="
            w-full bg-black
            border border-slate-700
            px-2 py-2
            text-slate-200
            placeholder:text-slate-500
            outline-none
            focus:border-slate-500
          "
        />
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4 text-xs">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setAmount(p.toString())}
            className="
              bg-slate-800
              hover:bg-slate-700
              py-1 rounded
              transition
            "
          >
            {p}
          </button>
        ))}
      </div>
      <button
        onClick={submitTrade}
        disabled={!amount || Number(amount) <= 0}
        className={clsx(
          "w-full py-3 rounded font-semibold transition",
          side === "buy"
            ? "bg-green-500 text-black hover:bg-green-400"
            : "bg-red-500 text-black hover:bg-red-400",
          "disabled:opacity-40 disabled:cursor-not-allowed"
        )}
      >
        {side === "buy" ? "Buy" : "Sell"} {token.symbol}
      </button>
    </>
  );
  return (
    <>
      <aside
        className="
    hidden lg:flex
    flex-col
    w-80
    h-full
    bg-[#0b0f14]
    border-l border-slate-800
    p-4
    text-sm
    overflow-y-auto
  "
      >
        {TradeForm}
      </aside>
      <div
        className="
          lg:hidden
          fixed bottom-0 left-0 right-0 z-20
          bg-black/90 backdrop-blur
          border-t border-white/10
          px-3 py-2
          flex gap-2
        "
      >
        <button className="flex-1 py-2 rounded bg-green-500 text-black">
          BUY
        </button>
        <button className="flex-1 py-2 rounded bg-red-500 text-black">
          SELL
        </button>
      </div>
    </>
  );
}
