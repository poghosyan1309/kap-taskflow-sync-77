import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Edit, Calendar, Building2, FileText, Paperclip, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FileUploadZone from "./FileUploadZone";

interface Task {
  id: number;
  title: string;
  description: string;
  service: string;
  priority: string;
  status: string;
  deadline: string;
  files?: string[];
  comments?: Array<{ id: number; author: string; text: string; date: string }>;
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: number, status: string) => void;
  onUpdate: (taskId: number, updates: Partial<Task>) => void;
}

const TaskCard = ({ task, onStatusChange, onUpdate }: TaskCardProps) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [editedTask, setEditedTask] = useState(task);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    in_progress: "bg-blue-100 text-blue-800 border-blue-200", 
    completed: "bg-green-100 text-green-800 border-green-200",
    overdue: "bg-red-100 text-red-800 border-red-200"
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800"
  };

  const statusLabels = {
    pending: "Ожидает", 
    in_progress: "В работе",
    completed: "Выполнено",
    overdue: "Просрочено"
  };

  const priorityLabels = {
    low: "Низкий",
    medium: "Средний", 
    high: "Высокий"
  };

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(task.id, newStatus);
    toast.success(`Статус задачи изменен на "${statusLabels[newStatus as keyof typeof statusLabels]}"`);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: "Администратор",
      text: comment,
      date: new Date().toLocaleString()
    };
    
    onUpdate(task.id, {
      comments: [...(task.comments || []), newComment]
    });
    
    setComment("");
    toast.success("Комментарий добавлен");
  };

  const handleSaveEdit = () => {
    onUpdate(task.id, editedTask);
    setIsEditModalOpen(false);
    toast.success("Задача обновлена");
  };

  const handleFilesUploaded = (files: string[]) => {
    onUpdate(task.id, {
      files: [...(task.files || []), ...files]
    });
    toast.success(`Загружено файлов: ${files.length}`);
  };

  return (
    <>
      <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {task.title}
                </h3>
                <Badge className={statusColors[task.status as keyof typeof statusColors]}>
                  {statusLabels[task.status as keyof typeof statusLabels]}
                </Badge>
                <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                  {priorityLabels[task.priority as keyof typeof priorityLabels]}
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {task.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Building2 className="h-4 w-4" />
                  <span>{task.service}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{task.deadline}</span>
                </div>
                {task.files && task.files.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Paperclip className="h-4 w-4" />
                    <span>{task.files.length} файл(ов)</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Select onValueChange={handleStatusChange} defaultValue={task.status}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Ожидает</SelectItem>
                    <SelectItem value="in_progress">В работе</SelectItem>
                    <SelectItem value="completed">Выполнено</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-6">
              <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Просмотр
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Описание</h4>
                      <p className="text-gray-600">{task.description}</p>
                    </div>
                    
                    {task.files && task.files.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Прикрепленные файлы</h4>
                        <div className="space-y-2">
                          {task.files.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm">{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <FileUploadZone onFilesUploaded={handleFilesUploaded} />
                    
                    {task.comments && task.comments.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3">Комментарии</h4>
                        <div className="space-y-3">
                          {task.comments.map((comment) => (
                            <div key={comment.id} className="p-3 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2 mb-1">
                                <User className="h-4 w-4" />
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-gray-500">{comment.date}</span>
                              </div>
                              <p className="text-sm text-gray-600">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2">Добавить комментарий</h4>
                      <div className="space-y-2">
                        <Textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Введите комментарий..."
                          rows={3}
                        />
                        <Button onClick={handleAddComment} size="sm">
                          Добавить комментарий
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Изменить
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Редактировать задачу</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Название</label>
                      <input
                        className="w-full p-2 border rounded mt-1"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Описание</label>
                      <Textarea
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <Button onClick={handleSaveEdit} className="w-full">
                      Сохранить изменения
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TaskCard;