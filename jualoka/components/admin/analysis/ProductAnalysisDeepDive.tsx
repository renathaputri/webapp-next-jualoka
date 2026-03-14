"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    PRODUCT_STATUS_CONFIG,
    PRODUCT_STATUS_FALLBACK,
    NEEDS_ATTENTION_STATUSES,
} from "@/lib/productStatus"

interface Product {
    name: string
    sold: number
    status: string
    suggestion?: string
}

interface ProductAnalysisDeepDiveProps {
    top: Product[]
    worst: Product[]
    periodLabel: string
}

function ProductRow({ product, rank, isWorst = false }: { product: Product; rank: number; isWorst?: boolean }) {
    const cfg = PRODUCT_STATUS_CONFIG[product.status as keyof typeof PRODUCT_STATUS_CONFIG] ?? PRODUCT_STATUS_FALLBACK

    return (
        <div className="bg-white border border-zinc-100 rounded-xl px-3.5 py-2.5 flex items-center gap-3 hover:border-zinc-200 hover:shadow-sm transition-all">
            <span className={cn("h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0",
                isWorst ? "bg-rose-100 text-rose-600" : "bg-zinc-100 text-zinc-500"
            )}>{rank}</span>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-zinc-800 truncate">{product.name}</p>
                <div className="flex items-center gap-2 mb-1">
                    <p className="text-[10px] font-medium text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">{product.sold} terjual</p>
                </div>
                {product.suggestion && (
                    <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">💡 {product.suggestion}</p>
                )}
            </div>
            {/* Pill badge — shared style from @/lib/productStatus */}
            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ring-1 ring-inset whitespace-nowrap shrink-0", cfg.pill)}>
                <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", cfg.bg)} />
                {product.status}
            </span>
        </div>
    )
}

export function ProductAnalysisDeepDive({ top, worst, periodLabel }: ProductAnalysisDeepDiveProps) {
    // Only show products that genuinely need attention: Kurang Laku, Tidak Layak, or Rugi
    const needsAttention = worst.filter(p =>
        NEEDS_ATTENTION_STATUSES.includes(p.status as (typeof NEEDS_ATTENTION_STATUSES)[number])
    )

    const topWithSales = top.filter((p) => p.sold > 0)

    return (
        <Card className="border border-zinc-100 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-white px-6 pt-5 pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-amber-100 flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                        <CardTitle className="text-sm font-bold text-zinc-900">Analisis Performa Produk</CardTitle>
                        <CardDescription className="text-xs">Berdasarkan kuantitas terjual dalam {periodLabel} terakhir</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Top Performer */}
                    <div className="p-6 border-b md:border-b-0 md:border-r border-zinc-100">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="h-4 w-4 text-emerald-500 shrink-0" />
                            <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-600">Top Performer</h3>
                        </div>
                        <div className="space-y-2">
                            {topWithSales.length === 0 ? (
                                <p className="text-xs text-zinc-400 italic py-4 text-center">Belum ada data penjualan di periode ini.</p>
                            ) : topWithSales.map((p, i) => (
                                <ProductRow key={i} product={p} rank={i + 1} />
                            ))}
                        </div>
                    </div>

                    {/* Butuh Perhatian — only Kurang Laku / Tidak Layak / Rugi */}
                    <div className="p-6 bg-zinc-50/50">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingDown className="h-4 w-4 text-rose-500 shrink-0" />
                            <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-500">Butuh Perhatian</h3>
                        </div>
                        <div className="space-y-2">
                            {needsAttention.length === 0 ? (
                                <p className="text-xs text-zinc-400 italic py-4 text-center">Semua produk dalam kondisi baik. </p>
                            ) : needsAttention.map((p, i) => (
                                <ProductRow key={i} product={p} rank={i + 1} isWorst />
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
