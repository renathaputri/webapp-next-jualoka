export function SummaryCard({
    label,
    value,
    sub,
    icon: Icon,
    color,
}: {
    label: string
    value: string | number
    sub?: string
    icon: React.ComponentType<{ className?: string }>
    color: string
}) {
    return (
        <div className="bg-white rounded-2xl border-0 shadow-sm p-5 flex flex-col gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="h-4.5 w-4.5 h-5 w-5" />
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
                <p className="text-2xl font-bold mt-0.5">{value}</p>
                {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
            </div>
        </div>
    )
}
