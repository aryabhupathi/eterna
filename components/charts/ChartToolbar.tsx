export default function ChartToolbar() {
  return (
    <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-800 text-xs">
      {["1s", "1m", "5m", "1d"].map((t) => (
        <button key={t} className="px-2 py-1 hover:bg-slate-800 rounded">
          {t}
        </button>
      ))}
      <div className="ml-auto flex gap-2">
        <button>Indicators</button>
        <button>⚙️</button>
      </div>
    </div>
  );
}
