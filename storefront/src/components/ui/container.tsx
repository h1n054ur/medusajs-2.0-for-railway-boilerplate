import * as React from "react"
import { cn } from "@/lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium" | "large" | "xlarge"
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "medium", ...props }, ref) => {
    const sizeClasses = {
      small: "max-w-2xl",
      medium: "max-w-4xl", 
      large: "max-w-6xl",
      xlarge: "max-w-7xl"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }