"use client";
import { useState } from "react";
import { TokenColumn } from "@/components/token/TokenColumn";
import { TokenStage } from "@/types/token";
import { PulseTabs } from "@/components/PulseTabs";
export default function PulsePage() {
  const [activeTab, setActiveTab] = useState<TokenStage>("new");
  return (
    <main className="h-dvh bg-[#0a0f1c] text-slate-100 flex flex-col px-2 pt-1 pb-1">
      <h1 className=" text-center font-semibold tracking-tight text-slate-200 py-2">
        Pulse
      </h1>
      <div className="flex lg:hidden items-center justify-between mb-1">
        <PulseTabs active={activeTab} onChange={setActiveTab} />
      </div>
      <section className="hidden md:grid flex-1 grid-cols-3 gap-1.5 min-h-0">
        <TokenColumn stage="new" title="New Pairs" />
        <TokenColumn stage="final" title="Final Stretch" />
        <TokenColumn stage="migrated" title="Migrated" />
      </section>
      <section className="md:hidden flex-1 min-h-0">
        {activeTab === "new" && <TokenColumn stage="new" title="New Pairs" />}
        {activeTab === "final" && (
          <TokenColumn stage="final" title="Final Stretch" />
        )}
        {activeTab === "migrated" && (
          <TokenColumn stage="migrated" title="Migrated" />
        )}
      </section>
    </main>
  );
}
