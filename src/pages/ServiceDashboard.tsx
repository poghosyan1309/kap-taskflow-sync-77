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
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [taskComment, setTaskComment] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const serviceNames = {
    geology: "Геологическая служба",
    geomech: "Геомеханический отдел", 
    survey: "Маркшейдерская служба",
    drilling: "Буровзрывной отдел"
  };

  const serviceName = serviceNames[serviceId as keyof typeof serviceNames] || "Служба";

  useEffect(() => {
    fetchTasks();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('service-tasks')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks' },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [serviceId, activeFilter]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      
      // Build query based on service and filter
      let query = supabase
        .from('tasks')
        .select(`
          *,
          services (
            name,
            email
          ),
          task_comments (
            id,
            comment,
            created_at,
            user_id
          ),
          task_files (
            id,
            file_name,
            file_url
          )
        `)
        .order('created_at', { ascending: false });

      // Filter by service if specific service is selected
      if (serviceId && serviceId !== 'all') {
        const { data: serviceData } = await supabase
          .from('services')
          .select('id')
          .ilike('name', `%${serviceName}%`)
          .single();
        
        if (serviceData) {
          query = query.eq('service_id', serviceData.id);
        }
      }

      // Apply status filter
      if (activeFilter !== 'all') {
        const statusMap: Record<string, string> = {
          'pending': 'pending',
          'in-progress': 'in_progress',
          'completed': 'completed'
        };
        query = query.eq('status', statusMap[activeFilter]);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Չհաջողվեց բեռնել առաջադրանքները');
        return;
      }

      const formattedTasks = (data || []).map(task => ({
        ...task,
        status: task.status === 'in_progress' ? 'in-progress' : task.status,
        priority: task.priority === 'urgent' ? 'Շտապ' : 
                  task.priority === 'high' ? 'Բարձր' :
                  task.priority === 'medium' ? 'Միջին' : 'Ցածր'
      }));

      setTasks(formattedTasks);

      // Calculate stats
      const total = formattedTasks.length;
      const pending = formattedTasks.filter(t => t.status === 'pending').length;
      const inProgress = formattedTasks.filter(t => t.status === 'in-progress').length;
      const completed = formattedTasks.filter(t => t.status === 'completed').length;

      setStats({ total, pending, inProgress, completed });
    } catch (err) {
      console.error('Error in fetchTasks:', err);
      toast.error('Տվյալները բեռնելու սխալ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (taskId: string, newStatus: string) => {
    try {
      const statusMap: Record<string, string> = {
        'pending': 'pending',
        'in-progress': 'in_progress',
        'completed': 'completed'
      };

      const { error } = await supabase
        .from('tasks')
        .update({ 
          status: statusMap[newStatus],
          completed_at: newStatus === 'completed' ? new Date().toISOString() : null
        })
        .eq('id', taskId);

      if (error) throw error;

      toast.success("Առաջադրանքի կարգավիճակը թարմացված է");
      fetchTasks();
    } catch (err) {
      console.error('Error updating task status:', err);
      toast.error("Չհաջողվեց թարմացնել կարգավիճակը");
    }
  };

  const handleCommentSubmit = async (taskId: string) => {
    if (!taskComment.trim()) {
      toast.error("Մուտքագրեք մեկնաբանություն");
      return;
    }

    if (!user) {
      toast.error("Պետք է մուտք գործել");
      return;
    }

    try {
      const { error } = await supabase
        .from('task_comments')
        .insert({
          task_id: taskId,
          user_id: user.id,
          comment: taskComment
        });

      if (error) throw error;

      toast.success("Մեկնաբանությունը ավելացված է");
      setTaskComment("");
      fetchTasks();
    } catch (err) {
      console.error('Error adding comment:', err);
      toast.error("Չհաջողվեց ավելացնել մեկնաբանություն");
    }
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
      case 'pending': return 'Սպասում է';
      case 'in-progress': return 'Ընթացքում';
      case 'completed': return 'Կատարված';
      default: return 'Անհայտ';
    }
  };

  if (isLoading) {
    return (
      <AuthGuard redirectTo="/service/login">
        <div className="min-h-screen bg-gray-50">
          <ServiceHeader />
          <main className="container mx-auto px-6 py-8">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Բեռնվում է...</p>
            </div>
          </main>
        </div>
      </AuthGuard>
    );
  }

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
              <div className="text-sm text-gray-600">Ընդամենը առաջադրանքներ</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Սպասում են</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">Ընթացքում</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Կատարված</div>
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
              Բոլորը
            </Button>
            <Button 
              variant={activeFilter === "pending" ? "default" : "outline"}
              onClick={() => setActiveFilter("pending")}
              className={activeFilter === "pending" ? "bg-orange-600" : ""}
            >
              Սպասում են
            </Button>
            <Button 
              variant={activeFilter === "in-progress" ? "default" : "outline"}
              onClick={() => setActiveFilter("in-progress")}
              className={activeFilter === "in-progress" ? "bg-blue-600" : ""}
            >
              Ընթացքում
            </Button>
            <Button 
              variant={activeFilter === "completed" ? "default" : "outline"}
              onClick={() => setActiveFilter("completed")}
              className={activeFilter === "completed" ? "bg-green-600" : ""}
            >
              Կատարված
            </Button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Առաջադրանքներ չկան</p>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                    <div className="flex gap-2 mb-2">
                      <Badge className={getStatusColor(task.status)}>
                        {getStatusText(task.status)}
                      </Badge>
                      <Badge variant="outline" className="border-gray-300">
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Մանրամասն
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{task.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Նկարագրություն</h4>
                          <p className="text-gray-600">{task.description || 'Նկարագրություն չկա'}</p>
                        </div>
                        
                        {task.task_comments && task.task_comments.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Մեկնաբանություններ</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {task.task_comments.map((comment: any) => (
                                <div key={comment.id} className="bg-gray-50 p-3 rounded">
                                  <p className="text-sm">{comment.comment}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(comment.created_at).toLocaleString('hy-AM')}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {task.task_files && task.task_files.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Կցված ֆայլեր</h4>
                            <div className="space-y-1">
                              {task.task_files.map((file: any) => (
                                <a 
                                  key={file.id}
                                  href={file.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-blue-600 hover:underline"
                                >
                                  <Paperclip className="w-4 h-4" />
                                  {file.file_name}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Ավելացնել մեկնաբանություն..."
                            value={taskComment}
                            onChange={(e) => setTaskComment(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            onClick={() => handleCommentSubmit(task.id)}
                            className="bg-service-primary hover:bg-service-dark"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="text-gray-600 mb-3">{task.description || 'Նկարագրություն չկա'}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Վերջնաժամկետ: {task.deadline ? new Date(task.deadline).toLocaleDateString('hy-AM') : 'Չի նշված'}</span>
                  </div>
                  <select 
                    className="border rounded px-2 py-1"
                    value={task.status}
                    onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                  >
                    <option value="pending">Սպասում է</option>
                    <option value="in-progress">Ընթացքում</option>
                    <option value="completed">Կատարված</option>
                  </select>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
    </AuthGuard>
  );
};

export default ServiceDashboard;