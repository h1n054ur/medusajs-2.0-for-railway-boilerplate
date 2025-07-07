# Phase 5: Backend Integration

## Overview
Apply the new theme system to the Medusa admin panel, update API response styling for consistency, upgrade authentication flow components, and ensure the admin panel matches storefront theming.

## Phase 5 Objectives
1. Apply modern theme system to Medusa admin dashboard
2. Update authentication flow components with new styling
3. Style dashboard and management interfaces with shadcn/ui components
4. Ensure admin panel matches storefront theming
5. Optimize API response styling for consistency
6. Integrate theme switching in admin interface

## Medusa Admin Panel Analysis

### Current Admin Structure
```
backend/src/admin/
├── README.md
├── tsconfig.json
└── [admin customizations]
```

### Admin Dashboard Access
- **URL**: `http://localhost:9000/app`
- **Framework**: @medusajs/dashboard (latest)
- **Customization**: Limited to admin API routes and custom functionality

## Admin Panel Theme Integration Strategy

### Step 1: Admin Theme Configuration
```typescript
// backend/src/admin/theme-config.ts
export const adminThemeConfig = {
  colors: {
    // Match storefront bubblegum theme
    primary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      500: '#d04f99',
      600: '#be185d',
      900: '#831843'
    },
    background: {
      light: '#f6e6ee',
      dark: '#12242e'
    },
    card: {
      light: '#fdedc9',
      dark: '#1c2e38'
    }
  },
  borderRadius: '0.4rem',
  fontFamily: 'Poppins, sans-serif'
}
```

### Step 2: Custom Admin Components
```typescript
// backend/src/admin/components/themed-layout.tsx
import { adminThemeConfig } from '../theme-config'

export function ThemedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="admin-themed-layout"
      style={{
        '--admin-primary': adminThemeConfig.colors.primary[500],
        '--admin-bg': adminThemeConfig.colors.background.light,
        '--admin-card': adminThemeConfig.colors.card.light,
        '--admin-radius': adminThemeConfig.borderRadius,
        fontFamily: adminThemeConfig.fontFamily
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
```

### Step 3: Admin CSS Overrides
```css
/* backend/src/admin/styles/theme-overrides.css */
:root {
  /* Override default Medusa admin colors with bubblegum theme */
  --medusa-bg-base: #f6e6ee;
  --medusa-bg-subtle: #fdedc9;
  --medusa-bg-component: #ffffff;
  --medusa-fg-base: #5b5b5b;
  --medusa-fg-subtle: #7a7a7a;
  --medusa-border-base: #d04f99;
  --medusa-border-strong: #be185d;
  --medusa-tag-primary-bg: #d04f99;
  --medusa-tag-primary-fg: #ffffff;
  --medusa-tag-primary-border: #be185d;
}

.dark {
  /* Dark mode overrides */
  --medusa-bg-base: #12242e;
  --medusa-bg-subtle: #1c2e38;
  --medusa-bg-component: #24272b;
  --medusa-fg-base: #f3e3ea;
  --medusa-fg-subtle: #e4a2b1;
  --medusa-border-base: #324859;
  --medusa-border-strong: #50afb6;
  --medusa-tag-primary-bg: #fbe2a7;
  --medusa-tag-primary-fg: #12242e;
  --medusa-tag-primary-border: #50afb6;
}

/* Custom component styling */
.medusa-admin-button {
  border-radius: 0.4rem;
  font-family: 'Poppins', sans-serif;
}

.medusa-admin-card {
  border-radius: 0.4rem;
  box-shadow: 3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 0.50);
}
```

## Authentication Flow Enhancement

### Step 1: Custom Login Component
```typescript
// backend/src/admin/components/custom-login.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { BorderBeam } from "../ui/border-beam"
import { AnimatedGradientText } from "../ui/animated-gradient-text"

export function CustomLoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <Card className="w-full max-w-md relative">
        <BorderBeam size={250} duration={12} delay={9} />
        <CardHeader className="text-center">
          <AnimatedGradientText>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          </AnimatedGradientText>
          <CardDescription>
            Access your Medusa admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Step 2: Enhanced User Management
```typescript
// backend/src/admin/components/user-management.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, UserPlus } from "lucide-react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'member'
  status: 'active' | 'inactive'
  createdAt: string
}

export function UserManagement({ users }: { users: User[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage your admin team and their permissions
            </CardDescription>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                    <AvatarFallback>
                      {user.firstName[0]}{user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
```

## Dashboard Component Enhancement

### Step 1: Modern Dashboard Overview
```typescript
// backend/src/admin/components/dashboard-overview.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { NumberTicker } from "../ui/number-ticker"
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Package } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const dashboardStats = [
  {
    title: "Total Revenue",
    value: 45231.89,
    change: "+20.1%",
    trend: "up",
    icon: DollarSign
  },
  {
    title: "Orders",
    value: 2350,
    change: "+180.1%",
    trend: "up",
    icon: ShoppingCart
  },
  {
    title: "Customers",
    value: 12234,
    change: "+19%",
    trend: "up",
    icon: Users
  },
  {
    title: "Products",
    value: 573,
    change: "+201",
    trend: "up",
    icon: Package
  }
]

const chartData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.title === "Total Revenue" ? "$" : ""}
                <NumberTicker value={stat.value} />
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest customer orders and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Recent orders list */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order #1234</p>
                  <p className="text-sm text-muted-foreground">2 minutes ago</p>
                </div>
                <Badge>Processing</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order #1233</p>
                  <p className="text-sm text-muted-foreground">1 hour ago</p>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order #1232</p>
                  <p className="text-sm text-muted-foreground">3 hours ago</p>
                </div>
                <Badge variant="destructive">Cancelled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### Step 2: Product Management Interface
```typescript
// backend/src/admin/components/product-management.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

interface Product {
  id: string
  title: string
  status: 'published' | 'draft'
  variants: number
  inventory: number
  price: number
  createdAt: string
}

export function ProductManagement({ products }: { products: Product[] }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your product catalog and inventory
              </CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.variants} variant{product.variants !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.status === 'published' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.inventory > 10 ? 'default' : 'destructive'}>
                      {product.inventory} in stock
                    </Badge>
                  </TableCell>
                  <TableCell>
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
```

## API Response Styling

### Step 1: API Route Enhancements
```typescript
// backend/src/api/admin/theme/route.ts
import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // Return theme configuration for admin panel
  const themeConfig = {
    colors: {
      primary: '#d04f99',
      secondary: '#8acfd1',
      accent: '#fbe2a7',
      background: '#f6e6ee',
      card: '#fdedc9'
    },
    fonts: {
      sans: 'Poppins, sans-serif',
      mono: 'Fira Code, monospace'
    },
    borderRadius: '0.4rem'
  }

  res.status(200).json({
    theme: themeConfig,
    timestamp: new Date().toISOString()
  })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // Update theme preferences for admin user
  const { userId, themePreferences } = req.body

  try {
    // Save theme preferences to database
    // Implementation depends on your user preferences storage
    
    res.status(200).json({
      message: "Theme preferences updated successfully",
      preferences: themePreferences
    })
  } catch (error) {
    res.status(500).json({
      error: "Failed to update theme preferences"
    })
  }
}
```

### Step 2: Enhanced API Error Responses
```typescript
// backend/src/lib/error-handler.ts
import { MedusaError } from "@medusajs/framework/utils"

export class ThemedErrorHandler {
  static formatError(error: MedusaError) {
    return {
      error: {
        message: error.message,
        type: error.type,
        code: error.code
      },
      ui: {
        variant: this.getErrorVariant(error.type),
        severity: this.getErrorSeverity(error.code),
        autoClose: this.shouldAutoClose(error.type)
      },
      timestamp: new Date().toISOString()
    }
  }

  private static getErrorVariant(type: string): 'destructive' | 'warning' | 'info' {
    switch (type) {
      case 'validation_error':
        return 'warning'
      case 'not_found':
        return 'info'
      default:
        return 'destructive'
    }
  }

  private static getErrorSeverity(code: number): 'low' | 'medium' | 'high' {
    if (code >= 500) return 'high'
    if (code >= 400) return 'medium'
    return 'low'
  }

  private static shouldAutoClose(type: string): boolean {
    return type === 'validation_error'
  }
}
```

## Theme Switching in Admin

### Step 1: Admin Theme Provider
```typescript
// backend/src/admin/providers/admin-theme-provider.tsx
"use client"

import { createContext, useContext, useState, useEffect } from 'react'

type AdminTheme = 'light' | 'dark'
type ColorScheme = 'bubblegum' | 'default' | 'corporate'

interface AdminThemeContextType {
  theme: AdminTheme
  colorScheme: ColorScheme
  setTheme: (theme: AdminTheme) => void
  setColorScheme: (scheme: ColorScheme) => void
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined)

export function useAdminTheme() {
  const context = useContext(AdminThemeContext)
  if (!context) {
    throw new Error('useAdminTheme must be used within AdminThemeProvider')
  }
  return context
}

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>('light')
  const [colorScheme, setColorScheme] = useState<ColorScheme>('bubblegum')

  useEffect(() => {
    // Apply theme classes to admin container
    const adminContainer = document.querySelector('.medusa-admin')
    if (adminContainer) {
      adminContainer.className = `medusa-admin ${theme} theme-${colorScheme}`
    }
  }, [theme, colorScheme])

  return (
    <AdminThemeContext.Provider value={{
      theme,
      colorScheme,
      setTheme,
      setColorScheme
    }}>
      {children}
    </AdminThemeContext.Provider>
  )
}
```

### Step 2: Admin Theme Switcher
```typescript
// backend/src/admin/components/admin-theme-switcher.tsx
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Sun, Moon, Palette } from "lucide-react"
import { useAdminTheme } from "../providers/admin-theme-provider"

export function AdminThemeSwitcher() {
  const { theme, colorScheme, setTheme, setColorScheme } = useAdminTheme()

  return (
    <div className="flex items-center gap-2">
      {/* Light/Dark Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      {/* Color Scheme Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Palette className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setColorScheme('bubblegum')}>
            Bubblegum
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorScheme('default')}>
            Default
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorScheme('corporate')}>
            Corporate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
```

## Email Template Styling

### Step 1: Update Email Templates
```typescript
// backend/src/modules/email-notifications/templates/themed-base.tsx
import { Html, Head, Body, Container, Section, Text, Button } from '@react-email/components'

interface ThemedEmailProps {
  title: string
  children: React.ReactNode
}

export function ThemedEmailBase({ title, children }: ThemedEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`
          :root {
            --primary: #d04f99;
            --background: #f6e6ee;
            --card: #fdedc9;
            --foreground: #5b5b5b;
            --radius: 8px;
          }
        `}</style>
      </Head>
      <Body style={{ backgroundColor: 'var(--background)', fontFamily: 'Poppins, sans-serif' }}>
        <Container style={{ margin: '0 auto', padding: '20px' }}>
          <Section style={{
            backgroundColor: 'var(--card)',
            borderRadius: 'var(--radius)',
            padding: '32px',
            boxShadow: '3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 0.50)'
          }}>
            <Text style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'var(--foreground)',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              {title}
            </Text>
            {children}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
```

### Step 2: Order Confirmation Email
```typescript
// backend/src/modules/email-notifications/templates/themed-order-placed.tsx
import { ThemedEmailBase } from './themed-base'
import { Text, Button, Section } from '@react-email/components'

interface OrderPlacedEmailProps {
  orderNumber: string
  customerName: string
  orderTotal: string
}

export function ThemedOrderPlacedEmail({ orderNumber, customerName, orderTotal }: OrderPlacedEmailProps) {
  return (
    <ThemedEmailBase title="Order Confirmation">
      <Text style={{ fontSize: '18px', marginBottom: '16px' }}>
        Hi {customerName},
      </Text>
      
      <Text style={{ marginBottom: '24px' }}>
        Thank you for your order! We've received your order #{orderNumber} and it's being processed.
      </Text>

      <Section style={{
        backgroundColor: 'var(--background)',
        padding: '16px',
        borderRadius: 'var(--radius)',
        marginBottom: '24px'
      }}>
        <Text style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Order Summary:
        </Text>
        <Text>Order Number: #{orderNumber}</Text>
        <Text>Total: {orderTotal}</Text>
      </Section>

      <Button
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/order/confirmed/${orderNumber}`}
        style={{
          backgroundColor: 'var(--primary)',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: 'var(--radius)',
          textDecoration: 'none',
          display: 'inline-block',
          fontWeight: 'bold'
        }}
      >
        View Order Details
      </Button>
    </ThemedEmailBase>
  )
}
```

## Testing Admin Integration

### Step 1: Admin Component Tests
```typescript
// backend/src/admin/components/__tests__/dashboard-overview.test.tsx
import { render, screen } from '@testing-library/react'
import { DashboardOverview } from '../dashboard-overview'
import { AdminThemeProvider } from '../providers/admin-theme-provider'

describe('DashboardOverview', () => {
  it('renders all stat cards', () => {
    render(
      <AdminThemeProvider>
        <DashboardOverview />
      </AdminThemeProvider>
    )

    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByText('Customers')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('applies theme classes correctly', () => {
    render(
      <AdminThemeProvider>
        <DashboardOverview />
      </AdminThemeProvider>
    )

    // Verify theme-specific styling is applied
    const container = screen.getByTestId('dashboard-container')
    expect(container).toHaveClass('theme-bubblegum')
  })
})
```

### Step 2: Theme Integration Tests
```typescript
// backend/src/admin/__tests__/theme-integration.test.tsx
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { AdminThemeSwitcher } from '../components/admin-theme-switcher'
import { AdminThemeProvider } from '../providers/admin-theme-provider'

describe('Admin Theme Integration', () => {
  it('switches between light and dark themes', async () => {
    const user = userEvent.setup()
    
    render(
      <AdminThemeProvider>
        <AdminThemeSwitcher />
      </AdminThemeProvider>
    )

    const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
    await user.click(themeToggle)

    // Verify theme switch
    expect(document.querySelector('.medusa-admin')).toHaveClass('dark')
  })
})
```

## Phase 5 Success Criteria

### Admin Panel Styling
- [ ] Bubblegum theme applied to admin dashboard
- [ ] Theme switching functional in admin
- [ ] All admin components use consistent styling
- [ ] Authentication flow updated with new design

### API Integration
- [ ] Theme configuration API implemented
- [ ] Error responses include UI styling hints
- [ ] Email templates use consistent theming
- [ ] Admin preferences persistence working

### Consistency
- [ ] Admin panel matches storefront theme
- [ ] All backend components themed consistently
- [ ] User experience seamless across admin/storefront
- [ ] Performance maintained

### Testing
- [ ] Admin component tests passing
- [ ] Theme switching tests successful
- [ ] API integration tests complete
- [ ] Email template rendering validated

## Next Steps to Phase 6

### Phase 6 Prerequisites
- Admin panel fully themed
- All backend components updated
- Theme consistency achieved
- Testing complete

### Phase 6 Preparation
- Pre-deployment checklist creation
- Railway configuration review
- Performance optimization
- Final testing strategy

This Phase 5 plan ensures the Medusa admin panel matches the modern storefront theming while maintaining all administrative functionality and providing a consistent user experience across the entire platform.