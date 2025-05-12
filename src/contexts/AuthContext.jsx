
import { createContext, useContext, useState, useEffect } from "react";
import { mockUsers } from "../data/mockData";
import { useToast } from "../components/ui/use-toast";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

  const login = async (email, password) => {
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
    name, 
    email, 
    password, 
    role
  ) => {
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
          const newUser = {
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
