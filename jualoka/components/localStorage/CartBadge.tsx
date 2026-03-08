"use client"

import { useEffect, useState } from "react"

export function CartBadge() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const stored = localStorage.getItem("cart")
        if (stored) {
            const items = JSON.parse(stored)
            const total = items.reduce((acc: number, it: { quantity: number }) => acc + it.quantity, 0)
            setCount(total)
        }

        const handler = () => {
            const stored = localStorage.getItem("cart")
            if (stored) {
                const items = JSON.parse(stored)
                const total = items.reduce((acc: number, it: { quantity: number }) => acc + it.quantity, 0)
                setCount(total)
            } else {
                setCount(0)
            }
        }

        window.addEventListener("cart-updated", handler)
        return () => window.removeEventListener("cart-updated", handler)
    }, [])

    if (count === 0) return null

    return (
        <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-secondary text-[10px] font-bold flex items-center justify-center text-foreground shadow">
            {count}
        </span>
    )
}