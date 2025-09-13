import React from "react"
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  className 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <Loader2 
      className={cn(
        "animate-spin text-primary",
        sizeClasses[size],
        className
      )} 
    />
  )
}

interface SkeletonProps {
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  )
}

export const CardSkeleton = () => (
  <div className="enterprise-card p-6 space-y-4">
    <div className="flex items-center space-x-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-2/3" />
    </div>
    <div className="flex justify-between">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-16" />
    </div>
  </div>
)

export const TableSkeleton = ({ rows = 5, cols = 4 }) => (
  <div className="space-y-3">
    <div className="flex space-x-4">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-10 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-4">
        {Array.from({ length: cols }).map((_, j) => (
          <Skeleton key={j} className="h-8 flex-1" />
        ))}
      </div>
    ))}
  </div>
)

interface LoadingStateProps {
  type: "loading" | "success" | "error" | "warning"
  message?: string
  className?: string
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  type,
  message,
  className
}) => {
  const config = {
    loading: {
      icon: <LoadingSpinner />,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    success: {
      icon: <CheckCircle className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    error: {
      icon: <XCircle className="h-6 w-6" />,
      color: "text-red-600", 
      bgColor: "bg-red-50"
    },
    warning: {
      icon: <AlertCircle className="h-6 w-6" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  }

  const { icon, color, bgColor } = config[type]

  return (
    <div className={cn(
      "flex items-center justify-center p-8 rounded-xl",
      bgColor,
      className
    )}>
      <div className="text-center space-y-3">
        <div className={cn("flex justify-center", color)}>
          {icon}
        </div>
        {message && (
          <p className={cn("text-sm font-medium", color)}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Բեռնվում է...</h3>
        <p className="text-muted-foreground">Խնդրում ենք սպասել</p>
      </div>
    </div>
  </div>
)