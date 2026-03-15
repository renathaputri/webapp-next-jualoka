import { CheckCircle2 } from "lucide-react"

export function Toast({ visible, message }: { visible: boolean; message: string }) {
    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-foreground text-background text-sm font-medium px-4 py-3 rounded-2xl shadow-2xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {message}
        </div>
    )
}
