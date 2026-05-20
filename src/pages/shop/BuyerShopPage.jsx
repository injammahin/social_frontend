import React, { useMemo, useState } from "react"
import {
    CheckCircle2,
    Heart,
    Minus,
    Plus,
    Search,
    ShoppingBag,
    ShoppingCart,
    SlidersHorizontal,
    Star,
    Store,
    Trash2,
    Truck,
    X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
    "All",
    "Grocery",
    "Electronics",
    "Fashion",
    "Beauty",
    "Restaurant",
]

const products = [
    {
        id: 101,
        name: "Fresh Apple Pack",
        shop: "Green Valley Mart",
        category: "Grocery",
        price: 420,
        oldPrice: 500,
        rating: 4.8,
        reviews: 42,
        badge: "Fresh",
        image:
            "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 102,
        name: "Organic Vegetables",
        shop: "Green Valley Mart",
        category: "Grocery",
        price: 650,
        oldPrice: 720,
        rating: 4.7,
        reviews: 35,
        badge: "Organic",
        image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 103,
        name: "Premium Fruit Basket",
        shop: "Green Valley Mart",
        category: "Grocery",
        price: 980,
        oldPrice: 1150,
        rating: 4.9,
        reviews: 51,
        badge: "Popular",
        image:
            "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 201,
        name: "Wireless Earbuds Pro",
        shop: "Tech Planet BD",
        category: "Electronics",
        price: 2850,
        oldPrice: 3500,
        rating: 4.9,
        reviews: 89,
        badge: "Best Seller",
        image:
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 202,
        name: "Smart Watch Series X",
        shop: "Tech Planet BD",
        category: "Electronics",
        price: 4200,
        oldPrice: 4990,
        rating: 4.6,
        reviews: 66,
        badge: "Trending",
        image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 203,
        name: "Bluetooth Speaker",
        shop: "Tech Planet BD",
        category: "Electronics",
        price: 1800,
        oldPrice: 2200,
        rating: 4.5,
        reviews: 48,
        badge: "Offer",
        image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 301,
        name: "Cotton Casual Shirt",
        shop: "Urban Style Hub",
        category: "Fashion",
        price: 1250,
        oldPrice: 1600,
        rating: 4.5,
        reviews: 38,
        badge: "New",
        image:
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 302,
        name: "Premium Hoodie",
        shop: "Urban Style Hub",
        category: "Fashion",
        price: 2150,
        oldPrice: 2600,
        rating: 4.7,
        reviews: 54,
        badge: "Winter",
        image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 401,
        name: "Skin Care Combo",
        shop: "Glow Beauty Store",
        category: "Beauty",
        price: 1750,
        oldPrice: 2200,
        rating: 4.8,
        reviews: 45,
        badge: "Combo",
        image:
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: 501,
        name: "Burger Meal Box",
        shop: "Food Corner",
        category: "Restaurant",
        price: 590,
        oldPrice: 750,
        rating: 4.6,
        reviews: 72,
        badge: "Hot",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    },
]

function formatMoney(amount) {
    return `৳${Number(amount).toLocaleString("en-BD")}`
}

export default function BuyerShopPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [sortBy, setSortBy] = useState("popular")
    const [cart, setCart] = useState([])
    const [favoriteIds, setFavoriteIds] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    const filteredProducts = useMemo(() => {
        let result = [...products]

        if (selectedCategory !== "All") {
            result = result.filter((product) => product.category === selectedCategory)
        }

        if (searchTerm.trim()) {
            const value = searchTerm.toLowerCase()

            result = result.filter(
                (product) =>
                    product.name.toLowerCase().includes(value) ||
                    product.shop.toLowerCase().includes(value) ||
                    product.category.toLowerCase().includes(value)
            )
        }

        if (sortBy === "price_low") {
            result.sort((a, b) => a.price - b.price)
        }

        if (sortBy === "price_high") {
            result.sort((a, b) => b.price - a.price)
        }

        if (sortBy === "rating") {
            result.sort((a, b) => b.rating - a.rating)
        }

        if (sortBy === "popular") {
            result.sort((a, b) => b.reviews - a.reviews)
        }

        return result
    }, [searchTerm, selectedCategory, sortBy])

    const cartTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const deliveryCharge = cart.length ? 60 : 0
    const grandTotal = cartTotal + deliveryCharge

    const addToCart = (product) => {
        setOrderSuccess(false)

        setCart((previous) => {
            const exists = previous.find((item) => item.id === product.id)

            if (exists) {
                return previous.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...previous, { ...product, quantity: 1 }]
        })
    }

    const increaseQuantity = (productId) => {
        setCart((previous) =>
            previous.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        )
    }

    const decreaseQuantity = (productId) => {
        setCart((previous) =>
            previous
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    const removeFromCart = (productId) => {
        setCart((previous) => previous.filter((item) => item.id !== productId))
    }

    const toggleFavorite = (productId) => {
        setFavoriteIds((previous) =>
            previous.includes(productId)
                ? previous.filter((id) => id !== productId)
                : [...previous, productId]
        )
    }

    const placeOrder = () => {
        if (!cart.length) return

        setCart([])
        setIsCartOpen(false)
        setOrderSuccess(true)
    }

    return (
        <div className="relative space-y-5">
            <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="fixed right-5 top-24 z-[70] flex h-13 w-13 items-center justify-center rounded-2xl border border-[#1dbf73]/20 bg-white text-[#119d5c] shadow-xl shadow-[#1dbf73]/20 transition hover:-translate-y-0.5 hover:bg-[#1dbf73] hover:text-white"
            >
                <ShoppingCart className="h-6 w-6" />

                {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 px-1.5 text-[11px] font-bold text-white shadow-md">
                        {cartCount}
                    </span>
                )}
            </button>

            <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1dbf73]/15 blur-3xl" />
                <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

                <div className="relative grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-6">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#1dbf73]/10 px-3 py-1.5 text-xs font-bold text-[#119d5c]">
                            <ShoppingBag className="h-4 w-4" />
                            Buyer Marketplace
                        </div>

                        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                            Discover trusted shops and buy products
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                            Browse reviewed shops, compare products, add items to cart, and
                            place demo orders from verified sellers.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xl font-extrabold text-slate-950">
                                    {products.length}+
                                </p>
                                <p className="text-xs font-semibold text-slate-500">
                                    Products
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xl font-extrabold text-slate-950">5+</p>
                                <p className="text-xs font-semibold text-slate-500">
                                    Trusted Shops
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xl font-extrabold text-slate-950">4.8</p>
                                <p className="text-xs font-semibold text-slate-500">
                                    Avg. Rating
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsCartOpen(true)}
                        className="rounded-[24px] bg-slate-950 p-5 text-left text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                            <Truck className="h-5 w-5 text-[#1dbf73]" />
                        </div>

                        <h3 className="mt-4 text-lg font-extrabold">Fast local delivery</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            Order from nearby reviewed shops and track purchases from one
                            dashboard.
                        </p>

                        <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/10 p-3">
                            <div>
                                <p className="text-xs font-semibold text-slate-300">
                                    Cart Items
                                </p>
                                <p className="mt-0.5 text-2xl font-extrabold">{cartCount}</p>
                            </div>

                            <ShoppingCart className="h-6 w-6 text-[#1dbf73]" />
                        </div>
                    </button>
                </div>
            </section>

            {orderSuccess && (
                <div className="flex items-center gap-3 rounded-2xl border border-[#1dbf73]/20 bg-[#1dbf73]/10 p-4 text-[#119d5c]">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="text-sm font-semibold">
                        Order placed successfully. This is demo checkout for now.
                    </p>
                </div>
            )}

            <Card className="rounded-[28px] border-slate-200 bg-white shadow-sm">
                <CardContent className="p-5">
                    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_180px]">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search products, shops, or categories..."
                                className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1dbf73] focus:bg-white focus:ring-4 focus:ring-[#1dbf73]/10"
                            />
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                            className="h-13 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#1dbf73] focus:bg-white focus:ring-4 focus:ring-[#1dbf73]/10"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value)}
                            className="h-13 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#1dbf73] focus:bg-white focus:ring-4 focus:ring-[#1dbf73]/10"
                        >
                            <option value="popular">Most Popular</option>
                            <option value="rating">Top Rated</option>
                            <option value="price_low">Price Low</option>
                            <option value="price_high">Price High</option>
                        </select>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setSelectedCategory(category)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedCategory === category
                                    ? "bg-[#1dbf73] text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <section>
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-extrabold text-slate-950">Products</h2>
                        <p className="text-sm text-slate-500">
                            Showing {filteredProducts.length} products
                        </p>
                    </div>

                    <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm sm:flex">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filtered
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => {
                        const isFavorite = favoriteIds.includes(product.id)

                        return (
                            <Card
                                key={product.id}
                                className="group overflow-hidden rounded-[24px] border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="relative h-44 overflow-hidden bg-slate-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#119d5c] shadow-sm backdrop-blur">
                                        {product.badge}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => toggleFavorite(product.id)}
                                        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur transition ${isFavorite
                                            ? "bg-red-500 text-white"
                                            : "bg-white/90 text-slate-600 hover:text-red-500"
                                            }`}
                                    >
                                        <Heart
                                            className={`h-4.5 w-4.5 ${isFavorite ? "fill-current" : ""
                                                }`}
                                        />
                                    </button>
                                </div>

                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="truncate text-sm font-extrabold text-slate-950">
                                                {product.name}
                                            </h3>

                                            <div className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">
                                                <Store className="h-3.5 w-3.5" />
                                                <span className="truncate">{product.shop}</span>
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-bold text-yellow-700">
                                            <Star className="h-3.5 w-3.5 fill-current" />
                                            {product.rating}
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-end justify-between gap-3">
                                        <div>
                                            <p className="text-lg font-extrabold text-slate-950">
                                                {formatMoney(product.price)}
                                            </p>
                                            <p className="text-xs font-medium text-slate-400 line-through">
                                                {formatMoney(product.oldPrice)}
                                            </p>
                                        </div>

                                        <p className="text-xs font-medium text-slate-500">
                                            {product.reviews} reviews
                                        </p>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={() => addToCart(product)}
                                        className="mt-4 h-10 w-full rounded-2xl bg-[#1dbf73] text-sm font-semibold text-white hover:bg-[#19a965]"
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Add to Cart
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {!filteredProducts.length && (
                    <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">
                        <ShoppingBag className="mx-auto h-10 w-10 text-slate-300" />
                        <h3 className="mt-4 text-lg font-extrabold text-slate-950">
                            No products found
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Try another search or category.
                        </p>
                    </div>
                )}
            </section>

            {isCartOpen && (
                <div className="fixed inset-0 z-[100]">
                    <button
                        type="button"
                        aria-label="Close cart"
                        onClick={() => setIsCartOpen(false)}
                        className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
                    />

                    <aside className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col overflow-hidden bg-white shadow-2xl">
                        <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-[#1dbf73]/15 via-white to-slate-50 p-5">
                            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#1dbf73]/20 blur-3xl" />

                            <div className="relative flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1dbf73] text-white shadow-lg shadow-[#1dbf73]/25">
                                        <ShoppingCart className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-extrabold text-slate-950">
                                            Your Cart
                                        </h2>
                                        <p className="text-sm font-medium text-slate-500">
                                            {cartCount} item{cartCount !== 1 ? "s" : ""} selected
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setIsCartOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-950"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="relative mt-5 grid grid-cols-3 gap-3">
                                <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
                                    <p className="text-xs font-semibold text-slate-400">Items</p>
                                    <p className="text-lg font-extrabold text-slate-950">
                                        {cartCount}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
                                    <p className="text-xs font-semibold text-slate-400">
                                        Delivery
                                    </p>
                                    <p className="text-lg font-extrabold text-[#119d5c]">
                                        {formatMoney(deliveryCharge)}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
                                    <p className="text-xs font-semibold text-slate-400">Total</p>
                                    <p className="text-lg font-extrabold text-slate-950">
                                        {formatMoney(grandTotal)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto bg-slate-50 p-5">
                            {cart.length ? (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-[24px] border border-slate-100 bg-white p-4 shadow-sm"
                                        >
                                            <div className="flex gap-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-20 w-20 rounded-2xl object-cover"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-extrabold text-slate-950">
                                                                {item.name}
                                                            </p>
                                                            <p className="mt-1 truncate text-xs font-medium text-slate-500">
                                                                {item.shop}
                                                            </p>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between gap-3">
                                                        <div>
                                                            <p className="text-sm font-extrabold text-[#119d5c]">
                                                                {formatMoney(item.price)}
                                                            </p>
                                                            <p className="text-xs font-medium text-slate-400">
                                                                Unit price
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => decreaseQuantity(item.id)}
                                                                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition hover:bg-white"
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </button>

                                                            <span className="w-8 text-center text-sm font-extrabold text-slate-950">
                                                                {item.quantity}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() => increaseQuantity(item.id)}
                                                                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition hover:bg-white"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 rounded-2xl bg-slate-950 px-4 py-3 text-white">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-xs font-medium text-slate-300">
                                                                Item Total
                                                            </p>
                                                            <p className="text-sm font-extrabold">
                                                                {formatMoney(item.price * item.quantity)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex h-full min-h-[420px] items-center justify-center">
                                    <div className="text-center">
                                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-white text-slate-300 shadow-sm">
                                            <ShoppingCart className="h-10 w-10" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-extrabold text-slate-950">
                                            Your cart is empty
                                        </h3>

                                        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                                            Add products from trusted shops and they will appear here.
                                        </p>

                                        <Button
                                            type="button"
                                            onClick={() => setIsCartOpen(false)}
                                            className="mt-5 h-11 rounded-2xl bg-[#1dbf73] px-6 text-sm font-semibold text-white hover:bg-[#19a965]"
                                        >
                                            Continue Shopping
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-slate-100 bg-white p-5">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-slate-500">
                                        Subtotal
                                    </p>
                                    <p className="text-base font-extrabold text-slate-950">
                                        {formatMoney(cartTotal)}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-slate-500">
                                        Delivery
                                    </p>
                                    <p className="text-base font-extrabold text-[#119d5c]">
                                        {formatMoney(deliveryCharge)}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-4 text-white">
                                    <p className="text-sm font-semibold">Grand Total</p>
                                    <p className="text-xl font-extrabold">
                                        {formatMoney(grandTotal)}
                                    </p>
                                </div>
                            </div>

                            <Button
                                type="button"
                                onClick={placeOrder}
                                disabled={!cart.length}
                                className="mt-4 h-12 w-full rounded-2xl bg-[#1dbf73] text-sm font-semibold text-white hover:bg-[#19a965] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Place Order
                            </Button>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    )
}