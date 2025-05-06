
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartPractice = () => {
    navigate("/auth");
  };

  const handleCreateQuiz = () => {
    navigate("/auth", { state: { redirectTo: "/quiz/create" } });
  };

  const handleBrowseQuizzes = () => {
    navigate("/browse-quizzes");
  };

  const handleResetApiKey = () => {
    localStorage.removeItem("groq_api_key");
    toast.success("API key removed successfully");
    navigate("/apikey");
  };

  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-medblue dark:text-white mb-6">
          Free Medical Question Bank with AI-Powered Learning
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Comprehensive preparation for NEET PG, INICET, FMGE, USMLE, and MBBS with our intelligent quiz platform
        </p>
        
        {/* YouTube Video - Above Buttons */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/B5NC8zQXesE?si"
              title="MedQuizAI Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
        
        {/* Buttons Below Video */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="bg-medteal hover:bg-medteal/90 text-white w-full sm:w-auto"
            onClick={handleStartPractice}
          >
            Start Free Practice
          </Button>
          <Button 
            className="bg-medblue hover:bg-medblue/90 text-white w-full sm:w-auto flex items-center gap-2"
            onClick={handleCreateQuiz}
          >
            <Edit size={16} />
            Make Your Own Questions
          </Button>
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white w-full sm:w-auto flex items-center gap-2"
            onClick={handleBrowseQuizzes}
          >
            <Search size={16} />
            Browse User Quizzes
          </Button>
          <Button 
            variant="outline"
            className="bg-white hover:bg-gray-100 text-medblue border-medblue w-full sm:w-auto"
            onClick={handleResetApiKey}
          >
            Add New API Key
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
