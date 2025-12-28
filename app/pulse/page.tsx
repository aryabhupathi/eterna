"use client";
import { TokenColumn } from "@/components/token/TokenColumn";
import { fetchTokensByStage } from "@/services/tokens.service";
import { startPriceFeed, stopPriceFeed } from "@/services/wsMock";
import { upsertTokens, updatePrice } from "@/store/slices/tokenSlice";
import { selectAllTokens } from "@/store/slices/tokenSlice";
import { TokenStage } from "@/types/token";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
export default function PulsePage() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectAllTokens);
  useEffect(() => {
    const load = async () => {
      const stages: TokenStage[] = ["new", "final", "migrated"];
      for (const stage of stages) {
        const data = await fetchTokensByStage(stage);
        dispatch(upsertTokens(data));
      }
    };
    load();
  }, [dispatch]);
  useEffect(() => {
    if (!tokens.length) return;
    startPriceFeed(tokens, ({ id, price }) => {
      dispatch(updatePrice({ id, price }));
    });
    return () => stopPriceFeed();
  }, [tokens.length, dispatch]);
  return (
    <main className="h-dvh bg-[#0a0f1c] text-slate-100 flex flex-col px-2 pt-1 pb-1">
      <h1 className="text-[12px] font-semibold mb-1 tracking-tight text-slate-200">
        Pulse
      </h1>
      <section className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-1.5 min-h-0">
        <TokenColumn stage="new" title="New Pairs" />
        <TokenColumn stage="final" title="Final Stretch" />
        <TokenColumn stage="migrated" title="Migrated" />
      </section>
    </main>
  );
}
