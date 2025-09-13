import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

export function KPICard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
  description,
  trend
}: KPICardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'negative':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '→';
  };

  return (
    <Card className="enterprise-card hover-lift">
      <CardContent className="grid-24">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgColor}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          
          {change && (
            <Badge variant="outline" className={`text-xs font-medium px-2 py-1 ${getChangeColor()}`}>
              {getTrendIcon()} {change}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">
              {value}
            </span>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-foreground leading-tight">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}