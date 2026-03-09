import { STATUS_CFG } from "./dashboardData"

export function StatusPill({ status }: { status: string }) {
    const cfg = STATUS_CFG[status] ?? { label: status, cls: "bg-muted text-muted-foreground" }
    return (
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${cfg.cls}`}>
            {cfg.label}
        </span>
    )
}
