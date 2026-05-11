import { NextResponse } from 'next/server';
import { marketService } from '@cuboid/domain-core';
import { globalEventBus } from '@cuboid/domain-core';

export const dynamic = 'force-dynamic';

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: unknown) => {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
        } catch {
          // Stream closed
        }
      };

      // Send initial snapshot
      marketService.getPublishedRates().then((rates) => {
        send({ type: 'INITIAL', rates });
      });

      // Subscribe to market events
      const unsubRate = globalEventBus.on('RATE_PUBLISHED', (event) => {
        send({ type: 'RATE_PUBLISHED', payload: event.payload });
      });

      const unsubSnapshot = globalEventBus.on('MARKET_SNAPSHOT_CREATED', (event) => {
        send({ type: 'MARKET_SNAPSHOT_CREATED', payload: event.payload });
      });

      // Heartbeat every 30s
      const heartbeat = setInterval(() => {
        send({ type: 'HEARTBEAT', timestamp: new Date().toISOString() });
      }, 30000);

      // Cleanup on close
      const cleanup = () => {
        unsubRate();
        unsubSnapshot();
        clearInterval(heartbeat);
      };

      // AbortSignal support
      if (typeof (globalThis as any).AbortController !== 'undefined') {
        // Next.js handles stream closure automatically
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
