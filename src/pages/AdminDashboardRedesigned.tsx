import React, { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  service: string | null;
  deadline: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Service {
  id: string;
  name: string;
  email: string | null;
  description: string | null;
  active: boolean;
}

const AdminDashboardRedesigned = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("week");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    overdue: 0
  });

  useEffect(() => {
    fetchData();
    
    // Set up realtime subscriptions
    const tasksChannel = supabase
      .channel('tasks-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks' },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      tasksChannel.unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch tasks - handling the case where table might not exist
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (tasksError) {
        console.log('Tasks table does not exist yet');
        setTasks([]);
      } else {
        setTasks(tasksData || []);
      }

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('name', { ascending: true });

      if (servicesError) {
        console.log('Services table does not exist yet');
        setServices([]);
      } else {
        setServices(servicesData || []);
      }

      // Calculate stats
      const taskList = tasksData || [];
      const total = taskList.length;
      const completed = taskList.filter((t: Task) => t.status === 'completed').length;
      const inProgress = taskList.filter((t: Task) => t.status === 'in_progress').length;
      const overdue = taskList.filter((t: Task) => {
        if (!t.deadline || t.status === 'completed') return false;
        return new Date(t.deadline) < new Date();
      }).length;

      setStats({ total, completed, inProgress, overdue });
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Տվյալները բեռնելու սխալ');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  // Calculate dynamic stats for display
  const getStatsDisplay = () => [
    {
      title: "Ընդամենը առաջադրանքներ",
      value: stats.total.toString(),
      change: "+12%",
      trend: "up",
      icon: ClipboardList,
      color: "text-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200"
    },
    {
      title: "Կատարված",
      value: stats.completed.toString(),
      change: stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}%` : "0%",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200"
    },
    {
      title: "Գործընթացում",
      value: stats.inProgress.toString(),
      change: "+2%",
      trend: "up",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200"
    },
    {
      title: "Ուշացած",
      value: stats.overdue.toString(),
      change: stats.overdue > 0 ? `-${stats.overdue}` : "0",
      trend: stats.overdue > 0 ? "down" : "up",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "from-red-50 to-red-100",
      borderColor: "border-red-200"
    }
  ];

  // Calculate department stats
  const getDepartmentStats = () => {
    return services.map(service => {
      const serviceTasks = tasks.filter(t => t.service === service.email);
      const completed = serviceTasks.filter(t => t.status === 'completed').length;
      const pending = serviceTasks.filter(t => t.status !== 'completed').length;
      const total = serviceTasks.length;
      const efficiency = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      return {
        name: service.name,
        tasks: total,
        completed,
        pending,
        efficiency,
        color: ["#f59e0b", "#10b981", "#3b82f6", "#f97316"][services.indexOf(service) % 4]
      };
    });
  };

  // Calculate weekly data
  const getWeeklyData = () => {
    const days = ['Կիր', 'Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուր', 'Շաբ'];
    const today = new Date();
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      const dayTasks = tasks.filter(t => {
        const taskDate = new Date(t.created_at);
        return taskDate >= dayStart && taskDate <= dayEnd;
      });

      const completed = dayTasks.filter(t => t.status === 'completed').length;
      const assigned = dayTasks.length;
      const efficiency = assigned > 0 ? Math.round((completed / assigned) * 100) : 0;

      weekData.push({
        name: days[date.getDay()],
        completed,
        assigned,
        efficiency
      });
    }

    return weekData;
  };

  // Calculate priority data
  const getPriorityData = () => {
    const urgent = tasks.filter(t => t.priority === 'urgent').length;
    const high = tasks.filter(t => t.priority === 'high').length;
    const medium = tasks.filter(t => t.priority === 'medium').length;
    const low = tasks.filter(t => t.priority === 'low').length;

    return [
      { name: 'Շտապ', value: urgent, color: '#ef4444' },
      { name: 'Բարձր', value: high, color: '#f59e0b' },
      { name: 'Միջին', value: medium, color: '#22c55e' },
      { name: 'Ցածր', value: low, color: '#3b82f6' },
    ].filter(item => item.value > 0);
  };

  // Calculate monthly trend
  const getMonthlyTrend = () => {
    const months = ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'];
    const monthData = [];
    const today = new Date();

    for (let i = 2; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthTasks = tasks.filter(t => {
        const taskDate = new Date(t.created_at);
        return taskDate >= monthStart && taskDate <= monthEnd;
      });

      const completed = monthTasks.filter(t => t.status === 'completed').length;
      const total = monthTasks.length;
      const efficiency = total > 0 ? Math.round((completed / total) * 100) : 0;

      monthData.push({
        month: months[date.getMonth()],
        tasks: total,
        completed,
        efficiency
      });
    }

    return monthData;
  };

  // Get recent activities
  const getRecentActivities = () => {
    return tasks.slice(0, 5).map(task => {
      const service = services.find(s => s.email === task.service);
      const timeAgo = getTimeAgo(new Date(task.updated_at));
      
      return {
        id: task.id,
        type: task.status === 'completed' ? 'completed' : task.status === 'in_progress' ? 'in_progress' : 'assigned',
        title: task.title,
        service: service?.name || 'Անհայտ',
        time: timeAgo,
        priority: task.priority
      };
    });
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} օր առաջ`;
    if (hours > 0) return `${hours} ժամ առաջ`;
    return 'Հիմա';
  };

  const statsDisplay = getStatsDisplay();
  const departmentStats = getDepartmentStats();
  const weeklyData = getWeeklyData();
  const priorityData = getPriorityData();
  const monthlyTrend = getMonthlyTrend();
  const recentActivities = getRecentActivities();

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
          {statsDisplay.map((stat, index) => {
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
              {priorityData.length > 0 ? (
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
              ) : (
                <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                  Տվյալներ չկան
                </div>
              )}
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
              {departmentStats.length > 0 ? (
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
              ) : (
                <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                  Տվյալներ չկան
                </div>
              )}
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
                        />
                        <span className="font-medium text-foreground text-sm">{dept.name}</span>
                      </div>
                      <Badge variant={dept.efficiency >= 80 ? "default" : dept.efficiency >= 60 ? "secondary" : "destructive"}>
                        {dept.efficiency}% արդյունավետ
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Ընդամենը առաջադրանքներ</span>
                        <span className="font-medium text-foreground">{dept.tasks}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Կատարված</span>
                        <span className="font-medium text-emerald-600">{dept.completed}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Գործընթացում</span>
                        <span className="font-medium text-amber-600">{dept.pending}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden mt-3">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500 rounded-full"
                          style={{ width: `${dept.efficiency}%` }}
                        />
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
              <h3 className="text-xl font-semibold text-foreground">Վերջին գործողություններ</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'completed' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : activity.type === 'in_progress'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-amber-100 text-amber-600'
                    }`}>
                      {activity.type === 'completed' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : activity.type === 'in_progress' ? (
                        <Clock className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground mb-1">
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span>{activity.service}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                        <Badge variant={
                          activity.priority === 'urgent' ? 'destructive' : 
                          activity.priority === 'high' ? 'default' : 'secondary'
                        } className="text-[10px] px-2 py-0">
                          {activity.priority === 'urgent' ? 'Շտապ' : 
                           activity.priority === 'high' ? 'Բարձր' :
                           activity.priority === 'medium' ? 'Միջին' : 'Ցածր'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                {recentActivities.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    Վերջին գործողություններ չկան
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardRedesigned;