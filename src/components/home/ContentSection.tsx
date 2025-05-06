
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InArticleAd } from "@/components/ads/InArticleAd";

const ContentSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Row - Two Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Card */}
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
  );
};

export default ContentSection;
