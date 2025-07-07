# Phase 1: Project Analysis & Setup

## Overview
Complete project structure audit, technology stack comparison, and development environment setup for the Medusa.js storefront modernization project.

## Project Structure Analysis

### Current Medusa.js Project Structure
```
medusajs-2.0-for-railway-boilerplate/
├── backend/                    # Medusa.js 2.0 backend
│   ├── src/
│   │   ├── modules/           # Custom modules (email, file storage)
│   │   ├── api/              # API routes (admin, store, custom)
│   │   ├── subscribers/      # Event subscribers
│   │   └── workflows/        # Custom workflows
│   ├── medusa-config.js      # Main configuration
│   └── package.json          # Backend dependencies
├── storefront/                # Next.js 14 storefront
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   ├── modules/          # Feature-based components
│   │   ├── lib/              # Utilities and data fetching
│   │   └── styles/           # Current styling
│   ├── tailwind.config.js    # Current Tailwind config
│   └── package.json          # Storefront dependencies
└── replit-app/               # Reference implementation
    ├── client/src/
    │   ├── components/       # shadcn/ui + magicui components
    │   └── index.css         # Bubblegum theme CSS variables
    ├── components.json       # shadcn/ui configuration
    └── tailwind.config.ts    # Modern Tailwind config
```

### Technology Stack Comparison

#### Current Medusa Storefront
- **Framework**: Next.js 14 with App Router
- **Styling**: @medusajs/ui-preset (basic theming)
- **Components**: Basic Medusa UI components
- **Theme System**: Limited preset-based theming
- **Package Manager**: pnpm/npm
- **Build Tool**: Next.js built-in

#### Reference replit-app
- **Framework**: React 18 with Vite
- **Styling**: shadcn/ui with CSS variables
- **Components**: Full shadcn/ui + magicui library
- **Theme System**: Multi-level (dark/light + color themes)
- **Package Manager**: npm
- **Build Tool**: Vite

#### Target Integration
- **Framework**: Next.js 14 (keep existing)
- **Styling**: shadcn/ui with CSS variables (migrate to)
- **Components**: shadcn/ui + magicui (integrate)
- **Theme System**: Multi-level theme switching (implement)
- **Package Manager**: pnpm (keep existing)
- **Build Tool**: Next.js (keep existing)

## Dependencies Mapping and Conflict Resolution

### Current Storefront Dependencies Analysis
```json
{
  "dependencies": {
    "@medusajs/ui": "preview",           // TO REPLACE with shadcn/ui
    "@medusajs/ui-preset": "preview",    // TO REMOVE
    "next": "^14.0.0",                   // KEEP - compatible
    "react": "^18.2.0",                  // KEEP - compatible
    "tailwindcss": "^3.0.23"            // KEEP - compatible
  }
}
```

### Required New Dependencies
```json
{
  "dependencies": {
    // Core shadcn/ui dependencies
    "@radix-ui/react-*": "^1.0.0",      // Various Radix components
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "next-themes": "^0.4.6",             // Theme switching
    "lucide-react": "^0.453.0",          // Icons
    "framer-motion": "^11.13.1"          // Animations for magicui
  }
}
```

### Conflict Resolution Strategy
1. **@medusajs/ui-preset Removal**: 
   - Gradual migration to prevent breaking changes
   - Maintain compatibility layer during transition
   - Test each component replacement

2. **CSS Variables Migration**:
   - Extract existing theme values
   - Map to shadcn/ui variable structure
   - Implement fallback mechanisms

3. **Component Library Integration**:
   - Install shadcn/ui components incrementally
   - Create component mapping documentation
   - Implement testing for each component

## Development Environment Setup Requirements

### Prerequisites
- Node.js 22.x (as specified in backend package.json)
- pnpm 9.10.0 (as specified in backend package.json)
- PostgreSQL (for Medusa backend)
- Redis (optional, fallback to in-memory)

### Environment Variables Setup
```bash
# Backend Environment
DATABASE_URL="postgresql://..."
REDIS_URL="redis://..."              # Optional
MINIO_*="..."                        # Optional file storage
RESEND_API_KEY="..."                 # Optional email
STRIPE_*="..."                       # Optional payments

# Storefront Environment
NEXT_PUBLIC_MEDUSA_BACKEND_URL="http://localhost:9000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### Development Setup Steps
1. **Backend Setup**:
   ```bash
   cd backend/
   pnpm install
   pnpm ib                    # Initialize backend
   pnpm dev                   # Start development server
   ```

2. **Storefront Setup**:
   ```bash
   cd storefront/
   pnpm install
   pnpm dev                   # Start development server
   ```

3. **shadcn/ui Setup** (to be implemented):
   ```bash
   cd storefront/
   npx shadcn@latest init     # Initialize shadcn/ui
   # Configure components.json with CSS variables
   ```

## Development Workflow

### Direct Main Branch Development
- All development work is done directly on the main branch
- No separate feature branches or backup branches required
- Changes are applied immediately to the production codebase

### Commit Strategy
- **Phase-based commits**: One commit per completed phase
- **Component-based commits**: Individual commits for component migrations
- **Documentation commits**: Separate commits for documentation updates
- **Descriptive messages**: Clear commit messages describing changes made

## File Structure Planning

### New Directory Structure (Storefront)
```
storefront/
├── src/
│   ├── components/           # NEW: shadcn/ui components
│   │   ├── ui/              # shadcn/ui base components
│   │   └── magicui/         # magicui components
│   ├── lib/
│   │   ├── utils.ts         # NEW: shadcn/ui utilities
│   │   └── theme.ts         # NEW: theme management
│   ├── hooks/               # NEW: custom hooks
│   │   └── use-theme.ts     # NEW: theme switching hook
│   ├── styles/
│   │   └── globals.css      # MODIFIED: CSS variables
│   └── [existing structure]
├── components.json          # NEW: shadcn/ui configuration
└── tailwind.config.js       # MODIFIED: shadcn/ui integration
```

### Configuration Files Updates
1. **components.json**: shadcn/ui configuration
2. **tailwind.config.js**: CSS variables integration
3. **globals.css**: Theme variables and animations
4. **package.json**: New dependencies

## Pre-Implementation Checklist

### Analysis Tasks
- [x] Project structure documented
- [x] Technology stack comparison completed
- [x] Dependencies mapping finished
- [x] Conflict resolution strategy defined

### Setup Tasks
- [ ] Development environment configured
- [ ] Current implementation analyzed
- [ ] Testing framework prepared

### Documentation Tasks
- [ ] Component mapping documentation created
- [ ] Migration strategy documented
- [ ] Development guidelines established

## Risk Assessment for Phase 1

### Low Risk
- **Environment Setup**: Standard Node.js/Next.js setup
- **Documentation Creation**: No code changes required
- **Git Strategy**: Standard branching practices

### Medium Risk
- **Dependency Conflicts**: Potential conflicts between @medusajs/ui and shadcn/ui
- **Environment Compatibility**: Ensuring all tools work together

### High Risk
- **Breaking Changes**: Potential for introducing breaking changes early
- **Data Loss**: Risk of losing current styling/functionality

## Success Criteria

### Phase 1 Completion Criteria
1. **Analysis Complete**: All project structures documented
2. **Setup Complete**: Development environment functional
3. **Strategy Defined**: Clear migration and rollback procedures
4. **Documentation Complete**: All Phase 1 deliverables created

### Validation Steps
1. **Environment Test**: Both backend and storefront start without errors
2. **Documentation Review**: All analysis documents complete
3. **Strategy Review**: Migration strategy validated
4. **Team Alignment**: Development guidelines established

## Next Steps to Phase 2

### Immediate Actions
1. Complete development environment setup
2. Analyze current implementation
3. Begin Phase 2 theme system setup

### Deliverables for Phase 2
1. shadcn/ui initialization
2. CSS variables implementation
3. Theme switcher foundation
4. Basic component migration strategy

This Phase 1 plan provides a comprehensive foundation for the entire modernization project, ensuring all technical and organizational aspects are properly prepared before beginning the actual implementation.