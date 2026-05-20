import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"

const ModeContext = createContext(null)

const MODE_STORAGE_KEY = "reviewer_mode"
const SELLER_VERIFIED_STORAGE_KEY = "reviewer_seller_verified"
const SELLER_APPLICATION_STORAGE_KEY = "reviewer_seller_application"

export function ModeProvider({ children }) {
    const [mode, setModeState] = useState(() => {
        return localStorage.getItem(MODE_STORAGE_KEY) || "buyer"
    })

    const [sellerVerified, setSellerVerifiedState] = useState(() => {
        return localStorage.getItem(SELLER_VERIFIED_STORAGE_KEY) === "true"
    })

    const [sellerApplication, setSellerApplication] = useState(() => {
        try {
            const saved = localStorage.getItem(SELLER_APPLICATION_STORAGE_KEY)
            return saved ? JSON.parse(saved) : null
        } catch {
            return null
        }
    })

    useEffect(() => {
        if (!sellerVerified && mode === "seller") {
            setModeState("buyer")
            localStorage.setItem(MODE_STORAGE_KEY, "buyer")
        }
    }, [sellerVerified, mode])

    const setMode = (nextMode) => {
        if (nextMode === "seller" && !sellerVerified) {
            setModeState("buyer")
            localStorage.setItem(MODE_STORAGE_KEY, "buyer")
            return false
        }

        const safeMode = nextMode === "seller" ? "seller" : "buyer"
        setModeState(safeMode)
        localStorage.setItem(MODE_STORAGE_KEY, safeMode)
        return true
    }

    const completeSellerRegistration = (applicationData) => {
        const finalApplication = {
            ...applicationData,
            status: "verified",
            verifiedAt: new Date().toISOString(),
        }

        localStorage.setItem(SELLER_VERIFIED_STORAGE_KEY, "true")
        localStorage.setItem(
            SELLER_APPLICATION_STORAGE_KEY,
            JSON.stringify(finalApplication)
        )
        localStorage.setItem(MODE_STORAGE_KEY, "seller")

        setSellerVerifiedState(true)
        setSellerApplication(finalApplication)
        setModeState("seller")
    }

    const resetSellerRegistration = () => {
        localStorage.removeItem(SELLER_VERIFIED_STORAGE_KEY)
        localStorage.removeItem(SELLER_APPLICATION_STORAGE_KEY)
        localStorage.setItem(MODE_STORAGE_KEY, "buyer")

        setSellerVerifiedState(false)
        setSellerApplication(null)
        setModeState("buyer")
    }

    const value = useMemo(
        () => ({
            mode,
            setMode,
            isBuyer: mode === "buyer",
            isSeller: mode === "seller" && sellerVerified,
            sellerVerified,
            sellerApplication,
            completeSellerRegistration,
            resetSellerRegistration,
        }),
        [mode, sellerVerified, sellerApplication]
    )

    return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}

export function useMode() {
    const context = useContext(ModeContext)

    if (!context) {
        throw new Error("useMode must be used inside ModeProvider")
    }

    return context
}