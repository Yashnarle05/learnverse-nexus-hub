
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const MainLayout = ({ children, requireAuth = true }: MainLayoutProps) => {
  const { user, loading } = useAuth();

  // If authentication is required and the user isn't logged in
  if (requireAuth && !loading && !user) {
    return <Navigate to="/login" />;
  }

  // If the page is still loading
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-lms-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lms-background">
      <Navbar />
      <div className="flex">
        {user && <Sidebar />}
        <main className={`flex-1 p-4 sm:p-6 ${user ? 'md:ml-64' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
