import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Ընդամենը առաջադրանքներ",
      value: "24",
      change: "+12%",
      icon: ClipboardList,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Կատարված",
      value: "18",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Գործընթացում",
      value: "4",
      change: "+2%",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Ուշացած",
      value: "2",
      change: "-3%",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const departmentStats = [
    { name: "Փոր-պայթյունային բաժին", tasks: 6, completed: 5, pending: 1, color: "#f59e0b" },
    { name: "Երկրաբանական ծառայություն", tasks: 8, completed: 6, pending: 2, color: "#10b981" },
    { name: "Երկրամեխանիկական բաժին", tasks: 5, completed: 4, pending: 1, color: "#3b82f6" },
    { name: "Մարկշեյդերական ծառայություն", tasks: 5, completed: 3, pending: 2, color: "#f97316" },
  ];

  const weeklyData = [
    { name: 'Երկ', completed: 4, assigned: 2 },
    { name: 'Երք', completed: 3, assigned: 5 },
    { name: 'Չոր', completed: 6, assigned: 3 },
    { name: 'Հնգ', completed: 5, assigned: 4 },
    { name: 'Ուր', completed: 8, assigned: 6 },
    { name: 'Շաբ', completed: 2, assigned: 1 },
    { name: 'Կիր', completed: 1, assigned: 0 },
  ];

  const priorityData = [
    { name: 'Բարձր', value: 8, color: '#ef4444' },
    { name: 'Միջին', value: 12, color: '#f59e0b' },
    { name: 'Ցածր', value: 4, color: '#22c55e' },
  ];

  const monthlyTrend = [
    { month: 'Հուլ', tasks: 45, completed: 42 },
    { month: 'Օգս', tasks: 52, completed: 48 },
    { month: 'Սեպ', tasks: 38, completed: 35 },
  ];

  return (
    <div className="min-h-screen bg-background">      
      <main className="container mx-auto px-6 py-8">
        <Breadcrumb />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Վերլուծություն</h1>
          <p className="text-muted-foreground">Ծառայությունների առաջադրանքների կատարման վիճակագրություն</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded ${
                    isPositive ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
                  }`}>
                    <TrendingUp className="h-3 w-3" />
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
              </Card>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Weekly Performance Chart */}
          <div className="card-elevated animate-fade-in">
            <div className="p-6 border-b border-border/50">
              <h3 className="text-xl font-semibold text-foreground">Շաբաթական արտադրողականություն</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.75rem',
                      boxShadow: 'var(--shadow-medium)'
                    }} 
                  />
                  <Bar dataKey="completed" fill="hsl(var(--status-completed))" name="Կատարված" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="assigned" fill="hsl(var(--admin-primary))" name="Նշանակված" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="card-elevated animate-fade-in">
            <div className="p-6 border-b border-border/50">
              <h3 className="text-xl font-semibold text-foreground">Բաշխում ըստ առաջնահերթության</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
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
                      borderRadius: '0.75rem',
                      boxShadow: 'var(--shadow-medium)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trend */}
          <div className="card-elevated animate-fade-in">
            <div className="p-6 border-b border-border/50">
              <h3 className="text-xl font-semibold text-foreground">Ամսական դինամիկա</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.75rem',
                      boxShadow: 'var(--shadow-medium)'
                    }} 
                  />
                  <Area type="monotone" dataKey="tasks" stroke="hsl(var(--admin-primary))" fill="hsl(var(--admin-primary))" fillOpacity={0.2} name="Ընդամենը առաջադրանքներ" />
                  <Area type="monotone" dataKey="completed" stroke="hsl(var(--status-completed))" fill="hsl(var(--status-completed))" fillOpacity={0.3} name="Կատարված" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Performance Chart */}
          <div className="card-elevated animate-fade-in">
            <div className="p-6 border-b border-border/50">
              <h3 className="text-xl font-semibold text-foreground">Ծառայությունների արտադրողականություն</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={departmentStats} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" width={150} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.75rem',
                      boxShadow: 'var(--shadow-medium)'
                    }} 
                  />
                  <Bar dataKey="completed" fill="hsl(var(--status-completed))" name="Կատարված" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="pending" fill="hsl(var(--status-pending))" name="Գործընթացում" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Department Statistics */}
        <div className="card-elevated mb-8 animate-fade-in">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-xl font-semibold text-foreground">Մանրամասն վիճակագրություն ծառայությունների համար</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {departmentStats.map((dept, index) => (
                <div key={index} className="flex items-center justify-between py-6 border-b border-border/30 last:border-b-0 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: dept.color }}></div>
                    <span className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{dept.name}</span>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">{dept.tasks}</div>
                      <div className="text-sm text-muted-foreground font-medium">Ընդամենը</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-status-completed">{dept.completed}</div>
                      <div className="text-sm text-muted-foreground font-medium">Կատարված</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-status-pending">{dept.pending}</div>
                      <div className="text-sm text-muted-foreground font-medium">Գործընթացում</div>
                    </div>
                    <div className="w-40">
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-status-completed to-status-completed-glow transition-all duration-500 ease-out" 
                          style={{ width: `${(dept.completed / dept.tasks) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2 font-medium">
                        {Math.round((dept.completed / dept.tasks) * 100)}% կատարված
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-elevated animate-fade-in">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-xl font-semibold text-foreground">Վերջին գործունեություն</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-surface-glass border border-border/30 group hover:shadow-medium transition-all duration-300">
                <div className="p-2 rounded-lg bg-status-completed/10">
                  <CheckCircle className="h-6 w-6 text-status-completed" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">Առաջադրանք "Նախապատրաստել երկրաբանական հաշվետվություն" կատարված է</p>
                  <p className="text-sm text-muted-foreground mt-1">Երկրաբանական ծառայություն • 2 ժամ առաջ</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-surface-glass border border-border/30 group hover:shadow-medium transition-all duration-300">
                <div className="p-2 rounded-lg bg-status-in-progress/10">
                  <Clock className="h-6 w-6 text-status-in-progress" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">Առաջադրանք "Իրականացնել կայունության վերլուծություն" ընդունված է աշխատանքի</p>
                  <p className="text-sm text-muted-foreground mt-1">Երկրամեխանիկական բաժին • 5 ժամ առաջ</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-surface-glass border border-border/30 group hover:shadow-medium transition-all duration-300">
                <div className="p-2 rounded-lg bg-status-pending/10">
                  <AlertCircle className="h-6 w-6 text-status-pending" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">Նոր առաջադրանք "Մարկշեյդերական չափում" նշանակված է</p>
                  <p className="text-sm text-muted-foreground mt-1">Մարկշեյդերական ծառայություն • 1 օր առաջ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;