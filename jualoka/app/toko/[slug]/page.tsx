import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    getBannerConfig,
    THEME_GRADIENTS,
    BannerConfig,
} from "@/lib/bannerStore"
import { getStoreOpenFromCookie } from "@/lib/storeActions"
import { ProductGrid } from "@/components/toko/ProductGrid"

// Always read fresh cookie on every request — no caching
export const dynamic = "force-dynamic"


function StoreBanner({ config }: { config: BannerConfig }) {
    if (!config.enabled) return null

    const gradient =
        config.theme === "custom"
            ? config.customGradient
            : THEME_GRADIENTS[config.theme]

    const titleLines = config.title.split("\n")

    return (
        <div
            className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${gradient} p-8 sm:p-12 text-white shadow-xl ${config.layout === "center" ? "text-center" : "text-left"}`}
        >
            {config.imageUrl && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${config.imageUrl}')`,
                        opacity: config.imageOpacity / 100,
                    }}
                />
            )}
            <div className={`relative z-10 ${config.layout === "center" ? "max-w-lg mx-auto" : "max-w-lg"}`}>
                {config.badge && (
                    <div className="inline-flex items-center gap-2 bg-secondary text-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                        <Star className="h-3 w-3 fill-current" />
                        {config.badge}
                    </div>
                )}
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
                    {titleLines.map((line, i) => (
                        <span key={i}>
                            {line}
                            {i < titleLines.length - 1 && <br />}
                        </span>
                    ))}
                </h1>
                {config.description && (
                    <p className="text-white/80 text-sm sm:text-base">{config.description}</p>
                )}
            </div>
        </div>
    )
}

const storeProducts = [
    {
        id: "1",
        name: "Keripik Singkong Pedas Gila",
        price: 15000,
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=600&auto=format&fit=crop",
        description: "Keripik singkong dengan tingkat kepedasan maksimal. Cocok untuk cemilan santai.",
        tag: "Terlaris",
    },
    {
        id: "2",
        name: "Seblak Instan Komplit",
        price: 12000,
        image: "https://images.unsplash.com/photo-1606399432608-8df0f4d38ca4?q=80&w=600&auto=format&fit=crop",
        description: "Seblak instan dengan isian kerupuk, sosis, makaroni, dan bumbu rempah khas.",
        tag: null,
    },
    {
        id: "3",
        name: "Kopi Gula Aren Literan",
        price: 65000,
        image: "https://images.unsplash.com/photo-1514432324607-a151f5445204?q=80&w=600&auto=format&fit=crop",
        description: "Kopi susu gula aren botol 1 Liter. Tahan 3 hari di kulkas.",
        tag: "Favorit",
    },
    {
        id: "4",
        name: "Cireng Isi Ayam Suwir",
        price: 18000,
        image: "https://images.unsplash.com/photo-1626082895617-2c6ad2e2f69e?q=80&w=600&auto=format&fit=crop",
        description: "Cireng renyah dengan isian ayam suwir pedas manis isi 10 pcs.",
        tag: null,
    },
]

export default async function StorePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    await params

    const isOpen = await getStoreOpenFromCookie()
    const closedMessage = "Toko sedang tutup sementara. Kami akan segera kembali! 🙏"


    return (
        <div className="flex flex-col gap-10">
            {/* Hero Banner */}
            <StoreBanner config={getBannerConfig()} />

            {/* ── CLOSED OVERLAY ─────────────────────────────────────────── */}
            {!isOpen && (
                <div className="rounded-3xl border-2 border-dashed border-red-300 bg-red-50 px-8 py-12 flex flex-col items-center text-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">
                        🔴
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-red-700">Toko Sedang Tutup</h2>
                        <p className="text-red-500/80 text-sm mt-1 max-w-xs">{closedMessage}</p>
                    </div>
                    <span className="text-xs text-red-400 bg-red-100 px-3 py-1 rounded-full font-medium">
                        Silakan kembali lagi nanti
                    </span>
                </div>
            )}

            {/* Heading */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">Semua Produk</h2>
                    <p className="text-muted-foreground text-sm mt-0.5">{storeProducts.length} produk tersedia</p>
                </div>
            </div>

            {/* Product Grid — disable ordering when closed */}
            <ProductGrid products={storeProducts} isOpen={isOpen} />
        
        </div>
    )
}

