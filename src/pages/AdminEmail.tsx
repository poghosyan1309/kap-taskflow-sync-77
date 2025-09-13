import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Send, Settings, Bell, Clock, Users, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminEmail = () => {
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.kapangok.kz",
    smtpPort: "587",
    username: "system@kapangok.kz",
    password: "",
    fromName: "Система управления задачами ГОК",
    fromEmail: "system@kapangok.kz"
  });

  const [notifications, setNotifications] = useState({
    taskAssigned: true,
    taskCompleted: true,
    taskOverdue: true,
    reminderDays: 2,
    dailyDigest: true,
    weeklyReport: true
  });

  const handleSaveSettings = () => {
    toast.success("Настройки email сохранены");
  };

  const handleTestEmail = () => {
    toast.success("Тестовое письмо отправлено на admin@kapangok.kz");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <AdminNavigation />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Управление Email</h1>
          <p className="text-gray-600">Настройка уведомлений и email-шаблонов</p>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Настройки</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Уведомления</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки SMTP сервера</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="smtpHost">SMTP Сервер</Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort">Порт</Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input
                      id="username"
                      value={emailSettings.username}
                      onChange={(e) => setEmailSettings({...emailSettings, username: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      value={emailSettings.password}
                      onChange={(e) => setEmailSettings({...emailSettings, password: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button onClick={handleSaveSettings}>
                    Сохранить настройки
                  </Button>
                  <Button variant="outline" onClick={handleTestEmail}>
                    Отправить тест
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Уведомления о назначении задач</Label>
                      <p className="text-sm text-gray-600">Отправлять email при назначении новой задачи</p>
                    </div>
                    <Switch
                      checked={notifications.taskAssigned}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, taskAssigned: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Напоминания за дней до срока</Label>
                      <p className="text-sm text-gray-600">За сколько дней до срока отправлять напоминания</p>
                    </div>
                    <Select 
                      value={notifications.reminderDays.toString()} 
                      onValueChange={(value) => 
                        setNotifications({...notifications, reminderDays: parseInt(value)})
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 день</SelectItem>
                        <SelectItem value="2">2 дня</SelectItem>
                        <SelectItem value="3">3 дня</SelectItem>
                        <SelectItem value="5">5 дней</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button onClick={() => toast.success("Настройки уведомлений сохранены")}>
                  Сохранить настройки уведомлений
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminEmail;