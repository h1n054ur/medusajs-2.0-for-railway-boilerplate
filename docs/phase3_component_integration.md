# Phase 3: Component Library Integration

## Overview
Install and configure shadcn/ui components, integrate magicui components from replit-app, and establish component architecture for the modernized Medusa storefront.

## Phase 3 Objectives
1. Install comprehensive shadcn/ui component library
2. Extract and integrate magicui components from replit-app
3. Set up component documentation and testing
4. Migrate existing Medusa components to new architecture
5. Establish component development workflow
6. Create reusable component patterns

## shadcn/ui Components Installation

### Step 1: Core UI Components
```bash
cd storefront/

# Form Components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add switch
npx shadcn@latest add slider
npx shadcn@latest add label
npx shadcn@latest add form

# Layout Components
npx shadcn@latest add card
npx shadcn@latest add separator
npx shadcn@latest add sheet
npx shadcn@latest add dialog
npx shadcn@latest add drawer
npx shadcn@latest add tabs
npx shadcn@latest add accordion
npx shadcn@latest add collapsible

# Navigation Components
npx shadcn@latest add navigation-menu
npx shadcn@latest add breadcrumb
npx shadcn@latest add pagination
npx shadcn@latest add command
npx shadcn@latest add menubar

# Data Display Components
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add skeleton
npx shadcn@latest add progress
npx shadcn@latest add alert
npx shadcn@latest add toast

# Overlay Components
npx shadcn@latest add dropdown-menu
npx shadcn@latest add context-menu
npx shadcn@latest add popover
npx shadcn@latest add tooltip
npx shadcn@latest add hover-card
npx shadcn@latest add alert-dialog

# Specialty Components
npx shadcn@latest add calendar
npx shadcn@latest add carousel
npx shadcn@latest add chart
npx shadcn@latest add scroll-area
npx shadcn@latest add resizable
npx shadcn@latest add toggle
npx shadcn@latest add toggle-group
```

### Step 2: Install Required Dependencies
```bash
cd storefront/
pnpm add @radix-ui/react-icons
pnpm add date-fns
pnpm add react-day-picker
pnpm add recharts
pnpm add embla-carousel-react
pnpm add @radix-ui/react-aspect-ratio
pnpm add vaul
pnpm add cmdk
pnpm add input-otp
pnpm add react-resizable-panels
```

## magicui Components Integration

### Step 1: Create magicui Directory Structure
```
src/components/magicui/
├── animated-beam.tsx
├── animated-gradient-text.tsx
├── animated-grid-pattern.tsx
├── animated-list.tsx
├── animated-shiny-text.tsx
├── animated-subscribe-button.tsx
├── avatar-circles.tsx
├── bento-grid.tsx
├── border-beam.tsx
├── box-reveal.tsx
├── confetti.tsx
├── cool-mode.tsx
├── dock.tsx
├── dot-pattern.tsx
├── flickering-grid.tsx
├── flip-text.tsx
├── globe.tsx
├── grid-pattern.tsx
├── hyper-text.tsx
├── icon-cloud.tsx
├── magic-card.tsx
├── marquee.tsx
├── meteors.tsx
├── morphing-text.tsx
├── neon-gradient-card.tsx
├── number-ticker.tsx
├── orbiting-circles.tsx
├── particles.tsx
├── pulsating-button.tsx
├── rainbow-button.tsx
├── retro-grid.tsx
├── ripple-button.tsx
├── ripple.tsx
├── scratch-to-reveal.tsx
├── shimmer-button.tsx
├── shine-border.tsx
├── shiny-button.tsx
├── sparkles-text.tsx
├── spinning-text.tsx
├── terminal.tsx
├── text-animate.tsx
├── text-reveal.tsx
├── tweet-card.tsx
├── typing-animation.tsx
└── word-rotate.tsx
```

### Step 2: Install magicui Dependencies
```bash
cd storefront/
pnpm add framer-motion
pnpm add canvas-confetti
pnpm add @types/canvas-confetti
pnpm add cobe
pnpm add motion
pnpm add react-tweet
pnpm add react-icons
```

### Step 3: Copy magicui Components
```typescript
// src/components/magicui/animated-gradient-text.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40",
        className,
      )}
    >
      <div
        className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
      />
      {children}
    </div>
  );
}
```

### Step 4: Create magicui Index File
```typescript
// src/components/magicui/index.ts
export { default as AnimatedGradientText } from "./animated-gradient-text";
export { default as AnimatedShinyText } from "./animated-shiny-text";
export { default as BorderBeam } from "./border-beam";
export { default as MagicCard } from "./magic-card";
export { default as Marquee } from "./marquee";
export { default as NumberTicker } from "./number-ticker";
export { default as PulsatingButton } from "./pulsating-button";
export { default as RainbowButton } from "./rainbow-button";
export { default as RippleButton } from "./ripple-button";
export { default as ShimmerButton } from "./shimmer-button";
export { default as ShinyButton } from "./shiny-button";
export { default as SparklesText } from "./sparkles-text";
export { default as TypingAnimation } from "./typing-animation";
export { default as WordRotate } from "./word-rotate";
// ... export all other components
```

## Component Migration Strategy

### Step 1: Current Medusa Components Analysis
```typescript
// Component mapping from old to new
const componentMigrationMap = {
  // Layout Components
  "modules/layout/templates/nav": "components/navigation/main-nav",
  "modules/layout/templates/footer": "components/layout/footer",
  "modules/layout/components/cart-dropdown": "components/cart/cart-dropdown",
  
  // Product Components
  "modules/products/components/product-preview": "components/products/product-card",
  "modules/products/components/product-actions": "components/products/product-actions",
  "modules/products/components/image-gallery": "components/products/image-gallery",
  
  // Cart Components
  "modules/cart/components/item": "components/cart/cart-item",
  "modules/cart/templates/summary": "components/cart/cart-summary",
  
  // Account Components
  "modules/account/components/login": "components/auth/login-form",
  "modules/account/components/register": "components/auth/register-form",
  
  // Checkout Components
  "modules/checkout/components/payment": "components/checkout/payment-form",
  "modules/checkout/components/shipping": "components/checkout/shipping-form",
  
  // Common Components
  "modules/common/components/input": "components/ui/input",
  "modules/common/components/checkbox": "components/ui/checkbox",
  "modules/common/components/modal": "components/ui/dialog",
}
```

### Step 2: Component Migration Phases
```typescript
// Phase 3A: Core UI Components
const phase3A = [
  'Button', 'Input', 'Card', 'Badge', 'Avatar',
  'Select', 'Checkbox', 'RadioGroup', 'Switch'
]

// Phase 3B: Layout Components
const phase3B = [
  'Header', 'Footer', 'Navigation', 'Sidebar',
  'Container', 'Section', 'Grid'
]

// Phase 3C: Product Components
const phase3C = [
  'ProductCard', 'ProductGallery', 'ProductActions',
  'ProductDetails', 'ProductReviews', 'ProductRecommendations'
]

// Phase 3D: Cart & Checkout Components
const phase3D = [
  'CartItem', 'CartSummary', 'CheckoutForm',
  'PaymentForm', 'ShippingForm', 'OrderSummary'
]

// Phase 3E: Account & Auth Components
const phase3E = [
  'LoginForm', 'RegisterForm', 'ProfileForm',
  'AddressForm', 'OrderHistory', 'AccountSettings'
]
```

## Component Architecture Setup

### Step 1: Create Component Directory Structure
```
src/components/
├── ui/                    # shadcn/ui components
├── magicui/              # magicui components
├── layout/               # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── main-nav.tsx
│   └── sidebar.tsx
├── products/             # Product-related components
│   ├── product-card.tsx
│   ├── product-gallery.tsx
│   ├── product-actions.tsx
│   └── product-filters.tsx
├── cart/                 # Cart components
│   ├── cart-item.tsx
│   ├── cart-dropdown.tsx
│   └── cart-summary.tsx
├── checkout/             # Checkout components
│   ├── payment-form.tsx
│   ├── shipping-form.tsx
│   └── order-summary.tsx
├── auth/                 # Authentication components
│   ├── login-form.tsx
│   ├── register-form.tsx
│   └── auth-provider.tsx
├── common/               # Common/shared components
│   ├── loading-spinner.tsx
│   ├── error-boundary.tsx
│   └── theme-switcher.tsx
└── sections/             # Page sections
    ├── hero-section.tsx
    ├── features-section.tsx
    └── testimonials-section.tsx
```

### Step 2: Create Component Templates
```typescript
// Template for migrated components
// src/components/products/product-card.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    title: string
    description: string
    price: number
    image: string
    badge?: string
  }
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card className={cn("group hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <Badge className="absolute top-2 right-2">
              {product.badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{product.title}</CardTitle>
        <CardDescription className="mb-4">{product.description}</CardDescription>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price}</span>
          <Button>Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Step 3: Create Component Index Files
```typescript
// src/components/index.ts
export * from "./ui"
export * from "./magicui"
export * from "./layout"
export * from "./products"
export * from "./cart"
export * from "./checkout"
export * from "./auth"
export * from "./common"
export * from "./sections"
```

## Component Documentation Setup

### Step 1: Create Storybook Configuration
```bash
cd storefront/
npx storybook@latest init
```

### Step 2: Configure Storybook for Theme Support
```typescript
// .storybook/preview.ts
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "next-themes";
import { ThemeContextProvider } from "../src/lib/theme-context";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <ThemeContextProvider>
          <Story />
        </ThemeContextProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
```

### Step 3: Create Component Stories
```typescript
// src/components/products/product-card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './product-card';

const meta: Meta<typeof ProductCard> = {
  title: 'Products/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: '1',
      title: 'Sample Product',
      description: 'A great product for everyone',
      price: 29.99,
      image: 'https://via.placeholder.com/300x200',
    },
  },
};

export const WithBadge: Story = {
  args: {
    product: {
      id: '2',
      title: 'Featured Product',
      description: 'Our best-selling item',
      price: 49.99,
      image: 'https://via.placeholder.com/300x200',
      badge: 'Popular',
    },
  },
};
```

## Testing Framework Setup

### Step 1: Install Testing Dependencies
```bash
cd storefront/
pnpm add -D @testing-library/react @testing-library/jest-dom
pnpm add -D @testing-library/user-event
pnpm add -D jest jest-environment-jsdom
```

### Step 2: Configure Jest
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

### Step 3: Create Component Tests
```typescript
// src/components/products/product-card.test.tsx
import { render, screen } from '@testing-library/react';
import { ProductCard } from './product-card';

const mockProduct = {
  id: '1',
  title: 'Test Product',
  description: 'A test product',
  price: 29.99,
  image: 'https://via.placeholder.com/300x200',
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    const productWithBadge = { ...mockProduct, badge: 'Popular' };
    render(<ProductCard product={productWithBadge} />);
    
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });
});
```

## Component Development Workflow

### Step 1: Component Development Process
```typescript
// Development workflow steps
const developmentWorkflow = {
  1: "Create component interface/types",
  2: "Implement component with shadcn/ui base",
  3: "Add theme support and styling",
  4: "Create Storybook stories",
  5: "Write unit tests",
  6: "Integration testing",
  7: "Documentation updates",
  8: "Code review and merge"
}
```

### Step 2: Component Quality Checklist
```typescript
// Quality checklist for each component
const qualityChecklist = {
  accessibility: [
    "ARIA labels and roles",
    "Keyboard navigation support",
    "Screen reader compatibility",
    "Color contrast compliance"
  ],
  performance: [
    "Lazy loading where appropriate",
    "Memoization for expensive operations",
    "Optimized re-renders",
    "Bundle size impact"
  ],
  theming: [
    "CSS variables utilization",
    "Dark/light mode support",
    "Color theme compatibility",
    "Responsive design"
  ],
  testing: [
    "Unit tests coverage > 80%",
    "Integration tests",
    "Visual regression tests",
    "Performance tests"
  ]
}
```

## Component Integration Timeline

### Week 1: Foundation (Phase 3A)
- [ ] Install all shadcn/ui components
- [ ] Set up magicui components
- [ ] Configure Storybook
- [ ] Set up testing framework

### Week 2: Core Migration (Phase 3B)
- [ ] Migrate layout components
- [ ] Update navigation components
- [ ] Migrate common UI components
- [ ] Create component documentation

### Week 3: Product Components (Phase 3C)
- [ ] Migrate product card components
- [ ] Update product gallery
- [ ] Migrate product actions
- [ ] Integration testing

### Week 4: Cart & Checkout (Phase 3D)
- [ ] Migrate cart components
- [ ] Update checkout flow
- [ ] Migrate payment components
- [ ] End-to-end testing

### Week 5: Account & Auth (Phase 3E)
- [ ] Migrate authentication components
- [ ] Update account management
- [ ] Migrate user profile components
- [ ] Final integration testing

## Phase 3 Success Criteria

### Technical Milestones
- [ ] All shadcn/ui components installed and configured
- [ ] magicui components integrated and functional
- [ ] Component architecture established
- [ ] Testing framework operational
- [ ] Storybook documentation complete

### Quality Standards
- [ ] Component tests coverage > 80%
- [ ] All components theme-compatible
- [ ] Accessibility standards met
- [ ] Performance benchmarks maintained
- [ ] Code review standards established

### Integration Validation
- [ ] All existing functionality preserved
- [ ] New components integrate seamlessly
- [ ] Theme switching works across all components
- [ ] Responsive design maintained
- [ ] No console errors or warnings

## Next Steps to Phase 4

### Phase 4 Prerequisites
- Component library fully integrated
- All core components migrated
- Testing framework operational
- Documentation complete

### Phase 4 Preparation
- Homepage design analysis
- Layout planning
- Component selection for homepage
- Performance optimization planning

This Phase 3 plan provides a comprehensive approach to integrating modern component libraries while maintaining the quality and functionality of the existing Medusa storefront.