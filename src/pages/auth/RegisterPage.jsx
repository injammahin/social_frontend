import React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  BadgeCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
  UserRound,
} from "lucide-react"

import Header from "@/components/layout/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"

const DEMO_OTP = "123456"

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, googleLogin, checkRegisterAvailability } = useAuth()

  const [step, setStep] = useState("account")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setError("")
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const validateAccountForm = () => {
    if (!form.fullName.trim()) return "Full name is required."
    if (!form.username.trim()) return "Username is required."
    if (form.username.trim().length < 3) {
      return "Username must be at least 3 characters."
    }
    if (!form.email.trim()) return "Email is required."
    if (!form.email.includes("@")) return "Please enter a valid email address."
    if (!form.password) return "Password is required."
    if (form.password.length < 6) {
      return "Password must be at least 6 characters."
    }
    if (form.password !== form.confirmPassword) {
      return "Password and confirm password do not match."
    }

    const availability = checkRegisterAvailability(form)

    if (!availability.ok) return availability.message

    return ""
  }

  const handleSendOtp = (e) => {
    e.preventDefault()

    const validationError = validateAccountForm()

    if (validationError) {
      setError(validationError)
      return
    }

    setError("")
    setStep("otp")
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()

    if (otp.trim() !== DEMO_OTP) {
      setError("Invalid OTP code.")
      return
    }

    const result = register(form)

    if (!result.ok) {
      setError(result.message)
      setStep("account")
      return
    }

    navigate("/")
  }

  const handleGoogleRegister = () => {
    googleLogin()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Header />

      <main className="mx-auto grid min-h-[calc(100vh-76px)] max-w-[1180px] grid-cols-1 items-center gap-8 px-4 py-8 lg:grid-cols-[1fr_500px] lg:py-12">
        <section className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#119d5c] shadow-sm">
              <BadgeCheck className="h-4 w-4" />
              Verified review community
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-950">
              Join Reviewer and share trusted shop feedback.
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Create your account, verify your email with OTP, and start exploring real customer reviews.
            </p>

            <div className="mt-8 grid max-w-lg grid-cols-2 gap-4">
              <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
                <UserRound className="h-7 w-7 text-[#119d5c]" />
                <h3 className="mt-3 font-bold text-slate-950">
                  Account Info
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Name, username, email, phone, and password.
                </p>
              </div>

              <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
                <Mail className="h-7 w-7 text-[#119d5c]" />
                <h3 className="mt-3 font-bold text-slate-950">
                  Email OTP
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Verify your email before entering the platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          <Card className="rounded-[18px] border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <span
                    className={`h-2.5 w-10 rounded-full ${step === "account" ? "bg-[#1dbf73]" : "bg-[#1dbf73]/40"
                      }`}
                  />
                  <span
                    className={`h-2.5 w-10 rounded-full ${step === "otp" ? "bg-[#1dbf73]" : "bg-slate-200"
                      }`}
                  />
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-950">
                    {step === "account" ? "Create account" : "Verify email"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {step === "account"
                      ? "Register with email or continue with Google."
                      : `Enter the OTP sent to ${form.email}.`}
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-[12px] border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              {step === "account" ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleRegister}
                    className="mb-4 h-12 w-full rounded-[12px] border-slate-200 bg-white text-base font-bold hover:bg-slate-50"
                  >
                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-700">
                      G
                    </span>
                    Continue with Google
                  </Button>

                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Or
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-3">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Full name"
                          className="h-12 rounded-[12px] border-slate-200 bg-slate-50 pl-11 shadow-none focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                        />
                      </div>

                      <div className="relative">
                        <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          name="username"
                          value={form.username}
                          onChange={handleChange}
                          placeholder="Username"
                          className="h-12 rounded-[12px] border-slate-200 bg-slate-50 pl-11 shadow-none focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className="h-12 rounded-[12px] border-slate-200 bg-slate-50 pl-11 shadow-none focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone number optional"
                        className="h-12 rounded-[12px] border-slate-200 bg-slate-50 pl-11 shadow-none focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Password"
                          className="h-12 rounded-[12px] border-slate-200 bg-slate-50 pl-11 pr-11 shadow-none focus-visible:bg-white focus-visible:ring-[#1dbf73]"
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

                      <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={form.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm"
                          className="h-12 rounded-[12px] border-slate-200 bg-slate-50 pl-11 pr-11 shadow-none focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="h-12 w-full rounded-[12px] bg-[#1dbf73] text-base font-bold text-white hover:bg-[#19a965]"
                    >
                      Send OTP
                    </Button>
                  </form>
                </>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="rounded-[14px] border border-[#1dbf73]/20 bg-[#1dbf73]/5 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#1dbf73]/10 text-[#119d5c]">
                        <Mail className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-950">
                          OTP verification
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Enter the 6-digit code to complete your registration.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Input
                    value={otp}
                    onChange={(e) => {
                      setError("")
                      setOtp(e.target.value)
                    }}
                    placeholder="000000"
                    maxLength={6}
                    className="h-14 rounded-[12px] border-slate-200 bg-slate-50 text-center text-xl font-black tracking-[0.45em] shadow-none focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                  />

                  <div className="rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Demo OTP: <span className="font-bold text-slate-900">{DEMO_OTP}</span>
                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-[12px] bg-[#1dbf73] text-base font-bold text-white hover:bg-[#19a965]"
                  >
                    Verify & Create Account
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setError("")
                      setStep("account")
                    }}
                    className="h-11 w-full rounded-[12px] font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to registration
                  </Button>
                </form>
              )}

              <p className="mt-5 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-[#119d5c] hover:underline"
                >
                  Log in
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}