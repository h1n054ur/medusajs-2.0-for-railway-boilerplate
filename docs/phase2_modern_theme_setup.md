# Phase 2: Modern Theme System Setup

## Overview
Replace @medusajs/ui-preset with shadcn/ui CSS variables approach, install bubblegum theme, and set up theme switcher foundation for multi-level theme management.

## Phase 2 Objectives
1. Remove @medusajs/ui-preset dependency
2. Initialize shadcn/ui with CSS variables configuration
3. Install bubblegum theme CSS variables from replit-app
4. Set up theme switcher infrastructure
5. Configure components.json for modern theming
6. Create theme provider architecture

## shadcn/ui Installation and Configuration

### Step 1: Initialize shadcn/ui
```bash
cd storefront/
npx shadcn@latest init
```

### Step 2: Configure components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "hooks": "@/hooks",
    "lib": "@/lib"
  }
}
```

### Step 3: Install Core Dependencies
```bash
cd storefront/
pnpm add class-variance-authority clsx tailwind-merge tailwindcss-animate
pnpm add @radix-ui/react-slot lucide-react
pnpm add next-themes framer-motion
```

## Bubblegum Theme Implementation

### Step 1: Create globals.css with Theme Variables
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Bubblegum Theme - Light Mode */
  --background: #f6e6ee;
  --foreground: #5b5b5b;
  --card: #fdedc9;
  --card-foreground: #5b5b5b;
  --popover: #ffffff;
  --popover-foreground: #5b5b5b;
  --primary: #d04f99;
  --primary-foreground: #ffffff;
  --secondary: #8acfd1;
  --secondary-foreground: #333333;
  --muted: #b2e1eb;
  --muted-foreground: #7a7a7a;
  --accent: #fbe2a7;
  --accent-foreground: #333333;
  --destructive: #f96f70;
  --destructive-foreground: #ffffff;
  --border: #d04f99;
  --input: #e4e4e4;
  --ring: #e670ab;
  --radius: 0.4rem;
  
  /* Charts */
  --chart-1: #e670ab;
  --chart-2: #84d2e2;
  --chart-3: #fbe2a7;
  --chart-4: #f3a0ca;
  --chart-5: #d7488e;
  
  /* Sidebar */
  --sidebar-background: #f8d8ea;
  --sidebar-foreground: #333333;
  --sidebar-primary: #ec4899;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f9a8d4;
  --sidebar-accent-foreground: #333333;
  --sidebar-border: #f3e8ff;
  --sidebar-ring: #ec4899;
  
  /* Typography */
  --font-sans: Poppins, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Fira Code, monospace;
  
  /* Shadows */
  --shadow-2xs: 3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 0.50);
  --shadow-xs: 3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 0.50);
  --shadow-sm: 3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 1.00), 3px 1px 2px -1px hsl(325.78 58.18% 56.86% / 1.00);
  --shadow: 3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 1.00), 3px 1px 2px -1px hsl(325.78 58.18% 56.86% / 1.00);
  --shadow-md: 3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 1.00), 3px 2px 4px -1px hsl(325.78 58.18% 56.86% / 1.00);
  --shadow-lg: 3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 1.00), 3px 4px 6px -1px hsl(325.78 58.18% 56.86% / 1.00);
  --shadow-xl: 3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 1.00), 3px 8px 10px -1px hsl(325.78 58.18% 56.86% / 1.00);
  --shadow-2xl: 3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 2.50);
}

.dark {
  /* Bubblegum Theme - Dark Mode */
  --background: #12242e;
  --foreground: #f3e3ea;
  --card: #1c2e38;
  --card-foreground: #f3e3ea;
  --popover: #1c2e38;
  --popover-foreground: #f3e3ea;
  --primary: #fbe2a7;
  --primary-foreground: #12242e;
  --secondary: #e4a2b1;
  --secondary-foreground: #12242e;
  --muted: #24272b;
  --muted-foreground: #e4a2b1;
  --accent: #c67b96;
  --accent-foreground: #f3e3ea;
  --destructive: #e35ea4;
  --destructive-foreground: #12242e;
  --border: #324859;
  --input: #20333d;
  --ring: #50afb6;
  
  /* Charts */
  --chart-1: #50afb6;
  --chart-2: #e4a2b1;
  --chart-3: #c67b96;
  --chart-4: #175c6c;
  --chart-5: #24272b;
  
  /* Sidebar */
  --sidebar-background: #101f28;
  --sidebar-foreground: #f3f4f6;
  --sidebar-primary: #ec4899;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f9a8d4;
  --sidebar-accent-foreground: #1f2937;
  --sidebar-border: #374151;
  --sidebar-ring: #ec4899;
  
  /* Shadows */
  --shadow-2xs: 3px 3px 0px 0px hsl(206.15 28.06% 27.25% / 0.50);
  --shadow-xs: 3px 3px 0px 0px hsl(206.15 28.06% 27.25% / 0.50);
  --shadow-sm: 3px 3px 0px 0px hsl(206.15 28.06% 27.25% / 1.00), 3px 1px 2px -1px hsl(206.15 28.06% 27.25% / 1.00);
  --shadow: 3px 3px 0px 0px hsl(206.15 28.06% 27.25% / 1.00), 3px 1px 2px -1px hsl(206.15 28.06% 27.25% / 1.00);
  --shadow-md: 3px 3px 0px 0px hsl(206.15 28.06% 27.25% / 1.00), 3px 2px 4px -1px hsl(206.15 28.06% 27.25% / 1.00);
  --shadow-lg: 3px 3px 0px 0px hsl(206.15 28.06% 27.25% / 1.00), 3px 4px 6px -1px hsl(206.15 28.06% 27.25% / 1.00);
  --shadow-xl: 3px 3px 0px 0px hsl(206.15 28.06% 27.25% / 1.00), 3px 8px 10px -1px hsl(206.15 28.06% 27.25% / 1.00);
  --shadow-2xl: 3px 3px 0px 0px hsl(206.15 28.06% 27.25% / 2.50);
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
  }
}
```

### Step 2: Update Tailwind Configuration
```javascript
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## Theme Provider Architecture

### Step 1: Create Theme Provider
```typescript
// src/lib/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Step 2: Create Theme Context
```typescript
// src/lib/theme-context.tsx
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
```

### Step 3: Create Theme Switcher Component
```typescript
// src/components/theme-switcher.tsx
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useThemeContext } from "@/lib/theme-context"

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const { colorTheme, setColorTheme, availableThemes } = useThemeContext()

  return (
    <div className="flex items-center gap-2">
      {/* Light/Dark Mode Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Color Theme Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {colorTheme}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {availableThemes.map((themeOption) => (
            <DropdownMenuItem
              key={themeOption}
              onClick={() => setColorTheme(themeOption)}
            >
              {themeOption}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
```

## Root Layout Integration

### Step 1: Update Root Layout
```typescript
// src/app/layout.tsx
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { ThemeContextProvider } from "@/lib/theme-context"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ThemeContextProvider>
            {children}
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Package.json Updates

### Step 1: Remove @medusajs/ui-preset
```bash
cd storefront/
pnpm remove @medusajs/ui-preset
```

### Step 2: Install Required Dependencies
```bash
pnpm add class-variance-authority clsx tailwind-merge tailwindcss-animate
pnpm add @radix-ui/react-slot @radix-ui/react-dropdown-menu
pnpm add lucide-react next-themes
```

### Step 3: Update package.json
```json
{
  "dependencies": {
    // Remove
    // "@medusajs/ui-preset": "preview",
    
    // Add
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "next-themes": "^0.4.6",
    "lucide-react": "^0.453.0",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-dropdown-menu": "^2.1.7"
  }
}
```

## Core Utilities Setup

### Step 1: Create lib/utils.ts
```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Step 2: Install Core shadcn/ui Components
```bash
cd storefront/
npx shadcn@latest add button
npx shadcn@latest add dropdown-menu
npx shadcn@latest add card
npx shadcn@latest add input
```

## Testing and Validation

### Step 1: Basic Component Test
```typescript
// src/app/page.tsx - Test Implementation
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Medusa Storefront</h1>
        <ThemeSwitcher />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme Test</CardTitle>
            <CardDescription>
              Testing the new theme system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Primary Button</Button>
            <Button variant="secondary" className="ml-2">Secondary</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### Step 2: Theme Validation Checklist
- [ ] Light/dark mode switching works
- [ ] Color theme switching works
- [ ] CSS variables are applied correctly
- [ ] Components render with theme styles
- [ ] No console errors
- [ ] Responsive design maintained

## Migration Strategy from @medusajs/ui

### Step 1: Component Mapping
```typescript
// Component migration map
const componentMap = {
  // Old @medusajs/ui -> New shadcn/ui
  'Button': '@/components/ui/button',
  'Input': '@/components/ui/input',
  'Card': '@/components/ui/card',
  'Badge': '@/components/ui/badge',
  'Select': '@/components/ui/select',
  'Checkbox': '@/components/ui/checkbox',
  'RadioGroup': '@/components/ui/radio-group',
  'Switch': '@/components/ui/switch',
  'Textarea': '@/components/ui/textarea',
  'Label': '@/components/ui/label',
}
```

### Step 2: Gradual Migration Plan
1. **Phase 2a**: Setup theme infrastructure (current phase)
2. **Phase 2b**: Migrate core components (Button, Input, Card)
3. **Phase 2c**: Migrate form components
4. **Phase 2d**: Migrate navigation components
5. **Phase 2e**: Migrate layout components

## Phase 2 Success Criteria

### Technical Milestones
- [ ] shadcn/ui initialized and configured
- [ ] Bubblegum theme CSS variables implemented
- [ ] Theme switcher functional
- [ ] @medusajs/ui-preset removed
- [ ] Core components migrated and tested

### Functional Validation
- [ ] Theme switching works correctly
- [ ] No visual regressions
- [ ] Performance maintained
- [ ] All existing functionality preserved

### Documentation Deliverables
- [ ] Theme system architecture documented
- [ ] Component migration guide created
- [ ] Testing procedures established
- [ ] Rollback procedures defined

## Next Steps to Phase 3

### Immediate Actions
1. Complete theme system implementation
2. Validate theme switching functionality
3. Begin component library integration planning
4. Document any issues or blockers

### Phase 3 Prerequisites
- Theme system fully functional
- Core shadcn/ui components installed
- Component migration strategy validated
- Testing framework established

This Phase 2 plan provides a comprehensive approach to modernizing the theme system while maintaining backward compatibility and ensuring a smooth transition to the new shadcn/ui-based architecture.