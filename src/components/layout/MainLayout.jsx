import React from "react"
import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import RightPanel from "@/components/layout/RightPanel"

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f3f7f5] text-slate-900">
      <Header />

      <main className="mx-auto grid max-w-[1480px] grid-cols-1 gap-4 px-4 py-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-6 xl:grid-cols-[260px_minmax(0,720px)_340px]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </aside>

        <section className="min-w-0">
          {children}
        </section>

        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <RightPanel />
          </div>
        </aside>
      </main>
    </div>
  )
}