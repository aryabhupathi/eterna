"use client";
import clsx from "clsx";
import { PresetKey } from "@/types/presets";
import { SortState } from "@/types/sortTokens";
import { useState } from "react";
import { TokenFilter } from "@/types/token";
export function TokenColumnHeader({
  title,
  sort,
  onChange,
  preset,
  onPresetChange,
  filter,
  onFilterChange,
}: {
  title: string;
  sort: SortState;
  onChange: (s: SortState) => void;
  preset: PresetKey;
  onPresetChange: (p: PresetKey) => void;
  filter: TokenFilter;
  onFilterChange: (f: TokenFilter) => void;
}) {
  const [open, setOpen] = useState(false);
  const toggleMarketCapSort = () => {
    onChange({
      key: "marketCap",
      order: sort.order === "asc" ? "desc" : "asc",
    });
  };
  return (
    <div className="border-b border-slate-800">
      {/* ================= HEADER ROW ================= */}
      <div className="flex items-center justify-between px-3 py-1.5">
        <div className="flex items-center gap-1">
          <span className="text-[13px] font-semibold">{title}</span>
          <span className="flex items-center gap-1 text-[10px] text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.8)]" />
            LIVE
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Presets */}
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
          {/* Sort */}
          <button
            onClick={toggleMarketCapSort}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            MC {sort.order === "asc" ? "↑" : "↓"}
          </button>
          {/* Filter toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={clsx(
              "text-xs px-1.5 rounded",
              open ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
            )}
          >
            Filter
          </button>
        </div>
      </div>
      {/* ================= FILTER ROW ================= */}
      {open && (
        <div className="px-3 py-2 bg-slate-900/60 flex gap-2 items-center text-xs">
          {/* Search */}
          <input
            placeholder="Search token…"
            value={filter.search ?? ""}
            onChange={(e) =>
              onFilterChange({ ...filter, search: e.target.value })
            }
            className="
              flex-1
              bg-black border border-white/10
              px-2 py-1 rounded
              outline-none
              focus:border-emerald-400
            "
          />
          {/* Min Market Cap */}
          <input
            type="number"
            placeholder="Min MC"
            value={filter.minMarketCap ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                minMarketCap: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="
              w-24
              bg-black border border-white/10
              px-2 py-1 rounded
              outline-none
              focus:border-emerald-400
            "
          />
          {/* Clear */}
          <button
            onClick={() => onFilterChange({})}
            className="text-slate-400 hover:text-slate-200"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
