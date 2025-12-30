"use client";
import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CandlestickData,
  UTCTimestamp,
  IChartApi,
  ISeriesApi,
  CandlestickSeries,
} from "lightweight-charts";
type Timeframe = "1s" | "1m" | "5m";
const BUCKET_SEC: Record<Timeframe, number> = {
  "1s": 1,
  "1m": 60,
  "5m": 300,
};
export default function CandlestickChart({
  price,
  timeframe,
}: {
  price: number;
  timeframe: Timeframe;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lastCandleRef = useRef<CandlestickData<UTCTimestamp> | null>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0b0f14" },
        textColor: "#9ca3af",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.04)" },
        horzLines: { color: "rgba(255,255,255,0.04)" },
      },
      rightPriceScale: {
        autoScale: true,
        borderVisible: false,
        scaleMargins: { top: 0.05, bottom: 0.05 },
      },
      timeScale: {
        borderVisible: false,
        barSpacing: 6,
        rightOffset: 3,
        fixLeftEdge: true,
        minBarSpacing: 4,
      },
      crosshair: {
        vertLine: { visible: true },
        horzLine: { visible: true },
      },
    });
    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      borderVisible: false,
      priceLineVisible: true,
      lastValueVisible: true,
    });
    chartRef.current = chart;
    seriesRef.current = series;
    const resize = () => {
      if (!containerRef.current) return;
      chart.applyOptions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, []);
  useEffect(() => {
    if (!seriesRef.current || !price) return;
    const now = Math.floor(Date.now() / 1000);
    const bucket = BUCKET_SEC[timeframe];
    const history: CandlestickData<UTCTimestamp>[] = [];
    let base = price;
    for (let i = 50; i > 0; i--) {
      const time = (now - i * bucket) as UTCTimestamp;
      const open = base + (Math.random() - 0.5) * 20;
      const close = open + (Math.random() - 0.5) * 20;
      const high = Math.max(open, close) + Math.random() * 10;
      const low = Math.min(open, close) - Math.random() * 10;
      history.push({ time, open, high, low, close });
      base = close;
    }
    seriesRef.current.setData(history);
    lastCandleRef.current = history.at(-1) ?? null;
    chartRef.current?.timeScale().fitContent();
  }, [price, timeframe]);
  useEffect(() => {
    if (!seriesRef.current || !price) return;
    const now = Math.floor(Date.now() / 1000);
    const bucket =
      Math.floor(now / BUCKET_SEC[timeframe]) * BUCKET_SEC[timeframe];
    const time = bucket as UTCTimestamp;
    const last = lastCandleRef.current;
    if (!last || last.time !== time) {
      const open = last ? last.close : price;
      const candle: CandlestickData<UTCTimestamp> = {
        time,
        open,
        high: price,
        low: price,
        close: price,
      };
      lastCandleRef.current = candle;
      seriesRef.current.update(candle);
      return;
    }
    const updated: CandlestickData<UTCTimestamp> = {
      ...last,
      high: Math.max(last.high, price),
      low: Math.min(last.low, price),
      close: price,
    };
    lastCandleRef.current = updated;
    seriesRef.current.update(updated);
  }, [price, timeframe]);
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
