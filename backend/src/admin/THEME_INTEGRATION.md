# Admin Panel Theme Integration

This document outlines the theme integration for the Medusa admin panel, implementing the bubblegum theme to match the storefront.

## Overview

The admin panel has been enhanced with:
- **Bubblegum theme styling** that matches the storefront
- **CSS overrides** for Medusa admin components
- **Themed email templates** with consistent branding
- **Custom widgets** showcasing the theme integration
- **Theme API endpoints** for configuration management

## Files Structure

```
src/admin/
├── theme-config.ts              # Theme configuration and variables
├── styles/
│   └── theme-overrides.css      # CSS overrides for admin components
├── widgets/
│   ├── themed-dashboard-stats.tsx     # Dashboard analytics widget
│   └── themed-product-insights.tsx    # Product insights widget
└── THEME_INTEGRATION.md         # This documentation
```

## Theme Configuration

### Colors
The theme uses the bubblegum color palette:
- **Primary**: `#d04f99` (Pink)
- **Secondary**: `#8acfd1` (Teal)
- **Background**: `#f6e6ee` (Light Pink)
- **Card**: `#fdedc9` (Light Yellow)
- **Accent**: `#fbe2a7` (Yellow)

### Typography
- **Font Family**: Poppins, sans-serif
- **Font Weights**: 300, 400, 500, 600, 700

### Design Elements
- **Border Radius**: 8px (0.4rem)
- **Box Shadow**: 3px 3px 0px 0px with theme colors
- **Transitions**: 0.2s ease for smooth interactions

## Admin Widgets

### 1. Themed Dashboard Stats Widget
**Location**: Dashboard home page (after main content)
**Features**:
- Store analytics overview
- Total orders, revenue, customers, products
- Animated hover effects
- Responsive grid layout

### 2. Themed Product Insights Widget
**Location**: Product detail pages (after product details)
**Features**:
- Product performance metrics
- Views, cart adds, purchases
- Conversion rate indicator
- Trending product badge

## API Endpoints

### GET /api/admin/theme
Returns the current theme configuration including:
- Color palette
- Typography settings
- CSS variables
- Theme mode (light/dark)

### POST /api/admin/theme
Updates theme preferences for admin users:
- Theme mode selection
- Color scheme preferences
- User-specific settings

## Email Templates

### Themed Order Confirmation
**Template**: `themed-order-placed.tsx`
**Features**:
- Bubblegum theme styling
- Responsive email design
- Order summary with theme colors
- Branded header and footer
- Action buttons with theme styling

### Themed Base Template
**Template**: `themed-base.tsx`
**Features**:
- Consistent header/footer
- Theme color integration
- Responsive container
- Font integration (Poppins)

## CSS Overrides

The `theme-overrides.css` file provides comprehensive styling for:

### Components
- Buttons with hover animations
- Cards with shadow effects
- Inputs with focus states
- Tables with alternating rows
- Badges with theme colors
- Navigation with active states

### Layout
- Sidebar with theme background
- Header with backdrop blur
- Modal with theme styling
- Dropdown with shadow effects

### Responsive Design
- Mobile-optimized shadows
- Scalable hover effects
- Adaptive grid layouts

## Usage Examples

### Using Theme Variables in Components
```tsx
const MyComponent = () => (
  <div style={{
    backgroundColor: 'var(--admin-bg)',
    color: 'var(--admin-foreground)',
    borderRadius: 'var(--admin-radius)',
    boxShadow: 'var(--admin-shadow)'
  }}>
    Themed content
  </div>
)
```

### Creating Custom Widgets
```tsx
import { defineWidgetConfig } from "@medusajs/admin-shared"

const MyWidget = () => {
  return (
    <div className="themed-admin-widget">
      {/* Widget content */}
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "dashboard.after", // or "product.details.after"
})

export default MyWidget
```

### Email Template Integration
```tsx
import { ThemedBase } from './themed-base'

const MyEmailTemplate = ({ data }) => (
  <ThemedBase title="My Email" preview="Preview text">
    {/* Email content with automatic theme styling */}
  </ThemedBase>
)
```

## Development Notes

### Adding New Widgets
1. Create widget file in `src/admin/widgets/`
2. Use `defineWidgetConfig` to specify placement
3. Apply theme classes for consistent styling
4. Test in both light and dark modes

### Customizing Colors
1. Update `theme-config.ts` with new color values
2. Regenerate CSS variables in `theme-overrides.css`
3. Test across all admin components
4. Update email templates if needed

### Performance Considerations
- CSS overrides use `!important` sparingly
- Animations use `transform` for GPU acceleration
- Font loading is optimized with `display=swap`
- Responsive design prevents layout shifts

## Testing

### Admin Components
- Test all widget placements
- Verify theme switching functionality
- Check responsive behavior
- Validate hover/focus states

### Email Templates
- Test email rendering in various clients
- Verify theme consistency
- Check mobile email display
- Validate all template variables

### API Integration
- Test theme configuration endpoints
- Verify error handling
- Check theme persistence
- Validate API response formats

## Future Enhancements

### Planned Features
- **User preferences**: Personal theme customization
- **Theme variants**: Additional color schemes
- **Animation controls**: Motion preference settings
- **Component library**: Reusable admin components

### Integration Opportunities
- **Dashboard themes**: Multiple dashboard layouts
- **Widget marketplace**: Community widget sharing
- **Theme builder**: Visual theme customization tool
- **Analytics integration**: Theme usage tracking

This theme integration provides a cohesive, branded experience across the entire Medusa platform while maintaining the flexibility to customize and extend the admin interface.