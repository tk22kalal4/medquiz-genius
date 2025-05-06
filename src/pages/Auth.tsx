
import { AuthForm } from "@/components/AuthForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the redirectTo from location state or default to "/apikey"
  const redirectTo = location.state?.redirectTo || "/apikey";

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // If already logged in, check if they have API key
          const hasApiKey = localStorage.getItem("groq_api_key");
          
          if (hasApiKey) {
            // If they have API key, redirect to the intended destination
            navigate(redirectTo);
          } else {
            // If no API key, redirect to API key page
            navigate("/apikey");
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        toast.error("Authentication error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, redirectTo]);

  const handleAuthSuccess = () => {
    // After successful authentication, check if they have API key
    const hasApiKey = localStorage.getItem("groq_api_key");
    
    if (hasApiKey) {
      // If they have API key, redirect to the intended destination
      navigate(redirectTo);
    } else {
      // If no API key, redirect to API key page
      navigate("/apikey");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-medbg dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-12 px-4 flex items-center justify-center">
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
