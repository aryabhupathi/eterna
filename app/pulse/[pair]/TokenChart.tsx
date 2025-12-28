// "use client";
// import { useEffect, useRef, useState } from "react";
// import { CandlestickData, UTCTimestamp } from "lightweight-charts";
// import { Token } from "@/types/token";
// import { getBucketTime } from "@/services/CandleUtils";
// import CandlestickChart from "@/components/charts/CandleStickChart";
// import { PRICE_SCALE } from "@/services/price";
// const TIMEFRAMES = {
// "1s": 1,
// "1m": 60,
// "5m": 300,
// } as const;
// type Timeframe = keyof typeof TIMEFRAMES;
// export default function TokenChart({ token }: { token: Token }) {
// const [tf, setTf] = useState<Timeframe>("1s");
// const [candles, setCandles] = useState<CandlestickData<UTCTimestamp>[]>([]);
// const ref = useRef<CandlestickData<UTCTimestamp>[]>([]);
// useEffect(() => {
//   if (!token.price) return;
//   const now = Math.floor(Date.now() / 1000);
//   const t = getBucketTime(now, TIMEFRAMES[tf]) as UTCTimestamp;
//   const p = token.price / PRICE_SCALE;
//   ref.current = [{ time: t, open: p, high: p, low: p, close: p }];
//   setCandles([...ref.current]);
// }, [token.id, tf]);
// useEffect(() => {
//   if (!ref.current.length) return;
//   const now = Math.floor(Date.now() / 1000);
//   const t = getBucketTime(now, TIMEFRAMES[tf]) as UTCTimestamp;
//   const p = token.price / PRICE_SCALE;
//   const last = ref.current[ref.current.length - 1];
//   if (last.time === t) {
//     last.high = Math.max(last.high, p);
//     last.low = Math.min(last.low, p);
//     last.close = p;
//   } else {
//     ref.current.push({
//       time: t,
//       open: last.close,
//       high: p,
//       low: p,
//       close: p,
//     });
//     ref.current = ref.current.slice(-80);
//   }
//   setCandles([...ref.current]);
// }, [token.price, tf]);
// return (
//   <div className="flex-1">
//     <div className="h-9 px-3 flex gap-2">
//       {(["1s", "1m", "5m"] as Timeframe[]).map((x) => (
//         <button
//           key={x}
//           onClick={() => setTf(x)}
//           className={tf === x ? "text-green-400" : ""}
//         >
//           {x}
//         </button>
//       ))}
//     </div>
//     <CandlestickChart data={candles} />
//   </div>
// );
// }


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

  /* -------- RESET ON TOKEN / TF CHANGE -------- */
  useEffect(() => {
    if (!token.price) return;

    const now = Math.floor(Date.now() / 1000);
    const t = getBucketTime(now, TIMEFRAMES[tf]) as UTCTimestamp;
    const p = token.price / PRICE_SCALE;

    ref.current = [
      { time: t, open: p, high: p, low: p, close: p },
    ];

    setCandles([...ref.current]);
  }, [token.id, tf]);

  /* -------- LIVE PRICE UPDATE -------- */
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
      ref.current = ref.current.slice(-120); // Axiom keeps more bars
    }

    setCandles([...ref.current]);
  }, [token.price, tf]);

  return (
    <div className="flex-1 flex flex-col bg-black">
      {/* TOOLBAR */}
      <div className="h-9 px-3 flex items-center gap-3 border-b border-white/5 text-xs">
        {(["1s", "1m", "5m"] as Timeframe[]).map((x) => (
          <button
            key={x}
            onClick={() => setTf(x)}
            className={`px-2 py-1 rounded ${
              tf === x
                ? "text-green-400 bg-green-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {x}
          </button>
        ))}

        {/* RIGHT CONTROLS PLACEHOLDER */}
        <div className="ml-auto text-slate-500">USD / BNB</div>
      </div>

      {/* CHART */}
      <div className="flex-1">
        {/* <CandlestickChart data={candles} /> */}
        <CandlestickChart data={candles} timeframe={tf} />

      </div>
    </div>
  );
}
