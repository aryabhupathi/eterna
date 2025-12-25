"use client";
import dynamic from "next/dynamic";
const RealTimeChart = dynamic(() => import("@/components/charts/RealChart"), {
  ssr: false,
});
export default function PairClient({ pair }: { pair: string }) {
  return (
    <main className="h-screen bg-black text-slate-100 grid grid-cols-[1fr_360px]">
      <section className="flex flex-col border-r border-slate-800">
        <div className="h-14 px-4 flex items-center border-b border-slate-800">
          <h1 className="font-semibold">Pair: {pair}</h1>
        </div>
        <div className="flex-1">
          <RealTimeChart symbol="SOL" pair={pair} />
        </div>
        <div className="h-64 border-t border-slate-800">
        </div>
        <div className="relative flex-1">
        </div>
      </section>
      <aside className="p-4">
        <div className="bg-slate-900 rounded-xl p-4 h-full">
          Buy / Sell Panel
        </div>
      </aside>
    </main>
  );
}
