import { UTCTimestamp, CandlestickData } from "lightweight-charts";
export function updateCandlesWithPrice(
  candles: CandlestickData<UTCTimestamp>[],
  price: number,
  bucketTime: UTCTimestamp
): CandlestickData<UTCTimestamp>[] {
  const last = candles[candles.length - 1];
  if (!last || last.time !== bucketTime) {
    return [
      ...candles,
      {
        time: bucketTime,
        open: price,
        high: price,
        low: price,
        close: price,
      },
    ];
  }
  return [
    ...candles.slice(0, -1),
    {
      ...last,
      high: Math.max(last.high, price),
      low: Math.min(last.low, price),
      close: price,
    },
  ];
}
