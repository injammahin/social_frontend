import React, { useRef, useState } from "react"
import { BadgeCheck, Bell, MessageSquareText, Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const notifications = [
  {
    title: "Your review received a useful vote",
    message: "A user found your Green Valley Mart review helpful.",
    time: "2 minutes ago",
    icon: Star,
  },
  {
    title: "Shop verification completed",
    message: "Green Valley Mart has been marked as verified.",
    time: "1 hour ago",
    icon: BadgeCheck,
  },
  {
    title: "New comment on your review",
    message: "Someone commented on your recent grocery shop review.",
    time: "3 hours ago",
    icon: MessageSquareText,
  },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-5">
      <Card className="rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <h1 className="text-2xl font-black text-slate-950">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View recent account, review, and shop activity.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="space-y-3">
            {notifications.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-[18px] border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[#1dbf73]/10 text-[#119d5c]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-black text-slate-950">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.message}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-slate-400">
                      {item.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}