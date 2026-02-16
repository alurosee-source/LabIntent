import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "default" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
    const variants = {
      default: "bg-red-600 text-white hover:bg-red-700",
      outline: "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
    }
    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      lg: "h-14 px-8 py-2 text-base"
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
