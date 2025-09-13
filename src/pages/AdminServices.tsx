import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Mail, Settings, Plus, Edit, Trash2, User, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminServices = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [newService, setNewService] = useState({
    name: "",
    email: "",
    phone: "",
    head: "",
    location: ""
  });

  const [services, setServices] = useState([
    {
      id: "drilling",
      name: "Буровзрывной отдел",
      email: "drilling@kapangok.kz",
      phone: "+7 (727) 123-45-67",
      head: "Иванов И.И.",
      location: "Корпус А, каб. 201",
      status: "active",
      tasksCount: 6,
      completedTasks: 5
    },
    {
      id: "geology",
      name: "Геологическая служба", 
      email: "geology@kapangok.kz",
      phone: "+7 (727) 123-45-68",
      head: "Петров П.П.",
      location: "Корпус Б, каб. 105",
      status: "active",
      tasksCount: 8,
      completedTasks: 6
    },
    {
      id: "geomech",
      name: "Геомеханический отдел",
      email: "geomech@kapangok.kz",
      phone: "+7 (727) 123-45-69",
      head: "Сидоров С.С.",
      location: "Корпус А, каб. 305",
      status: "active",
      tasksCount: 5,
      completedTasks: 4
    },
    {
      id: "survey",
      name: "Маркшейдерская служба",
      email: "survey@kapangok.kz",
      phone: "+7 (727) 123-45-70",
      head: "Козлов К.К.",
      location: "Корпус Б, каб. 210",
      status: "active",
      tasksCount: 5,
      completedTasks: 3
    }
  ]);

  const handleAddService = () => {
    if (!newService.name || !newService.email) {
      toast.error("Заполните обязательные поля");
      return;
    }

    const service = {
      id: newService.name.toLowerCase().replace(/\s+/g, '_'),
      ...newService,
      status: "active",
      tasksCount: 0,
      completedTasks: 0
    };

    setServices([...services, service]);
    toast.success("Служба добавлена");
    setIsAddModalOpen(false);
    setNewService({ name: "", email: "", phone: "", head: "", location: "" });
  };

  const handleEditService = (service: any) => {
    setEditingService({ ...service });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingService.name || !editingService.email) {
      toast.error("Заполните обязательные поля");
      return;
    }

    setServices(services.map(service => 
      service.id === editingService.id ? editingService : service
    ));
    toast.success("Служба обновлена");
    setIsEditModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId));
    toast.success("Служба удалена");
  };

  const getPerformanceColor = (completed: number, total: number) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <AdminNavigation />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Ծառայությունների կառավարում</h1>
            <p className="text-muted-foreground">Ծառայությունների կապակցման տվյալներ և կարգավորումներ</p>
            <div className="flex items-center space-x-2 mt-4">
              <Badge variant="secondary">{services.length} ծառայություն</Badge>
              <Badge variant="outline">{services.filter(s => s.status === 'active').length} ակտիվ</Badge>
            </div>
          </div>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-admin-primary hover:bg-admin-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Добавить новую службу
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить новую службу</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Название службы *</Label>
                  <Input
                    id="name"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                    placeholder="Название службы"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newService.email}
                    onChange={(e) => setNewService({...newService, email: e.target.value})}
                    placeholder="service@kapangok.kz"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={newService.phone}
                    onChange={(e) => setNewService({...newService, phone: e.target.value})}
                    placeholder="+7 (727) 123-45-67"
                  />
                </div>
                <div>
                  <Label htmlFor="head">Руководитель</Label>
                  <Input
                    id="head"
                    value={newService.head}
                    onChange={(e) => setNewService({...newService, head: e.target.value})}
                    placeholder="ФИО руководителя"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Расположение</Label>
                  <Input
                    id="location"
                    value={newService.location}
                    onChange={(e) => setNewService({...newService, location: e.target.value})}
                    placeholder="Корпус, кабинет"
                  />
                </div>
                <Button onClick={handleAddService} className="w-full">
                  Добавить службу
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {service.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {service.name}
                      </h3>
                      <Badge 
                        variant={service.status === 'active' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {service.status === 'active' ? 'Активна' : 'Неактивна'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditService(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{service.email}</span>
                  </div>
                  
                  {service.phone && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{service.phone}</span>
                    </div>
                  )}
                  
                  {service.head && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{service.head}</span>
                    </div>
                  )}
                  
                  {service.location && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{service.location}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Производительность:</span>
                      <span className={`font-medium ${getPerformanceColor(service.completedTasks, service.tasksCount)}`}>
                        {service.tasksCount > 0 ? 
                          `${Math.round((service.completedTasks / service.tasksCount) * 100)}%` : 
                          '0%'
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>Выполнено: {service.completedTasks}/{service.tasksCount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          width: service.tasksCount > 0 ? `${(service.completedTasks / service.tasksCount) * 100}%` : '0%' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Service Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать службу</DialogTitle>
            </DialogHeader>
            {editingService && (
              <div className="space-y-4">
                <div>
                  <Label>Название службы *</Label>
                  <Input
                    value={editingService.name}
                    onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={editingService.email}
                    onChange={(e) => setEditingService({...editingService, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Телефон</Label>
                  <Input
                    value={editingService.phone}
                    onChange={(e) => setEditingService({...editingService, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Руководитель</Label>
                  <Input
                    value={editingService.head}
                    onChange={(e) => setEditingService({...editingService, head: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Расположение</Label>
                  <Input
                    value={editingService.location}
                    onChange={(e) => setEditingService({...editingService, location: e.target.value})}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveEdit} className="flex-1">
                    Сохранить изменения
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminServices;