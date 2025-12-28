import { UTCTimestamp } from "lightweight-charts";
export function getBucketTime(nowSec: number, interval: number): UTCTimestamp {
  return (Math.floor(nowSec / interval) * interval) as UTCTimestamp;
}
