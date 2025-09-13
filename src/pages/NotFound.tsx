import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-main-gradient">
      <div className="text-center text-white">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-6 text-xl">Էջը չի գտնվել</p>
        <Button 
          onClick={() => window.location.href = "/"}
          className="bg-white text-primary hover:bg-white/90"
        >
          Վերադառնալ գլխավոր էջ
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
