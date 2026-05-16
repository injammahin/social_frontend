import React, { useState } from "react"

import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  Flag,
  MessageSquareText,
  MoreHorizontal,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total Users",
    value: "24,892",
    change: "+12.8%",
    trend: "up",
    note: "Active reviewer accounts",
    icon: Users,
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Listed Shops",
    value: "1,284",
    change: "+8.4%",
    trend: "up",
    note: "Verified and pending shops",
    icon: Building2,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Total Reviews",
    value: "58,421",
    change: "+18.6%",
    trend: "up",
    note: "Published customer reviews",
    icon: MessageSquareText,
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Pending Reviews",
    value: "342",
    change: "-4.2%",
    trend: "down",
    note: "Waiting for approval",
    icon: Clock3,
    color: "from-orange-500 to-amber-500",
  },
]

const monthlyReviews = [
  { month: "Jan", approved: 3600, pending: 600 },
  { month: "Feb", approved: 5100, pending: 700 },
  { month: "Mar", approved: 3950, pending: 550 },
  { month: "Apr", approved: 6500, pending: 700 },
  { month: "May", approved: 5700, pending: 600 },
  { month: "Jun", approved: 7600, pending: 800 },
  { month: "Jul", approved: 7050, pending: 750 },
  { month: "Aug", approved: 8900, pending: 700 },
]

const healthTrend = [
  { day: "Mon", quality: 88 },
  { day: "Tue", quality: 91 },
  { day: "Wed", quality: 89 },
  { day: "Thu", quality: 94 },
  { day: "Fri", quality: 92 },
  { day: "Sat", quality: 96 },
  { day: "Sun", quality: 95 },
]

const reviewQuality = [
  { name: "Approved", value: 72, color: "#6366f1" },
  { name: "Pending", value: 18, color: "#06b6d4" },
  { name: "Rejected", value: 10, color: "#f97316" },
]

const topShops = [
  {
    name: "Green Valley Mart",
    category: "Grocery",
    rating: "4.9",
    reviews: "2,481",
    status: "Verified",
    avatar: "GV",
  },
  {
    name: "Tech Planet BD",
    category: "Electronics",
    rating: "4.8",
    reviews: "1,923",
    status: "Verified",
    avatar: "TP",
  },
  {
    name: "Urban Style Hub",
    category: "Fashion",
    rating: "4.7",
    reviews: "1,226",
    status: "Reviewing",
    avatar: "US",
  },
  {
    name: "Daily Fresh Basket",
    category: "Food",
    rating: "4.6",
    reviews: "984",
    status: "Verified",
    avatar: "DF",
  },
]

const recentActivities = [
  {
    title: "New shop submitted",
    description: "Daily Fresh Basket requested verification.",
    time: "3 min ago",
    icon: Building2,
  },
  {
    title: "Review flagged",
    description: "A user reported suspicious review activity.",
    time: "18 min ago",
    icon: Flag,
  },
  {
    title: "User verified",
    description: "New reviewer completed email OTP verification.",
    time: "42 min ago",
    icon: BadgeCheck,
  },
  {
    title: "Review approved",
    description: "12 pending reviews were approved by admin.",
    time: "1 hour ago",
    icon: CheckCircle2,
  },
]

const reports = [
  { title: "Fake Review Reports", value: "86", progress: 72 },
  { title: "Shop Complaints", value: "41", progress: 48 },
  { title: "User Abuse Reports", value: "19", progress: 32 },
]

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value)
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-[16px] border border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="mb-2 text-sm font-semibold text-slate-950">{label}</p>

      <div className="space-y-1.5">
        {payload.map((item) => (
          <div
            key={item.dataKey || item.name}
            className="flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium capitalize text-slate-500">
                {item.name || item.dataKey}
              </span>
            </div>

            <span className="text-xs font-semibold text-slate-950">
              {typeof item.value === "number"
                ? formatNumber(item.value)
                : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCard({ item }) {
  const Icon = item.icon
  const TrendIcon = item.trend === "up" ? ArrowUpRight : ArrowDownRight

  return (
    <Card className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.10)]">
      <CardContent className="relative p-5">
        <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${item.color} opacity-10 transition group-hover:scale-125`} />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-500">
              {item.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {item.value}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.trend === "up"
                    ? "bg-indigo-50 text-indigo-700"
                    : "bg-orange-50 text-orange-700"
                  }`}
              >
                <TrendIcon className="h-3.5 w-3.5" />
                {item.change}
              </span>

              <span className="text-xs font-medium text-slate-400">
                this month
              </span>
            </div>

            <p className="mt-3 text-xs font-medium text-slate-500">
              {item.note}
            </p>
          </div>

          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br ${item.color} text-white shadow-lg shadow-slate-200`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.07)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(99,102,241,0.16),transparent_28%),radial-gradient(circle_at_90%_22%,rgba(6,182,212,0.16),transparent_26%),linear-gradient(135deg,#ffffff_0%,#f8fafc_44%,#eef2ff_100%)]" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-cyan-500" />

      <div className="relative p-6 lg:p-8">
        <div className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Super Admin Command Center
          </div>

          <h1 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl xl:text-4xl">
            Control platform trust, reviews, users, and business growth from one clean dashboard.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Monitor users, shops, pending approvals, reports, suspicious activity, and reputation signals with an executive-level interface.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="h-11 rounded-[14px] bg-gradient-to-r from-indigo-600 to-violet-600 px-5 font-semibold text-white shadow-lg shadow-violet-200 hover:from-indigo-700 hover:to-violet-700">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Review Pending Items
            </Button>

            <Button
              variant="outline"
              className="h-11 rounded-[14px] border-slate-200 bg-white px-5 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Export Report
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-7 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Trust Score", "92.4%"],
              ["Uptime", "98.2%"],
              ["Avg Rating", "4.8"],
              ["Flagged Items", "86"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[18px] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl"
              >
                <p className="text-xl font-bold text-slate-950">{value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MonthlyReviewChart() {
  return (
    <Card className="rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
      <CardContent className="p-5 lg:p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-950">
              Monthly Review Growth
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Approved and pending review trend.
            </p>
          </div>

          <Button
            variant="outline"
            className="h-10 rounded-[14px] border-slate-200 font-semibold"
          >
            View Report
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="h-[340px] rounded-[22px] bg-slate-50 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyReviews} barGap={8}>
              <defs>
                <linearGradient id="approvedBar" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>

                <linearGradient id="pendingBar" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "rgba(15,23,42,0.04)" }}
              />
              <Bar
                dataKey="approved"
                name="Approved"
                fill="url(#approvedBar)"
                radius={[14, 14, 4, 4]}
                maxBarSize={44}
              />
              <Bar
                dataKey="pending"
                name="Pending"
                fill="url(#pendingBar)"
                radius={[14, 14, 4, 4]}
                maxBarSize={44}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function ReviewQualityDonut() {
  return (
    <Card className="rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
      <CardContent className="p-5 lg:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-950">
              Review Quality
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Approval distribution
            </p>
          </div>

          <MoreHorizontal className="h-5 w-5 text-slate-400" />
        </div>

        <div className="relative h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<ChartTooltip />} />
              <Pie
                data={reviewQuality}
                dataKey="value"
                nameKey="name"
                innerRadius={76}
                outerRadius={108}
                paddingAngle={4}
                stroke="none"
              >
                {reviewQuality.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl font-bold text-slate-950">72%</p>
              <p className="mt-1 text-xs font-semibold text-slate-400">
                Approved
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {reviewQuality.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-slate-600">
                  {item.name}
                </span>
              </div>

              <span className="text-sm font-semibold text-slate-950">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PlatformHealthChart() {
  return (
    <Card className="rounded-[26px] border border-slate-800 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white shadow-[0_30px_90px_rgba(15,23,42,0.16)]">
      <CardContent className="p-5 lg:p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Platform Health
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-tight">
              Quality Score Trend
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Review moderation quality and report activity.
            </p>
          </div>

          <div className="rounded-[18px] bg-white/10 p-3 text-cyan-300">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>

        <div className="h-[310px] rounded-[22px] bg-white/[0.04] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={healthTrend}>
              <defs>
                <linearGradient id="qualityArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.42} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="4 4"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                domain={[80, 100]}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="quality"
                name="Quality"
                stroke="#06b6d4"
                strokeWidth={4}
                fill="url(#qualityArea)"
                activeDot={{
                  r: 7,
                  fill: "#06b6d4",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function ReportsCard() {
  return (
    <Card className="rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
      <CardContent className="p-5">
        <div className="mb-5">
          <h3 className="text-xl font-bold tracking-tight text-slate-950">
            Reports Overview
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Items requiring admin attention.
          </p>
        </div>

        <div className="space-y-5">
          {reports.map((item) => (
            <div key={item.title}>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  {item.title}
                </p>

                <p className="text-sm font-semibold text-slate-950">
                  {item.value}
                </p>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityCard() {
  return (
    <Card className="rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
      <CardContent className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-950">
              Recent Activity
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Latest admin events
            </p>
          </div>

          <Button variant="ghost" size="icon" className="rounded-[14px]">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {recentActivities.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-indigo-50 text-indigo-700">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-slate-950">
                      {item.title}
                    </p>
                    <span className="shrink-0 text-xs font-medium text-slate-400">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function TopShopsTable() {
  return (
    <Card className="rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
      <CardContent className="p-5 lg:p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-950">
              Top Performing Shops
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Shops ranked by rating and customer feedback.
            </p>
          </div>

          <Button variant="outline" className="rounded-[14px] font-semibold">
            Manage Shops
          </Button>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-4 font-semibold text-slate-500">Shop</th>
                <th className="px-4 py-4 font-semibold text-slate-500">Rating</th>
                <th className="px-4 py-4 font-semibold text-slate-500">Reviews</th>
                <th className="px-4 py-4 font-semibold text-slate-500">Status</th>
                <th className="px-4 py-4 text-right font-semibold text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {topShops.map((shop) => (
                <tr
                  key={shop.name}
                  className="border-t border-slate-100 transition hover:bg-slate-50/80"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-11 w-11">
                        <AvatarFallback className="bg-indigo-50 text-sm font-semibold text-indigo-700">
                          {shop.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-semibold text-slate-950">
                          {shop.name}
                        </p>
                        <p className="text-xs font-medium text-slate-500">
                          {shop.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {shop.rating}
                    </span>
                  </td>

                  <td className="px-4 py-4 font-semibold text-slate-600">
                    {shop.reviews}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${shop.status === "Verified"
                          ? "bg-indigo-50 text-indigo-700"
                          : "bg-orange-50 text-orange-700"
                        }`}
                    >
                      {shop.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-[12px] font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-5">
      <DashboardHero />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_420px]">
        <MonthlyReviewChart />
        <ReviewQualityDonut />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_420px]">
        <PlatformHealthChart />

        <div className="space-y-4">
          <ReportsCard />
          <ActivityCard />
        </div>
      </section>

      <TopShopsTable />
    </div>
  )
}