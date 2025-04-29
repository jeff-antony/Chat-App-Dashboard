
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-20 h-20 rounded-full bg-destructive/20 text-destructive flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-lock"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page. This area requires
          higher privileges than your current role provides.
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full"
          >
            Return to Dashboard
          </Button>
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please contact your administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
