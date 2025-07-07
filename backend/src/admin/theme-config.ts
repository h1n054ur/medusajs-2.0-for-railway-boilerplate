// Admin Theme Configuration
// Matches the storefront bubblegum theme for consistency

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
    },
    secondary: {
      light: '#8acfd1',
      dark: '#50afb6'
    },
    accent: {
      light: '#fbe2a7',
      dark: '#e6d177'
    },
    muted: {
      light: '#b2e1eb',
      dark: '#324859'
    },
    foreground: {
      light: '#5b5b5b',
      dark: '#f3e3ea'
    },
    border: {
      light: '#d04f99',
      dark: '#50afb6'
    }
  },
  borderRadius: '0.4rem',
  fontFamily: 'Poppins, sans-serif',
  shadows: {
    card: '3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 0.50)',
    cardDark: '3px 3px 0px 0px hsl(195 61% 52% / 0.30)'
  }
}

export type AdminThemeMode = 'light' | 'dark'
export type AdminColorScheme = 'bubblegum' | 'default' | 'corporate'

// CSS custom properties for theme switching
export function generateThemeVariables(mode: AdminThemeMode = 'light') {
  const theme = adminThemeConfig.colors
  
  return {
    '--admin-primary': theme.primary[500],
    '--admin-bg': theme.background[mode],
    '--admin-card': theme.card[mode],
    '--admin-secondary': theme.secondary[mode],
    '--admin-accent': theme.accent[mode],
    '--admin-muted': theme.muted[mode],
    '--admin-foreground': theme.foreground[mode],
    '--admin-border': theme.border[mode],
    '--admin-radius': adminThemeConfig.borderRadius,
    '--admin-shadow': mode === 'light' ? adminThemeConfig.shadows.card : adminThemeConfig.shadows.cardDark,
    '--admin-font-family': adminThemeConfig.fontFamily
  }
}