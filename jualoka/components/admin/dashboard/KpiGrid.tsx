import { Card, CardContent } from "@/components/ui/card"
import { kpis } from "./dashboardData"

export function KpiGrid() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kpis.map((kpi, i) => (
                <Card key={i} className={`border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white overflow-hidden ${kpi.accent}`}>
                    <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                            <div className={`p-2 rounded-xl ${kpi.color}`}>
                                <kpi.icon className="h-4 w-4" />
                            </div>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${kpi.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                                {kpi.positive ? "▲" : "▼"} {kpi.change}
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{kpi.title}</p>
                            <p className="text-2xl font-bold mt-1 leading-tight">{kpi.value}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
