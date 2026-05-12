import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item._id === product._id)

            if (existingItem) {
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                )
            }

            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item._id !== productId))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const total = cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
        0
    )

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

export default CartProvider
