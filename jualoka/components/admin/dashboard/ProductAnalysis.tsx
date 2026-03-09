import Link from "next/link"
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { topProducts } from "./dashboardData"

export function ProductAnalysis() {
    return (
        <Card className="border-0 shadow-sm bg-white lg:col-span-1">
            <CardHeader className="px-5 pt-5 pb-3 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-sm font-semibold">Analisis Produk</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Performa & insight bulan ini</p>
                </div>
                <Link href="/admin/products" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                    Kelola <ArrowUpRight className="h-3 w-3" />
                </Link>
            </CardHeader>
            <CardContent className="px-5 pb-5">
                <div className="flex flex-col gap-2.5">
                    {topProducts.map((p, i) => {
                        const statusCfg = {
                            laris: { label: "🔥 Laris", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                            stabil: { label: "📊 Stabil", cls: "bg-blue-50 text-blue-700 border-blue-200" },
                            perhatian: { label: "⚠️ Perlu Perhatian", cls: "bg-amber-50 text-amber-700 border-amber-200" },
                        }[p.status]
                        return (
                            <div key={i} className={`rounded-xl border p-3 ${p.status === "perhatian" ? "border-amber-200 bg-amber-50/40" : "border-border/50 bg-white"}`}>
                                <div className="flex items-start gap-2.5">
                                    <div className={`h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 ${i === 0 ? "bg-amber-100 text-amber-600" : i === 1 ? "bg-slate-100 text-slate-500" : "bg-muted text-muted-foreground"}`}>
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <p className="text-xs font-semibold leading-tight">{p.name}</p>
                                            <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full border ${statusCfg.cls}`}>
                                                {statusCfg.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[11px] text-muted-foreground">{p.sold} terjual</span>
                                            <span className="text-[11px] text-muted-foreground">·</span>
                                            <span className="text-[11px] font-semibold text-foreground">Rp {(p.revenue / 1000).toFixed(0)}rb</span>
                                            <span className="ml-auto">
                                                {p.trend === "up"
                                                    ? <TrendingUp className="h-3 w-3 text-emerald-500" />
                                                    : <TrendingDown className="h-3 w-3 text-red-400" />
                                                }
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{p.insight}</p>
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
