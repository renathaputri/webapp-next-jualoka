/**
 * In-memory registry for Server-Sent Events (SSE) streams.
 * Each connected admin holds a reference to a ReadableStreamDefaultController.
 * When a new order arrives, we notify all streams registered for that storeId.
 */

type SSEController = ReadableStreamDefaultController<Uint8Array>

const registry = new Map<string, Set<SSEController>>()

export function registerStream(storeId: string, controller: SSEController): () => void {
    if (!registry.has(storeId)) {
        registry.set(storeId, new Set())
    }
    registry.get(storeId)!.add(controller)

    // Return a cleanup function
    return () => {
        registry.get(storeId)?.delete(controller)
        if (registry.get(storeId)?.size === 0) {
            registry.delete(storeId)
        }
    }
}

export function notifyNewOrder(storeId: string, order: unknown) {
    const streams = registry.get(storeId)
    if (!streams || streams.size === 0) return

    const payload = `event: new_order\ndata: ${JSON.stringify(order)}\n\n`
    const encoded = new TextEncoder().encode(payload)

    for (const controller of streams) {
        try {
            controller.enqueue(encoded)
        } catch {
            // Stream is closed — remove it
            streams.delete(controller)
        }
    }
}
