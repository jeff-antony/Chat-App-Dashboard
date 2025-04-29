
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onMenuClick={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
