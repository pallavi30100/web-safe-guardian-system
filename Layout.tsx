
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useToast } from "@/components/ui/use-toast";

const Layout = () => {
  const { toast } = useToast();
  const [pageTransitioning, setPageTransitioning] = useState(false);

  // This function can be used to show page transition effects
  const handlePageTransition = () => {
    setPageTransitioning(true);
    setTimeout(() => setPageTransitioning(false), 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onNavigate={handlePageTransition} />
      <main className={`flex-1 ${pageTransitioning ? 'opacity-0' : 'animate-fade-in'}`}>
        <Outlet />
      </main>
      <footer className="py-6 px-6 text-center text-muted-foreground border-t bg-gradient-to-r from-blue-50 to-indigo-50">
        <p>© {new Date().getFullYear()} URL Guardian - Phishing Detection System</p>
      </footer>
    </div>
  );
};

export default Layout;
