import { UTCTimestamp, CandlestickData } from "lightweight-charts";
export type Candle = CandlestickData<UTCTimestamp>;
export function getBucketTime(
  timestamp: number,
  intervalSec: number
): UTCTimestamp {
  return (Math.floor(timestamp / intervalSec) * intervalSec) as UTCTimestamp;
}
