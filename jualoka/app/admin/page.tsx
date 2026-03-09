import { Sparkles } from "lucide-react"
import { getStoreOpenFromCookie } from "@/lib/storeActions"
import { StoreToggleCard } from "@/components/admin/StoreToggleCard"
import { TODAY, storeHealth } from "@/components/admin/dashboard/dashboardData"
import { KpiGrid } from "@/components/admin/dashboard/KpiGrid"
import { SalesChart } from "@/components/admin/dashboard/SalesChart"
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders"
import { ProductAnalysis } from "@/components/admin/dashboard/ProductAnalysis"
import { StoreHealth } from "@/components/admin/dashboard/StoreHealth"

// ---------------------------------------------------------------------------
// Page (Server Component)
// ---------------------------------------------------------------------------

export default async function AdminDashboard() {
    const isOpen = await getStoreOpenFromCookie()

    const healthScore = Math.round(
        (storeHealth.filter((h) => h.ok).length / storeHealth.length) * 100
    )

    return (
        <div className="flex flex-col gap-7">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Selamat Datang 👋</h1>
                    <p className="text-muted-foreground text-sm mt-1">{TODAY} · Berikut ringkasan toko Anda hari ini.</p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs bg-primary/10 text-primary font-semibold rounded-full px-3 py-1.5">
                    <Sparkles className="h-3 w-3" />
                    Data diperbarui otomatis
                </div>
            </div>

            {/* ── STORE TOGGLE ─────────────────────────────────────────────── */}
            <StoreToggleCard initialOpen={isOpen} />

            {/* KPI Grid */}
            <KpiGrid />

            {/* Chart + Quick Actions */}
            <SalesChart />

            {/* Recent Orders + Top Products + Store Health */}
            <div className="grid lg:grid-cols-3 gap-5">
                <RecentOrders />
                <ProductAnalysis />
                <StoreHealth healthScore={healthScore} />
            </div>
        </div>
    )
}
