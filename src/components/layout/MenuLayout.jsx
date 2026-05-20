import React, { useEffect, useRef, useState } from "react"

import { Navigate, Route, Routes } from "react-router-dom"
import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"

export default function MenuLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f3f7f5] text-slate-950">
            <Header />

            <main className="mx-auto grid max-w-[1480px] grid-cols-1 gap-5 px-4 py-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
                <aside className="hidden lg:block">
                    <div className="sticky top-24">
                        <Sidebar />
                    </div>
                </aside>

                <section className="min-w-0">{children}</section>
            </main>
        </div>
    )
}