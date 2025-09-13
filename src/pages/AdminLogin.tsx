import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserCog, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    document.title = "Ադմինիստրատորի մուտք | Կապանի ԱՄԿ";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = "Մուտք ադմինիստրատորի վահանակ՝ արագ և պարզ մուտք Կապանի ԱՄԿ համակարգ։";

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
    
    if (credentials.username === "admin" && credentials.password === "admin123") {
      toast.success("Բարի գալուստ, Ադմինիստրատոր!");
      navigate('/admin/dashboard');
    } else {
      toast.error("Սխալ տվյալներ");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-lg bg-admin-primary/10 mx-auto mb-4 flex items-center justify-center">
                <UserCog className="h-8 w-8 text-admin-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Մուտք համակարգ
              </h1>
              <p className="text-muted-foreground">Լեռնային պլանավորման բաժին</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-sm font-medium">
                  Մուտքանուն
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="mt-2 h-11"
                  placeholder="admin"
                />
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
                  className="mt-2 h-11"
                  placeholder="••••••••"
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-11 text-base font-semibold bg-admin-primary hover:bg-admin-secondary"
              >
                Մուտք
              </Button>
            </form>

            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full mt-4"
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

export default AdminLogin;