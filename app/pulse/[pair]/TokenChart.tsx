"use client";
import { useEffect, useRef, useState } from "react";
import { CandlestickData, UTCTimestamp } from "lightweight-charts";
import { Token } from "@/types/token";
import { getBucketTime } from "@/services/CandleUtils";
import CandlestickChart from "@/components/charts/CandleStickChart";
import { PRICE_SCALE } from "@/services/price";
const TIMEFRAMES = {
"1s": 1,
"1m": 60,
"5m": 300,
} as const;
type Timeframe = keyof typeof TIMEFRAMES;
export default function TokenChart({ token }: { token: Token }) {
const [tf, setTf] = useState<Timeframe>("1s");
const [candles, setCandles] = useState<CandlestickData<UTCTimestamp>[]>([]);
const ref = useRef<CandlestickData<UTCTimestamp>[]>([]);
useEffect(() => {
  if (!token.price) return;
  const now = Math.floor(Date.now() / 1000);
  const t = getBucketTime(now, TIMEFRAMES[tf]) as UTCTimestamp;
  const p = token.price / PRICE_SCALE;
  ref.current = [{ time: t, open: p, high: p, low: p, close: p }];
  setCandles([...ref.current]);
}, [token.id, tf]);
useEffect(() => {
  if (!ref.current.length) return;
  const now = Math.floor(Date.now() / 1000);
  const t = getBucketTime(now, TIMEFRAMES[tf]) as UTCTimestamp;
  const p = token.price / PRICE_SCALE;
  const last = ref.current[ref.current.length - 1];
  if (last.time === t) {
    last.high = Math.max(last.high, p);
    last.low = Math.min(last.low, p);
    last.close = p;
  } else {
    ref.current.push({
      time: t,
      open: last.close,
      high: p,
      low: p,
      close: p,
    });
    ref.current = ref.current.slice(-80);
  }
  setCandles([...ref.current]);
}, [token.price, tf]);
return (
  <div className="flex-1">
    <div className="h-9 px-3 flex gap-2">
      {(["1s", "1m", "5m"] as Timeframe[]).map((x) => (
        <button
          key={x}
          onClick={() => setTf(x)}
          className={tf === x ? "text-green-400" : ""}
        >
          {x}
        </button>
      ))}
    </div>
    <CandlestickChart data={candles} />
  </div>
);
}
