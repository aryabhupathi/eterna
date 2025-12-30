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
type LiveToken = Token & {
  _lastUpdatedAt: number;
  _highlightTop?: boolean;
};
type TokenFilter = {
  search?: string;
  minMarketCap?: number;
};
const DEFAULT_SORT: SortState = { key: "price", order: "desc" };
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
  const defaultPresetByStage: Record<TokenStage, PresetKey> = {
    new: "P1",
    final: "P2",
    migrated: "P3",
  };
  const [preset, setPreset] = useState<PresetKey>(defaultPresetByStage[stage]);
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);
  const [filter, setFilter] = useState<TokenFilter>({});
  const [baseTokens, setBaseTokens] = useState<Token[]>([]);
  const [liveTokens, setLiveTokens] = useState<LiveToken[]>([]);
  useEffect(() => {
    if (!data?.length) return;
    setBaseTokens(data);
  }, [data]);
  const filteredTokens = useMemo(() => {
    if (!baseTokens.length) return [];
    let list = baseTokens.filter(PRESETS[preset]);
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
    return sortTokens(list, sort);
  }, [baseTokens, preset, sort, filter]);
  useEffect(() => {
    if (!filteredTokens.length) {
      setLiveTokens([]);
      return;
    }
    setLiveTokens((prev) => {
      const prevMap = new Map(prev.map((t) => [t.id, t]));
      return filteredTokens.map((t) => {
        const existing = prevMap.get(t.id);
        return (
          existing ?? {
            ...t,
            _lastUpdatedAt: Date.now(),
            _highlightTop: false,
          }
        );
      });
    });
  }, [filteredTokens]);
  useEffect(() => {
    if (!liveTokens.length) return;
    const interval = setInterval(() => {
      setLiveTokens((prev) => {
        const prevTopId = prev[0]?.id;
        let next = prev.map((t) => (Math.random() < 0.4 ? mutateToken(t) : t));
        next = [...next].sort((a, b) => b._lastUpdatedAt - a._lastUpdatedAt);
        const newTopId = next[0]?.id;
        if (newTopId && newTopId !== prevTopId) {
          next = next.map((t) =>
            t.id === newTopId
              ? { ...t, _highlightTop: true }
              : { ...t, _highlightTop: false }
          );
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [liveTokens.length]);
  useEffect(() => {
    if (!liveTokens.some((t) => t._highlightTop)) return;
    const timeout = setTimeout(() => {
      setLiveTokens((prev) =>
        prev.map((t) => (t._highlightTop ? { ...t, _highlightTop: false } : t))
      );
    }, 800);
    return () => clearTimeout(timeout);
  }, [liveTokens]);
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
        {!isLoading && !isError && liveTokens.length === 0 && <EmptyState />}
        {!isLoading &&
          !isError &&
          liveTokens.map((token) => <TokenRow key={token.id} token={token} />)}
      </div>
    </div>
  );
}
