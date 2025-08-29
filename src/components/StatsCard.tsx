
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'chart-2' | 'chart-3' | 'chart-4';
}

const StatsCard = ({ title, value, icon, trend, color = 'primary' }: StatsCardProps) => {
  const isPositiveTrend = trend?.startsWith('+') || trend?.startsWith('-') && trend.includes('ms');
  
  const colorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    'chart-2': 'text-chart-2',
    'chart-3': 'text-chart-3',
    'chart-4': 'text-chart-4',
  };

  return (
    <Card className="analytics-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}/10`}>
          <div className={colorClasses[color]}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-medium ${
            isPositiveTrend ? 'text-success' : 'text-warning'
          }`}>
            {isPositiveTrend ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {trend}
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </Card>
  );
};

export default StatsCard;
