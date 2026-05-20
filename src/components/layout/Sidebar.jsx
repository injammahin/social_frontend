import React from "react"
import {
  BarChart3,
  Megaphone,
  Network,
  Package,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { useMode } from "@/context/ModeContext"

const getBuyerMenus = (sellerVerified) =>
  [
    {
      label: "Shop",
      icon: ShoppingBag,
      to: "/shops",
      disabled: false,
    },
    !sellerVerified && {
      label: "Register as Seller",
      icon: ShieldCheck,
      to: "/register-as-seller",
      disabled: false,
    },
    {
      label: "Campaign Hub",
      icon: Megaphone,
      to: "#",
      disabled: true,
    },
    {
      label: "Network",
      icon: Network,
      to: "/following",
      disabled: false,
    },
    {
      label: "Performance Hub",
      icon: BarChart3,
      to: "#",
      disabled: true,
    },
  ].filter(Boolean)

const sellerMenus = [
  {
    label: "My Shop",
    icon: Store,
    to: "/my-shop",
    disabled: false,
  },
  {
    label: "Products",
    icon: Package,
    to: "/seller/products",
    disabled: false,
  },
  {
    label: "Customer Reviews",
    icon: Star,
    to: "/seller/reviews",
    disabled: false,
  },
  {
    label: "Campaign Hub",
    icon: Megaphone,
    to: "/seller/campaigns",
    disabled: false,
  },
  {
    label: "Shop Analytics",
    icon: BarChart3,
    to: "/seller/analytics",
    disabled: false,
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/settings",
    disabled: false,
  },
]

export default function Sidebar() {
  const { isSeller, sellerVerified } = useMode()
  const menuItems = isSeller ? sellerMenus : getBuyerMenus(sellerVerified)

  const ctaTitle = isSeller
    ? "Grow your shop faster"
    : sellerVerified
      ? "Seller account verified"
      : "Become a verified seller"

  const ctaText = isSeller
    ? "Manage products, reply to customer reviews, run campaigns, and track shop performance."
    : sellerVerified
      ? "You can switch to seller mode anytime from the top menu."
      : "Submit your shop details, NID documents, and video verification to unlock seller mode."

  return (
    <aside className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="mb-3 flex items-center justify-between px-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Main Menu
            </p>
            <p className="mt-1 text-xs font-semibold text-[#119d5c]">
              {isSeller ? "Seller tools" : "Buyer community"}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#1dbf73]/10 text-[#119d5c]">
            {isSeller ? (
              <Store className="h-4 w-4" />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon

            if (item.disabled) {
              return (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    disabled
                    className="flex h-12 w-full cursor-not-allowed items-center gap-3 rounded-2xl px-4 text-[15px] font-semibold text-slate-400 opacity-70"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="truncate">{item.label}</span>

                    <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                      Soon
                    </span>
                  </button>

                  <div className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 hidden -translate-y-1/2 rounded-xl bg-slate-950 px-3 py-2 text-xs font-medium text-white shadow-lg group-hover:block">
                    Upcoming
                  </div>
                </div>
              )
            }

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex h-12 w-full items-center gap-3 rounded-2xl px-4 text-[15px] font-semibold transition ${isActive
                    ? "bg-[#1dbf73]/10 text-[#119d5c] hover:bg-[#1dbf73]/15"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      <div className="rounded-3xl border border-[#1dbf73]/20 bg-gradient-to-br from-[#1dbf73]/15 via-white to-white p-5 shadow-sm">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1dbf73] text-white shadow-sm">
          {isSeller ? (
            <Store className="h-5 w-5" />
          ) : (
            <ShieldCheck className="h-5 w-5" />
          )}
        </div>

        <h3 className="mt-4 text-base font-bold text-slate-950">
          {ctaTitle}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">{ctaText}</p>
      </div>
    </aside>
  )
}