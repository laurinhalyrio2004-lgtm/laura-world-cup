import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "bg-gold text-ink hover:bg-gold-deep hover:text-paper shadow-sm",
  secondary: "bg-ink text-paper hover:bg-ink/85",
  ghost: "bg-transparent text-ink border border-line hover:bg-bone",
  danger: "bg-team-red-soft text-team-red-deep border border-team-red/30 hover:bg-team-red/10",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
          "transition-all duration-150 active:scale-[.97] disabled:opacity-50 disabled:pointer-events-none",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
          variants[variant],
          className
        )}
        {...props}
      >
        {loading ? "Aguarde…" : children}
      </button>
    );
  }
);
Button.displayName = "Button";
