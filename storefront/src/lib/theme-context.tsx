"use client"

import React, { createContext, useContext, useState, useCallback } from 'react'

type ColorTheme = 'bubblegum' | 'default' | 'rose' | 'blue' | 'green'

interface ThemeContextType {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
  availableThemes: ColorTheme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider')
  }
  return context
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('bubblegum')
  
  const availableThemes: ColorTheme[] = ['bubblegum', 'default', 'rose', 'blue', 'green']
  
  const handleSetColorTheme = useCallback((theme: ColorTheme) => {
    setColorTheme(theme)
    // Apply theme class to document
    document.documentElement.setAttribute('data-theme', theme)
  }, [])
  
  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme: handleSetColorTheme,
        availableThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}