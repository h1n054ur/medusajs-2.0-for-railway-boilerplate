import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background text-foreground",
      },
      size: {
        default: "h-6 w-6 text-xs",
        sm: "h-5 w-5 text-xs",
        lg: "h-8 w-8 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface IconBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBadgeVariants> {}

function IconBadge({ className, variant, size, ...props }: IconBadgeProps) {
  return (
    <div
      className={cn(iconBadgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { IconBadge, iconBadgeVariants }