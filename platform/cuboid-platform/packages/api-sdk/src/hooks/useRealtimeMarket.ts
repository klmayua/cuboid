"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

export interface PublishedRate {
  pairId: string;
  symbol: string;
  cuboidBuy: number;
  cuboidSell: number;
  cuboidMidpoint: number;
  spread: number;
  bestBid: number;
  bestOffer: number;
  confidence: number;
  liquidityScore: number;
  volatility: number;
  sourceCount: number;
  changePercent: number;
  trend: 'UP' | 'DOWN' | 'FLAT';
  liquidityDepth: number;
  publishedAt: Date;
}

export function useRealtimeMarket(tickerUrl: string = '/api/market/ticker', streamUrl: string = '/api/market/stream') {
  const [rates, setRates] = useState<PublishedRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const fetchInitial = useCallback(async () => {
    try {
      const res = await fetch(tickerUrl);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRates(json.data);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [tickerUrl]);

  useEffect(() => {
    fetchInitial();

    // Try SSE
    try {
      const es = new EventSource(streamUrl);
      eventSourceRef.current = es;

      es.onopen = () => setConnected(true);

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'INITIAL' && Array.isArray(data.rates)) {
            setRates(data.rates);
          }
          if (data.type === 'MARKET_SNAPSHOT_CREATED' && data.payload) {
            setRates((prev) => {
              const idx = prev.findIndex((r) => r.pairId === data.payload.pairId);
              if (idx === -1) return prev;
              const next = [...prev];
              next[idx] = { ...next[idx], ...data.payload };
              return next;
            });
          }
        } catch {
          // ignore parse errors
        }
      };

      es.onerror = () => {
        setConnected(false);
        // Reconnect handled by EventSource automatically
      };
    } catch {
      // SSE not supported, fallback to polling every 15s
      const interval = setInterval(fetchInitial, 15000);
      return () => clearInterval(interval);
    }

    return () => {
      eventSourceRef.current?.close();
    };
  }, [fetchInitial, streamUrl]);

  return { rates, loading, error, connected };
}
