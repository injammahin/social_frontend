import React from "react"
import Header from "@/components/layout/Header"

export default function AccountLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f3f7f5] text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}