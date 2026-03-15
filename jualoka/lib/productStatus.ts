/**
 * lib/productStatus.ts
 *
 * Single source of truth for product performance status.
 * Used by both client components and server-side API routes.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProductStatus = "Laris" | "Stabil" | "Kurang Laku" | "Tidak Layak" | "Rugi" | "Baru"

export interface ProductStatusStyle {
    /** Dot / bar background color */
    bg: string
    /** Full pill class string (background + ring + text) */
    pill: string
}

// ─── Status Style Config ──────────────────────────────────────────────────────

export const PRODUCT_STATUS_CONFIG: Record<ProductStatus, ProductStatusStyle> = {
    "Laris": { bg: "bg-emerald-500", pill: "bg-emerald-50 ring-emerald-200 text-emerald-700" },
    "Stabil": { bg: "bg-blue-500", pill: "bg-blue-50 ring-blue-200 text-blue-700" },
    "Kurang Laku": { bg: "bg-amber-500", pill: "bg-amber-50 ring-amber-200 text-amber-700" },
    "Tidak Layak": { bg: "bg-rose-500", pill: "bg-rose-50 ring-rose-200 text-rose-700" },
    "Rugi": { bg: "bg-red-600", pill: "bg-red-50 ring-red-300 text-red-800" },
    "Baru": { bg: "bg-violet-500", pill: "bg-violet-50 ring-violet-200 text-violet-700" },
}

/** Fallback style for unknown / unmapped statuses */
export const PRODUCT_STATUS_FALLBACK: ProductStatusStyle = {
    bg: "bg-zinc-400",
    pill: "bg-zinc-50 ring-zinc-200 text-zinc-600",
}

// ─── Suggestion Copy ─────────────────────────────────────────────────────────

export const PRODUCT_SUGGESTIONS: Record<ProductStatus, string> = {
    "Laris": "Performa sangat baik. Pertimbangkan untuk meningkatkan margin atau bundel.",
    "Stabil": "Permintaan pasar stabil. Jaga ketersediaan stok.",
    "Kurang Laku": "Penjualan rendah. Buat promo khusus atau perbaiki deskripsi produk.",
    "Tidak Layak": "Penjualan sangat rendah. Perlu evaluasi relevansi produk.",
    "Rugi": "Total profit negatif. Evaluasi ulang harga jual atau biaya modal.",
    "Baru": "Produk baru. Maksimalkan promosi agar mendapatkan penjualan pertama.",
}

// ─── Needs-Attention Filter ───────────────────────────────────────────────────

/**
 * Statuses that indicate a product needs merchant attention.
 * Used by the "Butuh Perhatian" section in the analysis page.
 */
export const NEEDS_ATTENTION_STATUSES: ProductStatus[] = [
    "Kurang Laku",
    "Tidak Layak",
    "Rugi",
]

// ─── Status Computation ───────────────────────────────────────────────────────

export interface ProductForStatus {
    price: number
    cost: number | null
    /** Units sold in the relevant period */
    sold: number
    /** To determine if the product is new */
    createdAt?: Date | string | null
}

const NEW_PRODUCT_DAYS_THRESHOLD = 7

/**
 * Determines a product's performance status.
 *
 * @param product     - The product to evaluate.
 * @param allProducts - All products in the same store/period (used for percentile ranking).
 * @returns           - One of the {@link ProductStatus} string values.
 */
export function getProductStatus(
    product: ProductForStatus,
    allProducts: ProductForStatus[],
): ProductStatus {
    const actualCost = product.cost ?? 0
    const profitPerItem = product.price - actualCost
    const totalProfit = profitPerItem * product.sold

    // 1. Negative profit takes priority over percentile ranking
    if (product.price < actualCost || totalProfit < 0) return "Rugi"

    // 2. Check if product is "Baru" (0 sales + created recently)
    if (product.sold === 0 && product.createdAt) {
        const createdDate = typeof product.createdAt === 'string' ? new Date(product.createdAt) : product.createdAt
        const daysSinceCreation = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
        if (daysSinceCreation <= NEW_PRODUCT_DAYS_THRESHOLD) {
            return "Baru"
        }
    }

    if (allProducts.length === 0) return "Tidak Layak"

    // Rank by units sold (descending); lower index = higher sales
    const sortedBySold = [...allProducts].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))
    const index = sortedBySold.findIndex((p) => p.sold === product.sold)
    const percentile = index / allProducts.length

    if (percentile < 0.2) return "Laris"
    if (percentile < 0.6) return "Stabil"
    if (percentile < 0.9) return "Kurang Laku"
    return "Tidak Layak"
}
