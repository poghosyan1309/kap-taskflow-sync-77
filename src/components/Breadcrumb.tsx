import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: "Գլխավոր", href: "/" }];
    
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      switch (segment) {
        case 'admin':
          if (pathSegments[index + 1]) {
            items.push({ label: "Ադմինիստրատիվ", href: "/admin/dashboard" });
          }
          break;
        case 'dashboard':
          items.push({ label: "Վերլուծություն" });
          break;
        case 'tasks':
          items.push({ label: "Առաջադրանքներ" });
          break;
        case 'services':
          items.push({ label: "Ծառայություններ" });
          break;
        case 'email':
          items.push({ label: "Էլ․ փոստ" });
          break;
        case 'users':
          items.push({ label: "Օգտատերեր" });
          break;
        case 'settings':
          items.push({ label: "Կարգավորումներ" });
          break;
        default:
          if (index === pathSegments.length - 1) {
            items.push({ label: segment.charAt(0).toUpperCase() + segment.slice(1) });
          }
      }
    });
    
    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index === 0 && <Home className="h-4 w-4" />}
          
          {item.href ? (
            <Link 
              to={item.href} 
              className="hover:text-foreground transition-colors duration-200 font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-semibold">{item.label}</span>
          )}
          
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
          )}
        </div>
      ))}
    </nav>
  );
}