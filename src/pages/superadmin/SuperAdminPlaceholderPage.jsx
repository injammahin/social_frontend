import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"

export default function SuperAdminPlaceholderPage({ title }) {
  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#119d5c]">
              Super Admin
            </p>
            <h1 className="mt-1 text-2xl font-black text-slate-950">
              {title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              This module is ready for filters, data table, actions, and API integration.
            </p>
          </div>

          <Button className="h-11 rounded-[12px] bg-[#1dbf73] font-bold text-white hover:bg-[#19a965]">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>

      <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="mb-5 flex h-12 items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-4">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              placeholder={`Search ${title.toLowerCase()}...`}
              className="h-full flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex min-h-[320px] items-center justify-center rounded-[18px] border border-dashed border-slate-300 bg-slate-50">
            <div className="max-w-sm text-center">
              <h2 className="text-xl font-black text-slate-950">
                {title} Module
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add table columns, CRUD modals, status badges, and API calls here.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}