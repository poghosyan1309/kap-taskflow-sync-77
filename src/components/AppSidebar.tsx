import { useState } from "react";
import { 
  BarChart3, 
  ClipboardList, 
  Users, 
  Mail, 
  Settings,
  Building2,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  Factory
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Վերլուծություն", 
    url: "/admin/dashboard", 
    icon: BarChart3,
    description: "KPI և վիճակագրություն"
  },
  { 
    title: "Առաջադրանքներ", 
    url: "/admin/tasks", 
    icon: ClipboardList,
    description: "Առաջադրանքների կառավարում"
  },
  { 
    title: "Ծառայություններ", 
    url: "/admin/services", 
    icon: Building2,
    description: "Բաժինների կառավարում"
  },
  { 
    title: "Օգտատերեր", 
    url: "/admin/users", 
    icon: Users,
    description: "Մուտքի իրավունքներ"
  },
  { 
    title: "Էլ․ փոստ", 
    url: "/admin/email", 
    icon: Mail,
    description: "Ծանուցումների կարգավորում"
  },
];

const settingsItems = [
  {
    title: "Կարգավորումներ",
    url: "/admin/settings",
    icon: Settings,
    description: "Համակարգի կարգավորումներ"
  }
];

export function AppSidebar() {
  const { open: sidebarOpen } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const collapsed = !sidebarOpen;
  const isNavigationExpanded = navigationItems.some((item) => isActive(item.url));
  const isSettingsExpanded = settingsItems.some((item) => isActive(item.url));

  const getNavClass = (path: string) => {
    const baseClasses = "w-full justify-start transition-all duration-200";
    if (isActive(path)) {
      return `${baseClasses} bg-primary text-primary-foreground shadow-sm`;
    }
    return `${baseClasses} hover:bg-muted text-foreground`;
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-border bg-sidebar-background`}>
      <SidebarHeader className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Factory className="h-6 w-6" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-foreground">Կապանի ԱՄԿ</h2>
              <p className="text-xs text-muted-foreground">Ադմինիստրատիվ վահանակ</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {!collapsed && "Հիմնական"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClass(item.url)}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs opacity-70">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {!collapsed && "Կառավարում"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClass(item.url)}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs opacity-70">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="space-y-3">
          {!collapsed && (
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  ԱԴ
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Ադմինիստրատոր
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  admin@kapangok.am
                </p>
              </div>
            </div>
          )}
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={collapsed ? "w-full" : "flex-1"}
              title="Ծանուցումներ"
            >
              <Bell className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Ծանուցումներ</span>}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className={collapsed ? "w-full" : "flex-1"}
              title="Ելք"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Ելք</span>}
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}