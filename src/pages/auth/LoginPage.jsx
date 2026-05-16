import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Star } from "lucide-react"

import Header from "@/components/layout/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, googleLogin } = useAuth()

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setError("")
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.identifier.trim()) {
      setError("Username, email, or phone is required.")
      return
    }

    if (!form.password) {
      setError("Password is required.")
      return
    }

    const result = login(form)

    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate("/")
  }

  const handleGoogleLogin = () => {
    googleLogin()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Header />

      <main className="mx-auto grid min-h-[calc(100vh-76px)] max-w-[1120px] grid-cols-1 items-center gap-8 px-4 py-8 lg:grid-cols-[1fr_420px] lg:py-12">
        <section className="hidden lg:block">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#1dbf73] text-3xl font-black text-white shadow-sm">
                R
              </div>

              <div>
                <h1 className="text-5xl font-black tracking-tight text-[#1dbf73]">
                  Reviewer
                </h1>
                <p className="mt-1 text-lg font-medium text-slate-600">
                  Share real shop reviews and discover trusted businesses.
                </p>
              </div>
            </div>

            <div className="mt-8 grid max-w-lg grid-cols-2 gap-4">
              <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
                <ShieldCheck className="h-7 w-7 text-[#119d5c]" />
                <h3 className="mt-3 font-bold text-slate-950">
                  Trusted Reviews
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Read useful customer feedback before choosing a shop.
                </p>
              </div>

              <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
                <Star className="h-7 w-7 text-[#119d5c]" />
                <h3 className="mt-3 font-bold text-slate-950">
                  Rated Shops
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Find top shops based on customer rating and quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          <Card className="rounded-[18px] border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#1dbf73]/10 text-[#119d5c] lg:hidden">
                  <LockKeyhole className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-black text-slate-950">
                  Log in
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Welcome back to Reviewer.
                </p>
              </div>

              {error && (
                <div className="mb-4 rounded-[12px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    name="identifier"
                    value={form.identifier}
                    onChange={handleChange}
                    placeholder="Username, email, or phone"
                    className="h-12 rounded-[12px] border-slate-200 bg-slate-50 pl-11 text-base shadow-none focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                  />
                </div>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="h-12 rounded-[12px] border-slate-200 bg-slate-50 pl-11 pr-11 text-base shadow-none focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 accent-[#1dbf73]"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="font-semibold text-[#119d5c] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-[12px] bg-[#1dbf73] text-base font-bold text-white hover:bg-[#19a965]"
                >
                  Log In
                </Button>
              </form>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Or
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="h-12 w-full rounded-[12px] border-slate-200 bg-white text-base font-bold hover:bg-slate-50"
              >
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-700">
                  G
                </span>
                Continue with Google
              </Button>

              <div className="mt-5 rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <span className="font-bold text-slate-900">Demo:</span>{" "}
                username <span className="font-bold">mahin</span>, password{" "}
                <span className="font-bold">123456</span>
              </div>

              <p className="mt-5 text-center text-sm text-slate-600">
                New to Reviewer?{" "}
                <Link
                  to="/register"
                  className="font-bold text-[#119d5c] hover:underline"
                >
                  Create account
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}