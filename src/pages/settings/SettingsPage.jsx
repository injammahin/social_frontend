import React, { useRef, useState } from "react"
import { Bell, LockKeyhole, Palette, ShieldCheck } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const settings = [
  {
    title: "Account Security",
    description: "Password, login verification, and account safety settings.",
    icon: LockKeyhole,
  },
  {
    title: "Notifications",
    description: "Control email, app, and review notification preferences.",
    icon: Bell,
  },
  {
    title: "Privacy",
    description: "Manage profile visibility and review privacy options.",
    icon: ShieldCheck,
  },
  {
    title: "Appearance",
    description: "Customize theme preference and interface experience.",
    icon: Palette,
  },
]

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <Card className="rounded-[22px] border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <h1 className="text-2xl font-black text-slate-950">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account, privacy, notification, and platform preferences.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {settings.map((item) => {
          const Icon = item.icon

          return (
            <Card
              key={item.title}
              className="rounded-[22px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#1dbf73]/10 text-[#119d5c]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-black text-slate-950">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-1 h-5 w-5 accent-[#1dbf73]"
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}