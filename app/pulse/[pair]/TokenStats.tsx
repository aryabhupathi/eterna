import { Token } from "@/types/token";
export default function TokenStats({ token }: { token: Token }) {
  return (
    <div className="w-[320px] bg-black/40 backdrop-blur border-l border-white/5 p-3">
      <div className="flex gap-2 mb-4">
        <button className="flex-1 py-1.5 rounded-md bg-emerald-400 text-black font-semibold text-sm">
          Buy
        </button>
        <button className="flex-1 py-1.5 rounded-md bg-white/5 text-slate-300 text-sm">
          Sell
        </button>
      </div>
      <div className="space-y-3 text-sm">
        <label className="text-slate-400">Amount</label>
        <input
          className="w-full bg-black/60 border border-white/10 rounded-md px-3 py-2
  focus:outline-none focus:border-emerald-400/40"
        />
        <button className="w-full py-3 rounded bg-emerald-500 text-black font-bold">
          Buy {token.symbol}
        </button>
      </div>
    </div>
  );
}
