
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChartBar, Lock, MessageCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">SwiftDash</h1>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate("/login")}>
            Log in
          </Button>
          <Button onClick={() => navigate("/register")}>Sign up</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Real-time Dashboard with Role-Based Authentication
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              A performance-optimized dashboard application featuring real-time messaging and comprehensive role-based access control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate("/register")}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                Live Demo
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-background rounded-xl border shadow-lg p-6">
              <img
                src="https://via.placeholder.com/600x400?text=Dashboard+Preview"
                alt="Dashboard Preview"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>

        <div className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl border p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Role-Based Auth</h3>
              <p className="text-muted-foreground">
                Secure authentication system with different permission levels for admins and regular users.
              </p>
            </div>
            
            <div className="bg-background rounded-xl border p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Chat</h3>
              <p className="text-muted-foreground">
                Instant messaging with support for group chats, private messages, and file sharing.
              </p>
            </div>
            
            <div className="bg-background rounded-xl border p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ChartBar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
              <p className="text-muted-foreground">
                Comprehensive analytics with optimized data visualization and real-time updates.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Sign up today and experience the power of SwiftDash.
          </p>
          <Button size="lg" onClick={() => navigate("/register")}>
            Create Account
          </Button>
        </div>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-primary">SwiftDash</h2>
              <p className="text-muted-foreground">
                Performance-optimized dashboard with real-time features
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SwiftDash. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
