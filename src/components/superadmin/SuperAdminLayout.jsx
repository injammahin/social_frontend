import React, { useState } from "react"
import {
  Bell,
  Building2,
  ChevronDown,
  ClipboardList,
  Flag,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/superadmin" },
  { label: "Users", icon: Users, to: "/superadmin/users" },
  { label: "Shops", icon: Building2, to: "/superadmin/shops" },
  { label: "Reviews", icon: MessageSquareText, to: "/superadmin/reviews" },
  { label: "Pending Approval", icon: ClipboardList, to: "/superadmin/pending" },
  { label: "Reports", icon: Flag, to: "/superadmin/reports" },
  { label: "Ratings", icon: Star, to: "/superadmin/ratings" },
  { label: "Settings", icon: Settings, to: "/superadmin/settings" },
]

function SidebarContent({ collapsed = false, onItemClick }) {
  return (
    <div className="flex h-full flex-col">
      <div
        className={`mb-5 flex items-center gap-3 rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm ${collapsed ? "justify-center" : ""
          }`}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 text-lg font-bold text-white shadow-lg shadow-violet-200">
          R
        </div>

        {!collapsed && (
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight text-slate-950">
              Reviewer
            </h1>
            <p className="truncate text-xs font-semibold text-violet-600">
              Super Admin Panel
            </p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="mb-4 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search admin menu..."
              className="h-8 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      )}

      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.to} className="group relative">
              <NavLink
                to={item.to}
                end={item.to === "/superadmin"}
                onClick={onItemClick}
                className={({ isActive }) =>
                  `flex h-12 items-center rounded-[16px] text-sm font-semibold transition-all duration-200 ${collapsed ? "justify-center px-0" : "gap-3 px-4"
                  } ${isActive
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-violet-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>

              {collapsed && (
                <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-[12px] bg-slate-950 px-3 py-2 text-xs font-semibold text-white shadow-xl group-hover:block">
                  {item.label}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="mt-auto pt-5">
        <div
          className={`rounded-[22px] border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 text-white shadow-xl ${collapsed ? "px-2" : ""
            }`}
        >
          <div
            className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""
              }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[15px] bg-white/10 text-cyan-300">
              <ShieldCheck className="h-5 w-5" />
            </div>

            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">Trust Center</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Monitor platform safety.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuperAdminLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#eef2ff,transparent_34%),radial-gradient(circle_at_top_right,#ecfeff,transparent_30%),#f6f7fb] text-slate-950">
      <aside
        className={`fixed left-0 top-0 z-40 hidden h-screen border-r border-slate-200 bg-white/95 p-4 shadow-[18px_0_50px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 ease-in-out lg:block ${collapsed ? "w-[96px]" : "w-[292px]"
          }`}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-slate-950/45 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"
            }`}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-[310px] bg-white p-4 shadow-2xl transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">
              Admin Menu
            </p>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="h-10 w-10 rounded-[14px]"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <SidebarContent onItemClick={() => setMobileOpen(false)} />
        </aside>
      </div>

      <div
        className={`min-h-screen transition-all duration-300 ease-in-out ${collapsed ? "lg:pl-[96px]" : "lg:pl-[292px]"
          }`}
      >
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
          <div className="flex h-[76px] items-center justify-between gap-4 px-4 lg:px-7">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(true)}
                className="h-11 w-11 rounded-[15px] hover:bg-slate-100 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed((prev) => !prev)}
                className="hidden h-11 w-11 rounded-[15px] hover:bg-slate-100 lg:inline-flex"
              >
                {collapsed ? (
                  <PanelLeftOpen className="h-5 w-5" />
                ) : (
                  <PanelLeftClose className="h-5 w-5" />
                )}
              </Button>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">
                  Admin Area
                </p>
                <h2 className="truncate text-lg font-semibold tracking-tight text-slate-950">
                  Welcome, {user?.fullName || "Super Admin"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-11 w-11 rounded-[15px] hover:bg-slate-100"
              >
                <Bell className="h-5 w-5 text-slate-700" />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-cyan-400" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-14 gap-3 rounded-[18px] border border-slate-200 bg-white px-2 shadow-sm hover:bg-slate-50"
                  >
                    <Avatar className="h-11 w-11 border border-violet-200">
                      <AvatarFallback className="bg-violet-50 text-sm font-bold text-violet-700">
                        {user?.avatar || "SA"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="hidden text-left sm:block">
                      <p className="text-sm font-semibold leading-4 text-slate-950">
                        {user?.fullName || "Super Admin"}
                      </p>
                      <p className="text-xs font-medium text-slate-500">
                        {user?.memberType || "Super Admin"}
                      </p>
                    </div>

                    <ChevronDown className="hidden h-5 w-5 text-slate-500 sm:block" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="z-[9999] w-72 rounded-[18px] border border-slate-100 bg-white p-2 shadow-2xl"
                >
                  <DropdownMenuLabel className="rounded-[16px] bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-violet-50 text-base font-bold text-violet-700">
                          {user?.avatar || "SA"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-950">
                          {user?.fullName || "Super Admin"}
                        </p>
                        <p className="truncate text-xs font-normal text-slate-500">
                          {user?.email || "superadmin@example.com"}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="my-2 bg-slate-100" />

                  <DropdownMenuItem className="cursor-pointer rounded-[14px] px-4 py-3 text-sm font-medium text-slate-700 focus:bg-violet-50 focus:text-violet-700">
                    <ShieldCheck className="mr-3 h-5 w-5" />
                    Admin Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer rounded-[14px] px-4 py-3 text-sm font-medium text-slate-700 focus:bg-violet-50 focus:text-violet-700">
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-2 bg-slate-100" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer rounded-[14px] px-4 py-3 text-sm font-medium text-red-600 focus:bg-red-50 focus:text-red-600"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  )
}