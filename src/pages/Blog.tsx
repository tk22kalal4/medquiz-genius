
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

const Blog = () => {
  return (
    <div className="min-h-screen bg-medbg dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-medblue dark:text-white mb-8 text-center">
            Medical Education Blog
          </h1>

          {/* Table of Contents */}
          <div className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-medblue dark:text-white mb-4">Table of Contents</h2>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                <li>
                  <a href="#neet-pg" className="text-gray-700 dark:text-gray-300 hover:text-medblue">NEET PG Preparation Guide 2024</a>
                </li>
                <li>
                  <a href="#usmle" className="text-gray-700 dark:text-gray-300 hover:text-medblue">USMLE Step 1: Complete Guide</a>
                </li>
                <li>
                  <a href="#inicet" className="text-gray-700 dark:text-gray-300 hover:text-medblue">INICET Preparation Strategy</a>
                </li>
                <li>
                  <a href="#clinical-skills" className="text-gray-700 dark:text-gray-300 hover:text-medblue">Clinical Skills Development</a>
                </li>
                <li>
                  <a href="#research" className="text-gray-700 dark:text-gray-300 hover:text-medblue">Medical Research Tips</a>
                </li>
                <li>
                  <a href="#career" className="text-gray-700 dark:text-gray-300 hover:text-medblue">Medical Career Guidance</a>
                </li>
              </ul>
            </ScrollArea>
          </div>
          
          {/* Featured Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div id="neet-pg" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src="/placeholder.svg" alt="NEET PG Preparation" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-medblue dark:text-white mb-3">
                  Complete NEET PG Preparation Guide 2024
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Master NEET PG with our comprehensive guide covering study schedules, high-yield topics, and proven strategies. Learn from toppers and expert faculty recommendations.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>10 min read</span>
                  <span className="mx-2">•</span>
                  <span>March 15, 2024</span>
                </div>
              </div>
            </div>

            <div id="usmle" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src="/placeholder.svg" alt="USMLE Tips" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-medblue dark:text-white mb-3">
                  USMLE Step 1: Complete Guide
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Everything you need to know about USMLE Step 1, including study resources, practice questions, and time management techniques for optimal performance.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>12 min read</span>
                  <span className="mx-2">•</span>
                  <span>March 12, 2024</span>
                </div>
              </div>
            </div>

            <div id="inicet" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src="/placeholder.svg" alt="INICET Guide" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-medblue dark:text-white mb-3">
                  INICET Preparation Strategy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Detailed analysis of INICET exam pattern, important topics, and subject-wise preparation tips to help you excel in the examination.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>8 min read</span>
                  <span className="mx-2">•</span>
                  <span>March 10, 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div id="clinical-skills" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src="/placeholder.svg" alt="Clinical Skills" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-medblue dark:text-white mb-3">
                  Clinical Skills Development
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Essential clinical skills every medical student should master, including patient communication and physical examination techniques.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>15 min read</span>
                  <span className="mx-2">•</span>
                  <span>March 8, 2024</span>
                </div>
              </div>
            </div>

            <div id="research" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src="/placeholder.svg" alt="Medical Research" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-medblue dark:text-white mb-3">
                  Medical Research Tips
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Guide to conducting medical research, writing papers, and getting published in reputable medical journals.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>9 min read</span>
                  <span className="mx-2">•</span>
                  <span>March 5, 2024</span>
                </div>
              </div>
            </div>

            <div id="career" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src="/placeholder.svg" alt="Career Guidance" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-medblue dark:text-white mb-3">
                  Medical Career Guidance
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Explore various medical specialties, career paths, and opportunities for professional growth in the medical field.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>11 min read</span>
                  <span className="mx-2">•</span>
                  <span>March 3, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
