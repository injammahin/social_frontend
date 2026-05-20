import React from "react"
import { Navigate, useLocation } from "react-router-dom"

import { useMode } from "@/context/ModeContext"

export default function SellerOnlyRoute({ children }) {
    const location = useLocation()
    const { sellerVerified } = useMode()

    if (!sellerVerified) {
        return (
            <Navigate
                to="/register-as-seller"
                replace
                state={{ from: location.pathname }}
            />
        )
    }

    return children
}