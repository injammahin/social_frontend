import React from "react"
import { ArrowLeft, Construction, Plus, Search } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PlaceholderPage({
    title = "Page",
    description = "This page is ready for UI and API integration.",
    type = "buyer",
}) {
    return (
        <div className="space-y-5">
            <Card className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-[#1dbf73] via-[#119d5c] to-[#043b24] p-6 text-white">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/15">
                            <Construction className="h-7 w-7" />
                        </div>

                        <h1 className="mt-5 text-3xl font-black tracking-tight">
                            {title}
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/80">
                            {description}
                        </p>
                    </div>

                    <div className="p-5">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#119d5c]">
                                    {type === "seller" ? "Seller Module" : "Buyer Module"}
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    You can connect this page with backend API later.
                                </p>
                            </div>

                            <Button asChild variant="outline" className="rounded-full">
                                <Link to={type === "seller" ? "/my-shop" : "/"}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
                <CardContent className="p-5">
                    <div className="mb-5 flex h-12 items-center gap-3 rounded-[16px] border border-slate-200 bg-slate-50 px-4">
                        <Search className="h-5 w-5 text-slate-400" />
                        <input
                            placeholder={`Search ${title.toLowerCase()}...`}
                            className="h-full flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex min-h-[280px] items-center justify-center rounded-[22px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                        <div>
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1dbf73]/10 text-[#119d5c]">
                                <Plus className="h-7 w-7" />
                            </div>

                            <h2 className="mt-4 text-xl font-black text-slate-950">
                                {title} Content
                            </h2>

                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Add table, cards, filters, modal, actions, and API integration
                                here.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}