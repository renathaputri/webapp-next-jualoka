import Link from "next/link"
import { TrendingUp, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PRODUCT_STATUS_CONFIG, PRODUCT_STATUS_FALLBACK } from "@/lib/productStatus"


export function ProductAnalysis({ data }: {
    data?: {
        topProducts: { name: string; sold: number; revenue: number; status: string; suggestion?: string }[]
    }
}) {
    const list = data?.topProducts || []

    return (
        <Card className="border-0 shadow-sm bg-white lg:col-span-1">
            <CardHeader className="px-5 pt-5 pb-3 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-sm font-semibold">Analisis Produk</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Top produk berdasarkan penjualan</p>
                </div>
                <Link href="/admin/products" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                    Kelola <ArrowUpRight className="h-3 w-3" />
                </Link>
            </CardHeader>
            <CardContent className="px-5 pb-5">
                <div className="flex flex-col gap-2.5">
                    {list.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-8 italic">Belum ada data penjualan.</p>
                    ) : list.map((p, i) => {
                        const statusCfg = PRODUCT_STATUS_CONFIG[p.status as keyof typeof PRODUCT_STATUS_CONFIG] ?? PRODUCT_STATUS_FALLBACK

                        return (
                            <div key={i} className="rounded-xl border border-border/50 bg-white p-3 hover:bg-zinc-50/50 transition-colors">
                                <div className="flex items-start gap-2.5">
                                    <div className={`h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${i === 0 ? "bg-amber-100 text-amber-600" : i === 1 ? "bg-slate-100 text-slate-500" : i === 2 ? "bg-orange-100 text-orange-600" : "bg-muted text-muted-foreground"}`}>
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-xs font-semibold leading-tight truncate">{p.name}</p>
                                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ring-1 ring-inset whitespace-nowrap ${statusCfg.pill}`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${statusCfg.bg} shrink-0`} />
                                                {p.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[11px] text-muted-foreground font-medium">{p.sold} terjual</span>
                                        </div>
                                        {p.suggestion && (
                                            <p className="text-[10px] text-muted-foreground mt-1.5 leading-snug bg-muted/50 p-1.5 rounded">
                                                💡 {p.suggestion}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
