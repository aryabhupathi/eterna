"use client";
import { TokenColumn } from "@/components/token/TokenColumn";
export default function PulsePage() {
  return (
    <main className="h-screen bg-slate-950 text-slate-100 flex flex-col px-4 py-3">
      <h1 className="text-lg font-semibold mb-3 shrink-0">Pulse</h1>
      <section className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 overflow-auto">
        <TokenColumn stage="new" title="New Pairs" />
        <TokenColumn stage="final" title="Final Stretch" />
        <TokenColumn stage="migrated" title="Migrated" />
      </section>
    </main>
  );
}
