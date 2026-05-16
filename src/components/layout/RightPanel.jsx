import React from "react"
import { BadgeCheck, Star, TrendingUp, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const topShops = [
  {
    name: "Green Valley Mart",
    type: "Grocery",
    rating: "4.8",
    avatar: "GV",
  },
  {
    name: "Tech Planet BD",
    type: "Electronics",
    rating: "4.9",
    avatar: "TP",
  },
  {
    name: "Urban Style Hub",
    type: "Fashion",
    rating: "4.5",
    avatar: "US",
  },
]

export default function RightPanel() {
  return (
    <aside className="space-y-4">
      <Card className="rounded-3xl border-slate-200 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-950">Top Rated Shops</h3>
              <p className="text-sm text-slate-500">Based on recent reviews</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1dbf73]/10 text-[#119d5c]">
              <Star className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {topShops.map((shop) => (
              <div key={shop.name} className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-slate-100 text-sm font-bold">
                      {shop.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {shop.name}
                    </p>
                    <p className="text-xs text-slate-500">{shop.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-bold text-yellow-700">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {shop.rating}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-slate-200 bg-slate-950 text-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
            <TrendingUp className="h-5 w-5 text-[#1dbf73]" />
          </div>

          <h3 className="mt-4 text-lg font-black">Review Insights</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Track customer feedback, shop reputation, and review quality from a
            single platform.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-xl font-black">12.4k</p>
              <p className="text-xs text-slate-300">Reviews</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-xl font-black">842</p>
              <p className="text-xs text-slate-300">Shops</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-[#1dbf73]/20 shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1dbf73]/10 text-[#119d5c]">
              <BadgeCheck className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-black">Verified Community</h3>
              <p className="text-xs text-slate-500">Real users, real reviews</p>
            </div>
          </div>

          <Button className="w-full rounded-full bg-[#1dbf73] font-bold text-white hover:bg-[#19a965]">
            <Users className="mr-2 h-4 w-4" />
            Invite Friends
          </Button>
        </CardContent>
      </Card>
    </aside>
  )
}