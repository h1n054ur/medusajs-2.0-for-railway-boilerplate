# Technical Specifications

## Overview
Comprehensive technical specifications for the Medusa.js 2.0 storefront modernization project, including detailed file structure, import/export patterns, configuration files, package.json modifications, and build process optimization.

## Project Architecture

### Technology Stack
```yaml
Frontend:
  - Framework: Next.js 14 (App Router)
  - Styling: shadcn/ui with CSS variables
  - Components: shadcn/ui + magicui
  - Theme System: next-themes + custom color theme context
  - Language: TypeScript 5.3+
  - Package Manager: pnpm 9.10.0

Backend:
  - Framework: Medusa.js 2.0
  - Database: PostgreSQL with MikroORM
  - Cache/Queue: Redis (with in-memory fallback)
  - File Storage: MinIO (with local fallback)
  - Email: Resend with React Email templates
  - Language: TypeScript 5.3+
  - Package Manager: pnpm 9.10.0

Deployment:
  - Platform: Railway
  - Build Tool: Nixpacks
  - Environment: Node.js 22.x
  - Process Manager: PM2 (built-in)
```

## File Structure for Shared Components

### Storefront Directory Structure
```
storefront/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [countryCode]/
│   │   │   ├── (main)/
│   │   │   │   ├── page.tsx          # Homepage with new sections
│   │   │   │   └── layout.tsx        # Main layout with theme provider
│   │   │   └── (checkout)/
│   │   ├── api/
│   │   │   └── healthcheck/
│   │   │       └── route.ts          # Health check endpoint
│   │   ├── layout.tsx                # Root layout with theme providers
│   │   └── globals.css               # Global styles with CSS variables
│   ├── components/                   # Component library
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── table.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── command.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   └── index.ts              # Export all UI components
│   │   ├── magicui/                  # magicui components
│   │   │   ├── animated-gradient-text.tsx
│   │   │   ├── animated-shiny-text.tsx
│   │   │   ├── border-beam.tsx
│   │   │   ├── magic-card.tsx
│   │   │   ├── marquee.tsx
│   │   │   ├── number-ticker.tsx
│   │   │   ├── pulsating-button.tsx
│   │   │   ├── rainbow-button.tsx
│   │   │   ├── ripple-button.tsx
│   │   │   ├── shimmer-button.tsx
│   │   │   ├── shiny-button.tsx
│   │   │   ├── sparkles-text.tsx
│   │   │   ├── typing-animation.tsx
│   │   │   ├── word-rotate.tsx
│   │   │   └── index.ts              # Export all magicui components
│   │   ├── layout/                   # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── main-nav.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── index.ts
│   │   ├── sections/                 # Homepage sections
│   │   │   ├── hero-section/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── hero-content.tsx
│   │   │   │   └── hero-animation.tsx
│   │   │   ├── features-section/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── feature-card.tsx
│   │   │   │   └── features-grid.tsx
│   │   │   ├── stats-section/
│   │   │   │   ├── index.tsx
│   │   │   │   └── stat-counter.tsx
│   │   │   ├── product-section/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── product-showcase.tsx
│   │   │   │   └── product-grid.tsx
│   │   │   ├── testimonials-section/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── testimonial-card.tsx
│   │   │   │   └── testimonials-carousel.tsx
│   │   │   ├── newsletter-section/
│   │   │   │   ├── index.tsx
│   │   │   │   └── newsletter-form.tsx
│   │   │   └── index.ts
│   │   ├── products/                 # Product components
│   │   │   ├── product-card.tsx
│   │   │   ├── product-gallery.tsx
│   │   │   ├── product-actions.tsx
│   │   │   ├── product-filters.tsx
│   │   │   ├── product-grid.tsx
│   │   │   └── index.ts
│   │   ├── cart/                     # Cart components
│   │   │   ├── cart-item.tsx
│   │   │   ├── cart-dropdown.tsx
│   │   │   ├── cart-summary.tsx
│   │   │   ├── add-to-cart-button.tsx
│   │   │   └── index.ts
│   │   ├── checkout/                 # Checkout components
│   │   │   ├── payment-form.tsx
│   │   │   ├── shipping-form.tsx
│   │   │   ├── order-summary.tsx
│   │   │   ├── checkout-steps.tsx
│   │   │   └── index.ts
│   │   ├── auth/                     # Authentication components
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   ├── auth-provider.tsx
│   │   │   └── index.ts
│   │   ├── common/                   # Common components
│   │   │   ├── loading-spinner.tsx
│   │   │   ├── error-boundary.tsx
│   │   │   ├── theme-switcher.tsx
│   │   │   ├── search-dialog.tsx
│   │   │   └── index.ts
│   │   └── index.ts                  # Main component export
│   ├── lib/                          # Utilities and configurations
│   │   ├── utils.ts                  # shadcn/ui utilities (cn function)
│   │   ├── theme-provider.tsx        # next-themes provider wrapper
│   │   ├── theme-context.tsx         # Custom color theme context
│   │   ├── constants.tsx             # App constants
│   │   └── data/                     # Existing Medusa data layer
│   ├── hooks/                        # Custom hooks
│   │   ├── use-theme.ts              # Theme switching hook
│   │   ├── use-mobile.ts             # Mobile detection hook
│   │   ├── use-toast.ts              # Toast notifications hook
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css               # Global styles with theme variables
│   ├── types/
│   │   ├── global.ts                 # Global type definitions
│   │   ├── theme.ts                  # Theme-related types
│   │   └── components.ts             # Component prop types
│   └── modules/                      # Existing Medusa modules (preserved)
├── components.json                   # shadcn/ui configuration
├── tailwind.config.js                # Updated Tailwind configuration
├── package.json                      # Updated dependencies
├── tsconfig.json                     # TypeScript configuration
├── next.config.js                    # Next.js configuration
└── README.md                         # Updated documentation
```

### Backend Directory Structure
```
backend/
├── src/
│   ├── admin/                        # Admin customizations
│   │   ├── components/               # Custom admin components
│   │   │   ├── themed-layout.tsx
│   │   │   ├── custom-login.tsx
│   │   │   ├── dashboard-overview.tsx
│   │   │   ├── product-management.tsx
│   │   │   ├── user-management.tsx
│   │   │   ├── admin-theme-switcher.tsx
│   │   │   └── index.ts
│   │   ├── providers/
│   │   │   ├── admin-theme-provider.tsx
│   │   │   └── index.ts
│   │   ├── styles/
│   │   │   └── theme-overrides.css
│   │   ├── theme-config.ts
│   │   └── README.md
│   ├── api/                          # API routes
│   │   ├── admin/
│   │   │   ├── theme/
│   │   │   │   └── route.ts          # Theme configuration API
│   │   │   └── custom/
│   │   │       └── route.ts
│   │   ├── store/
│   │   └── healthcheck/
│   │       └── route.ts              # Health check endpoint
│   ├── modules/                      # Existing Medusa modules
│   │   ├── email-notifications/      # Enhanced email templates
│   │   │   ├── templates/
│   │   │   │   ├── themed-base.tsx
│   │   │   │   ├── themed-order-placed.tsx
│   │   │   │   ├── themed-invite-user.tsx
│   │   │   │   └── index.tsx
│   │   │   └── services/
│   │   └── minio-file/
│   ├── lib/
│   │   ├── constants.ts              # Environment configuration
│   │   └── error-handler.ts          # Enhanced error handling
│   └── [existing structure]
├── medusa-config.js                  # Main Medusa configuration
├── package.json                      # Updated dependencies
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Updated documentation
```

## Import/Export Patterns for Theme System

### Component Import Patterns
```typescript
// Standard shadcn/ui component import
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// magicui component import
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { BorderBeam } from "@/components/magicui/border-beam"
import { NumberTicker } from "@/components/magicui/number-ticker"

// Custom component import
import { ProductCard } from "@/components/products/product-card"
import { HeroSection } from "@/components/sections/hero-section"

// Utility import
import { cn } from "@/lib/utils"

// Theme hooks import
import { useTheme } from "next-themes"
import { useThemeContext } from "@/lib/theme-context"

// Icon import
import { ShoppingCart, Heart, Star } from "lucide-react"
```

### Component Export Patterns
```typescript
// src/components/ui/index.ts - Centralized UI exports
export { Button, buttonVariants } from "./button"
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card"
export { Badge, badgeVariants } from "./badge"
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "./avatar"
// ... all other UI components

// src/components/magicui/index.ts - Centralized magicui exports
export { default as AnimatedGradientText } from "./animated-gradient-text"
export { default as BorderBeam } from "./border-beam"
export { default as MagicCard } from "./magic-card"
export { default as NumberTicker } from "./number-ticker"
// ... all other magicui components

// src/components/sections/index.ts - Section exports
export { HeroSection } from "./hero-section"
export { FeaturesSection } from "./features-section"
export { StatsSection } from "./stats-section"
export { ProductSection } from "./product-section"
export { TestimonialsSection } from "./testimonials-section"
export { NewsletterSection } from "./newsletter-section"

// src/components/index.ts - Main component export
export * from "./ui"
export * from "./magicui"
export * from "./layout"
export * from "./sections"
export * from "./products"
export * from "./cart"
export * from "./checkout"
export * from "./auth"
export * from "./common"
```

### Theme Provider Pattern
```typescript
// src/lib/theme-provider.tsx - next-themes wrapper
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// src/lib/theme-context.tsx - Custom color theme context
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

## Configuration Files Setup

### components.json - shadcn/ui Configuration
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
    "magicui": "@/components/magicui",
    "lib": "@/lib",
    "hooks": "@/hooks",
    "sections": "@/components/sections",
    "products": "@/components/products",
    "cart": "@/components/cart",
    "checkout": "@/components/checkout",
    "auth": "@/components/auth",
    "common": "@/components/common"
  }
}
```

### tailwind.config.js - Enhanced Tailwind Configuration
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
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
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
        // magicui animations
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        shine: {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          to: { "background-position": "0% 0%" },
        },
        gradient: {
          to: { "background-position": "var(--bg-size, 300%) 0" },
        },
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
          "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // magicui animations
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        shine: "shine var(--duration) infinite linear",
        gradient: "gradient 8s linear infinite",
        rainbow: "rainbow var(--speed, 2s) infinite linear",
        pulse: "pulse var(--duration) ease-out infinite",
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"), // For rich text content
  ],
}
```

### tsconfig.json - TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### next.config.js - Next.js Configuration
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable app directory
    appDir: true,
  },
  images: {
    // Image optimization domains
    domains: [
      'localhost',
      'via.placeholder.com',
      'images.unsplash.com',
      'your-minio-domain.com'
    ],
    // Image formats
    formats: ['image/webp', 'image/avif'],
  },
  // Enable SWC minification
  swcMinify: true,
  // Compress responses
  compress: true,
  // Enable React strict mode
  reactStrictMode: true,
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Webpack configuration for magicui
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

## Package.json Modifications Required

### Storefront package.json Updates
```json
{
  "name": "medusa-next",
  "version": "1.0.3",
  "private": true,
  "scripts": {
    "wait": "await-backend",
    "launcher": "launch-storefront",
    "dev": "npm run wait && npm run launcher dev",
    "build": "npm run wait && npm run launcher build",
    "start": "npm run launcher start",
    "build:next": "next build",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "analyze": "ANALYZE=true next build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test-e2e": "playwright test e2e",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    // Existing Medusa dependencies
    "@medusajs/js-sdk": "preview",
    "@medusajs/types": "preview",
    "@medusajs/ui": "preview",
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    
    // NEW: shadcn/ui core dependencies
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    
    // NEW: Radix UI components
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-radio-group": "^1.2.4",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-slider": "^1.2.4",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-hover-card": "^1.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.6",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-context-menu": "^2.2.7",
    "@radix-ui/react-menubar": "^1.1.7",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-toggle": "^1.1.3",
    "@radix-ui/react-toggle-group": "^1.1.3",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    
    // NEW: Theme management
    "next-themes": "^0.4.6",
    
    // NEW: Icons and utilities
    "lucide-react": "^0.453.0",
    "@radix-ui/react-icons": "^1.3.2",
    
    // NEW: Animation and effects
    "framer-motion": "^11.13.1",
    "canvas-confetti": "^1.9.3",
    
    // NEW: Additional UI components
    "cmdk": "^1.1.1",
    "vaul": "^1.1.2",
    "embla-carousel-react": "^8.6.0",
    "react-day-picker": "^9.8.0",
    "date-fns": "^3.6.0",
    "recharts": "^2.15.2",
    "input-otp": "^1.4.2",
    "react-resizable-panels": "^2.1.7",
    
    // Existing dependencies (preserved)
    "@headlessui/react": "^1.6.1",
    "@hookform/error-message": "^2.0.0",
    "@meilisearch/instant-meilisearch": "^0.7.1",
    "@paypal/paypal-js": "^5.0.6",
    "@paypal/react-paypal-js": "^7.8.1",
    "@stripe/react-stripe-js": "^1.7.2",
    "@stripe/stripe-js": "^1.29.0",
    "algoliasearch": "^4.20.0",
    "axios": "^1.6.7",
    "lodash": "^4.17.21",
    "medusajs-launch-utils": "^0.0.16",
    "pg": "^8.11.3",
    "qs": "^6.12.1",
    "react-country-flag": "^3.0.2",
    "react-instantsearch-hooks-web": "^6.29.0",
    "react-intersection-observer": "^9.3.4",
    "server-only": "^0.0.1",
    "tailwindcss-radix": "^2.8.0",
    "webpack": "^5"
  },
  "devDependencies": {
    // Existing dev dependencies
    "@babel/core": "^7.17.5",
    "@medusajs/client-types": "preview",
    "@playwright/test": "^1.41.1",
    "@types/lodash": "^4.14.195",
    "@types/node": "17.0.21",
    "@types/pg": "^8.11.0",
    "@types/react": "^18.2.42",
    "@types/react-dom": "^18.2.18",
    "ansi-colors": "^4.1.3",
    "autoprefixer": "^10.4.2",
    "babel-loader": "^8.2.3",
    "eslint": "8.10.0",
    "eslint-config-next": "^13.4.5",
    "postcss": "^8.4.8",
    "prettier": "^2.8.8",
    "tailwindcss": "^3.0.23",
    "typescript": "^5.3.2",
    
    // NEW: Testing dependencies
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    
    // NEW: Storybook dependencies
    "@storybook/react": "^7.6.0",
    "@storybook/react-vite": "^7.6.0",
    "@storybook/addon-essentials": "^7.6.0",
    "@storybook/addon-interactions": "^7.6.0",
    "@storybook/addon-links": "^7.6.0",
    
    // NEW: Additional type definitions
    "@types/canvas-confetti": "^1.9.0"
  },
  "engines": {
    "node": "22.x",
    "npm": "10.x"
  },
  "packageManager": "pnpm@9.10.0"
}
```

### Backend package.json Updates
```json
{
  "name": "medusa-2.0-boilerplate-backend",
  "version": "0.0.2",
  "scripts": {
    "build": "medusa build && node src/scripts/postBuild.js",
    "seed": "medusa exec ./src/scripts/seed.ts",
    "ib": "init-backend",
    "start": "init-backend && cd .medusa/server && medusa start --verbose",
    "dev": "medusa develop",
    "email:dev": "email dev --dir=./src/modules/email-notifications/templates --port=3002",
    "test": "jest",
    "test:watch": "jest --watch",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    // Existing Medusa dependencies (preserved)
    "@medusajs/admin-sdk": "latest",
    "@medusajs/cli": "latest",
    "@medusajs/core-flows": "latest",
    "@medusajs/framework": "latest",
    "@medusajs/medusa": "latest",
    "@medusajs/dashboard": "latest",
    "@medusajs/notification-sendgrid": "latest",
    "@medusajs/payment-stripe": "latest",
    "@medusajs/workflow-engine-redis": "latest",
    "@mikro-orm/core": "6.4.3",
    "@mikro-orm/knex": "6.4.3",
    "@mikro-orm/migrations": "6.4.3",
    "@mikro-orm/postgresql": "6.4.3",
    "@rokmohar/medusa-plugin-meilisearch": "^1.1.4",
    "awilix": "^8.0.1",
    "medusajs-launch-utils": "^0.0.16",
    "minio": "^8.0.3",
    "pg": "^8.13.1",
    "resend": "4.0.1",
    "ulid": "^2.3.0",
    
    // NEW: React Email dependencies for themed templates
    "@react-email/components": "^0.0.26",
    "react-email": "^3.0.4",
    
    // NEW: Admin theming dependencies
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "next-themes": "^0.4.6",
    "lucide-react": "^0.453.0"
  },
  "devDependencies": {
    // Existing dev dependencies (preserved)
    "@medusajs/test-utils": "latest",
    "@mikro-orm/cli": "6.4.3",
    "@swc/core": "1.5.7",
    "@swc/jest": "^0.2.37",
    "@types/jest": "^29.5.14",
    "@types/node": "^20.17.10",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "jest": "^29.7.0",
    "prop-types": "^15.8.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.2",
    "vite": "^5.4.11"
  },
  "engines": {
    "node": "22.x",
    "npm": "10.x"
  },
  "packageManager": "pnpm@9.10.0"
}
```

## Build Process Optimization

### Railway Build Configuration
```toml
# railway.toml
[build]
builder = "NIXPACKS"
buildCommand = "pnpm install --frozen-lockfile && pnpm build"

[deploy]
healthcheckPath = "/api/healthcheck"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3

[[services]]
name = "medusa-backend"
source = "backend"

[services.medusa-backend.build]
buildCommand = "pnpm install --frozen-lockfile && pnpm build"

[services.medusa-backend.deploy]
startCommand = "pnpm start"

[services.medusa-backend.variables]
NODE_ENV = "production"
PORT = { default = "8080" }

[[services]]
name = "medusa-storefront"
source = "storefront"

[services.medusa-storefront.build]
buildCommand = "pnpm install --frozen-lockfile && pnpm build"

[services.medusa-storefront.deploy]
startCommand = "pnpm start"

[services.medusa-storefront.variables]
NODE_ENV = "production"
PORT = { default = "3000" }
```

### Build Scripts
```bash
#!/bin/bash
# scripts/build-optimized.sh

echo "🏗️ Starting optimized build process..."

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf storefront/.next
rm -rf backend/.medusa
rm -rf storefront/node_modules/.cache
rm -rf backend/node_modules/.cache

# Install dependencies with frozen lockfile
echo "Installing dependencies..."
cd storefront && pnpm install --frozen-lockfile
cd ../backend && pnpm install --frozen-lockfile

# Run type checking
echo "Running type checks..."
cd ../storefront && pnpm type-check
cd ../backend && pnpm type-check

# Build backend first
echo "Building backend..."
cd ../backend && pnpm build

# Build storefront
echo "Building storefront..."
cd ../storefront && pnpm build

# Verify builds
echo "Verifying builds..."
if [ -d "storefront/.next" ] && [ -d "backend/.medusa" ]; then
  echo "✅ Build successful!"
else
  echo "❌ Build failed!"
  exit 1
fi

echo "🎉 Optimized build completed!"
```

### Performance Optimization
```javascript
// next.config.js - Production optimizations
const nextConfig = {
  // Enable SWC minification
  swcMinify: true,
  
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24 hours
  },
  
  // Bundle analyzer (development only)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
        })
      )
      return config
    },
  }),
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Disable source maps in production
    productionBrowserSourceMaps: false,
    
    // Enable React optimizations
    reactStrictMode: true,
    
    // Optimize CSS
    experimental: {
      optimizeCss: true,
    },
  }),
}
```

### CSS Optimization
```css
/* src/styles/globals.css - Optimized CSS loading */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Critical CSS - loaded first */
:root {
  /* Bubblegum theme variables - loaded synchronously */
  --background: #f6e6ee;
  --foreground: #5b5b5b;
  --primary: #d04f99;
  /* ... other critical variables */
}

/* Component-specific styles - can be loaded asynchronously */
@layer components {
  .btn-primary {
    @apply bg-primary text-primary-foreground hover:bg-primary/90;
  }
  
  .card-base {
    @apply bg-card text-card-foreground border border-border rounded-lg;
  }
}

/* Animation styles - loaded after critical content */
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

This technical specification provides a comprehensive blueprint for implementing the modern theme system while maintaining optimal performance and Railway deployment compatibility.