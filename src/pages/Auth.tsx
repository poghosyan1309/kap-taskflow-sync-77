import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserCog, ArrowLeft, Shield, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from '@supabase/supabase-js';

const Auth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect authenticated users to admin dashboard
        if (session?.user) {
          setTimeout(() => {
            navigate('/admin/dashboard');
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/admin/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        toast.error(`Ошибка входа: ${error.message}`);
      } else {
        toast.success("Добро пожаловать!");
      }
    } catch (error) {
      toast.error("Произошла ошибка при входе");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    if (credentials.password.length < 6) {
      toast.error("Пароль должен содержать минимум 6 символов");
      return;
    }

    setLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Пользователь с таким email уже существует");
        } else {
          toast.error(`Ошибка регистрации: ${error.message}`);
        }
      } else {
        toast.success("Проверьте email для подтверждения регистрации");
      }
    } catch (error) {
      toast.error("Произошла ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-admin-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center animate-pulse">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <p className="text-foreground text-lg font-medium">Միացում համակարգին...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-admin-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-20 animate-mesh-shift"></div>
      
      <div className="w-full max-w-md mx-auto relative z-10">
        <Card className="bg-card/95 backdrop-blur-xl border-border shadow-glow animate-slide-up">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-admin-primary/10 border border-admin-primary/20 mx-auto mb-6 flex items-center justify-center animate-float">
                <UserCog className="h-10 w-10 text-admin-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Վարչական համակարգ
              </h1>
              <p className="text-muted-foreground">Կապանի ԱՄԿ</p>
            </div>

            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm">
                <TabsTrigger 
                  value="login" 
                  className="text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Մուտք
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Գրանցում
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-admin-primary" />
                      Էլ․ փոստի հասցե
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={credentials.email}
                      onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                      className="bg-background border-border focus:border-admin-primary focus:ring-admin-primary/20 transition-all duration-200"
                      placeholder="admin@kapan.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-admin-primary" />
                      Գաղտնաբառ
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        className="bg-background border-border focus:border-admin-primary focus:ring-admin-primary/20 pr-10 transition-all duration-200"
                        placeholder="••••••••"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-admin-primary hover:bg-admin-secondary text-white font-semibold text-base shadow-lg hover:shadow-admin-glow transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Գործընթացում...
                      </div>
                    ) : (
                      "Մուտք գործել"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-foreground font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-admin-primary" />
                      Էլ․ փոստի հասցե
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={credentials.email}
                      onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                      className="bg-background border-border focus:border-admin-primary focus:ring-admin-primary/20 transition-all duration-200"
                      placeholder="admin@kapan.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-foreground font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-admin-primary" />
                      Գաղտնաբառ
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        className="bg-background border-border focus:border-admin-primary focus:ring-admin-primary/20 pr-10 transition-all duration-200"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-foreground font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-admin-primary" />
                      Հաստատել գաղտնաբառը
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={credentials.confirmPassword}
                        onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})}
                        className="bg-background border-border focus:border-admin-primary focus:ring-admin-primary/20 pr-10 transition-all duration-200"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-admin-primary hover:bg-admin-secondary text-white font-semibold text-base shadow-lg hover:shadow-admin-glow transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Գրանցում...
                      </div>
                    ) : (
                      "Գրանցվել"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="w-full mt-6 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Վերադառնալ գլխավոր էջ
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;