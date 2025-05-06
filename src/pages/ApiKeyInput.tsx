
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ApiKeyInput as ApiKeyInputComponent } from "@/components/ApiKeyInput";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

const ApiKeyInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirectTo from location state or default to "/quiz/setup"
  const redirectTo = location.state?.redirectTo || "/quiz/setup";
  
  const handleSaveApiKey = () => {
    toast.success("API key saved successfully!");
    // Navigate to the quiz setup page
    navigate(redirectTo);
  };

  return (
    <div className="min-h-screen bg-medbg dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-medblue mb-6">Enter your GROQ API Key</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Your key is stored only in your browser and never sent to our servers.
          </p>
          
          <ApiKeyInputComponent onSave={handleSaveApiKey} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ApiKeyInput;
