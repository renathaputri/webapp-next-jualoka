import {
    Wallet,
    ShoppingBag,
    Package,
    Eye,
    BarChart3,
    Clock,
    Star,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const TODAY = "Minggu, 8 Mar 2026"

export const kpis = [
    {
        title: "Pendapatan Bulan Ini",
        value: "Rp 3.240.000",
        change: "+18% dari bulan lalu",
        positive: true,
        icon: Wallet,
        color: "bg-emerald-100 text-emerald-600",
        accent: "border-l-4 border-emerald-400",
    },
    {
        title: "Total Pesanan",
        value: "48",
        change: "+12% dari bulan lalu",
        positive: true,
        icon: ShoppingBag,
        color: "bg-primary/10 text-primary",
        accent: "border-l-4 border-primary",
    },
    {
        title: "Produk Aktif",
        value: "12",
        change: "+2 produk baru",
        positive: true,
        icon: Package,
        color: "bg-blue-100 text-blue-600",
        accent: "border-l-4 border-blue-400",
    },
    {
        title: "Pengunjung Toko",
        value: "284",
        change: "+34 hari ini",
        positive: true,
        icon: Eye,
        color: "bg-purple-100 text-purple-600",
        accent: "border-l-4 border-purple-400",
    },
    {
        title: "Rata-rata Nilai Pesanan",
        value: "Rp 67.500",
        change: "-5% dari bulan lalu",
        positive: false,
        icon: BarChart3,
        color: "bg-amber-100 text-amber-600",
        accent: "border-l-4 border-amber-400",
    },
    {
        title: "Pesanan Baru Hari Ini",
        value: "3",
        change: "Perlu ditindaklanjuti",
        positive: true,
        icon: Clock,
        color: "bg-rose-100 text-rose-600",
        accent: "border-l-4 border-rose-400",
    },
]

export type ProductStatus = "laris" | "stabil" | "perhatian"

export const topProducts: {
    name: string
    sold: number
    revenue: number
    trend: "up" | "down"
    status: ProductStatus
    insight: string
}[] = [
        {
            name: "Keripik Singkong Pedas Gila",
            sold: 38,
            revenue: 570000,
            trend: "up",
            status: "laris",
            insight: "Paling sering dipesan ulang. Harga terjangkau & nama produk menarik perhatian pembeli baru.",
        },
        {
            name: "Kopi Gula Aren Literan",
            sold: 22,
            revenue: 1430000,
            trend: "up",
            status: "laris",
            insight: "Nilai per pesanan tertinggi. Pembeli cenderung beli 2–3 botol sekaligus untuk stok mingguan.",
        },
        {
            name: "Seblak Instan Komplit",
            sold: 19,
            revenue: 228000,
            trend: "up",
            status: "stabil",
            insight: "Penjualan konsisten setiap minggu. Tambahkan varian rasa untuk dorong volume lebih tinggi.",
        },
        {
            name: "Cireng Isi Ayam Suwir",
            sold: 12,
            revenue: 216000,
            trend: "down",
            status: "perhatian",
            insight: "Penjualan turun 30% bulan ini. Foto produk kurang menarik & deskripsi belum menjelaskan isi/ukuran.",
        },
    ]

export const recentOrders = [
    { name: "Nurul Hidayah", phone: "+62 815-1234-5678", total: 143000, items: 3, status: "baru", time: "5 menit lalu" },
    { name: "Budi Santoso", phone: "+62 812-3456-7890", total: 42000, items: 2, status: "baru", time: "27 menit lalu" },
    { name: "Siti Rahayu", phone: "+62 821-9876-5432", total: 231000, items: 5, status: "diproses", time: "1 jam lalu" },
    { name: "Ahmad Fauzi", phone: "+62 831-2345-6789", total: 15000, items: 1, status: "dikirim", time: "Kemarin" },
]

export const storeHealth = [
    { label: "Foto produk sudah diunggah", ok: true },
    { label: "Nomor WhatsApp sudah diisi", ok: true },
    { label: "Deskripsi toko sudah lengkap", ok: true },
    { label: "Banner toko sudah dikustomisasi", ok: false },
    { label: "Minimal 5 produk aktif", ok: true },
    { label: "Alamat toko sudah diisi", ok: false },
]

export const quickActions = [
    { label: "Tambah Produk", icon: Package, href: "/admin/products", color: "bg-primary text-white" },
    { label: "Lihat Pesanan", icon: ShoppingBag, href: "/admin/orders", color: "bg-blue-500 text-white" },
    { label: "Kustomisasi Banner", icon: Star, href: "/admin/settings", color: "bg-amber-500 text-white" },
    { label: "Buka Toko", icon: Eye, href: "/toko/kopi-nusantara", color: "bg-emerald-500 text-white" },
]

export const STATUS_CFG: Record<string, { label: string; cls: string }> = {
    baru: { label: "Baru", cls: "bg-blue-50 text-blue-600" },
    diproses: { label: "Diproses", cls: "bg-amber-50 text-amber-600" },
    dikirim: { label: "Dikirim", cls: "bg-purple-50 text-purple-600" },
    selesai: { label: "Selesai", cls: "bg-emerald-50 text-emerald-600" },
}
