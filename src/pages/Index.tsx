
import { useState, useEffect } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Book, Edit, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { HorizontalAd } from "@/components/ads/HorizontalAd";
import { SquareAd } from "@/components/ads/SquareAd";
import { InArticleAd } from "@/components/ads/InArticleAd";
import { MultiplexHorizontalAd } from "@/components/ads/MultiplexHorizontalAd";
import { MultiplexVerticalAd } from "@/components/ads/MultiplexVerticalAd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
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

  const groqSteps = [
    {
      step: 1,
      title: "Create a GROQ Account",
      description: "Visit groq.com and create a free account",
      image: "https://placehold.co/400x200/medteal/white?text=Create+Account"
    },
    {
      step: 2,
      title: "Access API Section",
      description: "Navigate to the API section in your dashboard",
      image: "https://placehold.co/400x200/medteal/white?text=API+Section"
    },
    {
      step: 3,
      title: "Generate API Key",
      description: "Generate a new API key for your account",
      image: "https://placehold.co/400x200/medteal/white?text=Generate+Key"
    },
    {
      step: 4,
      title: "Copy API Key",
      description: "Copy your API key and keep it secure",
      image: "https://placehold.co/400x200/medteal/white?text=Copy+Key"
    },
    {
      step: 5,
      title: "Use Your Key",
      description: "Use the key to access our AI-powered features",
      image: "https://placehold.co/400x200/medteal/white?text=Use+Key"
    }
  ];

  return (
    <div className="min-h-screen bg-medbg dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section with YouTube Video First */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-medblue dark:text-white mb-6">
            Free Medical Question Bank with AI-Powered Learning
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Comprehensive preparation for NEET PG, INICET, FMGE, USMLE, and MBBS with our intelligent quiz platform
          </p>
          
          {/* YouTube Video - Now Above Buttons */}
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
      
      {/* Horizontal Ad below hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HorizontalAd />
      </div>

      {/* GROQ AI Step Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-medblue dark:text-white text-center mb-8">
            Getting Started with GROQ AI
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {groqSteps.map((step, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <span className="w-8 h-8 rounded-full bg-medblue text-white flex items-center justify-center mr-2">
                      {step.step}
                    </span>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
                  <img 
                    src={step.image} 
                    alt={`Step ${step.step}: ${step.title}`} 
                    className="w-full rounded-md shadow-sm"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section with New Layout */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Row - Two Cards Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Card - Now just related content since GROQ guide moved to step cards */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-medblue dark:text-white mb-4">
                Key Features
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
                  <li>AI-powered question generation</li>
                  <li>In-depth explanations for each answer</li>
                  <li>Customize quizzes for your learning needs</li>
                  <li>Track your progress and weak areas</li>
                  <li>Community-shared question banks</li>
                </ul>
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
          
          {/* In-Article Ad in the middle */}
          <div className="mb-8">
            <InArticleAd />
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

      {/* MultiplexHorizontal Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <MultiplexHorizontalAd />
      </div>
      
      {/* Square Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <SquareAd />
      </div>
      
      {/* MultiplexVertical Ad near footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <MultiplexVerticalAd />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
