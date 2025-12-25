"use client";
import clsx from "clsx";
import { SortState } from "@/types/sort";
import { PresetKey } from "@/types/presets";
export function TokenColumnHeader({
  title,
  sort,
  onChange,
  preset,
  onPresetChange,
}: {
  title: string;
  sort: SortState;
  onChange: (s: SortState) => void;
  preset: PresetKey;
  onPresetChange: (p: PresetKey) => void;
}) {
  const toggleMarketCapSort = () => {
    onChange({
      key: "marketCap",
      order: sort.order === "asc" ? "desc" : "asc",
    });
  };
  return (
    <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-slate-400">
          LIVE
        </span>
      </div>
      <div className="flex items-center gap-2">
        {(["P1", "P2", "P3"] as PresetKey[]).map((p) => (
          <button
            key={p}
            onClick={() => onPresetChange(p)}
            className={clsx(
              "rounded px-2 py-0.5 text-xs transition",
              preset === p
                ? "bg-blue-500/20 text-blue-400"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            {p}
          </button>
        ))}
        <button
          onClick={toggleMarketCapSort}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          MC {sort.order === "asc" ? "↑" : "↓"}
        </button>
      </div>
    </div>
  );
}
