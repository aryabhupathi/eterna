  // "use client";
  // import { useEffect, useRef } from "react";
  // import {
  //   createChart,
  //   ColorType,
  //   CandlestickSeries,
  //   ISeriesApi,
  //   CandlestickData,
  //   UTCTimestamp,
  // } from "lightweight-charts";
  // export default function CandlestickChart({
  //   data,
  // }: {
  //   data: CandlestickData<UTCTimestamp>[];
  // }) {
  //   const chartRef = useRef<HTMLDivElement>(null);
  //   const chartApiRef = useRef<ReturnType<typeof createChart> | null>(null);
  //   const seriesRef = useRef<ISeriesApi<"Candlestick", UTCTimestamp> | null>(
  //     null
  //   );
  //   useEffect(() => {
  //     if (!chartRef.current) return;
  //     const chart = createChart(chartRef.current, {
  //       layout: {
  //         background: { type: ColorType.Solid, color: "#000000" },
  //         textColor: "#cbd5e1",
  //       },
  //       grid: {
  //         vertLines: { color: "#1e293b" },
  //         horzLines: { color: "#1e293b" },
  //       },
  //       timeScale: {
  //         timeVisible: true,
  //         secondsVisible: true,
  //       },
  //       rightPriceScale: {
  //         borderColor: "#334155",
  //       },
  //       crosshair: { mode: 1 },
  //       height: 420,
  //     });
  //     const series = chart.addSeries(CandlestickSeries, {
  //       upColor: "#22c55e",
  //       downColor: "#ef4444",
  //       wickUpColor: "#22c55e",
  //       wickDownColor: "#ef4444",
  //       borderVisible: false,
  //     });
  //     chartApiRef.current = chart;
  //     seriesRef.current = series;
  //     const resizeObserver = new ResizeObserver(() => {
  //       if (!chartRef.current) return;
  //       chart.applyOptions({
  //         width: chartRef.current.clientWidth,
  //       });
  //     });
  //     resizeObserver.observe(chartRef.current);
  //     return () => {
  //       resizeObserver.disconnect();
  //       chart.remove();
  //       chartApiRef.current = null;
  //       seriesRef.current = null;
  //     };
  //   }, []);
  //   useEffect(() => {
  //     if (!seriesRef.current) return;
  //     if (!data.length) return;
  //     seriesRef.current.setData(data);
  //   }, [data]);
  //   return <div ref={chartRef} className="w-full h-full min-h-[260px]" />;
  // }


// "use client";

// import { useEffect, useRef } from "react";
// import {
//   createChart,
//   ColorType,
//   CrosshairMode,
//   CandlestickData,
//   Time,
//   ISeriesApi,
//   CandlestickSeries,
// } from "lightweight-charts";

// export default function CandlestickChart({
//   data,
// }: {
//   data: CandlestickData<Time>[];
// }) {
//   const chartRef = useRef<HTMLDivElement>(null);
//   const chartApiRef = useRef<ReturnType<typeof createChart> | null>(null);
//   const seriesRef =
//     useRef<ISeriesApi<"Candlestick", Time> | null>(null);

//   useEffect(() => {
//     if (!chartRef.current) return;

//     const chart = createChart(chartRef.current, {
//       layout: {
//         background: { type: ColorType.Solid, color: "#0b0f14" },
//         textColor: "#94a3b8",
//       },
//       grid: {
//         vertLines: { color: "#1e293b" },
//         horzLines: { color: "#1e293b" },
//       },
//       crosshair: { mode: CrosshairMode.Normal },
//       rightPriceScale: {
//         borderColor: "#1e293b",
//         scaleMargins: { top: 0.15, bottom: 0.15 },
//       },
//       timeScale: {
//         timeVisible: true,
//         secondsVisible: true,
//         rightOffset: 8,
//         barSpacing: 6,
//         fixLeftEdge: true,
//         borderColor: "#1e293b",
//       },
//       height: 420,
//     });

//     const series = chart.addSeries(CandlestickSeries, {
//       upColor: "#22c55e",
//       downColor: "#ef4444",
//       wickUpColor: "#22c55e",
//       wickDownColor: "#ef4444",
//       borderVisible: false,
//       priceLineVisible: true,
//       lastValueVisible: true,
//     });

//     chartApiRef.current = chart;
//     seriesRef.current = series;

//     const ro = new ResizeObserver(() => {
//       if (!chartRef.current) return;
//       chart.applyOptions({ width: chartRef.current.clientWidth });
//     });

//     ro.observe(chartRef.current);

//     return () => {
//       ro.disconnect();
//       chart.remove();
//     };
//   }, []);

//   useEffect(() => {
//     if (!seriesRef.current || !data.length) return;
//     seriesRef.current.setData(data);
//     chartApiRef.current?.timeScale().scrollToRealTime();
//   }, [data]);

//   return <div ref={chartRef} className="w-full h-full min-h-80" />;
// }

"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CrosshairMode,
  CandlestickData,
  Time,
  ISeriesApi,
  CandlestickSeries,
} from "lightweight-charts";

type Timeframe = "1s" | "1m" | "5m";

export default function CandlestickChart({
  data,
  timeframe,
}: {
  data: CandlestickData<Time>[];
  timeframe: Timeframe;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartApiRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick", Time> | null>(null);

  /* ---------- INIT ---------- */
  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0b0f14" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: {
        borderColor: "#1e293b",
        scaleMargins: { top: 0.15, bottom: 0.15 },
      },
      height: 420,
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

    chartApiRef.current = chart;
    seriesRef.current = series;

    const ro = new ResizeObserver(() => {
      if (!chartRef.current) return;
      chart.applyOptions({ width: chartRef.current.clientWidth });
    });

    ro.observe(chartRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, []);

  /* ---------- TIMEFRAME-BASED CHART OPTIONS ---------- */
  useEffect(() => {
    if (!chartApiRef.current) return;

    const tfOptions =
      timeframe === "1s"
        ? {
            timeScale: {
              secondsVisible: true,
              timeVisible: true,
              barSpacing: 3,
              rightOffset: 2,
            },
          }
        : timeframe === "1m"
        ? {
            timeScale: {
              secondsVisible: false,
              timeVisible: true,
              barSpacing: 6,
              rightOffset: 6,
            },
          }
        : {
            timeScale: {
              secondsVisible: false,
              timeVisible: true,
              barSpacing: 10,
              rightOffset: 10,
            },
          };

    chartApiRef.current.applyOptions(tfOptions);
  }, [timeframe]);

  /* ---------- DATA UPDATE ---------- */
  useEffect(() => {
    if (!seriesRef.current || !data.length) return;
    seriesRef.current.setData(data);
    chartApiRef.current?.timeScale().scrollToRealTime();
  }, [data]);

  return <div ref={chartRef} className="w-full h-full min-h-[320px]" />;
}
