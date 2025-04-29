
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageCircle,
  Users,
  Settings,
  ChartBar,
  X,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const { pathname } = useLocation();
  const { user, logout, hasPermission } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      href: "/dashboard",
      role: "user",
    },
    {
      label: "Analytics",
      icon: <ChartBar size={18} />,
      href: "/dashboard/analytics",
      role: "user",
    },
    {
      label: "Messaging",
      icon: <MessageCircle size={18} />,
      href: "/dashboard/messaging",
      role: "user",
    },
    {
      label: "Users",
      icon: <Users size={18} />,
      href: "/dashboard/users",
      role: "admin", // Only admin can access
    },
    {
      label: "Settings",
      icon: <Settings size={18} />,
      href: "/dashboard/settings",
      role: "user",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar border-r border-sidebar-border fixed md:relative z-50 h-screen transition-all duration-300 ease-in-out",
          open ? "w-64 translate-x-0" : "w-64 -translate-x-full md:w-16 md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <div className="flex items-center">
            <span className="font-bold text-xl text-sidebar-foreground">
              {open ? "SwiftDash" : "SD"}
            </span>
          </div>
          <button
            className="md:hidden text-sidebar-foreground hover:text-white"
            onClick={onToggle}
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile section */}
        <div className={cn(
          "flex items-center p-4 border-b border-sidebar-border",
          !open && "md:justify-center"
        )}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          {open && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-sidebar-foreground/70 truncate">
                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
              </p>
            </div>
          )}
        </div>

        {/* Navigation links */}
        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            {navItems
              .filter(item => hasPermission(item.role as any))
              .map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      pathname === item.href
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      !open && "md:justify-center"
                    )}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {open && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Button
            onClick={logout}
            variant="outline"
            className={cn(
              "w-full border-sidebar-border text-sidebar-foreground hover:text-white hover:bg-sidebar-accent",
              !open && "md:p-2"
            )}
          >
            {open ? "Logout" : "←"}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
