
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { QuizSetupForm } from "@/components/QuizSetupForm";
import { UserProfile } from "@/components/UserProfile";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const QuizSetup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [savedConfigs, setSavedConfigs] = useState<any[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      // Check if API key exists
      const apiKey = localStorage.getItem("groq_api_key");
      setHasApiKey(!!apiKey);

      // Fetch saved configurations
      if (session) {
        const { data: configs, error } = await supabase
          .from('quiz_configurations')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && configs) {
          setSavedConfigs(configs);
        }
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  if (!hasApiKey) {
    return <ApiKeyInput onSave={() => setHasApiKey(true)} />;
  }

  return (
    <div className="min-h-screen bg-medbg dark:bg-gray-900 pt-16">
      <div className="fixed top-4 right-4 z-50">
        <UserProfile />
      </div>
      <QuizSetupForm savedConfigs={savedConfigs} />
    </div>
  );
};

export default QuizSetup;
