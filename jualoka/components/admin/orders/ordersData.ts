import {
    ShoppingBag,
    Phone,
    MessageCircle,
    CheckCircle2,
    Clock,
    XCircle,
    Package,
    CalendarDays,
    Truck,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type OrderStatus = "baru" | "diproses" | "dikirim" | "selesai" | "dibatalkan"

export type OrderItem = {
    name: string
    qty: number
    price: number
}

export type Order = {
    id: string
    orderNumber: string
    customer: string
    phone: string
    items: OrderItem[]
    total: number
    status: OrderStatus
    date: string // ISO date
    note?: string
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const ORDERS: Order[] = [
    {
        id: "1",
        orderNumber: "ORD-001",
        customer: "Budi Santoso",
        phone: "+6281234567890",
        items: [
            { name: "Keripik Singkong Pedas Gila", qty: 2, price: 15000 },
            { name: "Seblak Instan Komplit", qty: 1, price: 12000 },
        ],
        total: 42000,
        status: "baru",
        date: "2026-03-08T07:30:00",
        note: "Tolong dikemas rapi ya kak 🙏",
    },
    {
        id: "2",
        orderNumber: "ORD-002",
        customer: "Siti Rahayu",
        phone: "+6282198765432",
        items: [
            { name: "Kopi Gula Aren Literan", qty: 3, price: 65000 },
            { name: "Cireng Isi Ayam Suwir", qty: 2, price: 18000 },
        ],
        total: 231000,
        status: "diproses",
        date: "2026-03-08T06:15:00",
    },
    {
        id: "3",
        orderNumber: "ORD-003",
        customer: "Ahmad Fauzi",
        phone: "+6283123456789",
        items: [{ name: "Keripik Singkong Pedas Gila", qty: 1, price: 15000 }],
        total: 15000,
        status: "dikirim",
        date: "2026-03-07T15:00:00",
    },
    {
        id: "4",
        orderNumber: "ORD-004",
        customer: "Dewi Lestari",
        phone: "+6285612345678",
        items: [
            { name: "Seblak Instan Komplit", qty: 4, price: 12000 },
            { name: "Cireng Isi Ayam Suwir", qty: 1, price: 18000 },
        ],
        total: 66000,
        status: "selesai",
        date: "2026-03-07T10:20:00",
    },
    {
        id: "5",
        orderNumber: "ORD-005",
        customer: "Rina Permata",
        phone: "+6287812345678",
        items: [{ name: "Kopi Gula Aren Literan", qty: 2, price: 65000 }],
        total: 130000,
        status: "selesai",
        date: "2026-03-06T09:00:00",
    },
    {
        id: "6",
        orderNumber: "ORD-006",
        customer: "Hendra Wijaya",
        phone: "+6281398765432",
        items: [{ name: "Keripik Singkong Pedas Gila", qty: 3, price: 15000 }],
        total: 45000,
        status: "dibatalkan",
        date: "2026-03-06T08:30:00",
        note: "Pembeli tidak bisa COD",
    },
    {
        id: "7",
        orderNumber: "ORD-007",
        customer: "Nurul Hidayah",
        phone: "+6281512345678",
        items: [
            { name: "Seblak Instan Komplit", qty: 2, price: 12000 },
            { name: "Kopi Gula Aren Literan", qty: 1, price: 65000 },
            { name: "Cireng Isi Ayam Suwir", qty: 3, price: 18000 },
        ],
        total: 143000,
        status: "baru",
        date: "2026-03-08T07:55:00",
    },
]

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

export const STATUS_CONFIG: Record<
    OrderStatus,
    { label: string; color: string; bg: string; icon: React.ComponentType<{ className?: string }> }
> = {
    baru: { label: "Baru", color: "text-blue-600", bg: "bg-blue-50", icon: Clock },
    diproses: { label: "Diproses", color: "text-amber-600", bg: "bg-amber-50", icon: Package },
    dikirim: { label: "Dikirim", color: "text-purple-600", bg: "bg-purple-50", icon: Truck },
    selesai: { label: "Selesai", color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
    dibatalkan: { label: "Dibatalkan", color: "text-red-500", bg: "bg-red-50", icon: XCircle },
}

export const ALL_STATUSES: (OrderStatus | "semua")[] = [
    "semua", "baru", "diproses", "dikirim", "selesai", "dibatalkan",
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function formatDate(iso: string) {
    const d = new Date(iso)
    return d.toLocaleDateString("id-ID", {
        day: "numeric", month: "short", year: "numeric",
    }) + " · " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
}

export function formatRp(n: number) {
    return "Rp " + n.toLocaleString("id-ID")
}

export function initials(name: string) {
    return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

const AVATAR_COLORS = [
    "from-primary to-[#2ea855]",
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-amber-400 to-amber-600",
    "from-rose-400 to-rose-600",
]

export function avatarColor(id: string) {
    return AVATAR_COLORS[parseInt(id) % AVATAR_COLORS.length]
}
