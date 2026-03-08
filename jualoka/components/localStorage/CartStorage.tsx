export type CartItem = { id: string; name: string; price: number; quantity: number }

export function getCart(): CartItem[] {
    try {
        const stored = localStorage.getItem("cart")
        return stored ? JSON.parse(stored) : []
    } catch { return [] }
}

export function saveCart(cart: CartItem[]) {
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))
}

export function addToCart(id: string, name: string, price: number) {
    const cart = getCart()
    const idx = cart.findIndex((it) => it.id === id)
    if (idx >= 0) {
        cart[idx].quantity += 1
    } else {
        cart.push({ id, name, price, quantity: 1 })
    }
    saveCart(cart)
    return [...cart]
}

export function decreaseFromCart(id: string) {
    const cart = getCart()
    const idx = cart.findIndex((it) => it.id === id)
    if (idx >= 0) {
        cart[idx].quantity -= 1
        if (cart[idx].quantity <= 0) cart.splice(idx, 1)
    }
    saveCart(cart)
    return [...cart]
}