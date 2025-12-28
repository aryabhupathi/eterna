"use client";

import { useState, useCallback } from "react";
import { Trade } from "@/types/trade";

export function useTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);

  const addTrade = useCallback((t: Omit<Trade, "id">) => {
    setTrades((prev) => [
      {
        ...t,
        id: crypto.randomUUID(),
      },
      ...prev,
    ]);
  }, []);

  return { trades, addTrade };
}
