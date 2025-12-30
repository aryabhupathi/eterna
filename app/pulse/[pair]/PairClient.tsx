"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTokensByStage } from "@/services/tokens.service";
import { startPriceFeed, stopPriceFeed } from "@/services/wsMock";
import { updatePrice, upsertTokens } from "@/store/slices/tokenSlice";
import TokenHeader from "./TokenHeader";
import TokenChart from "./TokenChart";
import TokenStats from "./TokenStats";
import TokenTabs from "./TokenTabs";
export default function PairClient({ pair }: { pair: string }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token.tokens[pair]);
  useEffect(() => {
    if (token) return;
    const load = async () => {
      const stages = ["new", "final", "migrated"] as const;
      for (const stage of stages) {
        const data = await fetchTokensByStage(stage);
        dispatch(upsertTokens(data));
      }
    };
    load();
  }, [token, dispatch]);
  useEffect(() => {
    if (!token) return;
    startPriceFeed([token], ({ id, price }) => {
      dispatch(updatePrice({ id, price }));
    });
    return () => stopPriceFeed();
  }, [token, dispatch]);
  if (!token) {
    return <div className="p-6 text-slate-400">Loading token…</div>;
  }
  if (typeof token.price !== "number") {
    return <div className="p-6 text-slate-400">Waiting for price feed…</div>;
  }
  return (
    <div className="h-dvh flex flex-col bg-[#05070d] overflow-hidden pb-16 lg:pb-0">
      <TokenHeader token={token} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <TokenChart token={token} />
          <div className="flex-1 min-h-0 overflow-hidden">
            <TokenTabs token={token} price={token.price} />
          </div>
        </div>
        <TokenStats token={token} />
      </div>
    </div>
  );
}
