"use client";
import clsx from "clsx";
import { PresetKey } from "@/types/presets";
import { SortState } from "@/types/sortTokens";
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
    <div className="flex items-center justify-between border-b border-slate-800 px-3 py-1.5">
      <div className="flex items-center gap-1">
        <span className="text-[13px] font-semibold">{title}</span>
        <span className="flex items-center gap-1 text-[10px] text-teal-400">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.8)]" />
          LIVE
        </span>
      </div>
      <div className="flex items-center gap-2">
        {(["P1", "P2", "P3"] as PresetKey[]).map((p) => (
          <button
            key={p}
            onClick={() => onPresetChange(p)}
            className={clsx(
              "px-1.5 text-[11px] transition",
              preset === p
                ? "text-blue-400"
                : "text-slate-500 hover:text-slate-300"
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
