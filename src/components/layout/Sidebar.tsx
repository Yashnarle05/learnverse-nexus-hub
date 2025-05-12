
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, User, Users, GraduationCap, Home } from "lucide-react";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      roles: ["admin", "student"],
    },
    {
      name: "Courses",
      href: "/courses",
      icon: BookOpen,
      roles: ["admin", "student"],
    },
    {
      name: "My Enrollments",
      href: "/enrollments",
      icon: GraduationCap,
      roles: ["student"],
    },
    {
      name: "Manage Users",
      href: "/admin/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      roles: ["admin", "student"],
    },
  ];

  const filteredLinks = links.filter(link => link.roles.includes(user.role));

  return (
    <div className="fixed left-0 top-16 z-10 h-[calc(100vh-4rem)] w-64 bg-white border-r shadow-sm lg:block hidden">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="py-2">
          <p className="text-xs uppercase text-gray-500">Main Menu</p>
        </div>
        
        {filteredLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive(link.href)
                  ? "bg-lms-primary text-white"
                  : "hover:bg-lms-background text-lms-text"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
