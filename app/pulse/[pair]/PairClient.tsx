"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import TokenHeader from "./TokenHeader";
import TokenChart from "./TokenChart";
import TokenStats from "./TokenStats";
import TokenTabs from "./TokenTabs";
import { useEffect } from "react";
import { startPriceFeed, stopPriceFeed } from "@/services/wsMock";
import { updatePrice } from "@/store/slices/tokenSlice";
export default function PairClient({ pair }: { pair: string }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token.tokens[pair]);
  useEffect(() => {
    if (!token) return;
    startPriceFeed([token], ({ id, price }) => {
      dispatch(updatePrice({ id, price }));
    });
    return () => stopPriceFeed();
  }, [token?.id]);
  if (!token) {
    return <div className="p-6 text-slate-400">Token not found</div>;
  }
  if (!token || typeof token.price !== "number") {
    return <div className="p-6 text-slate-400">Waiting for price feed…</div>;
  }
  if (!token) {
    return <div className="p-6 text-slate-400">Loading token…</div>;
  }
  return (
    <div className="h-[calc(100vh-48px)] flex flex-col bg-linear-to-b from-[#05070d] to-[#090f1c]">
      <TokenHeader token={token} price={token.price} />
      <div className="flex flex-1 overflow-hidden">
        <TokenChart token={token} />
        <TokenStats token={token} />
      </div>
      <TokenTabs token={token} price={token.price} />
    </div>
  );
}
