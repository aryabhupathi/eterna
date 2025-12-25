"use client";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchTokensByStage } from "@/services/tokens.service";
import { TokenStage } from "@/types/token";
import { SortState } from "@/types/sort";
import { PRESETS, PresetKey } from "@/types/presets";
import { sortTokens } from "@/types/sortTokens";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenRow } from "./TokenRow";
import { TokenColumnHeader } from "./TokenColumnHeader";
import { ProgressiveList } from "./ProgressiveList";
import { EmptyState } from "./EmptyState";
const DEFAULT_SORT: SortState = {
  key: "price",
  order: "desc",
};
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
  });
  const [preset, setPreset] = useState<PresetKey>("P1");
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);
  const visibleTokens = useMemo(() => {
    if (!data) return [];
    const base = data.filter(PRESETS[preset]);
    const final =
      base.length === 0 && preset === "P1" ? data.filter(PRESETS.P2) : base;
    return sortTokens(final, sort);
  }, [data, preset, sort]);
  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-800 bg-linear-to-b from-slate-900/90 to-slate-900/50 backdrop-blur overflow-auto">
      <TokenColumnHeader
        title={title}
        sort={sort}
        onChange={setSort}
        preset={preset}
        onPresetChange={setPreset}
      />
      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-24 w-full rounded-xl bg-slate-800/60"
            />
          ))}
        {isError && (
          <div className="text-xs text-red-400 px-2">
            Failed to load.
            <button className="ml-2 underline" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}
        {!isLoading && !isError && visibleTokens.length === 0 && <EmptyState />}
        {!isLoading && !isError && visibleTokens.length > 0 && (
          <ProgressiveList
            items={visibleTokens}
            renderItem={(token) => <TokenRow key={token.id} token={token} />}
          />
        )}
      </div>
    </div>
  );
}
