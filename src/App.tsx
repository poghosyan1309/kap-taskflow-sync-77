import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AuthGuard } from "@/components/AuthGuard";
import { AppSidebar } from "@/components/AppSidebar";
import LandingRedesigned from "./pages/LandingRedesigned";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import ServiceLogin from "./pages/ServiceLogin";
import AdminDashboardRedesigned from "./pages/AdminDashboardRedesigned";
import AdminTasks from "./pages/AdminTasks";
import AdminServices from "./pages/AdminServices";
import AdminEmail from "./pages/AdminEmail";
import ServiceDashboard from "./pages/ServiceDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingRedesigned />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/service/login" element={<ServiceLogin />} />
            
            {/* Protected Admin Routes with Sidebar */}
            <Route path="/admin/*" element={
              <AuthGuard>
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboardRedesigned />} />
                        <Route path="tasks" element={<AdminTasks />} />
                        <Route path="services" element={<AdminServices />} />
                        <Route path="email" element={<AdminEmail />} />
                      </Routes>
                    </main>
                  </div>
                </SidebarProvider>
              </AuthGuard>
            } />
            
            {/* Service Routes */}
            <Route path="/service/dashboard/:serviceId" element={<ServiceDashboard />} />
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
