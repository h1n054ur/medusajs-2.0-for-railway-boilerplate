import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { ThemeProvider } from "@/lib/theme-provider"
import { ThemeContextProvider } from "@/lib/theme-context"
import "@/styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ThemeContextProvider>
            <main className="relative">{props.children}</main>
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
