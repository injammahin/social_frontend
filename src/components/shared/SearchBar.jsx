import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar({
  placeholder = "Search...",
  buttonText = "Search",
  className = "",
}) {
  return (
    <form
      className={`flex w-full items-center gap-2 ${className}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        type="search"
        placeholder={placeholder}
        className="h-11 flex-1 rounded-xl border-slate-200 bg-white px-4 text-sm shadow-none focus-visible:ring-[#1dbf73]"
      />

      <Button
        type="submit"
        className="h-11 rounded-xl bg-[#1dbf73] px-5 font-semibold text-white hover:bg-[#19a965]"
      >
        {buttonText}
      </Button>
    </form>
  )
}