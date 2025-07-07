# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Medusa.js 2.0 e-commerce boilerplate designed for Railway deployment. It's a full-stack monorepo consisting of:

- **Backend**: Medusa.js 2.0 commerce platform with admin dashboard
- **Storefront**: Next.js 14 frontend with TypeScript and Tailwind CSS

## Common Development Commands

### Backend (cd backend/)
- `pnpm ib` or `npm run ib` - Initialize backend (runs migrations and seeds database)
- `pnpm dev` or `npm run dev` - Start development server with admin dashboard on localhost:9000
- `pnpm build` or `npm run build` - Build backend for production
- `pnpm start` or `npm run start` - Start production server
- `pnpm seed` or `npm run seed` - Seed database with sample data
- `email:dev` - Start email template development server on port 3002

### Storefront (cd storefront/)
- `pnpm dev` or `npm run dev` - Start development server (waits for backend first)
- `pnpm build` or `npm run build` - Build for production (waits for backend first)
- `pnpm start` or `npm run start` - Start production server
- `pnpm lint` or `npm run lint` - Run ESLint
- `pnpm test-e2e` or `npm run test-e2e` - Run Playwright e2e tests

## Architecture

### Backend Structure
- **src/modules/**: Custom Medusa modules
  - `email-notifications/`: Resend email service with React Email templates
  - `minio-file/`: MinIO file storage service
- **src/api/**: API routes (admin, store, custom endpoints)
- **src/subscribers/**: Event subscribers for business logic
- **src/workflows/**: Custom workflow definitions
- **src/jobs/**: Background job definitions
- **src/lib/constants.ts**: Environment variable configuration
- **medusa-config.js**: Main Medusa configuration with conditional module loading

### Storefront Structure
- **src/app/**: Next.js 14 App Router pages
- **src/modules/**: Feature-based components (account, cart, checkout, products, etc.)
- **src/lib/**: Utilities and data fetching logic
- **src/lib/data/**: Medusa API integration layer

### Key Integrations
- **File Storage**: MinIO (cloud) or local file storage (fallback)
- **Email**: Resend with React Email templates (primary) or SendGrid (fallback)
- **Search**: MeiliSearch for product search
- **Payments**: Stripe payment processing
- **Database**: PostgreSQL with MikroORM
- **Cache/Queue**: Redis for workflows and event bus (with in-memory fallback)

## Environment Configuration

Backend uses conditional module loading based on environment variables:
- Missing `REDIS_URL` → Falls back to in-memory event bus/workflows
- Missing `MINIO_*` → Falls back to local file storage
- Missing email config → Email notifications disabled
- Missing `STRIPE_*` → Payment processing disabled

## Development Notes

- Backend runs on port 9000 with admin dashboard at `/app`
- Storefront runs on port 3000 and requires backend to be running
- Uses pnpm as package manager (with npm fallbacks)
- TypeScript configured with strict settings
- E2E tests use Playwright with custom fixtures
- Tailwind CSS uses @medusajs/ui-preset for consistent styling

## Database Management

- Migrations are handled by MikroORM
- Use `pnpm ib` to initialize a fresh database
- Seed data includes sample products and configurations
- Database schema is defined in Medusa modules

## File Structure Patterns

- Backend follows Medusa.js conventions with modules in `src/modules/`
- Storefront uses feature-based organization in `src/modules/`
- Shared utilities in `src/lib/` and `src/utils/`
- API routes follow REST conventions with proper error handling

## Current Implementation Status

This project is implementing a **6-phase modernization plan** to upgrade from basic @medusajs/ui-preset to a modern shadcn/ui-based theme system with bubblegum styling.

### Phase Progress Overview
- ✅ **Phase 1**: Project Analysis & Setup (Complete)
- ✅ **Phase 2**: Modern Theme System Setup (Complete)
- ✅ **Phase 3**: Component Library Integration (Complete)
- ✅ **Phase 4**: Homepage Upgrade (Complete)
- 🔄 **Phase 5**: Backend Integration (In Progress - ~70% Complete)
- ⏳ **Phase 6**: Testing & Railway Deployment (Pending)

### Phase 5 Implementation Status

**✅ COMPLETED:**
- Admin theme configuration (`backend/src/admin/theme-config.ts`)
- CSS overrides for admin components (`backend/src/admin/styles/theme-overrides.css`)
- Theme API endpoints (`backend/src/api/admin/theme/route.ts`)
- Themed email templates (`backend/src/modules/email-notifications/templates/themed-*.tsx`)
- Basic admin theme infrastructure

**❌ REMAINING WORK:**
- Admin dashboard widgets (interactive components)
- Admin theme provider components (React context)
- Admin theme switcher UI (user interface)
- Enhanced dashboard overview components
- Product/user management interfaces
- Admin component integration tests
- Theme switching functionality in admin panel

### Current Focus

**Phase 5 Troubleshooting**: Completing backend admin panel theming integration. Working on missing interactive components, theme switching UI, and admin dashboard widgets that showcase the bubblegum theme integration.

### Development Context

**Modern Theme System**: 
- Uses shadcn/ui + CSS variables approach
- Bubblegum theme with pink/teal color palette
- Multi-level theme switching (dark/light + color schemes)
- Consistent styling across storefront and admin

**Architecture**: 
- Storefront: Next.js 14 with modern component library
- Backend: Medusa.js 2.0 with themed admin panel
- Full-stack theme consistency maintained