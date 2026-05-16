import React from "react"
import {
  Bell,
  Bookmark,
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  MessageSquareText,
  Package,
  Settings,
  ShoppingBag,
  Store,
  UserPen,
  Users,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import Sidebar from "@/components/layout/Sidebar"
import { useAuth } from "@/context/AuthContext"
import { useMode } from "@/context/ModeContext"

function BuyerSellerToggle() {
  const { mode, setMode } = useMode()

  return (
    <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50 p-1 shadow-sm md:flex">
      <button
        type="button"
        onClick={() => setMode("buyer")}
        className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition ${mode === "buyer"
            ? "bg-[#1dbf73] text-white shadow-sm"
            : "text-slate-600 hover:bg-white hover:text-slate-950"
          }`}
      >
        <Users className="h-4 w-4" />
        Buyer
      </button>

      <button
        type="button"
        onClick={() => setMode("seller")}
        className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition ${mode === "seller"
            ? "bg-[#1dbf73] text-white shadow-sm"
            : "text-slate-600 hover:bg-white hover:text-slate-950"
          }`}
      >
        <Store className="h-4 w-4" />
        Seller
      </button>
    </div>
  )
}

export default function Header() {
  const { user, logout } = useAuth()
  const { mode, setMode } = useMode()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const buyerDropdownItems = [
    {
      label: "Edit Profile",
      to: "/profile/edit",
      icon: UserPen,
    },
    {
      label: "My Reviews",
      to: "/my-reviews",
      icon: MessageSquareText,
    },
    {
      label: "Saved Shops",
      to: "/saved-shops",
      icon: Bookmark,
    },
    {
      label: "Following Shops",
      to: "/following",
      icon: Heart,
    },
    {
      label: "Settings",
      to: "/settings",
      icon: Settings,
    },
    {
      label: "Notification",
      to: "/notifications",
      icon: Bell,
    },
  ]

  const sellerDropdownItems = [
    {
      label: "Edit Profile",
      to: "/profile/edit",
      icon: UserPen,
    },
    {
      label: "My Shop",
      to: "/my-shop",
      icon: Store,
    },
    {
      label: "Products",
      to: "/seller/products",
      icon: Package,
    },
    {
      label: "Customer Reviews",
      to: "/seller/reviews",
      icon: MessageSquareText,
    },
    {
      label: "Settings",
      to: "/settings",
      icon: Settings,
    },
    {
      label: "Notification",
      to: "/notifications",
      icon: Bell,
    },
  ]

  const dropdownItems =
    mode === "seller" ? sellerDropdownItems : buyerDropdownItems

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {user && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-[12px] hover:bg-[#1dbf73]/10 lg:hidden [&_svg]:!size-7"
                >
                  <Menu className="text-slate-700" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[310px] bg-[#f3f7f5] p-4">
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#1dbf73] text-xl font-black text-white shadow-sm">
                    R
                  </div>

                  <div>
                    <h1 className="text-xl font-black tracking-tight text-slate-950">
                      Reviewer
                    </h1>
                    <p className="text-xs text-slate-500">
                      Shop Review Platform
                    </p>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setMode("buyer")}
                    className={`h-10 rounded-full text-sm font-bold transition ${mode === "buyer"
                        ? "bg-[#1dbf73] text-white"
                        : "text-slate-600"
                      }`}
                  >
                    Buyer
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("seller")}
                    className={`h-10 rounded-full text-sm font-bold transition ${mode === "seller"
                        ? "bg-[#1dbf73] text-white"
                        : "text-slate-600"
                      }`}
                  >
                    Seller
                  </button>
                </div>

                <Sidebar />
              </SheetContent>
            </Sheet>
          )}

          <Link to={user ? "/" : "/login"} className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#1dbf73] text-xl font-black text-white shadow-sm">
              R
            </div>

            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tight text-slate-950">
                Reviewer
              </h1>
              <p className="-mt-1 text-xs text-slate-500">
                Shop Review Platform
              </p>
            </div>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {user && <BuyerSellerToggle />}

          {!user ? (
            <>
              <Button
                asChild
                variant="ghost"
                className="h-11 rounded-[12px] px-4 font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Link to="/login">Sign In</Link>
              </Button>

              <Button
                asChild
                className="h-11 rounded-[12px] bg-[#1dbf73] px-5 font-bold text-white hover:bg-[#19a965]"
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="relative h-11 w-11 rounded-[12px] hover:bg-[#1dbf73]/10 [&_svg]:!size-6"
              >
                <Link to="/notifications">
                  <Bell className="text-slate-700" />
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#1dbf73]" />
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-14 gap-3 rounded-[12px] px-2 hover:bg-slate-100"
                  >
                    <Avatar className="h-11 w-11">
                      <AvatarImage
                        src={user?.avatarImage}
                        alt={user?.fullName}
                      />
                      <AvatarFallback className="bg-[#1dbf73]/10 text-sm font-bold text-[#119d5c]">
                        {user?.avatar || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="hidden text-left lg:block">
                      <p className="text-sm font-bold leading-4 text-slate-900">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {mode === "seller" ? "Seller Mode" : "Buyer Mode"}
                      </p>
                    </div>

                    <ChevronDown className="hidden h-5 w-5 text-slate-500 lg:block" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="z-[9999] w-72 overflow-hidden rounded-[12px] border border-slate-100 bg-white p-2 text-slate-900 shadow-2xl"
                >
                  <DropdownMenuLabel className="rounded-[12px] bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={user?.avatarImage}
                          alt={user?.fullName}
                        />
                        <AvatarFallback className="bg-[#1dbf73]/10 text-base font-bold text-[#119d5c]">
                          {user?.avatar || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-950">
                          {user.fullName}
                        </p>
                        <p className="truncate text-xs font-normal text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="my-2 bg-slate-100" />

                  {dropdownItems.map((item) => {
                    const Icon = item.icon

                    return (
                      <DropdownMenuItem key={item.to} asChild>
                        <Link
                          to={item.to}
                          className="flex cursor-pointer items-center rounded-[12px] px-4 py-3 text-sm font-medium text-slate-700 focus:bg-[#1dbf73]/10 focus:text-[#119d5c]"
                        >
                          <Icon className="mr-3 h-5 w-5" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}

                  <DropdownMenuSeparator className="my-2 bg-slate-100" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer rounded-[12px] px-4 py-3 text-sm font-medium text-red-600 focus:bg-red-50 focus:text-red-600 [&_svg]:!size-5"
                  >
                    <LogOut className="mr-3" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  )
}