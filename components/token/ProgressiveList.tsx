"use client";
import { JSX, useEffect, useState } from "react";
interface ProgressiveListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  intervalMs?: number;
}
export function ProgressiveList<T>({
  items,
  renderItem,
  intervalMs = 50,
}: ProgressiveListProps<T>) {
  const [visibleCount, setVisibleCount] = useState(items.length);
  useEffect(() => {
    if (!items.length) return;
    let i = 0;
    setVisibleCount(0);
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= items.length) clearInterval(interval);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [items, intervalMs]);
  return <div className="overflow-auto">{items.slice(0, visibleCount).map(renderItem)}</div>;
}
