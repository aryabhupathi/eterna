  "use client";
  import { Fragment, JSX, useEffect, useState } from "react";
  interface ProgressiveListProps<T extends { id: string }> {
    items: T[];
    renderItem: (item: T, index: number) => JSX.Element;
    intervalMs?: number;
  }
  export function ProgressiveList<T extends { id: string }>({
    items,
    renderItem,
    intervalMs = 50,
  }: ProgressiveListProps<T>) {
    const [visibleCount, setVisibleCount] = useState(0);
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
    return (
      <>
        {items.slice(0, visibleCount).map((item, index) => (
          <Fragment key={item.id}>{renderItem(item, index)}</Fragment>
        ))}
      </>
    );
  }
