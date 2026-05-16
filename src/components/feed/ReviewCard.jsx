import React from "react"
import {
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Star,
  Store,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ReviewCard({ review }) {
  return (
    <Card className="rounded-[12px] border-0 bg-white shadow-sm ring-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarFallback className="bg-[#1dbf73]/10 text-sm font-bold text-[#119d5c]">
                  {review.reviewer.avatar}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-bold text-slate-950">
                    {review.reviewer.name}
                  </h3>

                  <span className="text-xs text-slate-400">reviewed</span>

                  <Badge className="rounded-[8px] bg-[#1dbf73]/10 px-2.5 py-1 text-xs font-semibold text-[#119d5c] shadow-none hover:bg-[#1dbf73]/10">
                    <Store className="mr-1 h-3.5 w-3.5" />
                    {review.shopName}
                  </Badge>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{review.date}</span>
                  <span className="text-slate-300">•</span>
                  <span>{review.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {review.location}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-[10px] text-slate-500 hover:bg-slate-100 hover:text-slate-900 [&_svg]:!size-5"
            >
              <MoreHorizontal />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 pb-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-[8px] bg-yellow-50 px-2.5 py-1.5 text-sm font-bold text-yellow-700">
              <Star className="h-4 w-4 fill-current" />
              {review.rating}
            </div>

            <p className="text-sm font-medium text-slate-500">
              Customer rating
            </p>
          </div>

          <h2 className="text-lg font-bold leading-snug text-slate-950">
            {review.title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {review.content}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {review.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[8px] bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="px-5 pb-4">
          <div className="overflow-hidden rounded-[12px] bg-slate-100">
            <img
              src={review.image}
              alt={review.shopName}
              className="h-56 w-full object-cover transition duration-300 hover:scale-[1.02] sm:h-64"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="px-5">
          <div className="flex flex-col gap-2 rounded-[12px] bg-slate-50 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>{review.likes} people found this useful</span>
            <span>
              {review.comments} comments · {review.shares} shares
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2 p-5 pt-3">
          <Button
            variant="ghost"
            className="h-11 rounded-[12px] text-sm font-semibold text-slate-600 hover:bg-[#1dbf73]/10 hover:text-[#119d5c] [&_svg]:!size-5"
          >
            <Heart className="mr-2" />
            Useful
          </Button>

          <Button
            variant="ghost"
            className="h-11 rounded-[12px] text-sm font-semibold text-slate-600 hover:bg-[#1dbf73]/10 hover:text-[#119d5c] [&_svg]:!size-5"
          >
            <MessageCircle className="mr-2" />
            Comment
          </Button>

          <Button
            variant="ghost"
            className="h-11 rounded-[12px] text-sm font-semibold text-slate-600 hover:bg-[#1dbf73]/10 hover:text-[#119d5c] [&_svg]:!size-5"
          >
            <Share2 className="mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}