import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { UserCog, Users, Factory, Mountain, Settings, Ruler, Zap, ArrowRight, Shield, BarChart3, Clock, CheckCircle } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-30 animate-mesh-shift"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8 animate-fade-in">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 mr-6 animate-float">
              <Factory className="h-16 w-16 text-primary" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-2">Կապանի ԱՄԿ</h1>
              <Badge variant="secondary" className="text-sm font-medium">Արդիական տեխնոլոգիաներ</Badge>
            </div>
          </div>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
            Առաջադրանքների կառավարման ինտելեկտուալ համակարգ՝ 
            <span className="text-primary font-semibold"> արտադրողականության բարձրացման</span> համար
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { icon: BarChart3, title: "Ռեալ ժամանակ", subtitle: "Անմիջապես դիտարկում" },
              { icon: Shield, title: "Անվտանգություն", subtitle: "Պաշտպանված տվյալներ" },
              { icon: Clock, title: "Արագություն", subtitle: "Ակնթարթային միացում" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm animate-scale-in hover:shadow-md transition-all duration-300">
                <feature.icon className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Portal Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Մուտքի պորտալ</h2>
            <p className="text-lg text-muted-foreground">Ընտրեք Ձեր դերը համակարգում</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Admin Portal */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-admin-surface to-card border-2 border-transparent hover:border-admin-primary/30 hover:shadow-admin-glow transition-all duration-300 animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-r from-admin-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="relative p-8 text-center">
                <div className="mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-admin-primary/10 border border-admin-primary/20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <UserCog className="h-10 w-10 text-admin-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-admin-primary transition-colors">
                    Լեռնային պլանավորման բաժին
                  </h3>
                  <p className="text-muted-foreground mb-6">Վարչական վահանակ և կառավարում</p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-admin-primary" />
                      <span>Առաջադրանքների կառավարում</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-admin-primary" />
                      <span>Վերլուծական տվյալներ</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/auth')}
                  className="w-full mb-6 h-12 text-base font-semibold bg-admin-primary hover:bg-admin-secondary text-white group-hover:shadow-lg transition-all duration-300"
                >
                  Մուտք որպես ադմինիստրատոր
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="text-sm bg-admin-surface/50 rounded-xl p-4 border border-admin-primary/10">
                  <p className="font-semibold text-admin-primary mb-3">Ցուցադրական մուտք</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Մուտքանուն:</span>
                      <code className="text-foreground font-mono bg-background px-2 py-1 rounded">admin</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Գաղտնաբառ:</span>
                      <code className="text-foreground font-mono bg-background px-2 py-1 rounded">admin123</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Portal */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-service-surface to-card border-2 border-transparent hover:border-service-primary/30 hover:shadow-service-glow transition-all duration-300 animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-r from-service-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="relative p-8 text-center">
                <div className="mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-service-primary/10 border border-service-primary/20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-10 w-10 text-service-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-service-primary transition-colors">
                    Ծառայությունների բաժիններ
                  </h3>
                  <p className="text-muted-foreground mb-6">Բաժինների անձնական կաբինետներ</p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-service-primary" />
                      <span>Առաջադրանքների կատարում</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-service-primary" />
                      <span>Հաշվետվություններ</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/service/login')}
                  className="w-full mb-6 h-12 text-base font-semibold bg-service-primary hover:bg-service-secondary text-white group-hover:shadow-lg transition-all duration-300"
                >
                  Մուտք որպես ծառայություն
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="text-sm bg-service-surface/50 rounded-xl p-4 border border-service-primary/10">
                  <p className="font-semibold text-service-primary mb-3">Ցուցադրական մուտք</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Բոլոր ծառայությունների համար:</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Գաղտնաբառ:</span>
                      <code className="text-foreground font-mono bg-background px-2 py-1 rounded">password123</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Մեր ծառայությունները</h2>
            <p className="text-lg text-muted-foreground">Մասնագիտացված բաժիններ արդիական լուծումներով</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Mountain, name: "Երկրաբանական ծառայություն", color: "bg-blue-500", description: "Երկրաբանական հետազոտություններ և վերլուծություններ" },
              { icon: Settings, name: "Երկրամեխանիկական բաժին", color: "bg-purple-500", description: "Կայունության և անվտանգության գնահատում" },
              { icon: Ruler, name: "Մարկշեյդերական ծառայություն", color: "bg-green-500", description: "Մարկշեյդերական չափումներ և քարտեզագրություն" },
              { icon: Zap, name: "Փոր-պայթյունային բաժին", color: "bg-orange-500", description: "Պայթյունային աշխատանքների պլանավորում" },
            ].map((service, index) => (
              <Card key={index} className="group text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl ${service.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;