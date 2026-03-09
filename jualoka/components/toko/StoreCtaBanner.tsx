import Link from "next/link"
import { Store, ArrowRight } from "lucide-react"

export function StoreCtaBanner() {
    return (
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-3xl border border-primary/10 px-8 py-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Store className="h-8 w-8" />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-bold">Punya Produk UMKM?</h3>
                <p className="text-muted-foreground text-sm mt-1">
                    Buka toko Anda sekarang di Jualoka dan jangkau lebih banyak pelanggan. Gratis dan mudah!
                </p>
            </div>
            <Link
                href="/admin"
                className="shrink-0 flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-95 text-sm"
            >
                Buat Toko Gratis
                <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
    )
}
