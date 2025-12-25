import clsx from "clsx";
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-md bg-slate-800",
        "before:absolute before:inset-0",
        "before:-translate-x-full before:animate-[shimmer_1.2s_infinite]",
        "before:bg-linear-to-r before:from-transparent before:via-slate-700/60 before:to-transparent",
        className
      )}
    />
  );
}

