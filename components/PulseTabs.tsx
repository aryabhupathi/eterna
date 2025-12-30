"use client";
import clsx from "clsx";
type TabKey = "new" | "final" | "migrated";
const TABS: { key: TabKey; label: string }[] = [
{ key: "new", label: "New Pairs" },
{ key: "final", label: "Final Stretch" },
{ key: "migrated", label: "Migrated" },
];
export function PulseTabs({
active,
onChange,
}: {
active: TabKey;
onChange: (key: TabKey) => void;
}) {
return (
<>
  <div className="hidden md:flex items-center gap-4 text-sm">
    {TABS.map((tab) => (
      <button
        key={tab.key}
        onClick={() => onChange(tab.key)}
        className={clsx(
          "relative pb-1 transition-colors",
          active === tab.key
            ? "text-white"
            : "text-slate-400 hover:text-slate-200"
        )}
      >
        {tab.label}
        {active === tab.key && (
          <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-teal-400 rounded-full" />
        )}
      </button>
    ))}
  </div>
  <div className="md:hidden flex gap-2 overflow-x-auto scrollbar-none">
    {TABS.map((tab) => (
      <button
        key={tab.key}
        onClick={() => onChange(tab.key)}
        className={clsx(
          "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap",
          "transition-colors",
          active === tab.key
            ? "bg-teal-500/20 text-teal-300 border border-teal-400/30"
            : "bg-white/5 text-slate-400 border border-white/10"
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
</>
);
}
