import { SlidersHorizontal, LayoutGrid } from "lucide-react"
import { STORE_CATEGORIES, CATEGORY_ICONS, type StoreCategory } from "@/lib/categories"

type Category = StoreCategory | "Semua"

const CATEGORIES: Category[] = ["Semua", ...STORE_CATEGORIES]

const ALL_ICONS: Record<string, React.ElementType> = {
    Semua: LayoutGrid,
    ...CATEGORY_ICONS,
}

export function CategoryFilter({
    activeCategory,
    onCategoryChange,
}: {
    activeCategory: Category
    onCategoryChange: (cat: Category) => void
}) {
    return (
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-border/50 shadow-sm">
            <div className="max-w-6xl mx-auto px-5">
                <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0 mr-1" />
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${activeCategory === cat
                                ? "bg-primary text-white shadow-sm"
                                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                                }`}
                        >
                            {(() => { const Icon = ALL_ICONS[cat]; return Icon ? <Icon className="h-3.5 w-3.5" /> : null })()}
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
