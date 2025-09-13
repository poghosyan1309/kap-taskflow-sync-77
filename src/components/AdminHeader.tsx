import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Factory, User, LogOut } from "lucide-react";

interface AdminHeaderProps {
  currentPage?: string;
}

const AdminHeader = ({ currentPage }: AdminHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="bg-admin-gradient text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Factory className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Կապանի ԱՄԿ</h1>
              <p className="text-sm opacity-90">Ադմինիստրատորի վահանակ</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4" />
              <span>admin</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-white hover:bg-white/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Ելք
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;