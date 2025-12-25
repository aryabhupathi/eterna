"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SortKey } from "@/hooks/useTokenSorting";
const options: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "price", label: "Price" },
  { key: "volume", label: "Volume" },
];
export function SortPopover({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Sort
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-36">
        <div className="space-y-1">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => onChange(opt.key)}
              className={`block w-full text-left px-2 py-1 text-sm rounded
                ${
                  value === opt.key
                    ? "bg-slate-700 text-white"
                    : "hover:bg-slate-800 text-slate-300"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
