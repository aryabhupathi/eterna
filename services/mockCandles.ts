import { CandlestickData, UTCTimestamp } from "lightweight-charts";
export function generateMockCandles(
  count = 80,
  startPrice = 1,
  intervalSec = 60
): CandlestickData<UTCTimestamp>[] {
  const candles: CandlestickData<UTCTimestamp>[] = [];
  let price = startPrice;
  let trend = Math.random() > 0.5 ? 1 : -1;
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.1) trend *= -1;
    const volatility = price * 0.01;
    const drift = trend * volatility * 0.3;
    const open = price;
    const close = open + drift + (Math.random() - 0.5) * volatility;
    const high = Math.max(open, close) + Math.random() * volatility * 0.6;
    const low = Math.min(open, close) - Math.random() * volatility * 0.6;
    const time = (Math.floor(Date.now() / 1000) -
      (count - i) * intervalSec) as UTCTimestamp;
    candles.push({
      time,
      open: +open.toFixed(5),
      high: +high.toFixed(5),
      low: +low.toFixed(5),
      close: +close.toFixed(5),
    });
    price = close;
  }
  return candles;
}
