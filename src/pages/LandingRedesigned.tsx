import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  UserCog, 
  Users, 
  Factory, 
  Mountain, 
  Settings, 
  Ruler, 
  Zap, 
  ArrowRight, 
  Shield, 
  BarChart3, 
  Clock, 
  CheckCircle,
  Globe,
  Award,
  Target,
  TrendingUp,
  Layers,
  Activity
} from "lucide-react";

const LandingRedesigned = () => {
  const navigate = useNavigate();

  const features = [
    { 
      icon: BarChart3, 
      title: "Ռեալ ժամանակի վերլուծություն", 
      subtitle: "Անմիջապես դիտարկում և գնահատում",
      color: "text-blue-500"
    },
    { 
      icon: Shield, 
      title: "Անվտանգության վերահսկողություն", 
      subtitle: "Պաշտպանված տվյալներ և մուտք",
      color: "text-emerald-500"
    },
    { 
      icon: Clock, 
      title: "Արագ արձագանք", 
      subtitle: "Ակնթարթային ծանուցումներ",
      color: "text-amber-500"
    },
    {
      icon: Globe,
      title: "Ինտեգրված համակարգ",
      subtitle: "Բոլոր բաժինների միացում",
      color: "text-purple-500"
    },
    {
      icon: Award,
      title: "Որակի երաշխիք",
      subtitle: "Բարձրակարգ ստանդարտներ",
      color: "text-rose-500"
    },
    {
      icon: Target,
      title: "Նպատակային արդյունք",
      subtitle: "Ճշգրիտ կատարում",
      color: "text-indigo-500"
    }
  ];

  const services = [
    { 
      icon: Mountain, 
      name: "Երկրաբանական ծառայություն", 
      color: "from-blue-500 to-blue-600",
      description: "Երկրաբանական հետազոտություններ և վերլուծություններ",
      tasks: "12 ակտիվ առաջադրանք"
    },
    { 
      icon: Settings, 
      name: "Երկրամեխանիկական բաժին", 
      color: "from-purple-500 to-purple-600",
      description: "Կայունության և անվտանգության գնահատում",
      tasks: "8 ակտիվ առաջադրանք"
    },
    { 
      icon: Ruler, 
      name: "Մարկշեյդերական ծառայություն", 
      color: "from-emerald-500 to-emerald-600",
      description: "Մարկշեյդերական չափումներ և քարտեզագրություն",
      tasks: "15 ակտիվ առաջադրանք"
    },
    { 
      icon: Zap, 
      name: "Փոր-պայթյունային բաժին", 
      color: "from-orange-500 to-orange-600",
      description: "Պայթյունային աշխատանքների պլանավորում",
      tasks: "6 ակտիվ առաջադրանք"
    },
  ];

  const stats = [
    { number: "150+", label: "Կատարված առաջադրանքներ", icon: CheckCircle },
    { number: "98%", label: "Բավարարվածության մակարդակ", icon: TrendingUp },
    { number: "24/7", label: "Համակարգի հասանելիություն", icon: Activity },
    { number: "4", label: "Մասնագիտացված բաժիններ", icon: Layers }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-20 animate-mesh-shift"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow"></div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <Factory className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Կապանի ԱՄԿ</h1>
              <p className="text-sm text-muted-foreground">Կառավարման համակարգ</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Աջակցություն
            </Button>
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Մուտք
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-zoom-in">
            <Badge variant="secondary" className="mb-6 text-sm font-medium px-4 py-2">
              Նորագույն տեխնոլոգիաներ
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Կապանի ԱՄԿ
              <span className="block text-3xl md:text-5xl lg:text-6xl text-primary mt-2">
                Խելացի կառավարում
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Առաջադրանքների կառավարման ինտելեկտուալ համակարգ՝ 
              <span className="text-primary font-semibold"> արտադրողականության բարձրացման</span> և 
              <span className="text-accent font-semibold"> արդյունավետության ապահովման</span> համար
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-interactive p-6 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className={`h-10 w-10 ${feature.color} mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="glass-card p-6 text-center animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Portals */}
      <section className="py-20 px-6 bg-gradient-to-r from-muted/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Մուտքի պորտալ</h2>
            <p className="text-lg text-muted-foreground">Ընտրեք Ձեր դերը համակարգում</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Admin Portal */}
            <div className="group animate-slide-in-left">
              <Card className="relative overflow-hidden bg-gradient-to-br from-admin-surface/80 to-card/80 backdrop-blur-sm border-2 border-transparent hover:border-admin-primary/30 transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-admin-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-admin-primary to-admin-secondary mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <UserCog className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-admin-primary transition-colors">
                      Լեռնային պլանավորման բաժին
                    </h3>
                    <p className="text-muted-foreground mb-6">Վարչական վահանակ և կառավարում</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-admin-primary/5 border border-admin-primary/10">
                        <CheckCircle className="h-4 w-4 text-admin-primary" />
                        <span className="text-foreground">Առաջադրանքներ</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-admin-primary/5 border border-admin-primary/10">
                        <CheckCircle className="h-4 w-4 text-admin-primary" />
                        <span className="text-foreground">Վերլուծություններ</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-admin-primary/5 border border-admin-primary/10">
                        <CheckCircle className="h-4 w-4 text-admin-primary" />
                        <span className="text-foreground">Հաշվետվություններ</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-admin-primary/5 border border-admin-primary/10">
                        <CheckCircle className="h-4 w-4 text-admin-primary" />
                        <span className="text-foreground">Կարգավորումներ</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => navigate('/auth')}
                    className="w-full mb-6 h-12 text-base font-semibold bg-gradient-to-r from-admin-primary to-admin-secondary hover:from-admin-secondary hover:to-admin-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  >
                    Մուտք որպես ադմինիստրատոր
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="glass-card p-4">
                    <p className="font-semibold text-admin-primary mb-3 text-center">Ցուցադրական մուտք</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Մուտքանուն:</span>
                        <code className="text-foreground font-mono bg-background/50 px-2 py-1 rounded">admin</code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Գաղտնաբառ:</span>
                        <code className="text-foreground font-mono bg-background/50 px-2 py-1 rounded">admin123</code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Services Portal */}
            <div className="group animate-slide-in-right">
              <Card className="relative overflow-hidden bg-gradient-to-br from-service-surface/80 to-card/80 backdrop-blur-sm border-2 border-transparent hover:border-service-primary/30 transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-service-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-service-primary to-service-secondary mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-service-primary transition-colors">
                      Ծառայությունների բաժիններ
                    </h3>
                    <p className="text-muted-foreground mb-6">Բաժինների անձնական կաբինետներ</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-service-primary/5 border border-service-primary/10">
                        <CheckCircle className="h-4 w-4 text-service-primary" />
                        <span className="text-foreground">Առաջադրանքներ</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-service-primary/5 border border-service-primary/10">
                        <CheckCircle className="h-4 w-4 text-service-primary" />
                        <span className="text-foreground">Հաշվետվություններ</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-service-primary/5 border border-service-primary/10">
                        <CheckCircle className="h-4 w-4 text-service-primary" />
                        <span className="text-foreground">Ֆայլեր</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-service-primary/5 border border-service-primary/10">
                        <CheckCircle className="h-4 w-4 text-service-primary" />
                        <span className="text-foreground">Մեկնաբանություններ</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => navigate('/service/login')}
                    className="w-full mb-6 h-12 text-base font-semibold bg-gradient-to-r from-service-primary to-service-secondary hover:from-service-secondary hover:to-service-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  >
                    Մուտք որպես ծառայություն
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="glass-card p-4">
                    <p className="font-semibold text-service-primary mb-3 text-center">Ցուցադրական մուտք</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Բոլոր ծառայությունների համար:</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Գաղտնաբառ:</span>
                        <code className="text-foreground font-mono bg-background/50 px-2 py-1 rounded">password123</code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Մեր ծառայությունները</h2>
            <p className="text-lg text-muted-foreground">Մասնագիտացված բաժիններ արդիական լուծումներով</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 glass-interactive"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {service.tasks}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 bg-gradient-to-t from-muted/20 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <Factory className="h-6 w-6 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground">Կապանի ԱՄԿ</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2025 Կապանի ԱՄԿ. Բոլոր իրավունքները պաշտպանված են:
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingRedesigned;