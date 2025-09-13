import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AutoBreadcrumb } from "@/components/ui/breadcrumb-enhanced";
import { LoadingState, CardSkeleton } from "@/components/ui/loading-states";
import { 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  Users,
  BarChart3,
  Activity,
  ArrowUpRight,
  Filter,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const AdminDashboardRedesigned = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeFilter, setTimeFilter] = useState("week");

  const stats = [
    {
      title: "Ընդամենը առաջադրանքներ",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: ClipboardList,
      color: "text-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200"
    },
    {
      title: "Կատարված",
      value: "18",
      change: "+8%",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200"
    },
    {
      title: "Գործընթացում",
      value: "4",
      change: "+2%",
      trend: "up",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200"
    },
    {
      title: "Ուշացած",
      value: "2",
      change: "-3%",
      trend: "down",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "from-red-50 to-red-100",
      borderColor: "border-red-200"
    }
  ];

  const departmentStats = [
    { name: "Փոր-պայթյունային բաժին", tasks: 6, completed: 5, pending: 1, efficiency: 83, color: "#f59e0b" },
    { name: "Երկրաբանական ծառայություն", tasks: 8, completed: 6, pending: 2, efficiency: 75, color: "#10b981" },
    { name: "Երկրամեխանիկական բաժին", tasks: 5, completed: 4, pending: 1, efficiency: 80, color: "#3b82f6" },
    { name: "Մարկշեյդերական ծառայություն", tasks: 5, completed: 3, pending: 2, efficiency: 60, color: "#f97316" },
  ];

  const weeklyData = [
    { name: 'Երկ', completed: 4, assigned: 2, efficiency: 85 },
    { name: 'Երք', completed: 3, assigned: 5, efficiency: 92 },
    { name: 'Չոր', completed: 6, assigned: 3, efficiency: 78 },
    { name: 'Հնգ', completed: 5, assigned: 4, efficiency: 88 },
    { name: 'Ուր', completed: 8, assigned: 6, efficiency: 95 },
    { name: 'Շաբ', completed: 2, assigned: 1, efficiency: 70 },
    { name: 'Կիր', completed: 1, assigned: 0, efficiency: 65 },
  ];

  const priorityData = [
    { name: 'Բարձր', value: 8, color: '#ef4444' },
    { name: 'Միջին', value: 12, color: '#f59e0b' },
    { name: 'Ցածր', value: 4, color: '#22c55e' },
  ];

  const monthlyTrend = [
    { month: 'Հուլիս', tasks: 45, completed: 42, efficiency: 93 },
    { month: 'Օգոստոս', tasks: 52, completed: 48, efficiency: 92 },
    { month: 'Սեպտեմբեր', tasks: 38, completed: 35, efficiency: 92 },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "completed",
      title: "Երկրաբանական հաշվետվություն կատարված է",
      service: "Երկրաբանական ծառայություն",
      time: "2 ժամ առաջ",
      priority: "high"
    },
    {
      id: 2,
      type: "in_progress",
      title: "Կայունության վերլուծություն ընթացքում է",
      service: "Երկրամեխանիկական բաժին",
      time: "5 ժամ առաջ",
      priority: "medium"
    },
    {
      id: 3,
      type: "assigned",
      title: "Նոր մարկշեյդերական չափում նշանակված է",
      service: "Մարկշեյդերական ծառայություն",
      time: "1 օր առաջ",
      priority: "low"
    }
  ];

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <AutoBreadcrumb />
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-bold text-foreground">Վերլուծական վահանակ</h1>
              <Badge variant="secondary" className="animate-pulse">
                Ռեալ ժամանակ
              </Badge>
            </div>
            <p className="text-muted-foreground">Ծառայությունների առաջադրանքների կատարման վիճակագրություն</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Թարմացնել
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Էկսպորտ
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Ֆիլտր
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <LoadingState type="loading" message="Տվյալները թարմացվում են..." />
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.trend === "up";
            return (
              <Card 
                key={stat.title} 
                className={`relative overflow-hidden glass-interactive border-l-4 ${stat.borderColor} animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-5`}></div>
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium px-3 py-1.5 rounded-full ${
                      isPositive ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-red-700 bg-red-50 border border-red-200'
                    }`}>
                      <TrendingUp className={`h-3 w-3 ${isPositive ? '' : 'rotate-180'}`} />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Weekly Performance */}
          <Card className="glass-card border-0 shadow-xl">
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Շաբաթական արտադրողականություն
                </h3>
                <Badge variant="outline" className="text-xs">7 օր</Badge>
              </div>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(8px)'
                    }} 
                  />
                  <Bar 
                    dataKey="completed" 
                    fill="hsl(var(--status-completed))" 
                    name="Կատարված" 
                    radius={[4, 4, 0, 0]}
                    opacity={0.8}
                  />
                  <Bar 
                    dataKey="assigned" 
                    fill="hsl(var(--admin-primary))" 
                    name="Նշանակված" 
                    radius={[4, 4, 0, 0]}
                    opacity={0.6}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Priority Distribution */}
          <Card className="glass-card border-0 shadow-xl">
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Բաշխում ըստ առաջնահերթության
                </h3>
                <Badge variant="outline" className="text-xs">{priorityData.reduce((sum, item) => sum + item.value, 0)} ընդամենը</Badge>
              </div>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    labelLine={false}
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(8px)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Secondary Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Monthly Trend */}
          <Card className="glass-card border-0 shadow-xl">
            <div className="p-6 border-b border-border/50">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Ամսական դինամիկա
              </h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(8px)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tasks" 
                    stroke="hsl(var(--admin-primary))" 
                    fill="hsl(var(--admin-primary))" 
                    fillOpacity={0.1} 
                    name="Ընդամենը առաջադրանքներ" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="hsl(var(--status-completed))" 
                    fill="hsl(var(--status-completed))" 
                    fillOpacity={0.2} 
                    name="Կատարված" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Department Performance */}
          <Card className="glass-card border-0 shadow-xl">
            <div className="p-6 border-b border-border/50">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Ծառայությունների արտադրողականություն
              </h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={departmentStats} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    type="number" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={180} 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(8px)'
                    }} 
                  />
                  <Bar 
                    dataKey="completed" 
                    fill="hsl(var(--status-completed))" 
                    name="Կատարված" 
                    radius={[0, 4, 4, 0]}
                    opacity={0.8}
                  />
                  <Bar 
                    dataKey="pending" 
                    fill="hsl(var(--status-pending))" 
                    name="Գործընթացում" 
                    radius={[0, 4, 4, 0]}
                    opacity={0.6}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Department Details & Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Department Statistics */}
          <Card className="glass-card border-0 shadow-xl">
            <div className="p-6 border-b border-border/50">
              <h3 className="text-xl font-semibold text-foreground">Մանրամասն վիճակագրություն</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {departmentStats.map((dept, index) => (
                  <div 
                    key={index} 
                    className="group p-4 rounded-2xl bg-muted/30 border border-border/30 hover:bg-muted/50 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full shadow-sm" 
                          style={{ backgroundColor: dept.color }}
                        ></div>
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {dept.name}
                        </span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${dept.efficiency >= 80 ? 'text-emerald-700 border-emerald-200' : dept.efficiency >= 70 ? 'text-amber-700 border-amber-200' : 'text-red-700 border-red-200'}`}
                      >
                        {dept.efficiency}% արդյունավետ
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{dept.tasks}</div>
                        <div className="text-xs text-muted-foreground font-medium">Ընդամենը</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">{dept.completed}</div>
                        <div className="text-xs text-muted-foreground font-medium">Կատարված</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600">{dept.pending}</div>
                        <div className="text-xs text-muted-foreground font-medium">Գործընթացում</div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000 ease-out" 
                          style={{ width: `${dept.efficiency}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-right">
                        {Math.round((dept.completed / dept.tasks) * 100)}% կատարված
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card border-0 shadow-xl">
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Վերջին գործունեություն
                </h3>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  Տեսնել բոլորը
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const getActivityConfig = () => {
                    switch (activity.type) {
                      case 'completed':
                        return {
                          icon: CheckCircle,
                          color: 'text-emerald-600',
                          bg: 'bg-emerald-50',
                          border: 'border-emerald-200'
                        };
                      case 'in_progress':
                        return {
                          icon: Clock,
                          color: 'text-blue-600',
                          bg: 'bg-blue-50',
                          border: 'border-blue-200'
                        };
                      default:
                        return {
                          icon: AlertCircle,
                          color: 'text-amber-600',
                          bg: 'bg-amber-50',
                          border: 'border-amber-200'
                        };
                    }
                  };

                  const config = getActivityConfig();
                  const ActivityIcon = config.icon;

                  return (
                    <div 
                      key={activity.id} 
                      className={`group flex items-start space-x-4 p-4 rounded-2xl border ${config.border} ${config.bg} hover:shadow-md transition-all duration-300 animate-fade-in`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className={`p-2 rounded-xl ${config.bg} border ${config.border}`}>
                        <ActivityIcon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {activity.title}
                        </p>
                        <div className="flex items-center space-x-3 mt-1">
                          <p className="text-sm text-muted-foreground">{activity.service}</p>
                          <Badge variant="outline" className="text-xs">
                            {activity.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardRedesigned;