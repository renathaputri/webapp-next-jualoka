"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCart, addToCart, decreaseFromCart, CartItem } from "@/components/localStorage/CartStorage"

type Product = {
    id: string
    name: string
    price: number
    image: string
    description: string
    tag: string | null
}

export function ProductGrid({ products, isOpen }: { products: Product[]; isOpen: boolean }) {
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        setCart(getCart())
    }, [])

    function getQty(id: string) {
        return cart.find((it) => it.id === id)?.quantity ?? 0
    }

    function addItem(product: Product) {
        setCart(addToCart(product.id, product.name, product.price))
    }

    function decrease(product: Product) {
        setCart(decreaseFromCart(product.id))
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => {
                const qty = getQty(product.id)
                return (
                    <div key={product.id} className={`group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col border border-border/50 ${!isOpen ? "opacity-60 pointer-events-none select-none" : ""}`}>
                        <div className="relative overflow-hidden aspect-square">
                            <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                            {product.tag && (
                                <div className="absolute top-3 left-3 bg-secondary text-foreground text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow">
                                    {product.tag}
                                </div>
                            )}
                            {!isOpen && (
                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                    <span className="text-xs font-bold text-red-500 bg-white px-3 py-1 rounded-full shadow border border-red-200">Tutup</span>
                                </div>
                            )}
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">{product.name}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">{product.description}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-primary font-bold text-base">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </span>
                                {qty === 0 ? (
                                    <Button size="sm" className="rounded-xl h-8 gap-1.5 shadow-sm" disabled={!isOpen} onClick={() => addItem(product)}>
                                        <ShoppingCart className="h-3.5 w-3.5" />
                                        Pesan
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-1.5">
                                        <button onClick={() => decrease(product)} className="h-7 w-7 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="w-5 text-center text-sm font-bold">{qty}</span>
                                        <button onClick={() => addItem(product)} className="h-7 w-7 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}