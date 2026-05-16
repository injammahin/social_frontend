import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import MainLayout from "@/components/layout/MainLayout"
import AccountLayout from "@/components/layout/AccountLayout"
import MenuLayout from "@/components/layout/MenuLayout"
import SuperAdminLayout from "@/components/superadmin/SuperAdminLayout"

import ReviewFeed from "@/components/feed/ReviewFeed"

import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"

import EditProfilePage from "@/pages/profile/EditProfilePage"
import MyShopPage from "@/pages/shop/MyShopPage"
import SettingsPage from "@/pages/settings/SettingsPage"
import NotificationsPage from "@/pages/notifications/NotificationsPage"
import PlaceholderPage from "@/pages/common/PlaceholderPage"

import SuperAdminDashboard from "@/pages/superadmin/SuperAdminDashboard"
import SuperAdminPlaceholderPage from "@/pages/superadmin/SuperAdminPlaceholderPage"

import ProtectedRoute from "@/routes/ProtectedRoute"
import { useAuth } from "@/context/AuthContext"

function PublicOnlyRoute({ children }) {
  const { user } = useAuth()

  if (user?.role === "superadmin") {
    return <Navigate to="/superadmin" replace />
  }

  if (user?.role === "reviewer") {
    return <Navigate to="/" replace />
  }

  return children
}

export default function App() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />

      {/* Main Buyer/Seller Feed - Sidebar + Right Panel */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MainLayout>
              <ReviewFeed />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Profile Page - Full Width, No Sidebar */}
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <AccountLayout>
              <EditProfilePage />
            </AccountLayout>
          </ProtectedRoute>
        }
      />

      {/* Buyer Pages - Sidebar */}
      <Route
        path="/my-reviews"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <PlaceholderPage
                title="My Reviews"
                description="View, edit, and manage all reviews you have posted."
                type="buyer"
              />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved-shops"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <PlaceholderPage
                title="Saved Shops"
                description="All shops saved by the buyer for future visits."
                type="buyer"
              />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/following"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <PlaceholderPage
                title="Following Shops"
                description="Shops followed by the buyer."
                type="buyer"
              />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      {/* Seller Pages - Sidebar */}
      <Route
        path="/my-shop"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <MyShopPage />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/products"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <PlaceholderPage
                title="Seller Products"
                description="Manage product listings, prices, images, and availability."
                type="seller"
              />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/reviews"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <PlaceholderPage
                title="Customer Reviews"
                description="Reply to customer reviews and manage shop reputation."
                type="seller"
              />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/followers"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <PlaceholderPage
                title="Shop Followers"
                description="View people following your shop and customer engagement."
                type="seller"
              />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/campaigns"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <PlaceholderPage
                title="Campaign Hub"
                description="Create offers, shop campaigns, promotions, and announcements."
                type="seller"
              />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/analytics"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <PlaceholderPage
                title="Shop Analytics"
                description="Track review growth, product views, followers, and shop performance."
                type="seller"
              />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      {/* Common Account Pages */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <SettingsPage />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute allowedRoles={["reviewer"]}>
            <MenuLayout>
              <NotificationsPage />
            </MenuLayout>
          </ProtectedRoute>
        }
      />

      {/* Super Admin Routes */}
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <SuperAdminDashboard />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/users"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <SuperAdminPlaceholderPage title="User Management" />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/shops"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <SuperAdminPlaceholderPage title="Shop Management" />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/reviews"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <SuperAdminPlaceholderPage title="Review Management" />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/pending"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <SuperAdminPlaceholderPage title="Pending Review Approval" />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/reports"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <SuperAdminPlaceholderPage title="Reports & Complaints" />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/ratings"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <SuperAdminPlaceholderPage title="Ratings Overview" />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/settings"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminLayout>
              <SuperAdminPlaceholderPage title="Platform Settings" />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}