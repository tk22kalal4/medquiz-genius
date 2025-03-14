
import { useState, useEffect } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import TestBannerAdComponent from "@/components/TestBannerAdComponent";

const Index = () => {
  const navigate = useNavigate();
  const [showTestAd, setShowTestAd] = useState(false);

  const handleStartPractice = () => {
    navigate("/auth");
  };

  const handleResetApiKey = () => {
    localStorage.removeItem("groq_api_key");
    toast.success("API key removed successfully");
    navigate("/apikey");
  };

  const handleToggleTestAd = () => {
    setShowTestAd(prev => !prev);
    if (!showTestAd) {
      toast.info("Test ad banner is now visible");
    } else {
      toast.info("Test ad banner is now hidden");
    }
  };

  return (
    <div className="min-h-screen bg-medbg dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-medblue dark:text-white mb-6">
            Free Medical Question Bank with AI-Powered Learning
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Comprehensive preparation for NEET PG, INICET, FMGE, USMLE, and MBBS with our intelligent quiz platform
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button 
              className="bg-medteal hover:bg-medteal/90 text-white"
              onClick={handleStartPractice}
            >
              Start Free Practice
            </Button>
            <Button 
              variant="outline"
              className="bg-white hover:bg-gray-100 text-medblue border-medblue"
              onClick={handleResetApiKey}
            >
              Add New API Key
            </Button>
            
            <Button 
              variant="outline"
              className="bg-white hover:bg-gray-100 text-medblue border-medblue w-40"
              onClick={handleToggleTestAd}
            >
              {showTestAd ? "Hide Test Ad" : "Show Test Ad"}
            </Button>
            
            {/* Test Banner Ad Component */}
            <TestBannerAdComponent isVisible={showTestAd} />
          </div>
        </div>
      </section>

      {/* Content Section with New Layout */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Row - Two Cards Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Card - GROQ AI Guide */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-medblue dark:text-white mb-4">
                Getting Started with GROQ AI
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <ol className="list-decimal pl-6 mb-4 text-gray-600 dark:text-gray-300">
                <li>Visit <a href="https://groq.com" target="_blank" rel="noopener noreferrer">groq.com</a> and create a free account</li>
                <li>Navigate to the <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer">API section</a> in your dashboard</li>
                <li>Generate a new API key</li>
                <li>Copy your API key and keep it secure</li>
                <li>Click on Login button in Nevigation bar and creat your account</li>                
                <li>Insert your Groq AI api key and enjoy free unlimited question bank.</li>
                </ol>
              </div>
            </div>

            {/* Right Card - Question Bank */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-medblue dark:text-white mb-4">
                Free Medical Exam Question Bank
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Access thousands of high-quality medical exam questions for free:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
                  <li>NEET PG: National Eligibility cum Entrance Test Postgraduate</li>
                  <li>INICET: Institute of National Importance Combined Entrance Test</li>
                  <li>FMGE: Foreign Medical Graduate Examination</li>
                  <li>USMLE: United States Medical Licensing Examination</li>
                  <li>MBBS Final Year Questions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row - Centered Card */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-medblue dark:text-white mb-4 flex items-center gap-2">
                <Book className="h-6 w-6" />
                Latest Medical Updates
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Stay updated with the latest medical education news, exam patterns, and preparation strategies.
              </p>
              <Button 
                className="w-full bg-medblue hover:bg-medblue/90 text-white"
                onClick={() => navigate('/blog')}
              >
                Read More
              </Button>
            </div>
          </div>
        </div>
      </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/B5NC8zQXesE"
            title="MedQuizAI Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            width="1280"  // Set custom width
            height="720"  // Set custom height
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>

      <Footer />
    </div>
  );
};

export default Index;
