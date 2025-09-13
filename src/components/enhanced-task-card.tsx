import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Eye, 
  Edit, 
  Calendar, 
  Building2, 
  FileText, 
  Paperclip, 
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  Plus,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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

interface EnhancedTaskCardProps {
  task: Task;
  onStatusChange: (taskId: number, status: string) => void;
  onUpdate: (taskId: number, updates: Partial<Task>) => void;
  compact?: boolean;
}

const EnhancedTaskCard: React.FC<EnhancedTaskCardProps> = ({ 
  task, 
  onStatusChange, 
  onUpdate, 
  compact = false 
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [editedTask, setEditedTask] = useState(task);

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Clock,
        label: "Սպասում է",
        dotColor: "bg-amber-400"
      },
      in_progress: {
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: ArrowUpRight,
        label: "Կատարման մեջ",
        dotColor: "bg-blue-400"
      },
      completed: {
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle2,
        label: "Կատարված",
        dotColor: "bg-emerald-400"
      },
      overdue: {
        color: "bg-red-50 text-red-700 border-red-200",
        icon: AlertCircle,
        label: "Ուշացած",
        dotColor: "bg-red-400"
      }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      low: { color: "bg-gray-100 text-gray-700", label: "Ցածր" },
      medium: { color: "bg-orange-100 text-orange-700", label: "Միջին" },
      high: { color: "bg-red-100 text-red-700", label: "Բարձր" }
    };
    return configs[priority as keyof typeof configs] || configs.medium;
  };

  const statusConfig = getStatusConfig(task.status);
  const priorityConfig = getPriorityConfig(task.priority);
  const StatusIcon = statusConfig.icon;

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(task.id, newStatus);
    toast.success(`Կարգավիճակը փոխված է "${getStatusConfig(newStatus).label}"`);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: "Ադմինիստրատոր",
      text: comment,
      date: new Date().toLocaleString('hy-AM')
    };
    
    onUpdate(task.id, {
      comments: [...(task.comments || []), newComment]
    });
    
    setComment("");
    toast.success("Մեկնաբանությունը ավելացված է");
  };

  const handleSaveEdit = () => {
    onUpdate(task.id, editedTask);
    setIsEditModalOpen(false);
    toast.success("Առաջադրանքը թարմացված է");
  };

  const handleFilesUploaded = (files: string[]) => {
    onUpdate(task.id, {
      files: [...(task.files || []), ...files]
    });
    toast.success(`Բեռնվել է ${files.length} ֆայլ`);
  };

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'completed';

  return (
    <>
      <Card className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4",
        task.status === 'completed' ? 'border-l-emerald-400' :
        task.status === 'in_progress' ? 'border-l-blue-400' :
        isOverdue ? 'border-l-red-400' : 'border-l-amber-400',
        compact ? 'glass-card' : 'enterprise-card'
      )}>
        {/* Priority indicator */}
        <div className={cn(
          "absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px]",
          task.priority === 'high' ? 'border-t-red-400' :
          task.priority === 'medium' ? 'border-t-orange-400' : 'border-t-gray-400'
        )} />

        <CardContent className={cn("p-6", compact && "p-4")}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-3">
                <div className={cn("w-2 h-2 rounded-full", statusConfig.dotColor)} />
                <h3 className={cn(
                  "font-semibold text-foreground truncate group-hover:text-primary transition-colors",
                  compact ? "text-base" : "text-lg"
                )}>
                  {task.title}
                </h3>
                <div className="flex items-center space-x-2 ml-auto">
                  <Badge className={cn("border", statusConfig.color, "flex items-center space-x-1")}>
                    <StatusIcon className="h-3 w-3" />
                    <span>{statusConfig.label}</span>
                  </Badge>
                  {!compact && (
                    <Badge className={priorityConfig.color}>
                      {priorityConfig.label}
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Description */}
              <p className={cn(
                "text-muted-foreground mb-4 line-clamp-2",
                compact ? "text-sm" : "text-base"
              )}>
                {task.description}
              </p>
              
              {/* Metadata */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span className="truncate">{task.service}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className={cn("h-4 w-4", isOverdue && "text-red-500")} />
                  <span className={cn(isOverdue && "text-red-500 font-medium")}>
                    {new Date(task.deadline).toLocaleDateString('hy-AM')}
                  </span>
                </div>
                {task.files && task.files.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Paperclip className="h-4 w-4" />
                    <span>{task.files.length} ֆայլ</span>
                  </div>
                )}
                {task.comments && task.comments.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{task.comments.length} մեկնաբանություն</span>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              {!compact && (
                <div className="flex items-center space-x-3">
                  <Select onValueChange={handleStatusChange} defaultValue={task.status}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Սպասում է</SelectItem>
                      <SelectItem value="in_progress">Կատարման մեջ</SelectItem>
                      <SelectItem value="completed">Կատարված</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size={compact ? "sm" : "default"} className="hover:bg-primary/5">
                    <Eye className="h-4 w-4 mr-1" />
                    {!compact && "Դիտել"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <StatusIcon className={cn("h-5 w-5", statusConfig.dotColor.replace('bg-', 'text-'))} />
                      <span>{task.title}</span>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Նկարագրություն
                        </h4>
                        <div className="p-4 rounded-xl bg-muted/30 border">
                          <p className="text-foreground leading-relaxed">{task.description}</p>
                        </div>
                      </div>
                      
                      {/* Files Section */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Կցված ֆայլեր ({task.files?.length || 0})
                        </h4>
                        {task.files && task.files.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {task.files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border group hover:bg-muted/50 transition-colors">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 rounded-lg bg-primary/10">
                                    <FileText className="h-4 w-4 text-primary" />
                                  </div>
                                  <span className="text-sm font-medium truncate">{file}</span>
                                </div>
                                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center rounded-xl bg-muted/20 border-2 border-dashed">
                            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">Ֆայլեր չկան</p>
                          </div>
                        )}
                        <FileUploadZone onFilesUploaded={handleFilesUploaded} />
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Task Info */}
                      <div className="glass-card p-4">
                        <h4 className="font-medium mb-4">Առաջադրանքի մանրամասներ</h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">Կարգավիճակ</span>
                            <Badge className={cn("mt-1 flex items-center space-x-1 w-fit", statusConfig.color)}>
                              <StatusIcon className="h-3 w-3" />
                              <span>{statusConfig.label}</span>
                            </Badge>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">Առաջնահերթություն</span>
                            <Badge className={cn("mt-1 block w-fit", priorityConfig.color)}>
                              {priorityConfig.label}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">Ծառայություն</span>
                            <p className="mt-1 text-sm font-medium">{task.service}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">Ավարտի ժամկետ</span>
                            <p className={cn("mt-1 text-sm font-medium", isOverdue && "text-red-600")}>
                              {new Date(task.deadline).toLocaleDateString('hy-AM')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Comments Section */}
                      <div className="glass-card p-4">
                        <h4 className="font-medium mb-4 flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Մեկնաբանություններ
                        </h4>
                        
                        {task.comments && task.comments.length > 0 ? (
                          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                            {task.comments.map((comment) => (
                              <div key={comment.id} className="p-3 rounded-xl bg-background/50 border">
                                <div className="flex items-start space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-xs">
                                      {comment.author.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-sm">{comment.author}</span>
                                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{comment.text}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-muted-foreground">
                            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Մեկնաբանություններ չկան</p>
                          </div>
                        )}
                        
                        <div className="space-y-3">
                          <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Ավելացնել մեկնաբանություն..."
                            rows={3}
                            className="resize-none"
                          />
                          <Button 
                            onClick={handleAddComment} 
                            size="sm" 
                            className="w-full bg-primary hover:bg-primary/90"
                            disabled={!comment.trim()}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Ավելացնել մեկնաբանություն
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size={compact ? "sm" : "default"} className="hover:bg-primary/5">
                    <Edit className="h-4 w-4 mr-1" />
                    {!compact && "Խմբագրել"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Խմբագրել առաջադրանքը</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Վերնագիր</label>
                      <input
                        className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Նկարագրություն</label>
                      <Textarea
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                        rows={4}
                        className="mt-1 resize-none"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button onClick={handleSaveEdit} className="flex-1 bg-primary hover:bg-primary/90">
                        Պահպանել փոփոխությունները
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="flex-1">
                        Չեղարկել
                      </Button>
                    </div>
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

export default EnhancedTaskCard;