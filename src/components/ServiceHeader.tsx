import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Factory, User, LogOut, Bell } from "lucide-react";

const ServiceHeader = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const serviceNames = {
    geology: "Երկրաբանական ծառայություն",
    geomech: "Երկրամեխանիկական բաժին", 
    survey: "Մարկշեյդերական ծառայություն",
    drilling: "Փոր-պայթյունային բաժին"
  };

  const serviceName = serviceNames[serviceId as keyof typeof serviceNames] || "Ծառայություն";

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="bg-service-gradient text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Factory className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Կապանի ԱՄԿ</h1>
              <p className="text-sm opacity-90">{serviceName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4" />
              <span>{serviceName}</span>
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

export default ServiceHeader;