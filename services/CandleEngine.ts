import { CandlestickData, UTCTimestamp } from "lightweight-charts";
export function generateInitialCandles(
  count = 80,
  startPrice = 1
): CandlestickData<UTCTimestamp>[] {
  const now = Math.floor(Date.now() / 1000);
  let price = startPrice;
  return Array.from({ length: count }).map((_, i) => {
    const open = price;
    const close = open * (1 + (Math.random() - 0.5) * 0.02);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    price = close;
    return {
      time: (now - (count - i) * 60) as UTCTimestamp,
      open,
      high,
      low,
      close,
    };
  });
}
export function updateCandle(
  candles: CandlestickData<UTCTimestamp>[],
  price: number,
  bucketTime: UTCTimestamp
) {
  const last = candles[candles.length - 1];
  if (last.time === bucketTime) {
    last.close = price;
    last.high = Math.max(last.high, price);
    last.low = Math.min(last.low, price);
    return [...candles.slice(0, -1), last];
  }
  return [
    ...candles,
    {
      time: bucketTime,
      open: last.close,
      high: price,
      low: price,
      close: price,
    },
  ].slice(-120);
}
