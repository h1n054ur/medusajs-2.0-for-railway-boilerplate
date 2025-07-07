# Phase 6: Testing & Deployment

## Overview
Comprehensive testing and deployment phase including pre-deployment code validation, component integration verification, GitHub repository optimization, Railway deployment configuration, and post-deployment testing procedures.

## Phase 6 Objectives
1. Pre-deployment code validation and linting
2. Component integration verification in local development
3. GitHub repository setup and commit structure optimization
4. Railway deployment pipeline configuration
5. Post-deployment testing plan for user execution
6. Deployment verification checklist and troubleshooting guide

## Pre-Deployment Validation

### Step 1: Code Quality Checks
```bash
# Storefront validation
cd storefront/

# ESLint validation
npm run lint

# TypeScript validation
npx tsc --noEmit

# Build validation
npm run build

# Test execution
npm run test

# E2E test validation (if applicable)
npm run test-e2e
```

### Step 2: Backend Validation
```bash
# Backend validation
cd backend/

# TypeScript validation
npx tsc --noEmit

# Build validation
npm run build

# Test execution (if tests exist)
npm run test

# Database migration validation
npm run db:validate
```

### Step 3: Dependency Audit
```bash
# Check for security vulnerabilities
cd storefront/
npm audit
npm audit fix

cd ../backend/
npm audit
npm audit fix

# Check for outdated dependencies
npm outdated
```

### Step 4: Theme System Validation
```typescript
// scripts/validate-theme-system.js
const fs = require('fs')
const path = require('path')

const validateThemeSystem = () => {
  const checks = []

  // Check CSS variables are defined
  const globalCSS = fs.readFileSync('storefront/src/styles/globals.css', 'utf8')
  checks.push({
    name: 'CSS Variables Defined',
    passed: globalCSS.includes('--primary') && globalCSS.includes('--background')
  })

  // Check components.json exists
  const componentsJson = fs.existsSync('storefront/components.json')
  checks.push({
    name: 'components.json exists',
    passed: componentsJson
  })

  // Check theme provider is configured
  const layoutFile = fs.readFileSync('storefront/src/app/layout.tsx', 'utf8')
  checks.push({
    name: 'ThemeProvider configured',
    passed: layoutFile.includes('ThemeProvider')
  })

  // Report results
  console.log('Theme System Validation:')
  checks.forEach(check => {
    console.log(`${check.passed ? '✅' : '❌'} ${check.name}`)
  })

  const allPassed = checks.every(check => check.passed)
  if (!allPassed) {
    process.exit(1)
  }
}

validateThemeSystem()
```

## Component Integration Verification

### Step 1: Component Library Tests
```typescript
// scripts/test-components.js
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { ThemeContextProvider } from '../src/lib/theme-context'

// Test wrapper for all components
const TestWrapper = ({ children }) => (
  <ThemeProvider attribute="class" defaultTheme="light">
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
  </ThemeProvider>
)

// Component tests
const componentTests = [
  {
    name: 'HeroSection',
    component: () => import('../src/components/sections/hero-section'),
    test: (Component) => {
      render(<Component />, { wrapper: TestWrapper })
      expect(screen.getByRole('heading')).toBeInTheDocument()
    }
  },
  {
    name: 'ProductCard',
    component: () => import('../src/components/products/product-card'),
    test: (Component) => {
      const mockProduct = {
        id: '1',
        title: 'Test Product',
        price: 29.99,
        image: 'test.jpg'
      }
      render(<Component product={mockProduct} />, { wrapper: TestWrapper })
      expect(screen.getByText('Test Product')).toBeInTheDocument()
    }
  }
  // Add all other components
]

// Run all component tests
const runComponentTests = async () => {
  console.log('Running component integration tests...')
  
  for (const test of componentTests) {
    try {
      const Component = await test.component()
      test.test(Component.default)
      console.log(`✅ ${test.name} - PASSED`)
    } catch (error) {
      console.log(`❌ ${test.name} - FAILED: ${error.message}`)
    }
  }
}

runComponentTests()
```

### Step 2: Theme Switching Validation
```typescript
// scripts/validate-theme-switching.js
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeSwitcher } from '../src/components/theme-switcher'
import { TestWrapper } from './test-utils'

const validateThemeSwitching = async () => {
  console.log('Validating theme switching...')
  
  const user = userEvent.setup()
  
  render(<ThemeSwitcher />, { wrapper: TestWrapper })
  
  // Test light/dark mode switching
  const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
  await user.click(themeToggle)
  
  // Verify theme class is applied
  if (document.documentElement.classList.contains('dark')) {
    console.log('✅ Dark mode switching - PASSED')
  } else {
    console.log('❌ Dark mode switching - FAILED')
  }
  
  // Test color theme switching
  const colorThemeSelector = screen.getByRole('button', { name: /bubblegum/i })
  await user.click(colorThemeSelector)
  
  if (document.documentElement.getAttribute('data-theme') === 'bubblegum') {
    console.log('✅ Color theme switching - PASSED')
  } else {
    console.log('❌ Color theme switching - FAILED')
  }
}

validateThemeSwitching()
```

### Step 3: E-Commerce Integration Tests
```typescript
// scripts/test-ecommerce-integration.js
import { testApiEndpoints } from './test-utils'

const ecommerceTests = [
  {
    name: 'Product Listing API',
    endpoint: '/store/products',
    method: 'GET',
    expected: (response) => Array.isArray(response.products)
  },
  {
    name: 'Cart Operations',
    endpoint: '/store/carts',
    method: 'POST',
    body: { region_id: 'reg_test' },
    expected: (response) => response.cart && response.cart.id
  },
  {
    name: 'Customer Authentication',
    endpoint: '/store/auth',
    method: 'POST',
    body: { email: 'test@example.com', password: 'password' },
    expected: (response) => response.customer || response.error
  }
]

const runEcommerceTests = async () => {
  console.log('Running e-commerce integration tests...')
  
  for (const test of ecommerceTests) {
    try {
      const response = await testApiEndpoints(test.endpoint, test.method, test.body)
      if (test.expected(response)) {
        console.log(`✅ ${test.name} - PASSED`)
      } else {
        console.log(`❌ ${test.name} - FAILED`)
      }
    } catch (error) {
      console.log(`❌ ${test.name} - ERROR: ${error.message}`)
    }
  }
}

runEcommerceTests()
```

## GitHub Repository Optimization

### Step 1: Repository Structure Cleanup
```bash
# Remove replit-app after extracting needed components
rm -rf replit-app/

# Ensure proper .gitignore
echo "
# Dependencies
node_modules/
.pnpm-lock.yaml
.npm

# Build outputs
.next/
dist/
build/

# Environment files
.env
.env.local
.env.production

# Testing
coverage/
.nyc_output

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Medusa
.medusa/
uploads/
" >> .gitignore
```

### Step 2: Documentation Updates
```markdown
# README.md updates
## Modern Theme System

This Medusa.js 2.0 e-commerce platform features a modern theme system built with shadcn/ui and CSS variables.

### Features
- 🎨 Modern bubblegum theme with dark/light mode
- 🧩 Complete shadcn/ui + magicui component library
- 🎯 Multi-level theme switching (dark/light + color themes)
- 📱 Mobile-first responsive design
- ⚡ Optimized for Railway deployment

### Development

#### Prerequisites
- Node.js 22.x
- pnpm 9.10.0
- PostgreSQL

#### Quick Start
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Setup backend: `cd backend && pnpm ib`
4. Start development: `pnpm dev`

#### Theme Customization
The theme system uses CSS variables defined in `storefront/src/styles/globals.css`. 
Modify the variables to customize colors, fonts, and spacing.

### Deployment
This project is optimized for Railway deployment with automatic build detection.
```

### Step 3: Commit Structure Optimization
```bash
# Create comprehensive commit for the modernization
git add .
git commit -m "feat: implement modern theme system with shadcn/ui

- Replace @medusajs/ui-preset with shadcn/ui CSS variables
- Add bubblegum theme with light/dark mode support
- Integrate complete shadcn/ui and magicui component library
- Implement multi-level theme switching system
- Modernize homepage with animated components
- Update admin panel styling for consistency
- Add comprehensive component documentation
- Optimize for Railway deployment

BREAKING CHANGE: Removes @medusajs/ui-preset dependency in favor of modern theme system

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Railway Deployment Configuration

### Step 1: Railway Configuration Files
```toml
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "pnpm start"
healthcheckPath = "/healthcheck"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3

[[services]]
name = "medusa-backend"
source = "backend"

[services.medusa-backend.build]
buildCommand = "pnpm build"

[services.medusa-backend.deploy]
startCommand = "pnpm start"

[[services]]
name = "medusa-storefront"
source = "storefront"

[services.medusa-storefront.build]
buildCommand = "pnpm build"

[services.medusa-storefront.deploy]
startCommand = "pnpm start"
```

### Step 2: Environment Variables Configuration
```bash
# Railway environment variables setup script
# railway-env-setup.sh

#!/bin/bash

echo "Setting up Railway environment variables..."

# Backend environment variables
railway variables set DATABASE_URL="postgresql://..." --service=medusa-backend
railway variables set REDIS_URL="redis://..." --service=medusa-backend
railway variables set JWT_SECRET="your-jwt-secret" --service=medusa-backend
railway variables set COOKIE_SECRET="your-cookie-secret" --service=medusa-backend

# Optional services (comment out if not using)
# railway variables set STRIPE_API_KEY="sk_..." --service=medusa-backend
# railway variables set RESEND_API_KEY="re_..." --service=medusa-backend
# railway variables set MINIO_ENDPOINT="..." --service=medusa-backend

# Storefront environment variables
railway variables set NEXT_PUBLIC_MEDUSA_BACKEND_URL="https://your-backend.railway.app" --service=medusa-storefront
railway variables set NEXT_PUBLIC_BASE_URL="https://your-storefront.railway.app" --service=medusa-storefront

echo "Environment variables configured!"
```

### Step 3: Build Optimization
```json
// storefront/package.json - Railway optimization
{
  "scripts": {
    "build": "npm run wait && next build",
    "start": "next start -p $PORT",
    "railway-build": "npm run build",
    "railway-start": "npm run start"
  },
  "engines": {
    "node": "22.x",
    "npm": "10.x"
  }
}
```

```json
// backend/package.json - Railway optimization  
{
  "scripts": {
    "build": "medusa build && node src/scripts/postBuild.js",
    "start": "init-backend && cd .medusa/server && medusa start --port $PORT",
    "railway-build": "npm run build",
    "railway-start": "npm run start"
  },
  "engines": {
    "node": "22.x",
    "npm": "10.x"
  }
}
```

### Step 4: Health Check Endpoints
```typescript
// backend/src/api/healthcheck/route.ts
import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    // Check database connection
    const dbCheck = await req.scope.resolve("manager").query("SELECT 1")
    
    // Check Redis connection (if configured)
    let redisCheck = true
    try {
      const redis = req.scope.resolve("redisClient")
      await redis.ping()
    } catch (error) {
      redisCheck = false // Redis is optional
    }

    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: dbCheck ? "connected" : "disconnected",
        redis: redisCheck ? "connected" : "not_configured",
        theme: "bubblegum_active"
      }
    }

    res.status(200).json(health)
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
}
```

```typescript
// storefront/src/app/api/healthcheck/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check backend connectivity
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    const backendResponse = await fetch(`${backendUrl}/healthcheck`, {
      method: 'GET',
      timeout: 5000
    })

    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        backend: backendResponse.ok ? "connected" : "disconnected",
        theme_system: "active",
        components: "loaded"
      }
    }

    return NextResponse.json(health, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }
}
```

## Post-Deployment Testing Plan

### Step 1: Automated Deployment Tests
```bash
#!/bin/bash
# scripts/post-deployment-tests.sh

BACKEND_URL="https://your-backend.railway.app"
STOREFRONT_URL="https://your-storefront.railway.app"

echo "🚀 Running post-deployment tests..."

# Test backend health
echo "Testing backend health..."
BACKEND_HEALTH=$(curl -s "$BACKEND_URL/healthcheck" | jq -r '.status')
if [ "$BACKEND_HEALTH" = "healthy" ]; then
  echo "✅ Backend health check passed"
else
  echo "❌ Backend health check failed"
  exit 1
fi

# Test storefront health
echo "Testing storefront health..."
STOREFRONT_HEALTH=$(curl -s "$STOREFRONT_URL/api/healthcheck" | jq -r '.status')
if [ "$STOREFRONT_HEALTH" = "healthy" ]; then
  echo "✅ Storefront health check passed"
else
  echo "❌ Storefront health check failed"
  exit 1
fi

# Test theme loading
echo "Testing theme system..."
THEME_CHECK=$(curl -s "$STOREFRONT_URL" | grep -o "theme-bubblegum")
if [ ! -z "$THEME_CHECK" ]; then
  echo "✅ Theme system loaded correctly"
else
  echo "❌ Theme system not loaded"
  exit 1
fi

# Test API endpoints
echo "Testing API endpoints..."
PRODUCTS_API=$(curl -s "$BACKEND_URL/store/products" | jq -r '.products | length')
if [ "$PRODUCTS_API" -gt 0 ]; then
  echo "✅ Products API working"
else
  echo "❌ Products API failed"
  exit 1
fi

echo "🎉 All post-deployment tests passed!"
```

### Step 2: User Acceptance Testing Checklist
```markdown
# Post-Deployment User Testing Checklist

## Theme System Testing
- [ ] Homepage loads with bubblegum theme styling
- [ ] Light/dark mode toggle works correctly
- [ ] Color theme switching functional
- [ ] All components display with consistent theming
- [ ] Mobile responsiveness maintained

## E-Commerce Functionality Testing
- [ ] Product listing pages load correctly
- [ ] Product detail pages display properly
- [ ] Add to cart functionality works
- [ ] Cart dropdown displays items
- [ ] Checkout flow completes successfully
- [ ] Order confirmation emails sent with proper theming

## Admin Panel Testing
- [ ] Admin dashboard accessible at /app
- [ ] Admin login form styled correctly
- [ ] Dashboard components display with theme
- [ ] Product management interface functional
- [ ] User management works properly
- [ ] Theme switching works in admin

## Performance Testing
- [ ] Homepage loads in under 3 seconds
- [ ] Product pages load quickly
- [ ] Theme switching is responsive
- [ ] Mobile performance acceptable
- [ ] No console errors visible

## SEO and Accessibility Testing
- [ ] Meta tags properly set
- [ ] Open Graph images display
- [ ] Color contrast meets standards
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility maintained
```

### Step 3: Performance Monitoring Setup
```typescript
// scripts/performance-monitor.js
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

async function runPerformanceTest(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
  
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'seo'],
    port: chrome.port,
  }

  const runnerResult = await lighthouse(url, options)
  await chrome.kill()

  const scores = {
    performance: runnerResult.lhr.categories.performance.score * 100,
    accessibility: runnerResult.lhr.categories.accessibility.score * 100,
    seo: runnerResult.lhr.categories.seo.score * 100
  }

  console.log(`Performance Report for ${url}:`)
  console.log(`Performance: ${scores.performance}/100`)
  console.log(`Accessibility: ${scores.accessibility}/100`)
  console.log(`SEO: ${scores.seo}/100`)

  // Fail if scores are below thresholds
  if (scores.performance < 80 || scores.accessibility < 90 || scores.seo < 90) {
    console.log('❌ Performance thresholds not met')
    process.exit(1)
  } else {
    console.log('✅ All performance thresholds met')
  }
}

// Test both storefront and specific pages
const testUrls = [
  process.env.STOREFRONT_URL,
  `${process.env.STOREFRONT_URL}/products`,
  `${process.env.STOREFRONT_URL}/cart`
]

Promise.all(testUrls.map(runPerformanceTest))
  .then(() => console.log('All performance tests completed'))
  .catch(console.error)
```

## Deployment Verification Checklist

### Step 1: Technical Verification
```markdown
# Technical Deployment Verification

## Infrastructure
- [ ] Backend service deployed and running
- [ ] Storefront service deployed and running
- [ ] Database connected and accessible
- [ ] Redis connected (if configured)
- [ ] Environment variables set correctly
- [ ] Health check endpoints responding

## Build Verification
- [ ] Backend build completed without errors
- [ ] Storefront build completed without errors
- [ ] All dependencies installed correctly
- [ ] TypeScript compilation successful
- [ ] No build warnings or errors

## Security
- [ ] HTTPS enabled on all services
- [ ] Environment secrets properly configured
- [ ] No sensitive data exposed in client
- [ ] CORS configured correctly
- [ ] CSP headers set appropriately
```

### Step 2: Functional Verification
```markdown
# Functional Deployment Verification

## Core E-Commerce
- [ ] Products display correctly
- [ ] Shopping cart functionality works
- [ ] Checkout process completes
- [ ] Order management functional
- [ ] Customer authentication works
- [ ] Email notifications sent

## Theme System
- [ ] Bubblegum theme loads correctly
- [ ] Theme switching works on all pages
- [ ] Dark/light mode toggle functional
- [ ] Color themes apply correctly
- [ ] CSS variables loaded properly
- [ ] Component styling consistent

## Admin Panel
- [ ] Admin dashboard accessible
- [ ] Login/authentication works
- [ ] Product management functional
- [ ] Order management works
- [ ] User management accessible
- [ ] Theme consistency maintained
```

## Troubleshooting Guide

### Common Deployment Issues

#### Issue 1: Theme Styles Not Loading
```bash
# Diagnosis
curl -s https://your-app.railway.app | grep "css-variables"

# Solutions
1. Check CSS file is included in build
2. Verify CSS variables are defined
3. Check components.json configuration
4. Ensure theme provider is configured

# Fix commands
cd storefront/
npm run build  # Rebuild to include CSS
git add . && git commit -m "fix: include CSS in build"
git push  # Redeploy
```

#### Issue 2: Component Libraries Not Working
```bash
# Diagnosis
npm ls @radix-ui/react-slot
npm ls class-variance-authority

# Solutions
1. Reinstall component dependencies
2. Check import paths in components
3. Verify components.json aliases

# Fix commands
pnpm add @radix-ui/react-slot class-variance-authority
pnpm run build
```

#### Issue 3: Database Connection Issues
```bash
# Diagnosis
railway logs --service=medusa-backend | grep -i database

# Solutions
1. Check DATABASE_URL environment variable
2. Verify database service is running
3. Check connection string format
4. Test database connectivity

# Fix commands
railway variables set DATABASE_URL="postgresql://..." --service=medusa-backend
railway redeploy --service=medusa-backend
```

#### Issue 4: Build Failures
```bash
# Diagnosis
railway logs --service=medusa-storefront | grep -i error

# Solutions
1. Check Node.js version compatibility
2. Verify package.json scripts
3. Check for missing dependencies
4. Review build configuration

# Fix commands
npm run build  # Test locally first
git add . && git commit -m "fix: resolve build issues"
git push
```

## Phase 6 Success Criteria

### Pre-Deployment
- [ ] All code quality checks pass
- [ ] Component integration tests successful
- [ ] Theme system validation complete
- [ ] E-commerce functionality verified

### Deployment
- [ ] Railway services deployed successfully
- [ ] Health checks responding correctly
- [ ] Environment variables configured
- [ ] Build process optimized

### Post-Deployment
- [ ] User acceptance testing complete
- [ ] Performance benchmarks met
- [ ] Security verification passed
- [ ] Documentation updated

### Monitoring
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Health check monitoring setup
- [ ] Troubleshooting guide complete

## Final Handover

### Documentation Deliverables
- [ ] Complete implementation documentation
- [ ] User testing checklist
- [ ] Troubleshooting guide
- [ ] Maintenance procedures

### Project Completion
- [ ] All objectives met
- [ ] User acceptance achieved
- [ ] Performance standards met
- [ ] Railway deployment successful

This Phase 6 plan ensures a comprehensive testing and deployment process that validates the entire modern theme system implementation while providing thorough documentation for ongoing maintenance and troubleshooting.