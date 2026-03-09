import Link from "next/link"
import { MapPin, Package, Star, ChevronRight } from "lucide-react"
import { type StoreData } from "./storesData"

export function StoreCard({ store }: { store: StoreData }) {
    return (
        <Link
            href={`/toko/${store.slug}`}
            className="group bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
        >
            {/* Color banner */}
            <div className={`h-20 bg-gradient-to-r ${store.color} relative`}>
                {store.badge && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-foreground shadow">
                        {store.badge}
                    </div>
                )}
                {/* Avatar */}
                <div className="absolute -bottom-6 left-5 h-14 w-14 rounded-2xl bg-white shadow-lg flex items-center justify-center ring-2 ring-white">
                    <span className={`h-12 w-12 rounded-xl bg-gradient-to-br ${store.color} flex items-center justify-center text-white font-black text-xl`}>
                        {store.name.charAt(0)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="pt-10 px-5 pb-5 flex flex-col flex-1">
                {/* Category pill */}
                <span className="self-end text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full -mt-2">
                    {store.category}
                </span>

                <h3 className="font-bold text-base leading-tight mt-1 group-hover:text-primary transition-colors">
                    {store.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">oleh {store.owner}</p>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    {store.location}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground/80 mt-3 leading-relaxed line-clamp-2 flex-1">
                    {store.description}
                </p>

                {/* Stats row */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {store.productCount} produk
                        </span>
                        <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {store.rating} ({store.reviewCount})
                        </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Kunjungi <ChevronRight className="h-3 w-3" />
                    </span>
                </div>
            </div>
        </Link>
    )
}
