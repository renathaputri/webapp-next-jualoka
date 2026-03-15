import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0faf4] via-white to-[#fffdf0] flex flex-col">
            {/* Top brand bar */}
            <div className="flex items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <Image src="/logo.svg" alt="Jualoka" width={36} height={36} className="rounded-xl" />
                    <span className="font-bold text-lg text-primary tracking-tight">Jualoka</span>
                </Link>
                <p className="text-xs text-muted-foreground hidden sm:block">
                    Platform UMKM terpercaya
                </p>
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                {children}
            </div>

            {/* Footer */}
            <div className="text-center py-4 text-xs text-muted-foreground/60">
                © 2026 Jualoka · Platform UMKM Indonesia
            </div>
        </div>
    )
}
