
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

// Define user roles
export type UserRole = "admin" | "user" | "guest";

// Define user status
export type UserStatus = "active" | "inactive" | "suspended";

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status?: UserStatus;
  lastActive?: string;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole) => boolean;
}

// Mock users for demonstration
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
  },
];

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("dashboardUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("dashboardUser");
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && password === "password") { // In a real app, you would hash passwords
      setUser(foundUser);
      localStorage.setItem("dashboardUser", JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
      setIsLoading(false);
      return true;
    }
    
    toast.error("Invalid email or password");
    setIsLoading(false);
    return false;
  };

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      toast.error("Email already exists");
      setIsLoading(false);
      return false;
    }
    
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: "user",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    
    // In a real app, you would save this to a database
    MOCK_USERS.push(newUser);
    
    // Log in the new user
    setUser(newUser);
    localStorage.setItem("dashboardUser", JSON.stringify(newUser));
    
    toast.success(`Welcome, ${newUser.name}!`);
    setIsLoading(false);
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("dashboardUser");
    toast.info("You've been logged out");
  };

  // Permission check function
  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    
    // Simple role hierarchy: admin > user > guest
    if (user.role === "admin") return true;
    if (user.role === "user" && requiredRole !== "admin") return true;
    return user.role === requiredRole;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Auth hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
