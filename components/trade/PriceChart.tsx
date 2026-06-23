"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CandlestickSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from "lightweight-charts";
import { useOhlcv } from "@/lib/hooks";
import { cn } from "@/lib/format";

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"];

export default function PriceChart({ mint }: { mint: string }) {
  const [tf, setTf] = useState("15m");
  const { data, isLoading } = useOhlcv(mint, tf);
  const candles = useMemo(() => data?.candles ?? [], [data]);

  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  // Create chart once.
  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#8a97ab",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
      },
      grid: {
        vertLines: { color: "rgba(35,44,59,0.4)" },
        horzLines: { color: "rgba(35,44,59,0.4)" },
      },
      rightPriceScale: { borderColor: "#232c3b" },
      timeScale: { borderColor: "#232c3b", timeVisible: true, secondsVisible: false },
      crosshair: { mode: 0 },
      autoSize: true,
    });
    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#16c784",
      downColor: "#f6465d",
      borderUpColor: "#16c784",
      borderDownColor: "#f6465d",
      wickUpColor: "#16c784",
      wickDownColor: "#f6465d",
    });
    chartRef.current = chart;
    seriesRef.current = series;
    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  // Feed data.
  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData(
      candles.map((c) => ({
        time: c.time as UTCTimestamp,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }))
    );
    chartRef.current?.timeScale().fitContent();
  }, [candles]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 border-b border-border px-4 py-2">
        {TIMEFRAMES.map((f) => (
          <button
            key={f}
            onClick={() => setTf(f)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition",
              tf === f
                ? "bg-surface-3 text-foreground"
                : "text-muted hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="relative">
        <div ref={containerRef} className="h-[340px] w-full" />
        {!isLoading && candles.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
            No chart data available for this token.
          </div>
        )}
      </div>
    </div>
  );
}
