"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { fetchTokensByStage } from "@/services/tokens.service";
import { Token, TokenStage } from "@/types/token";
import { PRESETS, PresetKey } from "@/types/presets";
import { SortState, sortTokens } from "@/types/sortTokens";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenRow } from "./TokenRow";
import { TokenColumnHeader } from "./TokenColumnHeader";
import { EmptyState } from "./EmptyState";
const DEFAULT_SORT: SortState = { key: "price", order: "desc" };
type TokenFilter = {
  search?: string;
  minMarketCap?: number;
};
type LiveToken = Token & {
  _lastUpdatedAt: number;
};
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function randomDelta(range: number) {
  return (Math.random() - 0.5) * range;
}
function mutateToken(token: LiveToken): LiveToken {
  const now = Date.now();
  const priceDelta = randomDelta(token.price * 0.015);
  const newPrice = clamp(token.price + priceDelta, 0, Infinity);
  const ratioDelta = randomDelta(0.05);
  const newBuyRatio = clamp(token.buyRatio + ratioDelta, 0.1, 0.9);
  return {
    ...token,
    price: Number(newPrice.toFixed(6)),
    buyRatio: Number(newBuyRatio.toFixed(2)),
    txRatio: newBuyRatio,
    txCount: token.txCount + Math.floor(Math.random() * 4),
    volume: token.volume + Math.floor(Math.random() * 1200),
    _lastUpdatedAt: now,
  };
}
export function TokenColumn({
  stage,
  title,
}: {
  stage: TokenStage;
  title: string;
}) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tokens", stage],
    queryFn: () => fetchTokensByStage(stage),
    staleTime: 10_000,
  });
  const [preset, setPreset] = useState<PresetKey>("P1");
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);
  const [filter, setFilter] = useState<TokenFilter>({});
  const [tokens, setTokens] = useState<Token[]>([]);
  useEffect(() => {
    if (data?.length) {
      setTokens(
        data.map((t) => ({
          ...t,
          _lastUpdatedAt: Date.now(),
        }))
      );
    }
  }, [data]);
  useEffect(() => {
    if (!tokens.length) return;
    const interval = setInterval(() => {
      setTokens((prev) => {
        let next = prev.map((t) => (Math.random() < 0.4 ? mutateToken(t) : t));
        next = [...next].sort((a, b) => b._lastUpdatedAt - a._lastUpdatedAt);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [tokens.length]);
  const visibleTokens = useMemo(() => {
    if (!tokens.length) return [];
    let list = tokens.filter(PRESETS[preset]);
    list = list.filter((t) => {
      if (
        filter.search &&
        !`${t.name} ${t.symbol}`
          .toLowerCase()
          .includes(filter.search.toLowerCase())
      ) {
        return false;
      }
      if (
        filter.minMarketCap !== undefined &&
        t.marketCap < filter.minMarketCap
      ) {
        return false;
      }
      return true;
    });
    return sortTokens(list.length ? list : tokens, sort);
  }, [tokens, preset, sort, filter]);
  return (
    <div
      className="
        flex flex-col h-full
        rounded-2xl
        border border-white/5
        bg-linear-to-b from-[#0f172a]/80 to-[#0b1220]/80
        backdrop-blur-sm
        overflow-hidden
      "
    >
      <TokenColumnHeader
        title={title}
        sort={sort}
        onChange={setSort}
        preset={preset}
        onPresetChange={setPreset}
        filter={filter}
        onFilterChange={setFilter}
      />
      <div
        className="
          flex-1 overflow-y-auto
          px-1 pb-1 space-y-1
          scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
        "
      >
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-[10px] bg-white/5" />
          ))}
        {isError && (
          <div className="text-xs text-red-400 px-2">
            Failed to load.
            <button onClick={() => refetch()} className="ml-2 underline">
              Retry
            </button>
          </div>
        )}
        {!isLoading && !isError && visibleTokens.length === 0 && <EmptyState />}
        {!isLoading &&
          !isError &&
          visibleTokens.map((token) => (
            <TokenRow key={token.id} token={token} />
          ))}
      </div>
    </div>
  );
}
