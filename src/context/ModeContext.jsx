import React, { createContext, useContext, useMemo, useState } from "react"

const ModeContext = createContext(null)

const MODE_KEY = "reviewer_account_mode"

export function ModeProvider({ children }) {
    const [mode, setModeState] = useState(() => {
        return localStorage.getItem(MODE_KEY) || "buyer"
    })

    const setMode = (nextMode) => {
        setModeState(nextMode)
        localStorage.setItem(MODE_KEY, nextMode)
    }

    const value = useMemo(
        () => ({
            mode,
            setMode,
            isBuyer: mode === "buyer",
            isSeller: mode === "seller",
        }),
        [mode]
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