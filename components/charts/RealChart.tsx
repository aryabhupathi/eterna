"use client";
import { useEffect, useRef, useState } from "react";
import {
  ColorType,
  createChart,
  LineSeries,
  UTCTimestamp,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
interface RealTimeChartProps {
  symbol: string;
  pair: string;
}
export default function RealTimeChart({ symbol, pair }: RealTimeChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    if (!pair) return;
    const normalizedPair = pair.toLowerCase().trim();
    if (!/^[a-z0-9]+$/.test(normalizedPair)) {
      console.error("Invalid trading pair:", pair);
      return;
    }
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 240,
      layout: {
        background: {
          type: ColorType.Solid,
          color: "#0f172a",
        },
        textColor: "#cbd5f5",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
      crosshair: { mode: 0 },
      timeScale: {
        borderColor: "#334155",
        timeVisible: true,
        secondsVisible: false,
      },
    });
    const lineSeries = chart.addSeries(LineSeries, {
      color: "#3b82f6",
      lineWidth: 2,
      priceFormat: {
        type: "price",
        precision: 2,
        minMove: 0.01,
      },
    });
    chartRef.current = chart;
    seriesRef.current = lineSeries;
    if (wsRef.current) {
      wsRef.current.close();
    }
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${normalizedPair}@trade`
    );
    ws.onopen = () => {
      console.log("WebSocket connected:", normalizedPair);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const tradePrice = Number(data.p);
      const tradeTime = Math.floor(data.T / 1000) as UTCTimestamp;
      setPrice((prev) => {
        if (prev !== null && seriesRef.current) {
          seriesRef.current.applyOptions({
            color: tradePrice >= prev ? "#22c55e" : "#ef4444",
          });
        }
        return tradePrice;
      });
      seriesRef.current?.update({
        time: tradeTime,
        value: tradePrice,
      });
    };
    ws.onerror = (e) => {
      console.warn("WebSocket error:", normalizedPair, e);
    };
    ws.onclose = () => {
      console.log("WebSocket closed:", normalizedPair);
    };
    wsRef.current = ws;
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !chartRef.current) return;
      chartRef.current.applyOptions({
        width: containerRef.current.clientWidth,
      });
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
      ws.close();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
      wsRef.current = null;
    };
  }, [pair, symbol]);
  return (
    <div className="w-full">
      {price !== null && (
        <div className="mb-1 text-right text-sm text-slate-300">
          {symbol}: $
          {price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          })}
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-60 rounded-lg border border-slate-800"
      />
    </div>
  );
}
