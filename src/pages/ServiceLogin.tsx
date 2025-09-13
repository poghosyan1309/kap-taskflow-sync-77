import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Users, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ServiceLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    service: "",
    password: ""
  });

  const services = [
    { value: "geology", label: "Երկրաբանական ծառայություն" },
    { value: "geomech", label: "Երկրամեխանիկական բաժին" },
    { value: "survey", label: "Մարկշեյդերական ծառայություն" },
    { value: "drilling", label: "Փոր-պայթյունային բաժին" },
  ];

  useEffect(() => {
    document.title = "Ծառայության մուտք | Կապանի ԱՄԿ";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = "Մուտք ծառայությունների անձնական բաժին՝ արագ և պարզ մուտք Կապանի ԱՄԿ համակարգ։";

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = window.location.href;
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.service && credentials.password === "password123") {
      const selectedService = services.find(s => s.value === credentials.service);
      toast.success(`Բարի գալուստ, ${selectedService?.label}!`);
      navigate(`/service/dashboard/${credentials.service}`);
    } else {
      toast.error("Սխալ տվյալներ");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <Card className="animate-fade-in">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold mb-1">
                Ծառայության մուտք
              </h1>
              <p className="text-muted-foreground">Մուտք գործեք ծառայության անձնական կաբինետ</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label className="text-sm font-medium">
                  Ընտրեք ծառայությունը
                </Label>
                <Select onValueChange={(value) => setCredentials({...credentials, service: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Երկրամեխանիկական բաժին" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Գաղտնաբառ
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="mt-2"
                  placeholder="••••••••"
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-11 text-base font-semibold"
              >
                Մուտք
              </Button>
            </form>

            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full mt-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Վերադառնալ գլխավոր էջ
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ServiceLogin;