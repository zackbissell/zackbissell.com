import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { LucideIcon, AlertTriangle, Heart, Zap, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // World-specific variants with thematic styling
        classified: 
          "bg-disco-danger/10 border-disco-danger/30 text-disco-danger animate-pulse hover:bg-disco-danger/20",
        emotional: 
          "bg-nostalgia-primary/10 border-nostalgia-primary/30 text-nostalgia-primary emotion-glow hover:shadow-purple-500/30",
        chaotic: 
          "bg-rolemodel-chaos/10 border-rolemodel-chaos/30 text-rolemodel-chaos chaos-flicker hover:chaos-shake",
        ascending: 
          "bg-elevation-primary/10 border-elevation-primary/30 text-elevation-primary elevation-rise hover:bg-elevation-primary/20",
        // Interactive storytelling badges
        warning:
          "bg-amber-500/10 border-amber-500/30 text-amber-300 animate-pulse",
        success:
          "bg-green-500/10 border-green-500/30 text-green-300",
        info:
          "bg-blue-500/10 border-blue-500/30 text-blue-300",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        glitch: "animate-glitch",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: LucideIcon
  text?: string
  pulse?: boolean
}

const worldIcons = {
  classified: AlertTriangle,
  emotional: Heart,
  chaotic: Zap,
  ascending: TrendingUp,
}

function Badge({ 
  className, 
  variant, 
  size, 
  animation, 
  icon: Icon, 
  text, 
  pulse,
  children,
  ...props 
}: BadgeProps) {
  // Auto-select icon based on variant if not provided
  const DefaultIcon = variant && variant in worldIcons 
    ? worldIcons[variant as keyof typeof worldIcons] 
    : undefined

  const IconComponent = Icon || DefaultIcon

  // Auto-apply pulse animation for certain variants
  const finalAnimation = pulse || (variant === 'classified' || variant === 'warning') 
    ? 'pulse' 
    : animation

  return (
    <div 
      className={cn(badgeVariants({ variant, size, animation: finalAnimation }), className)} 
      {...props}
    >
      {IconComponent && (
        <IconComponent className="w-3 h-3 mr-1 flex-shrink-0" />
      )}
      {text || children}
    </div>
  )
}

// Preset badge components for common use cases
export const ClassifiedBadge = ({ children, ...props }: Omit<BadgeProps, 'variant'>) => (
  <Badge variant="classified" icon={AlertTriangle} {...props}>
    {children || "CLASSIFIED MATERIAL"}
  </Badge>
)

export const EmotionalBadge = ({ children, ...props }: Omit<BadgeProps, 'variant'>) => (
  <Badge variant="emotional" icon={Heart} {...props}>
    {children || "EMOTIONAL CONTENT"}
  </Badge>
)

export const ChaoticBadge = ({ children, ...props }: Omit<BadgeProps, 'variant'>) => (
  <Badge variant="chaotic" icon={Zap} {...props}>
    {children || "UNHINGED"}
  </Badge>
)

export const AscendingBadge = ({ children, ...props }: Omit<BadgeProps, 'variant'>) => (
  <Badge variant="ascending" icon={TrendingUp} {...props}>
    {children || "ASCENDING"}
  </Badge>
)

export { Badge, badgeVariants }
