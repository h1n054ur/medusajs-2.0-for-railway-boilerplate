import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textVariants = cva(
  "text-foreground",
  {
    variants: {
      size: {
        "xsmall": "text-xs",
        "small": "text-sm", 
        "base": "text-base",
        "large": "text-lg",
        "xlarge": "text-xl",
      },
      weight: {
        "normal": "font-normal",
        "medium": "font-medium", 
        "semibold": "font-semibold",
        "bold": "font-bold",
      },
      leading: {
        "none": "leading-none",
        "tight": "leading-tight",
        "normal": "leading-normal",
        "relaxed": "leading-relaxed",
      },
      variant: {
        "default": "text-foreground",
        "muted": "text-muted-foreground",
        "destructive": "text-destructive",
        "primary": "text-primary",
      }
    },
    defaultVariants: {
      size: "base",
      weight: "normal", 
      leading: "normal",
      variant: "default",
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean
  as?: keyof JSX.IntrinsicElements
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size, weight, leading, variant, asChild = false, as = "span", ...props }, ref) => {
    const Comp = asChild ? React.Fragment : as
    return (
      <Comp
        className={cn(textVariants({ size, weight, leading, variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }