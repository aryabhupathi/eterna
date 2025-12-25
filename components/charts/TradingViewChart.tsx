"use client";
import { useEffect, useRef } from "react";
declare global {
  interface Window {
    TradingView: any;
  }
}
export default function TradingViewChart({
  symbol,
  interval = "1",
}: {
  symbol: string;
  interval?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        autosize: true,
        symbol,
        interval,
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: false,
        container_id: containerRef.current!,
        backgroundColor: "#020617",
        gridColor: "rgba(148,163,184,0.05)",
        studies: [],
      });
    };
    document.body.appendChild(script);
  }, [symbol, interval]);
  return <div ref={containerRef} className="h-full w-full" />;
}
