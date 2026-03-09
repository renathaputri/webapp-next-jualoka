import { type StoreCategory } from "@/lib/categories"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Category = StoreCategory

export type StoreData = {
    id: string
    name: string
    slug: string
    owner: string
    category: Category
    location: string
    productCount: number
    rating: number
    reviewCount: number
    description: string
    badge?: string
    featured?: boolean
    color: string // gradient for avatar
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const STORES: StoreData[] = [
    {
        id: "1",
        name: "Toko Berkah Snack",
        slug: "toko-berkah",
        owner: "Siti Rahayu",
        category: "Makanan",
        location: "Bandung, Jawa Barat",
        productCount: 12,
        rating: 4.9,
        reviewCount: 238,
        description: "Spesialis keripik singkong, seblak, dan snack pedas khas Jawa Barat berkualitas premium.",
        badge: "Laris Manis",
        featured: true,
        color: "from-orange-400 to-rose-500",
    },
    {
        id: "2",
        name: "Kopi Gula Aren Nusantara",
        slug: "kopi-nusantara",
        owner: "Ahmad Fauzi",
        category: "Minuman",
        location: "Yogyakarta, DIY",
        productCount: 7,
        rating: 4.8,
        reviewCount: 156,
        description: "Kopi susu gula aren premium dalam kemasan botol literan. Segar, lezat, tanpa pengawet.",
        badge: "Favorit",
        featured: true,
        color: "from-amber-400 to-orange-500",
    },
    {
        id: "3",
        name: "Batik Pesisir Cantik",
        slug: "batik-pesisir",
        owner: "Dewi Lestari",
        category: "Fashion",
        location: "Pekalongan, Jawa Tengah",
        productCount: 24,
        rating: 4.7,
        reviewCount: 89,
        description: "Koleksi batik pesisir motif khas Pekalongan dengan pewarnaan alami dan bahan premium.",
        featured: false,
        color: "from-purple-400 to-indigo-500",
    },
    {
        id: "4",
        name: "Rajutan Ibu Cantik",
        slug: "rajutan-ibu",
        owner: "Rina Permata",
        category: "Fashion",
        location: "Surabaya, Jawa Timur",
        productCount: 18,
        rating: 4.6,
        reviewCount: 62,
        description: "Tas, dompet, dan aksesori rajut handmade berkualitas dengan desain modern dan trendy.",
        featured: false,
        color: "from-pink-400 to-rose-500",
    },
    {
        id: "5",
        name: "Kerajinan Bambu Lestari",
        slug: "bambu-lestari",
        owner: "Budi Santoso",
        category: "Kerajinan",
        location: "Tasikmalaya, Jawa Barat",
        productCount: 31,
        rating: 4.8,
        reviewCount: 114,
        description: "Produk kerajinan bambu ramah lingkungan: lampu, perabot, wadah, dan dekorasi rumah estetik.",
        badge: "Eco Friendly",
        featured: true,
        color: "from-emerald-400 to-teal-500",
    },
    {
        id: "6",
        name: "Herbal Sehat Alami",
        slug: "herbal-sehat",
        owner: "Nurul Hidayah",
        category: "Kecantikan",
        location: "Malang, Jawa Timur",
        productCount: 9,
        rating: 4.9,
        reviewCount: 201,
        description: "Produk perawatan kulit dan kecantikan 100% alami berbahan rempah-rempah pilihan nusantara.",
        badge: "All Natural",
        featured: true,
        color: "from-lime-400 to-emerald-500",
    },
    {
        id: "7",
        name: "Rendang Uni Minang",
        slug: "rendang-uni",
        owner: "Fatimah Andriani",
        category: "Makanan",
        location: "Padang, Sumatera Barat",
        productCount: 5,
        rating: 5.0,
        reviewCount: 340,
        description: "Rendang sapi asli Minang, dimasak tradisional selama 6 jam. Tahan 1 bulan di suhu ruang.",
        badge: "Top Rated",
        featured: true,
        color: "from-red-400 to-rose-600",
    },
    {
        id: "8",
        name: "Tempe Chips Crispy",
        slug: "tempe-chips",
        owner: "Hendra Wijaya",
        category: "Makanan",
        location: "Solo, Jawa Tengah",
        productCount: 8,
        rating: 4.5,
        reviewCount: 72,
        description: "Keripik tempe krispy aneka rasa: original, BBQ, keju, dan balado. Isi 250gr per kemasan.",
        featured: false,
        color: "from-yellow-400 to-amber-500",
    },
]
