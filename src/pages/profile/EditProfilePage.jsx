import React, { useRef, useState } from "react"
import {
  BadgeCheck,
  Camera,
  CheckCircle2,
  Globe2,
  ImagePlus,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  User,
  UserRound,
  X,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"

const AUTH_USER_KEY = "reviewer_auth_user"

function getInitials(name = "User") {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function readImageFile(file, callback) {
  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    callback(reader.result)
  }

  reader.readAsDataURL(file)
}

export default function EditProfilePage() {
  const { user, updateProfile } = useAuth()

  const avatarInputRef = useRef(null)
  const coverInputRef = useRef(null)

  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "Dhaka, Bangladesh",
    website: user?.website || "",
    bio:
      user?.bio ||
      "I share honest shop reviews and help people discover trusted businesses.",
  })

  const [avatarPreview, setAvatarPreview] = useState(user?.avatarImage || "")
  const [coverPreview, setCoverPreview] = useState(user?.coverImage || "")

  const handleChange = (e) => {
    setSaved(false)

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]

    readImageFile(file, (image) => {
      setAvatarPreview(image)
      setSaved(false)
    })
  }

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0]

    readImageFile(file, (image) => {
      setCoverPreview(image)
      setSaved(false)
    })
  }

  const handleRemoveAvatar = () => {
    setAvatarPreview("")
    setSaved(false)

    if (avatarInputRef.current) {
      avatarInputRef.current.value = ""
    }
  }

  const handleRemoveCover = () => {
    setCoverPreview("")
    setSaved(false)

    if (coverInputRef.current) {
      coverInputRef.current.value = ""
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedUser = {
      ...user,
      ...form,
      avatar: getInitials(form.fullName),
      avatarImage: avatarPreview,
      coverImage: coverPreview,
    }

    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser))

    if (typeof updateProfile === "function") {
      updateProfile(updatedUser)
      setSaved(true)
      return
    }

    setSaved(true)

    setTimeout(() => {
      window.location.reload()
    }, 700)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-0">
          <div
            className="relative h-[260px] bg-gradient-to-br from-[#1dbf73] via-[#119d5c] to-[#043b24]"
            style={
              coverPreview
                ? {
                  backgroundImage: `linear-gradient(to bottom, rgba(4, 59, 36, 0), rgba(4, 59, 36, 0)), url(${coverPreview})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
                : undefined
            }
          >
            <div className="absolute " />

            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />

            <div className="absolute right-5 top-5 flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="h-10 rounded-full bg-white/95 px-4 text-sm font-semibold text-slate-900 shadow-lg backdrop-blur transition hover:bg-white"
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Change Cover
              </Button>

              {coverPreview && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleRemoveCover}
                  className="h-10 rounded-full px-4 text-sm font-semibold shadow-lg"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
          </div>

          <div className="relative px-5 pb-6 sm:px-8">
            <div className="-mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="group relative h-32 w-32 shrink-0 rounded-full border-4 border-white bg-white shadow-xl">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={avatarPreview} alt={form.fullName} />
                    <AvatarFallback className="bg-[#1dbf73]/10 text-3xl font-bold text-[#119d5c]">
                      {getInitials(form.fullName)}
                    </AvatarFallback>
                  </Avatar>

                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-slate-700 shadow-md transition hover:bg-[#1dbf73] hover:text-white"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                </div>

                <div className="pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      {form.fullName || "Reviewer User"}
                    </h1>

                    <span className="inline-flex items-center gap-1 rounded-full bg-[#1dbf73]/10 px-3 py-1 text-xs font-semibold text-[#119d5c]">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Reviewer Member
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {form.email || "No email added"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      variant="outline"
                      className="h-10 rounded-full border-slate-200 font-semibold transition hover:border-[#1dbf73]/30 hover:bg-[#1dbf73]/10 hover:text-[#119d5c]"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>

                    {avatarPreview && (
                      <Button
                        type="button"
                        onClick={handleRemoveAvatar}
                        variant="outline"
                        className="h-10 rounded-full border-red-100 bg-red-50 font-semibold text-red-600 hover:bg-red-100 hover:text-red-700"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pb-2">
                <Button
                  type="submit"
                  className="h-11 rounded-full bg-[#1dbf73] px-6 font-semibold text-white shadow-lg shadow-emerald-100 hover:bg-[#19a965]"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {saved && (
        <div className="flex items-center gap-3 rounded-[18px] border border-[#1dbf73]/20 bg-[#1dbf73]/10 px-5 py-4 text-sm font-semibold text-[#119d5c] shadow-sm">
          <CheckCircle2 className="h-5 w-5" />
          Profile updated successfully.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[330px_1fr]">
        <div className="space-y-6">
          <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-slate-950">Intro</h2>

              <p className="mt-3 rounded-[18px] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {form.bio}
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#119d5c]" />
                  <div>
                    <p className="font-semibold text-slate-900">Location</p>
                    <p>{form.location || "Not added"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Globe2 className="mt-0.5 h-5 w-5 text-[#119d5c]" />
                  <div>
                    <p className="font-semibold text-slate-900">Website</p>
                    <p>{form.website || "Not added"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-[#119d5c]" />
                  <div>
                    <p className="font-semibold text-slate-900">Account</p>
                    <p>Verified reviewer profile</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-slate-950">
                Account Safety
              </h2>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-[18px] bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1dbf73]/10 text-[#119d5c]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        Email Verified
                      </p>
                      <p className="text-xs text-slate-500">
                        OTP verification active
                      </p>
                    </div>
                  </div>

                  <CheckCircle2 className="h-5 w-5 text-[#119d5c]" />
                </div>

                <div className="flex items-center justify-between rounded-[18px] bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1dbf73]/10 text-[#119d5c]">
                      <LockKeyhole className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        Password
                      </p>
                      <p className="text-xs text-slate-500">
                        Change password later
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 rounded-full border-slate-200 text-xs font-semibold hover:border-[#1dbf73]/30 hover:bg-[#1dbf73]/10 hover:text-[#119d5c]"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <CardContent className="p-5 sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-950">
                Profile Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep your public profile accurate and professional.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="h-12 rounded-[14px] border-slate-200 bg-slate-50 pl-11 shadow-none transition focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="h-12 rounded-[14px] border-slate-200 bg-slate-50 pl-11 shadow-none transition focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="h-12 rounded-[14px] border-slate-200 bg-slate-50 pl-11 shadow-none transition focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="h-12 rounded-[14px] border-slate-200 bg-slate-50 pl-11 shadow-none transition focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="h-12 rounded-[14px] border-slate-200 bg-slate-50 pl-11 shadow-none transition focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Website
                </label>
                <div className="relative">
                  <Globe2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="h-12 rounded-[14px] border-slate-200 bg-slate-50 pl-11 shadow-none transition focus-visible:bg-white focus-visible:ring-[#1dbf73]"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full resize-none rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#1dbf73] focus:bg-white focus:ring-2 focus:ring-[#1dbf73]/25"
                  placeholder="Write something about yourself..."
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-full border-slate-200 px-6 font-semibold hover:border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="h-11 rounded-full bg-[#1dbf73] px-6 font-semibold text-white shadow-lg shadow-emerald-100 hover:bg-[#19a965]"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}