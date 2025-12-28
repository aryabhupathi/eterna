"use client";
import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  ISeriesApi,
  CandlestickData,
  UTCTimestamp,
} from "lightweight-charts";
export default function CandlestickChart({
  data,
}: {
  data: CandlestickData<UTCTimestamp>[];
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartApiRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick", UTCTimestamp> | null>(
    null
  );
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = createChart(chartRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#000000" },
        textColor: "#cbd5e1",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
      rightPriceScale: {
        borderColor: "#334155",
      },
      crosshair: { mode: 1 },
      height: 420,
    });
    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      borderVisible: false,
    });
    chartApiRef.current = chart;
    seriesRef.current = series;
    const resizeObserver = new ResizeObserver(() => {
      if (!chartRef.current) return;
      chart.applyOptions({
        width: chartRef.current.clientWidth,
      });
    });
    resizeObserver.observe(chartRef.current);
    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartApiRef.current = null;
      seriesRef.current = null;
    };
  }, []);
  useEffect(() => {
    if (!seriesRef.current) return;
    if (!data.length) return;
    seriesRef.current.setData(data);
  }, [data]);
  return <div ref={chartRef} className="w-full h-full min-h-[260px]" />;
}
