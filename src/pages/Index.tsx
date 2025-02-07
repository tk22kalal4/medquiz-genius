import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Book, Key } from "lucide-react";

const Index = () => {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="min-h-screen bg-medbg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-medblue mb-6">
            Master Medical Exams with AI-Powered Quizzes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Prepare for NEET PG, INICET, FMGE, USMLE, and MBBS with our intelligent quiz platform
          </p>
        </div>
      </section>

      {/* GROQ API Key Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-medblue mb-4 flex items-center gap-2">
              <Key className="h-6 w-6" />
              Enter Your GROQ AI API Key
            </h2>
            <p className="text-gray-600 mb-6">
              To access our AI-powered medical quizzes, please enter your GROQ AI API key. 
              Don't have one? Follow our guide to get started.
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <Input
                type="password"
                placeholder="Enter your GROQ AI API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-grow"
              />
              <Button className="bg-medteal hover:bg-medteal/90 text-white">
                Start Quiz
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - SEO Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-medblue mb-4">
                Comprehensive Medical Exam Preparation
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Our platform offers specialized quizzes for various medical examinations:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-600">
                  <li>NEET PG (National Eligibility cum Entrance Test Postgraduate)</li>
                  <li>INICET (INI-CET)</li>
                  <li>FMGE (Foreign Medical Graduate Examination)</li>
                  <li>USMLE (United States Medical Licensing Examination)</li>
                  <li>MBBS Final Year Preparation</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Blog Preview */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-medblue mb-4 flex items-center gap-2">
                <Book className="h-6 w-6" />
                Latest Medical Updates
              </h2>
              <p className="text-gray-600 mb-6">
                Stay updated with the latest medical education news, exam patterns, and preparation strategies.
              </p>
              <Button className="w-full bg-medblue hover:bg-medblue/90 text-white">
                Read More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Advertisement Space</p>
          </div>
        </div>
      </section>

      {/* YouTube Video Space */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">YouTube Video Space</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;