# Claude Code Implementation Planning Prompt

## Project Overview

I have a Railway-deployed Medusa.js boilerplate project with a separate replit-app folder in the root that contains a good implementation of shadcn/ui themes and components. I want to upgrade the Medusa storefront to use the same modern theming system and component library approach that I can see working in the replit-app. The replit-app is just for reference and will be deleted after extracting what I need.

## Project Structure Analysis Required

First, analyze the current project structure:

- Root Medusa.js project (Railway deployed)
- `/replit-app` folder with existing shadcn bubblegum theme implementation
- Identify current tech stacks for both applications
- Document existing component libraries and dependencies

## Main Objectives

1. **Upgrade Medusa Storefront**: Replace basic @medusajs/ui-preset with modern shadcn/ui theme system
2. **Component Library Integration**: Set up shadcn/ui, magicui, and custom components in Medusa
3. **Homepage Upgrade**: Make Medusa homepage look like the replit-app homepage (then delete replit-app)
4. **Theme Management**: Create easy theme switching system for future customization

## Required Planning Documents

Create the following implementation planning documents:

### 1. Main Implementation Plan (`IMPLEMENTATION_PLAN.md`)

- Executive summary of the integration approach
- High-level architecture overview
- Phase breakdown with dependencies
- Timeline estimates
- Risk assessment and mitigation strategies
- Success criteria and testing approach

### 2. Phase-Specific Detailed Plans

#### Phase 1: Project Analysis & Setup (`phase1_analysis_setup.md`)

- Complete project structure audit
- Technology stack comparison (Medusa vs replit-app)
- Dependencies mapping and conflict resolution
- Development environment setup requirements
- Git workflow and branch strategy

#### Phase 2: Modern Theme System Setup (`phase2_modern_theme_setup.md`)

- Replace @medusajs/ui-preset with shadcn/ui CSS variables approach
- Install bubblegum theme using provided CSS variables
- Set up theme switcher for easy theme changes in the future
- Configure components.json for modern shadcn/ui theming
- Remove dependency on basic Medusa theming

#### Phase 3: Component Library Integration (`phase3_component_integration.md`)

- shadcn/ui components installation and configuration
- magicui components setup and customization
- Custom component migration strategy
- Component documentation and usage guidelines
- Storybook setup for component development

#### Phase 4: Homepage Upgrade (`phase4_homepage_upgrade.md`)

- Copy homepage design patterns from replit-app to Medusa storefront
- Implement identical layout using new shadcn/ui components
- Replace Medusa's basic homepage with modern design
- Ensure responsive behavior and animations work correctly
- Test theme switching on the new homepage

#### Phase 5: Backend Integration (`phase5_backend_integration.md`)

- Apply new theme system to Medusa admin panel
- Update API response styling for consistency
- Upgrade authentication flow components
- Style dashboard and management interfaces with new components
- Ensure admin panel matches storefront theming

#### Phase 6: Testing & Deployment (`phase6_testing_deployment.md`)

- Pre-deployment code validation and linting
- Component integration verification (local development only)
- GitHub repository setup and commit structure
- Railway deployment pipeline configuration
- Post-deployment testing plan (user will test after GitHub > Railway deployment)
- Deployment verification checklist for user testing

### 3. Technical Specifications (`TECHNICAL_SPECS.md`)

- Detailed file structure for shared components
- Import/export patterns for theme system
- Configuration files setup (tailwind.config.js, etc.)
- Package.json modifications required
- Build process optimization

### 4. Testing & Deployment Guide (`TESTING_DEPLOYMENT_GUIDE.md`)

- Pre-deployment validation checklist
- GitHub repository optimization
- Railway deployment configuration
- Post-deployment testing instructions for you to execute
- User acceptance testing checklist
- Troubleshooting guide for common deployment issues

## Key Research Findings

### Theme Installation Methods

1. **Official shadcn/ui themes**: Available at https://ui.shadcn.com/themes - copy/paste CSS variables approach
2. **Tweakcn.com themes**: Visual no-code theme editor for shadcn/ui components with downloadable themes
3. **Custom theme installation**: Use `npx shadcn@latest add https://tweakcn.com/r/themes/bubblegum.json` for specific themes
4. **Multiple theme support**: Can implement color theme selectors alongside light/dark mode using CSS variables and data attributes

### Theme System Architecture

1. **CSS Variables Approach**: shadcn/ui uses CSS variables for theming with cssVariables: true in components.json
2. **next-themes Integration**: Use next-themes for dark/light mode switching with ThemeProvider
3. **Multiple Theme Support**: Can implement 3-level customization: dark/light mode, color schemes, and border radius
4. **Theme Switching**: shadcn's own site uses theme classes on document.body like `theme-{themeName}`

### Theme System Upgrade

- Replace @medusajs/ui-preset with modern shadcn/ui CSS variables approach
- Install bubblegum theme using the provided CSS variables from paste.txt
- Create theme switcher component for easy future theme changes
- Set up components.json properly for CSS variables theming
- Remove old Medusa theming dependencies

### Component Library Upgrade

- Replace basic Medusa components with modern shadcn/ui components
- Extract and install magicui components from replit-app reference
- Set up proper component architecture for easy maintenance
- Create component documentation for team use
- Implement component variants that work with theme switching

### Homepage Modernization

- Study replit-app homepage design and component usage (reference only)
- Upgrade Medusa's basic homepage to modern design standards
- Implement new layout using upgraded shadcn/ui components and themes
- Ensure new homepage showcases theme switching capabilities
- Replace all outdated Medusa homepage components

### Development Workflow

- Set up hot-reload for theme changes
- Create development guidelines for team
- Implement component testing framework
- Design code review process for UI changes

## Constraints and Considerations

- Must maintain Railway deployment compatibility
- Preserve existing Medusa e-commerce functionality
- Ensure mobile-first responsive design
- Optimize for performance and SEO
- Plan for easy theme changes and future customization
- **Reference Usage**: replit-app is reference only and will be deleted after extracting needed patterns
- **Testing Limitation**: Claude Code cannot perform full environment testing - user will test after GitHub > Railway deployment

## Deliverables Expected

- Complete implementation plan with all phase documents
- Technical architecture documentation
- Component library setup guide
- Pre-deployment validation procedures
- Post-deployment testing guide for user execution
- Migration timeline with milestones

## Instructions for Claude Code

1. **DO NOT EXECUTE CODE YET** - Only create planning documents
2. First analyze the existing project structure thoroughly
3. Plan proper theme system using CSS variables approach (cssVariables: true in components.json)
4. Use the exact bubblegum theme CSS variables provided in the uploaded paste.txt file
5. Create comprehensive theme switching architecture supporting multiple themes
6. Plan integration with next-themes for dark/light mode + custom color theme context
7. Include examples of theme provider setup, theme switcher components, and CSS integration
8. Provide clear dependencies between phases and actionable checklists
9. Document theme system architecture following shadcn.com's official patterns
10. Include performance and accessibility considerations
11. **Testing Note**: Create comprehensive testing plans but acknowledge that actual testing will occur after user deploys to GitHub > Railway (Claude Code cannot test in full environment)

Please analyze the project structure and create comprehensive planning documents that focus on upgrading the Medusa.js storefront to use modern shadcn/ui theming and components. Use the replit-app as a reference for good patterns, extract the bubblegum theme CSS variables from paste.txt, and create a plan to modernize the entire Medusa frontend with easy theme switching capabilities. The replit-app folder will be deleted after extracting what's needed.
