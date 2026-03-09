import { STATUS_CONFIG, type OrderStatus } from "./ordersData"

export function StatusBadge({ status }: { status: OrderStatus }) {
    const cfg = STATUS_CONFIG[status]
    const Icon = cfg.icon
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
            <Icon className="h-3 w-3" />
            {cfg.label}
        </span>
    )
}
