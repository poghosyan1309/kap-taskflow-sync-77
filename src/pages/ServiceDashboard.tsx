import ServiceHeader from "@/components/ServiceHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardList, Calendar, MessageSquare, Send, Paperclip } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AuthGuard } from "@/components/AuthGuard";

const ServiceDashboard = () => {
  const { serviceId } = useParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const [taskComment, setTaskComment] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const serviceNames = {
    geology: "Геологическая служба",
    geomech: "Геомеханический отдел", 
    survey: "Маркшейдерская служба",
    drilling: "Буровзрывной отдел"
  };

  const serviceName = serviceNames[serviceId as keyof typeof serviceNames] || "Служба";

  const tasks = [
    {
      id: 1,
      title: "Провести анализ устойчивости",
      description: "Анализ устойчивости бортов карьера в зоне А. Особое внимание уделить северному борту.",
      status: "in-progress",
      priority: "Высокий",
      deadline: "07.09.2025",
      assignedDate: "07.09.2025"
    }
  ];

  const stats = {
    total: 1,
    pending: 0,
    inProgress: 1, 
    completed: 0
  };

  const handleStatusUpdate = (taskId: number, newStatus: string) => {
    toast.success("Статус задачи обновлен");
  };

  const handleCommentSubmit = (taskId: number) => {
    if (!taskComment.trim()) {
      toast.error("Введите комментарий");
      return;
    }
    toast.success("Комментарий добавлен");
    setTaskComment("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'in-progress': return 'В работе';
      case 'completed': return 'Выполнено';
      default: return 'Неизвестно';
    }
  };

  return (
    <AuthGuard redirectTo="/service/login">
      <div className="min-h-screen bg-gray-50">
      <ServiceHeader />
      
      <main className="container mx-auto px-6 py-8">
        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Всего задач</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Ожидают</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">В работе</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Выполнено</div>
            </div>
          </div>
        </div>

        {/* Task Filters */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <Button 
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? "bg-service-primary" : ""}
            >
              Все
            </Button>
            <Button 
              variant={activeFilter === "pending" ? "default" : "outline"}
              onClick={() => setActiveFilter("pending")}
              className={activeFilter === "pending" ? "bg-service-primary" : ""}
            >
              Ожидают
            </Button>
            <Button 
              variant={activeFilter === "in-progress" ? "default" : "outline"}
              onClick={() => setActiveFilter("in-progress")}
              className={activeFilter === "in-progress" ? "bg-service-primary" : ""}
            >
              В работе
            </Button>
            <Button 
              variant={activeFilter === "completed" ? "default" : "outline"}
              onClick={() => setActiveFilter("completed")}
              className={activeFilter === "completed" ? "bg-service-primary" : ""}
            >
              Выполнено
            </Button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Мои задачи</h2>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {task.title}
                      </h3>
                      <Badge className={getStatusColor(task.status)}>
                        {getStatusText(task.status)}
                      </Badge>
                      <Badge variant="destructive">
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {task.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{task.deadline}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        className="text-service-primary border-service-primary hover:bg-service-primary hover:text-white"
                      >
                        Открыть
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{task.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">Описание</h4>
                          <p className="text-gray-600">{task.description}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Статус</span>
                            <Badge className={`${getStatusColor(task.status)} block mt-1`}>
                              {getStatusText(task.status)}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Приоритет</span>
                            <Badge variant="destructive" className="block mt-1">
                              {task.priority}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Срок выполнения</span>
                            <p className="mt-1">{task.deadline}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Вложения (0)
                          </h4>
                          <p className="text-gray-500 text-sm">Нет вложений</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Комментарии и отчеты</h4>
                          <Textarea
                            placeholder="Добавить комментарий или отчет о выполнении..."
                            value={taskComment}
                            onChange={(e) => setTaskComment(e.target.value)}
                          />
                          <Button 
                            onClick={() => handleCommentSubmit(task.id)}
                            className="mt-2 bg-service-primary hover:bg-service-secondary"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Отправить
                          </Button>
                        </div>

                        <div className="text-sm text-gray-500">
                          <p>Нет комментариев</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      </div>
    </AuthGuard>
  );
};

export default ServiceDashboard;