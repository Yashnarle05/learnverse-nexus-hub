
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
import { mockUsers } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'admin' | 'student') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("lmsUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (foundUser && password === "password") { // Simple password check for demo
          setUser(foundUser);
          localStorage.setItem("lmsUser", JSON.stringify(foundUser));
          toast({
            title: "Login successful",
            description: `Welcome back, ${foundUser.name}!`,
          });
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'admin' | 'student'
  ): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          toast({
            title: "Registration failed",
            description: "Email already in use",
            variant: "destructive",
          });
          resolve(false);
        } else {
          // In a real app, this would be handled by the backend
          const newUser: User = {
            id: `${mockUsers.length + 1}`,
            name,
            email,
            role,
          };
          
          // For the demo, we'll just pretend it worked
          toast({
            title: "Registration successful",
            description: "You can now log in with your credentials",
          });
          resolve(true);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lmsUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
