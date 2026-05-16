import React, { useEffect, useRef, useState } from "react"
import {
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  Heart,
  Save,
  ImagePlus,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Package,
  Phone,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const SHOP_STORAGE_KEY = "reviewer_my_shop"
const PRODUCTS_STORAGE_KEY = "reviewer_my_shop_products"
const REVIEWS_STORAGE_KEY = "reviewer_my_shop_reviews"

const defaultShop = {
  name: "Green Valley Mart",
  username: "@greenvalleymart",
  category: "Grocery Store",
  location: "Banani, Dhaka",
  rating: "4.8",
  reviews: "128",
  followers: "2.4k",
  products: "46",
  status: "Verified",
  phone: "+880 1712-345678",
  email: "greenvalley@example.com",
  openTime: "Open today: 9:00 AM - 10:00 PM",
  description:
    "A trusted grocery shop providing fresh products, household essentials, snacks, beverages, and daily needs with reliable customer service.",
  logoImage: "",
  coverImage: "",
}

const defaultProducts = [
  {
    id: 1,
    name: "Fresh Organic Vegetables",
    price: "৳450",
    category: "Grocery",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    badge: "Popular",
    description: "Fresh vegetables selected daily for quality customers.",
  },
  {
    id: 2,
    name: "Premium Fruit Basket",
    price: "৳850",
    category: "Fresh Food",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80",
    badge: "Fresh",
    description: "Premium fruit basket with seasonal fresh fruits.",
  },
  {
    id: 3,
    name: "Daily Grocery Pack",
    price: "৳1,250",
    category: "Essentials",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
    badge: "Best Deal",
    description: "Daily grocery package for household essentials.",
  },
]

const defaultReviews = [
  {
    id: 1,
    name: "Arif Hasan",
    avatar: "AH",
    rating: "4.8",
    time: "2 hours ago",
    text: "Clean shop, good behavior, and fresh products. Pricing is also reasonable compared to nearby shops.",
    useful: 12,
    replies: [],
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    avatar: "NJ",
    rating: "4.6",
    time: "1 day ago",
    text: "Product quality is good and staff behavior was professional. Recommended for regular grocery shopping.",
    useful: 7,
    replies: [],
  },
]

function getStoredData(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function readImageFile(file, callback) {
  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    callback(reader.result)
  }

  reader.readAsDataURL(file)
}

function EmptyImageBox({ icon: Icon = Store }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1dbf73]/15 via-[#1dbf73]/5 to-white text-[#119d5c]">
      <Icon className="h-12 w-12" />
    </div>
  )
}

function StatBox({ value, label, icon: Icon }) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xl font-black text-slate-950">{value}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
        </div>

        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#1dbf73]/10 text-[#119d5c]">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Card className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative h-48 overflow-hidden bg-slate-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <EmptyImageBox icon={Package} />
          )}

          <span className="absolute left-3 top-3 rounded-full bg-[#1dbf73] px-3 py-1 text-xs font-bold text-white shadow">
            {product.badge || "Product"}
          </span>

          <div className="absolute right-3 top-3 flex gap-2">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => onEdit(product)}
              className="h-9 w-9 rounded-full bg-white/95 text-slate-700 shadow hover:bg-white hover:text-[#119d5c]"
            >
              <Edit3 className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => onDelete(product.id)}
              className="h-9 w-9 rounded-full bg-white/95 text-red-600 shadow hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#119d5c]">
            {product.category}
          </p>

          <h3 className="mt-1 min-h-[24px] text-base font-black text-slate-950">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 min-h-[42px] text-sm leading-6 text-slate-500">
            {product.description || "No product description added."}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xl font-black text-[#119d5c]">{product.price}</p>

            <Button
              type="button"
              className="h-9 rounded-full bg-[#1dbf73] px-4 text-xs font-bold text-white hover:bg-[#19a965]"
            >
              <Eye className="mr-1.5 h-4 w-4" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReviewItem({ review, onUseful, onReply }) {
  return (
    <div className="rounded-[22px] border border-slate-100 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar className="h-11 w-11">
          <AvatarFallback className="bg-[#1dbf73]/10 text-sm font-black text-[#119d5c]">
            {review.avatar}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-black text-slate-950">{review.name}</h4>

            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-bold text-yellow-700">
              <Star className="h-3.5 w-3.5 fill-current" />
              {review.rating}
            </span>

            <span className="text-xs font-semibold text-slate-400">
              {review.time}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {review.text}
          </p>

          {review.replies?.length > 0 && (
            <div className="mt-3 space-y-2 rounded-[16px] border border-[#1dbf73]/10 bg-[#1dbf73]/5 p-3">
              {review.replies.map((reply) => (
                <div key={reply.id}>
                  <p className="text-xs font-bold text-[#119d5c]">
                    Shop replied
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {reply.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onUseful(review.id)}
              className="h-9 rounded-full px-3 text-xs font-bold text-slate-600 hover:bg-[#1dbf73]/10 hover:text-[#119d5c]"
            >
              <Heart className="mr-1.5 h-4 w-4" />
              Useful {review.useful}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => onReply(review)}
              className="h-9 rounded-full px-3 text-xs font-bold text-slate-600 hover:bg-[#1dbf73]/10 hover:text-[#119d5c]"
            >
              <MessageCircle className="mr-1.5 h-4 w-4" />
              Reply
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="h-9 rounded-full px-3 text-xs font-bold text-slate-600 hover:bg-[#1dbf73]/10 hover:text-[#119d5c]"
            >
              <Share2 className="mr-1.5 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductModal({
  open,
  mode,
  form,
  imageInputRef,
  error,
  onClose,
  onChange,
  onImageChange,
  onRemoveImage,
  onSave,
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              {mode === "edit" ? "Edit Product" : "Add Product"}
            </h2>
            <p className="text-sm text-slate-500">
              Manage product details shown on your shop page.
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {error && (
            <div className="mb-4 rounded-[16px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
            <div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />

              <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50">
                <div className="h-48">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt={form.name || "Product"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <EmptyImageBox icon={Package} />
                  )}
                </div>

                <div className="space-y-2 p-3">
                  <Button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="h-10 w-full rounded-full bg-[#1dbf73] text-sm font-bold text-white hover:bg-[#19a965]"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>

                  {form.image && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onRemoveImage}
                      className="h-10 w-full rounded-full border-red-100 bg-red-50 text-sm font-bold text-red-600 hover:bg-red-100 hover:text-red-700"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Image
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Product Name
                </label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Enter product name"
                  className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Price
                  </label>
                  <Input
                    name="price"
                    value={form.price}
                    onChange={onChange}
                    placeholder="৳0"
                    className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Category
                  </label>
                  <Input
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    placeholder="Category"
                    className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Badge
                </label>
                <Input
                  name="badge"
                  value={form.badge}
                  onChange={onChange}
                  placeholder="Popular, Fresh, Best Deal"
                  className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  rows={4}
                  placeholder="Write product description..."
                  className="w-full resize-none rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-[#1dbf73] focus:bg-white focus:ring-2 focus:ring-[#1dbf73]/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-11 rounded-full px-6 font-bold"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onSave}
            className="h-11 rounded-full bg-[#1dbf73] px-6 font-bold text-white hover:bg-[#19a965]"
          >
            <Save className="mr-2 h-4 w-4" />
            {mode === "edit" ? "Update Product" : "Save Product"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function ShopModal({ open, form, error, onClose, onChange, onSave }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Edit Shop Information
            </h2>
            <p className="text-sm text-slate-500">
              Update the public information of your shop.
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {error && (
            <div className="mb-4 rounded-[16px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Shop Name
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={onChange}
                className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Username
              </label>
              <Input
                name="username"
                value={form.username}
                onChange={onChange}
                className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Category
              </label>
              <Input
                name="category"
                value={form.category}
                onChange={onChange}
                className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Location
              </label>
              <Input
                name="location"
                value={form.location}
                onChange={onChange}
                className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Phone
              </label>
              <Input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email
              </label>
              <Input
                name="email"
                value={form.email}
                onChange={onChange}
                className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Business Hours
              </label>
              <Input
                name="openTime"
                value={form.openTime}
                onChange={onChange}
                className="h-12 rounded-[14px] bg-slate-50 focus-visible:ring-[#1dbf73]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                rows={5}
                className="w-full resize-none rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-[#1dbf73] focus:bg-white focus:ring-2 focus:ring-[#1dbf73]/20"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-11 rounded-full px-6 font-bold"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onSave}
            className="h-11 rounded-full bg-[#1dbf73] px-6 font-bold text-white hover:bg-[#19a965]"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Shop
          </Button>
        </div>
      </div>
    </div>
  )
}

function ReplyModal({ review, value, onChange, onClose, onSave }) {
  if (!review) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[26px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Reply to Review
            </h2>
            <p className="text-sm text-slate-500">{review.name}</p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-[18px] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            {review.text}
          </div>

          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={5}
            placeholder="Write your reply..."
            className="w-full resize-none rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-[#1dbf73] focus:bg-white focus:ring-2 focus:ring-[#1dbf73]/20"
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 rounded-full px-6 font-bold"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={onSave}
              className="h-11 rounded-full bg-[#1dbf73] px-6 font-bold text-white hover:bg-[#19a965]"
            >
              Send Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MyShopPage() {
  const coverInputRef = useRef(null)
  const logoInputRef = useRef(null)
  const productImageInputRef = useRef(null)

  const [shop, setShop] = useState(() =>
    getStoredData(SHOP_STORAGE_KEY, defaultShop)
  )
  const [products, setProducts] = useState(() =>
    getStoredData(PRODUCTS_STORAGE_KEY, defaultProducts)
  )
  const [reviews, setReviews] = useState(() =>
    getStoredData(REVIEWS_STORAGE_KEY, defaultReviews)
  )

  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [toast, setToast] = useState("")

  const [showProductModal, setShowProductModal] = useState(false)
  const [productMode, setProductMode] = useState("add")
  const [productError, setProductError] = useState("")
  const [productForm, setProductForm] = useState({
    id: null,
    name: "",
    price: "",
    category: "",
    image: "",
    badge: "",
    description: "",
  })

  const [showShopModal, setShowShopModal] = useState(false)
  const [shopForm, setShopForm] = useState(shop)
  const [shopError, setShopError] = useState("")

  const [replyReview, setReplyReview] = useState(null)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    localStorage.setItem(SHOP_STORAGE_KEY, JSON.stringify(shop))
  }, [shop])

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews))
  }, [reviews])

  const showToast = (message) => {
    setToast(message)

    setTimeout(() => {
      setToast("")
    }, 2500)
  }

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0]

    readImageFile(file, (image) => {
      setShop((prev) => ({ ...prev, coverImage: image }))
      showToast("Cover photo updated.")
    })
  }

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0]

    readImageFile(file, (image) => {
      setShop((prev) => ({ ...prev, logoImage: image }))
      showToast("Shop logo updated.")
    })
  }

  const openAddProductModal = () => {
    setProductMode("add")
    setProductError("")
    setProductForm({
      id: null,
      name: "",
      price: "",
      category: "",
      image: "",
      badge: "",
      description: "",
    })
    setShowProductModal(true)
  }

  const openEditProductModal = (product) => {
    setProductMode("edit")
    setProductError("")
    setProductForm(product)
    setShowProductModal(true)
  }

  const handleProductChange = (e) => {
    setProductError("")
    setProductForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleProductImageChange = (e) => {
    const file = e.target.files?.[0]

    readImageFile(file, (image) => {
      setProductForm((prev) => ({ ...prev, image }))
    })
  }

  const handleSaveProduct = () => {
    if (!productForm.name.trim()) {
      setProductError("Product name is required.")
      return
    }

    if (!productForm.price.trim()) {
      setProductError("Product price is required.")
      return
    }

    if (!productForm.category.trim()) {
      setProductError("Product category is required.")
      return
    }

    if (productMode === "edit") {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === productForm.id ? { ...productForm } : item
        )
      )
      showToast("Product updated successfully.")
    } else {
      setProducts((prev) => [
        {
          ...productForm,
          id: Date.now(),
          badge: productForm.badge || "New",
        },
        ...prev,
      ])
      showToast("Product added successfully.")
    }

    setShowProductModal(false)
  }

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?")

    if (!confirmed) return

    setProducts((prev) => prev.filter((item) => item.id !== id))
    showToast("Product deleted.")
  }

  const openShopModal = () => {
    setShopForm(shop)
    setShopError("")
    setShowShopModal(true)
  }

  const handleShopChange = (e) => {
    setShopError("")
    setShopForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSaveShop = () => {
    if (!shopForm.name.trim()) {
      setShopError("Shop name is required.")
      return
    }

    if (!shopForm.category.trim()) {
      setShopError("Shop category is required.")
      return
    }

    if (!shopForm.location.trim()) {
      setShopError("Shop location is required.")
      return
    }

    setShop(shopForm)
    setShowShopModal(false)
    showToast("Shop information updated.")
  }

  const handleUsefulReview = (id) => {
    setReviews((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, useful: item.useful + 1 } : item
      )
    )
  }

  const openReplyModal = (review) => {
    setReplyReview(review)
    setReplyText("")
  }

  const handleSaveReply = () => {
    if (!replyText.trim()) return

    setReviews((prev) =>
      prev.map((item) =>
        item.id === replyReview.id
          ? {
            ...item,
            replies: [
              ...(item.replies || []),
              {
                id: Date.now(),
                text: replyText,
              },
            ],
          }
          : item
      )
    )

    setReplyReview(null)
    setReplyText("")
    showToast("Reply added.")
  }

  const filteredProducts = products.filter((product) => {
    const value = searchTerm.toLowerCase()

    return (
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value) ||
      product.price.toLowerCase().includes(value)
    )
  })

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "products", label: "Products" },
    { id: "reviews", label: "Reviews" },
    { id: "about", label: "About" },
  ]

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed right-5 top-24 z-[9999] flex items-center gap-3 rounded-[18px] border border-[#1dbf73]/20 bg-white px-5 py-4 text-sm font-bold text-[#119d5c] shadow-2xl">
          <CheckCircle2 className="h-5 w-5" />
          {toast}
        </div>
      )}

      <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-0">
          <div
            className="relative h-[300px] bg-gradient-to-br from-[#1dbf73] via-[#119d5c] to-[#043b24]"
            style={
              shop.coverImage
                ? {
                  backgroundImage: `linear-gradient(to bottom, rgba(4,59,36,0.08), rgba(4,59,36,0.68)), url(${shop.coverImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
                : undefined
            }
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.28),transparent_25%),radial-gradient(circle_at_82%_15%,rgba(29,191,115,0.35),transparent_28%)]" />

            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />

            <div className="absolute bottom-5 right-5 flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="h-10 rounded-full bg-white/95 px-4 text-sm font-bold text-slate-900 shadow-lg hover:bg-white"
              >
                <Camera className="mr-2 h-4 w-4" />
                Edit Cover Photo
              </Button>

              {shop.coverImage && (
                <Button
                  type="button"
                  onClick={() => {
                    setShop((prev) => ({ ...prev, coverImage: "" }))
                    showToast("Cover photo removed.")
                  }}
                  variant="destructive"
                  className="h-10 rounded-full px-4 text-sm font-bold shadow-lg"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
          </div>

          <div className="relative px-5 pb-5 sm:px-8">
            <div className="-mt-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="group relative h-36 w-36 shrink-0 rounded-[28px] border-4 border-white bg-white shadow-xl">
                  <Avatar className="h-full w-full rounded-[24px]">
                    <AvatarImage src={shop.logoImage} alt={shop.name} />
                    <AvatarFallback className="rounded-[24px] bg-[#1dbf73]/10 text-[#119d5c]">
                      <Store className="h-14 w-14" />
                    </AvatarFallback>
                  </Avatar>

                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-slate-700 shadow-md transition hover:bg-[#1dbf73] hover:text-white"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                </div>

                <div className="pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                      {shop.name}
                    </h1>

                    <span className="inline-flex items-center gap-1 rounded-full bg-[#1dbf73]/10 px-3 py-1 text-xs font-bold text-[#119d5c]">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {shop.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {shop.username} · {shop.category}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {shop.location}
                    </span>

                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      {shop.rating} rating
                    </span>

                    <span>{reviews.length} reviews</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pb-2">
                <Button
                  type="button"
                  onClick={openShopModal}
                  className="h-11 rounded-full bg-[#1dbf73] px-5 font-bold text-white shadow-lg shadow-emerald-100 hover:bg-[#19a965]"
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Shop
                </Button>

                <Button
                  type="button"
                  onClick={openAddProductModal}
                  variant="outline"
                  className="h-11 rounded-full border-slate-200 px-5 font-bold hover:border-[#1dbf73]/30 hover:bg-[#1dbf73]/10 hover:text-[#119d5c]"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Add Product
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-full border-slate-200 px-5 font-bold hover:border-[#1dbf73]/30 hover:bg-[#1dbf73]/10 hover:text-[#119d5c]"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full border-slate-200 hover:border-[#1dbf73]/30 hover:bg-[#1dbf73]/10 hover:text-[#119d5c]"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-1">
              <div className="flex gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative h-12 shrink-0 px-4 text-sm font-bold transition ${activeTab === tab.id
                      ? "text-[#119d5c]"
                      : "text-slate-500 hover:text-slate-900"
                      }`}
                  >
                    {tab.label}

                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-3 right-3 h-1 rounded-full bg-[#1dbf73]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-6">
          <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <h2 className="text-lg font-black text-slate-950">Shop Intro</h2>

              <p className="mt-3 rounded-[18px] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {shop.description}
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Building2 className="mt-0.5 h-5 w-5 text-[#119d5c]" />
                  <div>
                    <p className="font-bold text-slate-900">Category</p>
                    <p>{shop.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#119d5c]" />
                  <div>
                    <p className="font-bold text-slate-900">Location</p>
                    <p>{shop.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Clock3 className="mt-0.5 h-5 w-5 text-[#119d5c]" />
                  <div>
                    <p className="font-bold text-slate-900">Business Hours</p>
                    <p>{shop.openTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Phone className="mt-0.5 h-5 w-5 text-[#119d5c]" />
                  <div>
                    <p className="font-bold text-slate-900">Phone</p>
                    <p>{shop.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Mail className="mt-0.5 h-5 w-5 text-[#119d5c]" />
                  <div>
                    <p className="font-bold text-slate-900">Email</p>
                    <p>{shop.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <StatBox value={shop.followers} label="Followers" icon={Users} />
            <StatBox value={products.length} label="Products" icon={ShoppingBag} />
            <StatBox value={shop.rating} label="Rating" icon={Star} />
            <StatBox value={reviews.length} label="Reviews" icon={MessageCircle} />
          </div>

          <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#1dbf73]/10 text-[#119d5c]">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-black text-slate-950">Verified Shop</h3>
                  <p className="text-sm text-slate-500">
                    This shop passed verification.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {(activeTab === "overview" || activeTab === "products") && (
            <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-black text-slate-950">
                      {activeTab === "overview"
                        ? "Featured Products"
                        : "Products"}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Manage products listed in your shop.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search product..."
                        className="h-10 w-full rounded-full bg-slate-50 pl-9 focus-visible:ring-[#1dbf73] sm:w-[240px]"
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={openAddProductModal}
                      className="h-10 rounded-full bg-[#1dbf73] px-4 font-bold text-white hover:bg-[#19a965]"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </div>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={openEditProductModal}
                        onDelete={handleDeleteProduct}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-[240px] items-center justify-center rounded-[22px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <div>
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1dbf73]/10 text-[#119d5c]">
                        <Package className="h-7 w-7" />
                      </div>
                      <h3 className="mt-4 text-lg font-black text-slate-950">
                        No products found
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Add a product or try a different search keyword.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {(activeTab === "overview" || activeTab === "reviews") && (
            <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-950">
                      Customer Reviews
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Manage feedback, replies, and shop reputation.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {reviews.map((review) => (
                    <ReviewItem
                      key={review.id}
                      review={review}
                      onUseful={handleUsefulReview}
                      onReply={openReplyModal}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "about" && (
            <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-black text-slate-950">
                      About Shop
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Public shop information and contact details.
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={openShopModal}
                    className="h-10 rounded-full bg-[#1dbf73] px-4 font-bold text-white hover:bg-[#19a965]"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    ["Shop Name", shop.name],
                    ["Username", shop.username],
                    ["Category", shop.category],
                    ["Location", shop.location],
                    ["Phone", shop.phone],
                    ["Email", shop.email],
                    ["Business Hours", shop.openTime],
                    ["Status", shop.status],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[18px] bg-slate-50 p-4">
                      <p className="text-sm font-bold text-slate-500">
                        {label}
                      </p>
                      <p className="mt-1 font-black text-slate-950">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 rounded-[18px] bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                  {shop.description}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ProductModal
        open={showProductModal}
        mode={productMode}
        form={productForm}
        imageInputRef={productImageInputRef}
        error={productError}
        onClose={() => setShowProductModal(false)}
        onChange={handleProductChange}
        onImageChange={handleProductImageChange}
        onRemoveImage={() =>
          setProductForm((prev) => ({ ...prev, image: "" }))
        }
        onSave={handleSaveProduct}
      />

      <ShopModal
        open={showShopModal}
        form={shopForm}
        error={shopError}
        onClose={() => setShowShopModal(false)}
        onChange={handleShopChange}
        onSave={handleSaveShop}
      />

      <ReplyModal
        review={replyReview}
        value={replyText}
        onChange={setReplyText}
        onClose={() => setReplyReview(null)}
        onSave={handleSaveReply}
      />
    </div>
  )
}