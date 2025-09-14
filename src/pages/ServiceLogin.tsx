import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Users, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ServiceLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      // For now, we'll derive the service from the email domain
      // In production, this would come from the database
      const emailParts = credentials.email.split('@');
      const serviceMappings: Record<string, string> = {
        'geology': 'geology',
        'geomech': 'geomech',
        'survey': 'survey',
        'drilling': 'drilling'
      };
      
      let serviceId = 'geology'; // default
      for (const [key, value] of Object.entries(serviceMappings)) {
        if (emailParts[0].includes(key)) {
          serviceId = value;
          break;
        }
      }

      toast.success(`Բարի գալուստ!`);
      navigate(`/service/dashboard/${serviceId}`);
    } catch (error: any) {
      toast.error(error.message || "Մուտքի սխալ");
    } finally {
      setLoading(false);
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
                <Label htmlFor="email" className="text-sm font-medium">
                  Էլ. փոստ
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="mt-2"
                  placeholder="email@example.com"
                  required
                  disabled={loading}
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
                  className="mt-2"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-11 text-base font-semibold"
                disabled={loading}
              >
                {loading ? "Մուտք է գործում..." : "Մուտք"}
              </Button>
            </form>

            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full mt-2"
              disabled={loading}
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