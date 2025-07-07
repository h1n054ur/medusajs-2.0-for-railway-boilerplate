# Phase 4: Homepage Upgrade

## Overview
Transform the Medusa storefront homepage to match the modern design patterns from the replit-app reference, implementing identical layout using new shadcn/ui components and bubblegum theme styling.

## Phase 4 Objectives
1. Analyze replit-app homepage design and component structure
2. Implement identical layout for Medusa storefront homepage
3. Migrate all sections using shadcn/ui and magicui components
4. Ensure responsive behavior and animations work correctly
5. Test theme switching on the new homepage
6. Maintain e-commerce functionality integration

## replit-app Homepage Analysis

### Homepage Structure (from home.tsx)
```typescript
const homepageSections = [
  'Header',                    // Navigation with theme switcher
  'HeroSection',              // Main hero with animated elements
  'FeaturesSection',          // Product features grid
  'StatsSection',             // Statistics showcase
  'ProductSection',           // Product showcase/gallery
  'TestimonialsCarousel',     // Customer testimonials
  'PricingSection',           // Pricing tiers
  'TeamSection',              // Team showcase
  'TimelineSection',          // Company timeline
  'BlogSection',              // Latest blog posts
  'LogoShowcase',             // Brand logos
  'FaqSection',               // Frequently asked questions
  'NewsletterSection',        // Email subscription
  'ContactSection',           // Contact information
  'Footer'                    // Site footer
]
```

### Component-Specific Analysis
```typescript
// Key components used in replit-app
const componentUsage = {
  magicui: [
    'AnimatedGradientText',
    'BorderBeam',
    'MagicCard',
    'Marquee',
    'NumberTicker',
    'PulsatingButton',
    'ShimmerButton',
    'SparklesText',
    'TypingAnimation'
  ],
  shadcnUI: [
    'Button',
    'Card',
    'Badge',
    'Avatar',
    'Accordion',
    'Carousel',
    'Tabs',
    'Dialog'
  ]
}
```

## Homepage Section Implementation

### Step 1: Create Section Components Directory
```
src/components/sections/
├── hero-section/
│   ├── index.tsx
│   ├── hero-content.tsx
│   └── hero-animation.tsx
├── features-section/
│   ├── index.tsx
│   ├── feature-card.tsx
│   └── features-grid.tsx
├── stats-section/
│   ├── index.tsx
│   └── stat-counter.tsx
├── product-section/
│   ├── index.tsx
│   ├── product-showcase.tsx
│   └── product-grid.tsx
├── testimonials/
│   ├── index.tsx
│   ├── testimonial-card.tsx
│   └── testimonials-carousel.tsx
├── pricing-section/
│   ├── index.tsx
│   ├── pricing-card.tsx
│   └── pricing-grid.tsx
├── team-section/
│   ├── index.tsx
│   └── team-member-card.tsx
├── timeline-section/
│   ├── index.tsx
│   └── timeline-item.tsx
├── blog-section/
│   ├── index.tsx
│   └── blog-card.tsx
├── logo-showcase/
│   ├── index.tsx
│   └── logo-marquee.tsx
├── faq-section/
│   ├── index.tsx
│   └── faq-accordion.tsx
├── newsletter-section/
│   ├── index.tsx
│   └── newsletter-form.tsx
└── contact-section/
    ├── index.tsx
    └── contact-form.tsx
```

### Step 2: Hero Section Implementation
```typescript
// src/components/sections/hero-section/index.tsx
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { SparklesText } from "@/components/magicui/sparkles-text"
import { PulsatingButton } from "@/components/magicui/pulsating-button"
import { BorderBeam } from "@/components/magicui/border-beam"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 text-center z-10">
        {/* Announcement Badge */}
        <div className="mb-8">
          <AnimatedGradientText>
            <Badge variant="outline" className="px-4 py-2">
              ✨ New Collection Available
            </Badge>
          </AnimatedGradientText>
        </div>

        {/* Main Headline */}
        <div className="mb-6">
          <SparklesText
            text="Modern E-Commerce Experience"
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          />
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Discover our curated collection of premium products with the power of 
          modern design and seamless shopping experience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <PulsatingButton className="px-8 py-3 text-lg">
            Shop Now
          </PulsatingButton>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
            View Collection
          </Button>
        </div>

        {/* Featured Product Preview */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <BorderBeam size={250} duration={12} delay={9} />
            <img
              src="https://via.placeholder.com/800x600"
              alt="Featured Products"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Step 3: Features Section Implementation
```typescript
// src/components/sections/features-section/index.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/magicui/magic-card"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Truck, Shield, CreditCard, Headphones, Zap, Heart } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
    stat: 24,
    statLabel: "Hour Delivery"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure payment processing",
    stat: 256,
    statLabel: "Bit Encryption"
  },
  {
    icon: CreditCard,
    title: "Easy Returns",
    description: "30-day return policy",
    stat: 30,
    statLabel: "Day Returns"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service",
    stat: 24,
    statLabel: "Hour Support"
  },
  {
    icon: Zap,
    title: "Fast Checkout",
    description: "One-click purchase experience",
    stat: 1,
    statLabel: "Click Checkout"
  },
  {
    icon: Heart,
    title: "Wishlist",
    description: "Save items for later",
    stat: 99,
    statLabel: "Satisfaction"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unmatched Shopping Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide the best features to make your shopping experience 
            smooth, secure, and enjoyable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <MagicCard
              key={index}
              className="cursor-pointer border-2 hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <NumberTicker value={feature.stat} className="text-2xl font-bold text-primary" />
                  <span className="text-sm text-muted-foreground">{feature.statLabel}</span>
                </div>
              </CardContent>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Step 4: Product Showcase Section
```typescript
// src/components/sections/product-section/index.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Star, ShoppingCart, Heart } from "lucide-react"

const productCategories = {
  featured: [
    {
      id: 1,
      name: "Premium Headphones",
      price: 299,
      originalPrice: 399,
      image: "https://via.placeholder.com/300x300",
      rating: 4.9,
      reviews: 1234,
      badge: "Best Seller",
      description: "High-quality wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199,
      originalPrice: 249,
      image: "https://via.placeholder.com/300x300",
      rating: 4.7,
      reviews: 856,
      badge: "New",
      description: "Advanced fitness tracking and smart notifications"
    },
    {
      id: 3,
      name: "Wireless Speaker",
      price: 129,
      originalPrice: 179,
      image: "https://via.placeholder.com/300x300",
      rating: 4.8,
      reviews: 642,
      badge: "Sale",
      description: "Portable speaker with crystal clear sound quality"
    }
  ],
  electronics: [
    // ... similar structure for electronics
  ],
  fashion: [
    // ... similar structure for fashion
  ]
}

export function ProductSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Products
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Our Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated selection of premium products 
            across various categories.
          </p>
        </div>

        {/* Product Categories */}
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="electronics">Electronics</TabsTrigger>
            <TabsTrigger value="fashion">Fashion</TabsTrigger>
          </TabsList>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.featured.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <BorderBeam size={100} duration={8} delay={product.id * 2} />
                  
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <Badge className="absolute top-3 left-3">
                          {product.badge}
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    <CardTitle className="text-lg mb-2 line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="mb-4 line-clamp-2">
                      {product.description}
                    </CardDescription>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <ShimmerButton className="px-4 py-2">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </ShimmerButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Similar structure for other tabs */}
        </Tabs>

        {/* View All Products CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
```

### Step 5: Stats Section Implementation
```typescript
// src/components/sections/stats-section/index.tsx
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Card, CardContent } from "@/components/ui/card"
import { Users, ShoppingBag, Star, Globe } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 50000,
    label: "Happy Customers",
    suffix: "+"
  },
  {
    icon: ShoppingBag,
    value: 100000,
    label: "Orders Delivered",
    suffix: "+"
  },
  {
    icon: Star,
    value: 4.9,
    label: "Average Rating",
    suffix: "/5"
  },
  {
    icon: Globe,
    value: 25,
    label: "Countries Served",
    suffix: "+"
  }
]

export function StatsSection() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-none bg-transparent">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <NumberTicker value={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## Updated Homepage Component

### Step 1: Create New Homepage
```typescript
// src/app/[countryCode]/(main)/page.tsx - Replace existing homepage
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { StatsSection } from "@/components/sections/stats-section"
import { ProductSection } from "@/components/sections/product-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Premium E-Commerce Store | Modern Shopping Experience",
  description: "Discover our curated collection of premium products with modern design and seamless shopping experience.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <ProductSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  )
}
```

### Step 2: Update Layout Integration
```typescript
// src/modules/layout/templates/index.tsx - Update to include theme switcher
import { ThemeSwitcher } from "@/components/theme-switcher"
import Nav from "@/modules/layout/templates/nav"
import Footer from "@/modules/layout/templates/footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav>
        <ThemeSwitcher />
      </Nav>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

## Responsive Design Implementation

### Step 1: Mobile-First Approach
```typescript
// Responsive breakpoints following existing Medusa patterns
const responsiveClasses = {
  hero: "text-4xl md:text-6xl lg:text-7xl",
  features: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  products: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  stats: "grid-cols-2 lg:grid-cols-4",
  testimonials: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
}
```

### Step 2: Animation Performance
```typescript
// Optimize animations for mobile
const animationConfig = {
  reducedMotion: "prefers-reduced-motion:no-animation",
  performanceMode: "will-change-transform",
  gpuAcceleration: "transform: translateZ(0)"
}
```

## E-Commerce Integration

### Step 1: Product Data Integration
```typescript
// src/lib/data/homepage-products.ts
import { getProductsList } from "@/lib/data/products"

export async function getFeaturedProducts() {
  const products = await getProductsList({
    pageParam: 0,
    limit: 6,
    countryCode: "us",
    // Add featured tag filter
    tags: ["featured"]
  })
  
  return products
}
```

### Step 2: Cart Integration
```typescript
// Update product cards to integrate with Medusa cart
import { addToCart } from "@/lib/data/cart"
import { useParams } from "next/navigation"

// In product card component
const handleAddToCart = async (productId: string) => {
  try {
    await addToCart({
      variantId: productId,
      quantity: 1,
      countryCode: params.countryCode
    })
    // Show success toast
  } catch (error) {
    // Handle error
  }
}
```

## Theme Testing and Validation

### Step 1: Theme Switching Test Suite
```typescript
// src/components/sections/__tests__/theme-switching.test.tsx
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeProvider } from '@/lib/theme-provider'
import { HeroSection } from '../hero-section'

describe('Theme Switching', () => {
  it('switches between light and dark themes', async () => {
    const user = userEvent.setup()
    
    render(
      <ThemeProvider>
        <HeroSection />
      </ThemeProvider>
    )
    
    // Test theme switching functionality
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
    await user.click(themeToggle)
    
    // Verify theme classes are applied
    expect(document.documentElement).toHaveClass('dark')
  })
})
```

### Step 2: Visual Regression Testing
```typescript
// src/components/sections/__tests__/visual-regression.test.tsx
import { chromatic } from '@chromatic-com/storybook'

// Configure visual testing for all homepage sections
const visualTests = [
  'HeroSection',
  'FeaturesSection', 
  'ProductSection',
  'StatsSection'
]
```

## Performance Optimization

### Step 1: Image Optimization
```typescript
// Use Next.js Image component with optimization
import Image from 'next/image'

// In product cards and hero section
<Image
  src={product.image}
  alt={product.name}
  width={300}
  height={300}
  className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
  priority={index < 3} // Prioritize above-fold images
/>
```

### Step 2: Component Lazy Loading
```typescript
// Lazy load sections below the fold
import { lazy, Suspense } from 'react'

const TestimonialsSection = lazy(() => import('@/components/sections/testimonials-section'))
const NewsletterSection = lazy(() => import('@/components/sections/newsletter-section'))

// In homepage component
<Suspense fallback={<div>Loading...</div>}>
  <TestimonialsSection />
</Suspense>
```

## Phase 4 Success Criteria

### Visual Fidelity
- [ ] Homepage matches replit-app design patterns
- [ ] All animations and interactions work correctly
- [ ] Theme switching functions on all components
- [ ] Responsive design works across all devices

### Functionality
- [ ] E-commerce integration maintained
- [ ] Product data displays correctly
- [ ] Cart functionality works
- [ ] SEO optimization preserved

### Performance
- [ ] Page load times under 3 seconds
- [ ] Core Web Vitals meet standards
- [ ] Mobile performance optimized
- [ ] Accessibility standards met

### Testing
- [ ] All sections tested individually
- [ ] Theme switching validated
- [ ] Responsive design verified
- [ ] E-commerce integration tested

## Next Steps to Phase 5

### Phase 5 Prerequisites
- Homepage fully redesigned and functional
- All sections using new component library
- Theme switching working correctly
- Performance optimized

### Phase 5 Preparation
- Admin panel analysis
- Backend component identification
- Integration strategy planning
- Testing framework extension

This Phase 4 plan provides a comprehensive approach to creating a modern, visually appealing homepage that matches the replit-app reference while maintaining all Medusa e-commerce functionality.