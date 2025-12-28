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
    if (!data || data.length === 0) return [];
    const p1 = data.filter(PRESETS.P1);
    const p2 = data.filter(PRESETS.P2);
    const p3 = data.filter(PRESETS.P3);
    const filtered = data.filter(PRESETS[preset]);
    return sortTokens(filtered.length ? filtered : data, sort);
  }, [data, preset, sort, stage]);
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
      />
      <div
        className="
  flex-1 overflow-y-auto
  px-1 pb-1
  space-y-1
  scrollbar-thin
  scrollbar-thumb-white/10
  scrollbar-track-transparent
"
      >
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-[10px] bg-white/5" />
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
