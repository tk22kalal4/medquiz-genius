import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
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
          <div className="flex justify-center gap-4">
            <Button className="bg-medteal hover:bg-medteal/90 text-white">
              Start Free Practice
            </Button>
            <Button variant="outline">
              How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - SEO Content */}
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
                <h3 className="text-xl font-semibold text-medblue dark:text-white mb-2">Getting Started with GROQ AI</h3>
                <ol className="list-decimal pl-6 mb-4 text-gray-600 dark:text-gray-300">
                  <li>Visit groq.com and create a free account</li>
                  <li>Navigate to the API section in your dashboard</li>
                  <li>Generate a new API key</li>
                  <li>Copy your API key and keep it secure</li>
                  <li>Use the key to access our AI-powered features</li>
                </ol>
              </div>
            </div>

            {/* Right Column - Blog Preview */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-medblue dark:text-white mb-4 flex items-center gap-2">
                <Book className="h-6 w-6" />
                Latest Medical Updates
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
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
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="h-[250px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Advertisement Space</p>
          </div>
        </div>
      </section>

      {/* YouTube Video Space */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">YouTube Video Space</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;