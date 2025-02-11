
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import { AuthForm } from "@/components/AuthForm";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import Index from "@/pages/Index";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, !!session);
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            isAuthenticated ? <Index /> : <Navigate to="/auth" />
          } />
          <Route path="/auth" element={
            !isAuthenticated ? <AuthForm onAuthSuccess={() => {}} /> : <Navigate to="/" />
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
};

export default App;
