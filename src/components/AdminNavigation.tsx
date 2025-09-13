import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { BarChart3, ClipboardList, Users, Mail } from "lucide-react";

const AdminNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: BarChart3, 
      label: "Վերլուծություն", 
      path: "/admin/dashboard",
      isActive: location.pathname === "/admin/dashboard"
    },
    { 
      icon: ClipboardList, 
      label: "Առաջադրանքներ", 
      path: "/admin/tasks",
      isActive: location.pathname === "/admin/tasks"
    },
    { 
      icon: Users, 
      label: "Ծառայություններ", 
      path: "/admin/services",
      isActive: location.pathname === "/admin/services"
    },
    { 
      icon: Mail, 
      label: "Էլ․ փոստ", 
      path: "/admin/email",
      isActive: location.pathname === "/admin/email"
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant={item.isActive ? "default" : "ghost"}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 px-6 py-3 ${
                  item.isActive 
                    ? "bg-admin-primary text-white border-b-2 border-admin-primary" 
                    : "text-gray-600 hover:text-admin-primary hover:bg-admin-primary/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;