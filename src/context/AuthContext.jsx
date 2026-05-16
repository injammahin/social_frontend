import React, { createContext, useContext, useMemo, useState } from "react"

const AuthContext = createContext(null)

const AUTH_USER_KEY = "reviewer_auth_user"
const REGISTERED_USERS_KEY = "reviewer_registered_users"

const DEMO_USERS = [
  {
    id: "demo-reviewer-1",
    fullName: "Mahin Reviewer",
    username: "mahin",
    email: "mahin@example.com",
    phone: "",
    password: "123456",
    memberType: "Reviewer Member",
    avatar: "MR",
    role: "reviewer",
  },
  {
    id: "demo-superadmin-1",
    fullName: "Super Admin",
    username: "superadmin",
    email: "superadmin@example.com",
    phone: "",
    password: "123456",
    memberType: "Super Admin",
    avatar: "SA",
    role: "superadmin",
  },
]

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

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY)) || []
  } catch {
    return []
  }
}

function saveStoredUsers(users) {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
}

function getAllUsers() {
  return [...DEMO_USERS, ...getStoredUsers()]
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user
  return safeUser
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(AUTH_USER_KEY)) || null
    } catch {
      return null
    }
  })

  const login = ({ identifier, password }) => {
    const loginValue = identifier.trim().toLowerCase()

    const foundUser = getAllUsers().find((item) => {
      const username = item.username?.toLowerCase()
      const email = item.email?.toLowerCase()
      const phone = item.phone?.toLowerCase()

      return username === loginValue || email === loginValue || phone === loginValue
    })

    if (!foundUser || foundUser.password !== password) {
      return {
        ok: false,
        message: "Invalid username, email, phone, or password.",
      }
    }

    const safeUser = sanitizeUser(foundUser)

    setUser(safeUser)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(safeUser))

    return {
      ok: true,
      user: safeUser,
    }
  }

  const checkRegisterAvailability = ({ username, email, phone }) => {
    const allUsers = getAllUsers()

    const usernameTaken = allUsers.some(
      (item) => item.username?.toLowerCase() === username.trim().toLowerCase()
    )

    if (usernameTaken) {
      return {
        ok: false,
        message: "This username is already taken.",
      }
    }

    const emailTaken = allUsers.some(
      (item) => item.email?.toLowerCase() === email.trim().toLowerCase()
    )

    if (emailTaken) {
      return {
        ok: false,
        message: "This email is already registered.",
      }
    }

    if (phone?.trim()) {
      const phoneTaken = allUsers.some(
        (item) => item.phone?.trim() === phone.trim()
      )

      if (phoneTaken) {
        return {
          ok: false,
          message: "This phone number is already registered.",
        }
      }
    }

    return {
      ok: true,
    }
  }

  const register = (formData) => {
    const availability = checkRegisterAvailability(formData)

    if (!availability.ok) {
      return availability
    }

    const newUser = {
      id: `user-${Date.now()}`,
      fullName: formData.fullName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
      memberType: "Reviewer Member",
      avatar: getInitials(formData.fullName),
      role: "reviewer",
    }

    const storedUsers = getStoredUsers()
    saveStoredUsers([...storedUsers, newUser])

    const safeUser = sanitizeUser(newUser)

    setUser(safeUser)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(safeUser))

    return {
      ok: true,
      user: safeUser,
    }
  }

  const googleLogin = () => {
    const googleUser = {
      id: `google-${Date.now()}`,
      fullName: "Google Reviewer",
      username: "google_user",
      email: "googleuser@example.com",
      phone: "",
      memberType: "Reviewer Member",
      avatar: "GR",
      role: "reviewer",
    }

    setUser(googleUser)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(googleUser))

    return {
      ok: true,
      user: googleUser,
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_USER_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      googleLogin,
      logout,
      checkRegisterAvailability,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}