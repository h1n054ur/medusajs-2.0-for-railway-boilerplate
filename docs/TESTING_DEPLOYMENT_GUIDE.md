# Testing & Deployment Guide

## Overview
Comprehensive guide for testing and deploying the modernized Medusa.js storefront with shadcn/ui theme system to Railway, including pre-deployment validation, testing procedures, deployment configuration, and post-deployment verification.

## Pre-Deployment Validation Checklist

### Environment Setup Validation
```bash
# Check Node.js version
node --version  # Should be 22.x
npm --version   # Should be 10.x
pnpm --version  # Should be 9.10.0

# Verify project structure
ls -la  # Should see backend/, storefront/, CLAUDE.md, README.md

# Check if replit-app is removed (should not exist after extraction)
ls replit-app/  # Should return "No such file or directory"
```

### Code Quality Validation
```bash
#!/bin/bash
# scripts/pre-deployment-validation.sh

echo "🔍 Running pre-deployment validation..."

# Storefront validation
echo "Validating storefront..."
cd storefront/

# Check if @medusajs/ui-preset is removed
if grep -q "@medusajs/ui-preset" package.json; then
  echo "❌ @medusajs/ui-preset still present in dependencies"
  exit 1
else
  echo "✅ @medusajs/ui-preset successfully removed"
fi

# Check if shadcn/ui dependencies are installed
REQUIRED_DEPS=("class-variance-authority" "clsx" "tailwind-merge" "next-themes")
for dep in "${REQUIRED_DEPS[@]}"; do
  if grep -q "\"$dep\"" package.json; then
    echo "✅ $dep dependency found"
  else
    echo "❌ $dep dependency missing"
    exit 1
  fi
done

# Check if components.json exists
if [ -f "components.json" ]; then
  echo "✅ components.json exists"
else
  echo "❌ components.json missing"
  exit 1
fi

# Check if CSS variables are defined
if grep -q "--primary:" src/styles/globals.css; then
  echo "✅ CSS variables defined"
else
  echo "❌ CSS variables missing"
  exit 1
fi

# TypeScript validation
echo "Running TypeScript validation..."
pnpm type-check
if [ $? -eq 0 ]; then
  echo "✅ TypeScript validation passed"
else
  echo "❌ TypeScript validation failed"
  exit 1
fi

# ESLint validation
echo "Running ESLint validation..."
pnpm lint
if [ $? -eq 0 ]; then
  echo "✅ ESLint validation passed"
else
  echo "❌ ESLint validation failed"
  exit 1
fi

# Build validation
echo "Running build validation..."
pnpm build
if [ $? -eq 0 ]; then
  echo "✅ Build validation passed"
else
  echo "❌ Build validation failed"
  exit 1
fi

# Backend validation
echo "Validating backend..."
cd ../backend/

# TypeScript validation
pnpm type-check
if [ $? -eq 0 ]; then
  echo "✅ Backend TypeScript validation passed"
else
  echo "❌ Backend TypeScript validation failed"
  exit 1
fi

# Build validation
pnpm build
if [ $? -eq 0 ]; then
  echo "✅ Backend build validation passed"
else
  echo "❌ Backend build validation failed"
  exit 1
fi

echo "🎉 All pre-deployment validations passed!"
```

### Security Audit
```bash
#!/bin/bash
# scripts/security-audit.sh

echo "🔒 Running security audit..."

# Check for security vulnerabilities
cd storefront/
npm audit --audit-level high
if [ $? -ne 0 ]; then
  echo "⚠️ Security vulnerabilities found in storefront"
  npm audit fix
fi

cd ../backend/
npm audit --audit-level high
if [ $? -ne 0 ]; then
  echo "⚠️ Security vulnerabilities found in backend"
  npm audit fix
fi

# Check for exposed secrets
echo "Checking for exposed secrets..."
if grep -r "sk_" --exclude-dir=node_modules --exclude-dir=.git .; then
  echo "❌ Potential secret keys found in code"
  exit 1
fi

if grep -r "pk_" --exclude-dir=node_modules --exclude-dir=.git .; then
  echo "❌ Potential API keys found in code"
  exit 1
fi

echo "✅ Security audit completed"
```

## Component Integration Testing

### Theme System Testing
```typescript
// scripts/test-theme-system.js
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeProvider } from 'next-themes'
import { ThemeContextProvider } from '../src/lib/theme-context'

// Test wrapper
const TestWrapper = ({ children }) => (
  <ThemeProvider attribute="class" defaultTheme="light">
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
  </ThemeProvider>
)

describe('Theme System Integration', () => {
  test('CSS variables are loaded correctly', () => {
    // Check if CSS variables are available
    const rootStyles = getComputedStyle(document.documentElement)
    expect(rootStyles.getPropertyValue('--primary')).toBeTruthy()
    expect(rootStyles.getPropertyValue('--background')).toBeTruthy()
    expect(rootStyles.getPropertyValue('--radius')).toBeTruthy()
  })

  test('Dark mode switching works', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <button data-testid="theme-toggle">Toggle Theme</button>
      </TestWrapper>
    )

    const toggle = screen.getByTestId('theme-toggle')
    await user.click(toggle)

    // Check if dark class is applied
    expect(document.documentElement).toHaveClass('dark')
  })

  test('Color theme switching works', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <select data-testid="color-theme-select">
          <option value="bubblegum">Bubblegum</option>
          <option value="default">Default</option>
        </select>
      </TestWrapper>
    )

    const select = screen.getByTestId('color-theme-select')
    await user.selectOptions(select, 'bubblegum')

    // Check if theme attribute is set
    expect(document.documentElement).toHaveAttribute('data-theme', 'bubblegum')
  })
})
```

### Component Library Testing
```typescript
// scripts/test-components.js
import { render, screen } from '@testing-library/react'
import { Button } from '../src/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card'
import { Badge } from '../src/components/ui/badge'
import { AnimatedGradientText } from '../src/components/magicui/animated-gradient-text'

describe('Component Library Integration', () => {
  test('shadcn/ui Button component renders correctly', () => {
    render(<Button>Test Button</Button>)
    const button = screen.getByRole('button', { name: /test button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('inline-flex') // shadcn/ui class
  })

  test('shadcn/ui Card component renders correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>Card content</CardContent>
      </Card>
    )
    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  test('Badge component applies theme colors', () => {
    render(<Badge>Test Badge</Badge>)
    const badge = screen.getByText('Test Badge')
    expect(badge).toHaveClass('bg-primary') // Should use CSS variable
  })

  test('magicui components render without errors', () => {
    render(
      <AnimatedGradientText>
        Animated Text
      </AnimatedGradientText>
    )
    expect(screen.getByText('Animated Text')).toBeInTheDocument()
  })
})
```

### E-Commerce Integration Testing
```typescript
// scripts/test-ecommerce.js
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ProductCard } from '../src/components/products/product-card'
import { CartDropdown } from '../src/components/cart/cart-dropdown'

const mockProduct = {
  id: 'prod_test',
  title: 'Test Product',
  description: 'A test product',
  price: 29.99,
  image: 'https://via.placeholder.com/300x300'
}

describe('E-Commerce Integration', () => {
  test('Product card displays correctly with theme styling', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })

  test('Add to cart functionality works', async () => {
    const user = userEvent.setup()
    const mockAddToCart = jest.fn()
    
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart}
      />
    )

    const addButton = screen.getByRole('button', { name: /add to cart/i })
    await user.click(addButton)

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct.id)
  })

  test('Cart dropdown displays with theme styling', () => {
    const mockCartItems = [
      { id: '1', title: 'Item 1', price: 10.00, quantity: 1 }
    ]

    render(<CartDropdown items={mockCartItems} />)
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
  })
})
```

## Local Development Testing

### Development Server Testing
```bash
#!/bin/bash
# scripts/test-local-development.sh

echo "🚀 Testing local development environment..."

# Start backend in background
echo "Starting backend server..."
cd backend/
pnpm dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 10

# Test backend health
echo "Testing backend health..."
BACKEND_HEALTH=$(curl -s http://localhost:9000/healthcheck)
if [[ $BACKEND_HEALTH == *"healthy"* ]]; then
  echo "✅ Backend is healthy"
else
  echo "❌ Backend health check failed"
  kill $BACKEND_PID
  exit 1
fi

# Start storefront in background
echo "Starting storefront server..."
cd ../storefront/
pnpm dev &
STOREFRONT_PID=$!

# Wait for storefront to start
sleep 15

# Test storefront health
echo "Testing storefront health..."
STOREFRONT_HEALTH=$(curl -s http://localhost:3000/api/healthcheck)
if [[ $STOREFRONT_HEALTH == *"healthy"* ]]; then
  echo "✅ Storefront is healthy"
else
  echo "❌ Storefront health check failed"
  kill $BACKEND_PID $STOREFRONT_PID
  exit 1
fi

# Test theme loading
echo "Testing theme system..."
THEME_CHECK=$(curl -s http://localhost:3000 | grep -o "theme-bubblegum\|--primary")
if [ ! -z "$THEME_CHECK" ]; then
  echo "✅ Theme system is working"
else
  echo "❌ Theme system not detected"
  kill $BACKEND_PID $STOREFRONT_PID
  exit 1
fi

# Test admin panel
echo "Testing admin panel..."
ADMIN_CHECK=$(curl -s http://localhost:9000/app)
if [[ $ADMIN_CHECK == *"html"* ]]; then
  echo "✅ Admin panel is accessible"
else
  echo "❌ Admin panel not accessible"
  kill $BACKEND_PID $STOREFRONT_PID
  exit 1
fi

# Clean up
kill $BACKEND_PID $STOREFRONT_PID
echo "🎉 Local development testing completed!"
```

### Performance Testing
```javascript
// scripts/performance-test.js
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

async function runLighthouseTest(url, name) {
  console.log(`🔍 Running Lighthouse test for ${name}...`)
  
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
    performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
    accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
    seo: Math.round(runnerResult.lhr.categories.seo.score * 100)
  }

  console.log(`${name} Scores:`)
  console.log(`  Performance: ${scores.performance}/100`)
  console.log(`  Accessibility: ${scores.accessibility}/100`)
  console.log(`  SEO: ${scores.seo}/100`)

  // Check if scores meet minimum requirements
  const requirements = {
    performance: 75,
    accessibility: 90,
    seo: 85
  }

  let passed = true
  Object.keys(requirements).forEach(metric => {
    if (scores[metric] < requirements[metric]) {
      console.log(`❌ ${metric} score (${scores[metric]}) below requirement (${requirements[metric]})`)
      passed = false
    } else {
      console.log(`✅ ${metric} score meets requirement`)
    }
  })

  return passed
}

async function runPerformanceTests() {
  const testUrls = [
    { url: 'http://localhost:3000', name: 'Homepage' },
    { url: 'http://localhost:3000/products', name: 'Products Page' },
    { url: 'http://localhost:3000/cart', name: 'Cart Page' }
  ]

  let allPassed = true

  for (const test of testUrls) {
    try {
      const passed = await runLighthouseTest(test.url, test.name)
      if (!passed) allPassed = false
    } catch (error) {
      console.log(`❌ ${test.name} test failed: ${error.message}`)
      allPassed = false
    }
  }

  if (allPassed) {
    console.log('🎉 All performance tests passed!')
  } else {
    console.log('❌ Some performance tests failed')
    process.exit(1)
  }
}

runPerformanceTests()
```

## Railway Deployment Configuration

### Environment Variables Setup
```bash
#!/bin/bash
# scripts/setup-railway-env.sh

echo "🔧 Setting up Railway environment variables..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
  echo "❌ Railway CLI not found. Please install it first:"
  echo "npm install -g @railway/cli"
  exit 1
fi

# Login to Railway (if not already logged in)
railway login

# Create new project or link existing
read -p "Create new project? (y/n): " create_new
if [[ $create_new == "y" ]]; then
  railway create medusa-storefront
else
  railway link
fi

# Set backend environment variables
echo "Setting backend environment variables..."
railway service create medusa-backend
railway service select medusa-backend

# Required backend variables
railway variables set NODE_ENV=production
railway variables set PORT=8080

# Database (replace with your actual database URL)
read -p "Enter DATABASE_URL: " database_url
railway variables set DATABASE_URL="$database_url"

# JWT secrets (generate secure random strings)
jwt_secret=$(openssl rand -base64 32)
cookie_secret=$(openssl rand -base64 32)
railway variables set JWT_SECRET="$jwt_secret"
railway variables set COOKIE_SECRET="$cookie_secret"

# Optional: Redis URL
read -p "Enter REDIS_URL (optional, press enter to skip): " redis_url
if [ ! -z "$redis_url" ]; then
  railway variables set REDIS_URL="$redis_url"
fi

# Optional: Stripe keys
read -p "Enter STRIPE_API_KEY (optional, press enter to skip): " stripe_key
if [ ! -z "$stripe_key" ]; then
  railway variables set STRIPE_API_KEY="$stripe_key"
fi

# Optional: Email service
read -p "Enter RESEND_API_KEY (optional, press enter to skip): " resend_key
if [ ! -z "$resend_key" ]; then
  railway variables set RESEND_API_KEY="$resend_key"
fi

# Set storefront environment variables
echo "Setting storefront environment variables..."
railway service create medusa-storefront
railway service select medusa-storefront

railway variables set NODE_ENV=production
railway variables set PORT=3000

# Get backend URL (will be available after backend deployment)
read -p "Enter backend URL (e.g., https://backend-name.railway.app): " backend_url
railway variables set NEXT_PUBLIC_MEDUSA_BACKEND_URL="$backend_url"

# Get storefront URL (will be available after deployment)
read -p "Enter storefront URL (e.g., https://storefront-name.railway.app): " storefront_url
railway variables set NEXT_PUBLIC_BASE_URL="$storefront_url"

echo "✅ Railway environment variables configured!"
echo "📝 Remember to update URLs after deployment"
```

### Railway Deployment Scripts
```bash
#!/bin/bash
# scripts/deploy-to-railway.sh

echo "🚀 Deploying to Railway..."

# Validate environment first
./scripts/pre-deployment-validation.sh
if [ $? -ne 0 ]; then
  echo "❌ Pre-deployment validation failed"
  exit 1
fi

# Deploy backend first
echo "Deploying backend service..."
railway service select medusa-backend
railway up --detach

# Wait for backend deployment
echo "Waiting for backend deployment..."
sleep 60

# Get backend URL
BACKEND_URL=$(railway url)
echo "Backend deployed to: $BACKEND_URL"

# Update storefront environment with backend URL
railway service select medusa-storefront
railway variables set NEXT_PUBLIC_MEDUSA_BACKEND_URL="$BACKEND_URL"

# Deploy storefront
echo "Deploying storefront service..."
railway up --detach

# Wait for storefront deployment
echo "Waiting for storefront deployment..."
sleep 60

# Get storefront URL
STOREFRONT_URL=$(railway url)
echo "Storefront deployed to: $STOREFRONT_URL"

# Update backend environment with storefront URL (for CORS)
railway service select medusa-backend
railway variables set STORE_CORS="$STOREFRONT_URL"
railway variables set ADMIN_CORS="$STOREFRONT_URL"

# Redeploy backend with updated CORS
railway redeploy

echo "🎉 Deployment completed!"
echo "Backend: $BACKEND_URL"
echo "Storefront: $STOREFRONT_URL"
echo "Admin Panel: $BACKEND_URL/app"
```

### Railway Configuration Files
```toml
# railway.toml
[build]
builder = "NIXPACKS"

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
healthcheckPath = "/healthcheck"

[services.medusa-backend.variables]
NODE_ENV = "production"

[[services]]
name = "medusa-storefront"
source = "storefront"

[services.medusa-storefront.build]
buildCommand = "pnpm install --frozen-lockfile && pnpm build"

[services.medusa-storefront.deploy]
startCommand = "pnpm start"
healthcheckPath = "/api/healthcheck"

[services.medusa-storefront.variables]
NODE_ENV = "production"
```

## Post-Deployment Testing

### Automated Post-Deployment Tests
```bash
#!/bin/bash
# scripts/post-deployment-tests.sh

# Get deployment URLs
read -p "Enter backend URL: " BACKEND_URL
read -p "Enter storefront URL: " STOREFRONT_URL

echo "🧪 Running post-deployment tests..."

# Test 1: Health Checks
echo "Testing health endpoints..."
BACKEND_HEALTH=$(curl -s "$BACKEND_URL/healthcheck" | grep -o "healthy")
STOREFRONT_HEALTH=$(curl -s "$STOREFRONT_URL/api/healthcheck" | grep -o "healthy")

if [ "$BACKEND_HEALTH" = "healthy" ]; then
  echo "✅ Backend health check passed"
else
  echo "❌ Backend health check failed"
  exit 1
fi

if [ "$STOREFRONT_HEALTH" = "healthy" ]; then
  echo "✅ Storefront health check passed"
else
  echo "❌ Storefront health check failed"
  exit 1
fi

# Test 2: Theme System
echo "Testing theme system..."
THEME_LOADED=$(curl -s "$STOREFRONT_URL" | grep -o "theme-bubblegum\|--primary")
if [ ! -z "$THEME_LOADED" ]; then
  echo "✅ Theme system loaded correctly"
else
  echo "❌ Theme system not detected"
  exit 1
fi

# Test 3: API Endpoints
echo "Testing API endpoints..."
PRODUCTS_API=$(curl -s "$BACKEND_URL/store/products" | grep -o "products")
if [ "$PRODUCTS_API" = "products" ]; then
  echo "✅ Products API working"
else
  echo "❌ Products API failed"
  exit 1
fi

# Test 4: Admin Panel
echo "Testing admin panel..."
ADMIN_ACCESSIBLE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/app")
if [ "$ADMIN_ACCESSIBLE" = "200" ]; then
  echo "✅ Admin panel accessible"
else
  echo "❌ Admin panel not accessible"
  exit 1
fi

# Test 5: Performance
echo "Testing page load times..."
HOMEPAGE_TIME=$(curl -s -o /dev/null -w "%{time_total}" "$STOREFRONT_URL")
if (( $(echo "$HOMEPAGE_TIME < 3.0" | bc -l) )); then
  echo "✅ Homepage loads in ${HOMEPAGE_TIME}s (under 3s)"
else
  echo "⚠️ Homepage loads in ${HOMEPAGE_TIME}s (over 3s threshold)"
fi

echo "🎉 Post-deployment tests completed!"
```

### User Acceptance Testing Checklist
```markdown
# User Acceptance Testing Checklist

## Theme System
- [ ] Homepage displays with bubblegum theme colors
- [ ] Light/dark mode toggle works correctly
- [ ] Color theme switching is functional
- [ ] All page sections have consistent theming
- [ ] Mobile theme display is correct
- [ ] Theme switching is smooth without flashing

## Navigation & Layout
- [ ] Header navigation works properly
- [ ] Footer displays correctly
- [ ] Menu items are accessible
- [ ] Search functionality works
- [ ] Responsive design works on mobile/tablet
- [ ] Theme switcher is accessible in header

## Product Pages
- [ ] Product listing page loads correctly
- [ ] Product cards display with proper theming
- [ ] Product detail pages show all information
- [ ] Product images load and display properly
- [ ] Add to cart functionality works
- [ ] Product filtering and sorting work

## Shopping Cart
- [ ] Cart dropdown displays items correctly
- [ ] Add/remove items from cart works
- [ ] Cart page displays with theme styling
- [ ] Quantity updates work properly
- [ ] Cart totals calculate correctly
- [ ] Cart persists across page reloads

## Checkout Process
- [ ] Checkout page displays correctly
- [ ] Payment form has proper theming
- [ ] Shipping form works correctly
- [ ] Order summary displays properly
- [ ] Checkout completion works
- [ ] Confirmation email sent with theming

## Account Management
- [ ] Login form displays with theme styling
- [ ] Registration form works correctly
- [ ] Account dashboard has consistent theming
- [ ] Profile editing works
- [ ] Order history displays properly
- [ ] Password reset functionality works

## Admin Panel
- [ ] Admin login page has theme styling
- [ ] Admin dashboard displays correctly
- [ ] Product management interface works
- [ ] Order management is functional
- [ ] User management works properly
- [ ] Theme consistency throughout admin

## Performance
- [ ] Homepage loads in under 3 seconds
- [ ] Product pages load quickly
- [ ] Theme switching is responsive
- [ ] No console errors visible
- [ ] Mobile performance is acceptable
- [ ] Images load optimally
```

## Troubleshooting Common Issues

### Theme-Related Issues

#### Issue: Theme styles not loading
```bash
# Diagnosis
curl -s https://your-app.railway.app | grep "css-variables"
curl -s https://your-app.railway.app/_next/static/css/ # Check if CSS files exist

# Solutions
1. Check if globals.css is included in the build
2. Verify CSS variables are properly defined
3. Check Tailwind configuration
4. Ensure theme provider is properly configured

# Fix
cd storefront/
npm run build  # Rebuild to include CSS
git add . && git commit -m "fix: ensure CSS variables in build"
git push origin main
```

#### Issue: Theme switching not working
```bash
# Diagnosis
# Check browser console for JavaScript errors
# Check if next-themes is properly installed

# Solutions
1. Verify next-themes installation
2. Check theme provider configuration
3. Ensure theme context is properly implemented
4. Check for JavaScript errors

# Fix
cd storefront/
pnpm add next-themes
# Update layout.tsx with proper theme provider configuration
git add . && git commit -m "fix: theme switching configuration"
git push origin main
```

### Component-Related Issues

#### Issue: shadcn/ui components not rendering
```bash
# Diagnosis
npm ls class-variance-authority clsx tailwind-merge
cat components.json  # Check configuration

# Solutions
1. Reinstall component dependencies
2. Check import paths
3. Verify components.json configuration
4. Check Tailwind CSS configuration

# Fix
cd storefront/
pnpm add class-variance-authority clsx tailwind-merge tailwindcss-animate
npx shadcn@latest init  # Reinitialize if needed
git add . && git commit -m "fix: shadcn/ui component dependencies"
git push origin main
```

#### Issue: magicui animations not working
```bash
# Diagnosis
npm ls framer-motion
# Check if animation CSS is included

# Solutions
1. Install framer-motion
2. Check animation CSS in globals.css
3. Verify component implementations
4. Check for CSS conflicts

# Fix
cd storefront/
pnpm add framer-motion
# Update globals.css with animation styles
git add . && git commit -m "fix: magicui animation dependencies"
git push origin main
```

### Deployment Issues

#### Issue: Railway build failures
```bash
# Diagnosis
railway logs --service=medusa-storefront
railway logs --service=medusa-backend

# Common causes and solutions
1. Node.js version mismatch
   - Ensure package.json engines field specifies Node 22.x
2. Dependency installation failures
   - Check if all dependencies are in package.json
   - Verify pnpm-lock.yaml is committed
3. Build command failures
   - Check build scripts in package.json
   - Verify TypeScript compilation

# Fix
# Update package.json engines
"engines": {
  "node": "22.x",
  "npm": "10.x"
}

git add . && git commit -m "fix: specify Node.js version for Railway"
git push origin main
```

#### Issue: Environment variables not working
```bash
# Diagnosis
railway variables list --service=medusa-backend
railway variables list --service=medusa-storefront

# Solutions
1. Check if all required variables are set
2. Verify variable names are correct
3. Check for typos in variable values
4. Ensure services can access their variables

# Fix
railway variables set DATABASE_URL="correct-database-url" --service=medusa-backend
railway variables set NEXT_PUBLIC_MEDUSA_BACKEND_URL="correct-backend-url" --service=medusa-storefront
railway redeploy --service=medusa-backend
railway redeploy --service=medusa-storefront
```

### Performance Issues

#### Issue: Slow page load times
```bash
# Diagnosis
# Use browser dev tools to check:
# - Network tab for slow requests
# - Lighthouse for performance analysis
# - Console for errors

# Solutions
1. Optimize images
2. Enable compression
3. Check bundle size
4. Optimize CSS loading

# Fix
# Update next.config.js with optimizations
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  swcMinify: true,
}

git add . && git commit -m "feat: optimize performance settings"
git push origin main
```

## Maintenance Procedures

### Regular Maintenance Tasks
```bash
#!/bin/bash
# scripts/maintenance.sh

echo "🔧 Running maintenance tasks..."

# 1. Update dependencies
echo "Checking for dependency updates..."
cd storefront/ && npm outdated
cd ../backend/ && npm outdated

# 2. Security audit
echo "Running security audit..."
cd storefront/ && npm audit
cd ../backend/ && npm audit

# 3. Performance monitoring
echo "Checking performance..."
# Run lighthouse tests on production URLs

# 4. Health check
echo "Checking service health..."
curl -s https://your-backend.railway.app/healthcheck
curl -s https://your-storefront.railway.app/api/healthcheck

# 5. Log analysis
echo "Checking logs for errors..."
railway logs --service=medusa-backend | grep -i error
railway logs --service=medusa-storefront | grep -i error

echo "✅ Maintenance tasks completed"
```

### Update Procedures
```bash
#!/bin/bash
# scripts/update-dependencies.sh

echo "📦 Updating dependencies..."

# Backup current state
git checkout -b backup-$(date +%Y%m%d)
git checkout main

# Update storefront dependencies
cd storefront/
pnpm update --latest
pnpm build  # Test build
pnpm test   # Run tests

# Update backend dependencies
cd ../backend/
pnpm update --latest
pnpm build  # Test build

# Commit updates
git add .
git commit -m "chore: update dependencies to latest versions"

# Deploy updates
./scripts/deploy-to-railway.sh

echo "✅ Dependencies updated and deployed"
```

This comprehensive testing and deployment guide ensures a smooth transition to the modernized Medusa.js storefront with proper validation, deployment, and maintenance procedures.