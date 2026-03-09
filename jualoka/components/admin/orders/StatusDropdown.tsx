"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { STATUS_CONFIG, type OrderStatus } from "./ordersData"

export function StatusDropdown({
    current,
    onChange,
}: {
    current: OrderStatus
    onChange: (s: OrderStatus) => void
}) {
    const [open, setOpen] = useState(false)
    const statuses: OrderStatus[] = ["baru", "diproses", "dikirim", "selesai", "dibatalkan"]

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 text-xs font-semibold border border-border rounded-xl px-3 py-1.5 bg-white hover:bg-muted/50 transition-colors"
            >
                Ubah status <ChevronDown className="h-3 w-3" />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-9 z-20 bg-white border border-border/60 rounded-2xl shadow-xl py-1.5 min-w-[160px] max-h-56 overflow-y-auto">
                        {statuses.map((s) => {
                            const cfg = STATUS_CONFIG[s]
                            const Icon = cfg.icon
                            return (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => { onChange(s); setOpen(false) }}
                                    className={`w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-muted/50 transition-colors ${current === s ? cfg.color : "text-foreground"}`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {cfg.label}
                                    {current === s && <span className="ml-auto text-[10px]">✓</span>}
                                </button>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}
