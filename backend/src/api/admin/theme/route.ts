import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { adminThemeConfig, generateThemeVariables } from "../../../admin/theme-config"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    // Return theme configuration for admin panel
    const mode = (req.query.mode as string) || 'light'
    const themeVariables = generateThemeVariables(mode as 'light' | 'dark')
    
    const response = {
      theme: {
        config: adminThemeConfig,
        variables: themeVariables,
        mode: mode
      },
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch theme configuration",
      details: error instanceof Error ? error.message : "Unknown error"
    })
  }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    // Update theme preferences for admin user
    const { userId, themePreferences } = req.body

    if (!userId || !themePreferences) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["userId", "themePreferences"]
      })
    }

    // In a real implementation, you would save this to a database
    // For now, we'll just return success with the preferences
    const response = {
      message: "Theme preferences updated successfully",
      preferences: {
        userId,
        mode: themePreferences.mode || 'light',
        colorScheme: themePreferences.colorScheme || 'bubblegum',
        updatedAt: new Date().toISOString()
      }
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({
      error: "Failed to update theme preferences",
      details: error instanceof Error ? error.message : "Unknown error"
    })
  }
}