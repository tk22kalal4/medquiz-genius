
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import { AuthForm } from "@/components/AuthForm";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import Index from "@/pages/Index";
import { toast } from "sonner";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session error:", error);
          toast.error("Failed to initialize authentication");
          setIsAuthenticated(false);
        } else {
          console.log("Initial auth check:", !!session);
          setIsAuthenticated(!!session);
        }
      } catch (error) {
        console.error("Initialization error:", error);
        toast.error("Failed to initialize application");
        setIsAuthenticated(false);
      } finally {
        setIsInitialized(true);
      }
    };
    
    initializeApp();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, !!session);
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Initializing application...</div>
      </div>
    );
  }

  console.log("Rendering App, isAuthenticated:", isAuthenticated);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Index /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/auth" 
            element={!isAuthenticated ? <AuthForm onAuthSuccess={() => {}} /> : <Navigate to="/" />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
};

export default App;
