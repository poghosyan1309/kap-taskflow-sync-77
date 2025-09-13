import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import TaskCard from "@/components/TaskCard";

const AdminTasks = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    service: "",
    priority: "medium",
    deadline: ""
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Подготовить геологический отчет",
      description: "Необходимо подготовить квартальный отчет по геологическим изысканиям. Включить данные по всем скважинам за последние 3 месяца.",
      service: "Геологическая служба",
      priority: "high",
      status: "pending",
      deadline: "2025-09-09",
      files: ["geolog_report_template.docx"],
      comments: [
        {
          id: 1,
          author: "Геологическая служба",
          text: "Начинаем работу над отчетом",
          date: "2025-09-07 10:30"
        }
      ]
    },
    {
      id: 2,
      title: "Провести анализ устойчивости",
      description: "Анализ устойчивости бортов карьера в зоне А. Особое внимание уделить северному борту.",
      service: "Геомеханический отдел",
      priority: "high",
      status: "in_progress",
      deadline: "2025-09-07",
      files: ["stability_analysis.xlsx", "zone_a_photos.zip"]
    },
    {
      id: 3,
      title: "Маркшейдерская съемка",
      description: "Провести плановую съемку участка №3. Необходимо определить точные координаты и высотные отметки.",
      service: "Маркшейдерская служба",
      priority: "medium",
      status: "pending",
      deadline: "2025-09-12"
    },
    {
      id: 4,
      title: "Подготовка буровых работ",
      description: "Планирование и подготовка буровзрывных работ на новом участке. Расчет необходимого оборудования.",
      service: "Буровзрывной отдел",
      priority: "high",
      status: "completed",
      deadline: "2025-09-05",
      files: ["drilling_plan.pdf"]
    }
  ]);

  const services = [
    "Геологическая служба",
    "Геомеханический отдел", 
    "Маркшейдерская служба",
    "Буровзрывной отдел"
  ];

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.service) {
      toast.error("Заполните обязательные поля");
      return;
    }
    
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: "pending",
      files: [],
      comments: []
    };
    
    setTasks([...tasks, task]);
    toast.success("Задача успешно создана!");
    setIsCreateModalOpen(false);
    setNewTask({ title: "", description: "", service: "", priority: "medium", deadline: "" });
  };

  const handleStatusChange = (taskId: number, status: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const handleTaskUpdate = (taskId: number, updates: any) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesService = serviceFilter === "all" || task.service === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <AdminNavigation />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Առաջադրանքների կառավարում</h1>
            <p className="text-muted-foreground">Ծառայություններին առաջադրանքների ստեղծում և նշանակում</p>
            <div className="flex items-center space-x-2 mt-4">
              <Badge variant="secondary">{filteredTasks.length}-ը {tasks.length}-ից</Badge>
            </div>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-admin-primary hover:bg-admin-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Новая задача
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Создать новую задачу</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Название задачи</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="Введите название задачи"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Подробное описание задачи"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label>Служба</Label>
                  <Select onValueChange={(value) => setNewTask({...newTask, service: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите службу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Приоритет</Label>
                  <Select onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Средний" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Низкий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="deadline">Срок выполнения</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                  />
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button 
                    onClick={handleCreateTask}
                    className="flex-1 bg-admin-primary hover:bg-admin-secondary"
                  >
                    Создать задачу
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Поиск по названию или описанию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="pending">Ожидает</SelectItem>
                  <SelectItem value="in_progress">В работе</SelectItem>
                  <SelectItem value="completed">Выполнено</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все службы</SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={handleStatusChange}
                onUpdate={handleTaskUpdate}
              />
            ))
          ) : (
            <Card className="p-12 text-center">
              <p className="text-gray-500 text-lg">Задачи не найдены</p>
              <p className="text-gray-400 mt-2">Попробуйте изменить параметры поиска</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminTasks;