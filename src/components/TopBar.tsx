import { Search, Bell, User, Settings, HelpCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

interface TopBarProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  actions?: React.ReactNode;
}

export function TopBar({ 
  title = "Վերլուծություն", 
  subtitle = "Ծառայությունների առաջադրանքների կատարման վիճակագրություն",
  showSearch = true,
  actions 
}: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Նոր առաջադրանք",
      message: "Երկրաբանական ծառայություն - Նախապատրաստել հաշվետվություն",
      time: "5 րոպե առաջ",
      unread: true,
      type: "task"
    },
    {
      id: 2,
      title: "Ուշացած առաջադրանք",
      message: "Փոր-պայթյունային բաժին - Կայունության վերլուծություն",
      time: "1 ժամ առաջ",
      unread: true,
      type: "overdue"
    },
    {
      id: 3,
      title: "Առաջադրանք կատարված",
      message: "Մարկշեյդերական ծառայություն - Չափում կատարված",
      time: "3 ժամ առաջ",
      unread: false,
      type: "completed"
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Փնտրել առաջադրանքներ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>
        )}

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}

        {/* Quick Add Button */}
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Նոր առաջադրանք
        </Button>

        {/* Notifications */}
        <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Ծանուցումներ</span>
              {unreadCount > 0 && (
                <Badge variant="secondary">{unreadCount} նոր</Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id}
                  className={`flex flex-col items-start gap-1 p-3 ${
                    notification.unread ? 'bg-muted/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className={`h-2 w-2 rounded-full ${
                      notification.type === 'task' ? 'bg-blue-500' :
                      notification.type === 'overdue' ? 'bg-red-500' :
                      'bg-green-500'
                    }`} />
                    <span className="font-medium text-sm">{notification.title}</span>
                    {notification.unread && (
                      <div className="h-2 w-2 bg-primary rounded-full ml-auto" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground pl-4">
                    {notification.message}
                  </p>
                  <span className="text-xs text-muted-foreground pl-4">
                    {notification.time}
                  </span>
                </DropdownMenuItem>
              ))}
            </div>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-primary">
              Տեսնել բոլոր ծանուցումները
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  ԱԴ
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Ադմինիստրատոր</p>
                <p className="text-xs text-muted-foreground">admin@kapangok.am</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Պրոֆիլ
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Կարգավորումներ
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              Օգնություն
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Ելք
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}