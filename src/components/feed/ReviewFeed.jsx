import React, { useMemo, useState } from "react"
import {
  BadgeCheck,
  Bookmark,
  Camera,
  Clapperboard,
  Heart,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Play,
  Search,
  Send,
  Share2,
  ShoppingBag,
  Smile,
  Sparkles,
  Star,
  Store,
  ThumbsUp,
  TrendingUp,
  Video,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { useMode } from "@/context/ModeContext"

const feedPosts = [
  {
    id: 1,
    type: "post",
    author: "Green Valley Mart",
    avatar: "GV",
    role: "Verified Grocery Shop",
    time: "12 min ago",
    location: "Banani, Dhaka",
    title: "Fresh grocery stock arrived today",
    text: "New vegetables, fruits, snacks, and daily essentials are available today. Customers can visit for fresh items and better deals.",
    mediaType: "image",
    media:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80",
    likes: 284,
    comments: 38,
    shares: 12,
  },
  {
    id: 2,
    type: "reel",
    author: "Tech Planet BD",
    avatar: "TP",
    role: "Electronics Shop",
    time: "35 min ago",
    location: "Bashundhara City",
    title: "Latest phone accessories reel",
    text: "Quick reel showing our latest phone covers, chargers, earbuds, power banks, and gadget accessories.",
    mediaType: "video",
    media:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    likes: 521,
    comments: 64,
    shares: 29,
  },
  {
    id: 3,
    type: "video",
    author: "Urban Style Hub",
    avatar: "US",
    role: "Fashion Store",
    time: "1 hour ago",
    location: "Dhanmondi, Dhaka",
    title: "New winter collection walkthrough",
    text: "A short product showcase video for our new fashion collection. Message us for size availability.",
    mediaType: "video",
    media: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    likes: 398,
    comments: 44,
    shares: 17,
  },
  {
    id: 4,
    type: "post",
    author: "Daily Fresh Basket",
    avatar: "DF",
    role: "Fresh Food Shop",
    time: "2 hours ago",
    location: "Mirpur, Dhaka",
    title: "Weekend family grocery package",
    text: "Special weekend package with fruits, vegetables, rice, oil, and daily kitchen essentials.",
    mediaType: "image",
    media:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1400&q=80",
    likes: 176,
    comments: 21,
    shares: 8,
  },
  {
    id: 5,
    type: "post",
    author: "Coffee Corner BD",
    avatar: "CC",
    role: "Cafe",
    time: "3 hours ago",
    location: "Gulshan, Dhaka",
    title: "New coffee menu launched",
    text: "Try our new caramel latte, cold brew, and chocolate muffin combo. Available from today.",
    mediaType: "image",
    media:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
    likes: 312,
    comments: 26,
    shares: 15,
  },
  {
    id: 6,
    type: "post",
    author: "Book Nest",
    avatar: "BN",
    role: "Book Store",
    time: "5 hours ago",
    location: "Uttara, Dhaka",
    title: "Academic and fiction books restocked",
    text: "New academic books, novels, Islamic books, and children’s story books are now available.",
    mediaType: "image",
    media:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=80",
    likes: 141,
    comments: 19,
    shares: 5,
  },
]

const reels = [
  {
    id: 1,
    title: "Fresh Stock",
    author: "Green Valley",
    cover:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "Tech Deals",
    author: "Tech Planet",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "Fashion Walk",
    author: "Urban Style",
    cover:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    title: "Fruit Basket",
    author: "Daily Fresh",
    cover:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80",
  },
]

const reviewPosts = [
  {
    id: 1,
    reviewer: "Arif Hasan",
    avatar: "AH",
    shop: "Green Valley Mart",
    category: "Grocery Shop",
    location: "Banani, Dhaka",
    time: "2 hours ago",
    rating: "4.8",
    title: "Clean shop, good behavior, and fresh products",
    text: "I visited this shop today. Their product arrangement is clean, staff behavior was professional, and most grocery items were fresh. Pricing was also reasonable compared to nearby shops.",
    tags: ["Fresh Products", "Good Service", "Clean Environment"],
    image:
      "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=1400&q=80",
    useful: 42,
    comments: 9,
  },
  {
    id: 2,
    reviewer: "Nusrat Jahan",
    avatar: "NJ",
    shop: "Tech Planet BD",
    category: "Electronics",
    location: "Bashundhara City",
    time: "4 hours ago",
    rating: "4.9",
    title: "Helpful staff and original accessories",
    text: "The staff explained product warranty clearly. I bought a charger and earbuds. Packaging looked original, and the price was fair.",
    tags: ["Original Product", "Warranty", "Helpful Staff"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    useful: 31,
    comments: 6,
  },
  {
    id: 3,
    reviewer: "Tanvir Ahmed",
    avatar: "TA",
    shop: "Urban Style Hub",
    category: "Fashion Store",
    location: "Dhanmondi, Dhaka",
    time: "1 day ago",
    rating: "4.6",
    title: "Good quality clothing and nice collection",
    text: "Their collection is modern and the shop looked organized. Some items were slightly expensive, but quality was good.",
    tags: ["Fashion", "Good Quality", "Organized"],
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
    useful: 18,
    comments: 3,
  },
  {
    id: 4,
    reviewer: "Mehedi Islam",
    avatar: "MI",
    shop: "Coffee Corner BD",
    category: "Cafe",
    location: "Gulshan, Dhaka",
    time: "2 days ago",
    rating: "4.7",
    title: "Nice environment and good coffee",
    text: "The cafe environment was clean and calm. Coffee taste was good. Staff behavior was also friendly.",
    tags: ["Coffee", "Clean Place", "Friendly Staff"],
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
    useful: 24,
    comments: 5,
  },
  {
    id: 5,
    reviewer: "Sadia Rahman",
    avatar: "SR",
    shop: "Book Nest",
    category: "Book Store",
    location: "Uttara, Dhaka",
    time: "3 days ago",
    rating: "4.5",
    title: "Good book collection and organized shelves",
    text: "They have a good collection of academic books and fiction. The shelves are organized, but some books were out of stock.",
    tags: ["Books", "Organized", "Good Collection"],
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=80",
    useful: 16,
    comments: 4,
  },
]

function PremiumFeedHeader({ activeTab, setActiveTab, searchTerm, setSearchTerm }) {
  const totalFeed = feedPosts.length
  const totalReviews = reviewPosts.length

  return (
    <Card className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-white via-[#f8fffb] to-[#eefbf4] px-4 pt-4 sm:px-5 sm:pt-5">
          <div className="grid grid-cols-2 gap-3 rounded-[22px] bg-slate-100/80 p-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("feed")}
              className={`group relative overflow-hidden rounded-[18px] px-4 py-4 text-left transition-all duration-300 ${activeTab === "feed"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:bg-white/60 hover:text-slate-800"
                }`}
            >
              {activeTab === "feed" && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#1dbf73]" />
              )}

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-[16px] transition ${activeTab === "feed"
                      ? "bg-[#1dbf73]/10 text-[#119d5c]"
                      : "bg-white text-slate-500"
                      }`}
                  >
                    <Clapperboard className="h-6 w-6" />
                  </span>

                  <div>
                    <p className="text-lg font-black">Feed</p>
                    <p className="mt-0.5 hidden text-xs font-semibold text-slate-500 sm:block">
                      Posts, reels, videos
                    </p>
                  </div>
                </div>

                <span
                  className={`hidden rounded-full px-3 py-1 text-xs font-black sm:inline-flex ${activeTab === "feed"
                    ? "bg-[#1dbf73]/10 text-[#119d5c]"
                    : "bg-white text-slate-500"
                    }`}
                >
                  {totalFeed}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`group relative overflow-hidden rounded-[18px] px-4 py-4 text-left transition-all duration-300 ${activeTab === "reviews"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:bg-white/60 hover:text-slate-800"
                }`}
            >
              {activeTab === "reviews" && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#1dbf73]" />
              )}

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-[16px] transition ${activeTab === "reviews"
                      ? "bg-[#1dbf73]/10 text-[#119d5c]"
                      : "bg-white text-slate-500"
                      }`}
                  >
                    <Star className="h-6 w-6" />
                  </span>

                  <div>
                    <p className="text-lg font-black">Reviews</p>
                    <p className="mt-0.5 hidden text-xs font-semibold text-slate-500 sm:block">
                      Ratings, feedback
                    </p>
                  </div>
                </div>

                <span
                  className={`hidden rounded-full px-3 py-1 text-xs font-black sm:inline-flex ${activeTab === "reviews"
                    ? "bg-[#1dbf73]/10 text-[#119d5c]"
                    : "bg-white text-slate-500"
                    }`}
                >
                  {totalReviews}
                </span>
              </div>
            </button>
          </div>


        </div>

        <div className="border-t border-slate-100 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  activeTab === "feed"
                    ? "Search feed posts, reels, videos, shops, or locations..."
                    : "Search reviews, reviewers, shops, ratings, or locations..."
                }
                className="h-12 rounded-[16px] border-slate-200 bg-slate-50 pl-12 text-sm font-medium shadow-none focus-visible:bg-white focus-visible:ring-[#1dbf73]"
              />
            </div>

            <Button className="h-12 rounded-[16px] bg-[#1dbf73] px-8 font-bold text-white shadow-lg shadow-emerald-100 hover:bg-[#19a965]">
              Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Composer() {
  const { user } = useAuth()
  const { isSeller } = useMode()

  return (
    <Card className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
      <CardContent className="p-0">
        <div className="p-4 sm:p-5">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 border border-slate-200">
              <AvatarImage src={user?.avatarImage} alt={user?.fullName} />
              <AvatarFallback className="bg-[#1dbf73]/10 font-black text-[#119d5c]">
                {user?.avatar || "U"}
              </AvatarFallback>
            </Avatar>

            <button
              type="button"
              className="flex h-12 flex-1 items-center rounded-full bg-slate-100 px-5 text-left text-sm font-semibold text-slate-500 transition hover:bg-slate-200"
            >
              {isSeller
                ? "Share shop update, offer, product, reel, or video..."
                : "Share your shop experience or discover trusted places..."}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-slate-100">
          <button
            type="button"
            className="flex h-14 items-center justify-center gap-2 text-sm font-black text-slate-600 transition hover:bg-slate-50 hover:text-[#119d5c]"
          >
            <Video className="h-5 w-5 text-red-500" />
            Video
          </button>

          <button
            type="button"
            className="flex h-14 items-center justify-center gap-2 border-x border-slate-100 text-sm font-black text-slate-600 transition hover:bg-slate-50 hover:text-[#119d5c]"
          >
            <ImageIcon className="h-5 w-5 text-[#1dbf73]" />
            Photo
          </button>

          <button
            type="button"
            className="flex h-14 items-center justify-center gap-2 text-sm font-black text-slate-600 transition hover:bg-slate-50 hover:text-[#119d5c]"
          >
            <Smile className="h-5 w-5 text-yellow-500" />
            Feeling
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

function ReelsStrip() {
  return (
    <Card className="rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
      <CardContent className="p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              Reels & Videos
            </h2>
            <p className="text-sm text-slate-500">
              Short shop updates, product previews, and offers.
            </p>
          </div>

          <Button
            variant="ghost"
            className="rounded-full font-bold text-[#119d5c] hover:bg-[#1dbf73]/10 hover:text-[#119d5c]"
          >
            See All
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {reels.map((item) => (
            <div
              key={item.id}
              className="group relative h-[220px] overflow-hidden rounded-[22px] bg-slate-100 shadow-sm"
            >
              <img
                src={item.cover}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

              <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#119d5c] shadow">
                <Play className="h-5 w-5 fill-current" />
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="text-xs font-medium text-white/75">
                  {item.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function FeedPost({ item, liked, saved, onLike, onSave }) {
  return (
    <Card className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <Avatar className="h-12 w-12 border border-slate-200">
                <AvatarFallback className="bg-[#1dbf73]/10 font-black text-[#119d5c]">
                  {item.avatar}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black text-slate-950">{item.author}</h3>

                  <span className="rounded-full bg-[#1dbf73]/10 px-2.5 py-1 text-xs font-bold text-[#119d5c]">
                    {item.type === "reel"
                      ? "Reel"
                      : item.type === "video"
                        ? "Video"
                        : "Post"}
                  </span>

                  <BadgeCheck className="h-4 w-4 text-[#119d5c]" />
                </div>

                <p className="mt-1 flex flex-wrap items-center gap-1 text-xs font-medium text-slate-500">
                  {item.time} · {item.role} · <MapPin className="h-3.5 w-3.5" />
                  {item.location}
                </p>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-5 w-5 text-slate-500" />
            </Button>
          </div>

          <h2 className="mt-4 text-xl font-black text-slate-950">
            {item.title}
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
        </div>

        <div className="bg-slate-100">
          {item.mediaType === "video" ? (
            <video
              src={item.media}
              controls
              className="max-h-[520px] w-full bg-black object-cover"
            />
          ) : (
            <img
              src={item.media}
              alt={item.title}
              className="max-h-[520px] w-full object-cover"
            />
          )}
        </div>

        <div className="px-5 py-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1dbf73] text-white">
                <ThumbsUp className="h-4 w-4" />
              </span>
              {liked ? item.likes + 1 : item.likes}
            </span>

            <span>
              {item.comments} comments · {item.shares} shares
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onLike(item.id)}
              className={`h-10 rounded-[14px] font-bold ${liked
                ? "bg-[#1dbf73]/10 text-[#119d5c]"
                : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="h-10 rounded-[14px] font-bold text-slate-600 hover:bg-slate-100"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Comment
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="h-10 rounded-[14px] font-bold text-slate-600 hover:bg-slate-100"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => onSave(item.id)}
              className={`h-10 rounded-[14px] font-bold ${saved
                ? "bg-[#1dbf73]/10 text-[#119d5c]"
                : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReviewPost({ review, useful, saved, onUseful, onSave }) {
  return (
    <Card className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <Avatar className="h-12 w-12 border border-slate-200">
                <AvatarFallback className="bg-[#1dbf73]/10 font-black text-[#119d5c]">
                  {review.avatar}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black text-slate-950">
                    {review.reviewer}
                  </h3>

                  <span className="text-sm text-slate-400">reviewed</span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#1dbf73]/10 px-2.5 py-1 text-xs font-bold text-[#119d5c]">
                    <Store className="h-3.5 w-3.5" />
                    {review.shop}
                  </span>
                </div>

                <p className="mt-1 flex flex-wrap items-center gap-1 text-xs font-medium text-slate-500">
                  {review.time} · {review.category} ·{" "}
                  <MapPin className="h-3.5 w-3.5" />
                  {review.location}
                </p>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-5 w-5 text-slate-500" />
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-[10px] bg-yellow-50 px-3 py-2 text-sm font-black text-yellow-700">
              <Star className="h-4 w-4 fill-current" />
              {review.rating}
            </span>

            <span className="text-sm font-bold text-slate-500">
              Customer rating
            </span>
          </div>

          <h2 className="mt-4 text-xl font-black text-slate-950">
            {review.title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">{review.text}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {review.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <img
          src={review.image}
          alt={review.title}
          className="max-h-[520px] w-full object-cover"
        />

        <div className="px-5 py-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm text-slate-500">
            <span>{useful ? review.useful + 1 : review.useful} useful votes</span>
            <span>{review.comments} comments</span>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onUseful(review.id)}
              className={`h-10 rounded-[14px] font-bold ${useful
                ? "bg-[#1dbf73]/10 text-[#119d5c]"
                : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Heart className="mr-2 h-4 w-4" />
              Useful
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="h-10 rounded-[14px] font-bold text-slate-600 hover:bg-slate-100"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Comment
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="h-10 rounded-[14px] font-bold text-slate-600 hover:bg-slate-100"
            >
              <Send className="mr-2 h-4 w-4" />
              Share
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => onSave(review.id)}
              className={`h-10 rounded-[14px] font-bold ${saved
                ? "bg-[#1dbf73]/10 text-[#119d5c]"
                : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ReviewFeed() {
  const [activeTab, setActiveTab] = useState("feed")
  const [searchTerm, setSearchTerm] = useState("")
  const [likedFeedIds, setLikedFeedIds] = useState([])
  const [savedFeedIds, setSavedFeedIds] = useState([])
  const [usefulReviewIds, setUsefulReviewIds] = useState([])
  const [savedReviewIds, setSavedReviewIds] = useState([])

  const filteredFeed = useMemo(() => {
    const value = searchTerm.toLowerCase().trim()

    if (!value) return feedPosts

    return feedPosts.filter((item) => {
      return (
        item.author.toLowerCase().includes(value) ||
        item.title.toLowerCase().includes(value) ||
        item.text.toLowerCase().includes(value) ||
        item.role.toLowerCase().includes(value) ||
        item.location.toLowerCase().includes(value) ||
        item.type.toLowerCase().includes(value)
      )
    })
  }, [searchTerm])

  const filteredReviews = useMemo(() => {
    const value = searchTerm.toLowerCase().trim()

    if (!value) return reviewPosts

    return reviewPosts.filter((review) => {
      return (
        review.reviewer.toLowerCase().includes(value) ||
        review.shop.toLowerCase().includes(value) ||
        review.category.toLowerCase().includes(value) ||
        review.location.toLowerCase().includes(value) ||
        review.title.toLowerCase().includes(value) ||
        review.text.toLowerCase().includes(value)
      )
    })
  }, [searchTerm])

  const toggleFeedLike = (id) => {
    setLikedFeedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleFeedSave = (id) => {
    setSavedFeedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleReviewUseful = (id) => {
    setUsefulReviewIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleReviewSave = (id) => {
    setSavedReviewIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-4">
      <PremiumFeedHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {activeTab === "feed" && (
        <>
          <Composer />
          <ReelsStrip />

          {filteredFeed.length > 0 ? (
            <div className="space-y-4">
              {filteredFeed.map((item) => (
                <FeedPost
                  key={item.id}
                  item={item}
                  liked={likedFeedIds.includes(item.id)}
                  saved={savedFeedIds.includes(item.id)}
                  onLike={toggleFeedLike}
                  onSave={toggleFeedSave}
                />
              ))}
            </div>
          ) : (
            <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
              <CardContent className="flex min-h-[260px] items-center justify-center p-8 text-center">
                <div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1dbf73]/10 text-[#119d5c]">
                    <Search className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-slate-950">
                    No feed posts found
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Try another shop, product, category, or location keyword.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {activeTab === "reviews" && (
        <>
          <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black text-slate-950">
                    Posted Reviews
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Only customer reviews are shown here.
                  </p>
                </div>

                <div className="rounded-full bg-[#1dbf73]/10 px-4 py-2 text-sm font-bold text-[#119d5c]">
                  {filteredReviews.length} reviews
                </div>
              </div>
            </CardContent>
          </Card>

          {filteredReviews.length > 0 ? (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <ReviewPost
                  key={review.id}
                  review={review}
                  useful={usefulReviewIds.includes(review.id)}
                  saved={savedReviewIds.includes(review.id)}
                  onUseful={toggleReviewUseful}
                  onSave={toggleReviewSave}
                />
              ))}
            </div>
          ) : (
            <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
              <CardContent className="flex min-h-[260px] items-center justify-center p-8 text-center">
                <div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1dbf73]/10 text-[#119d5c]">
                    <Star className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-slate-950">
                    No reviews found
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Search with another reviewer, shop, category, or location.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}