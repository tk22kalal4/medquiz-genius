
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen bg-medbg dark:bg-gray-900">
      <Navbar />
      
      {/* Blog Content Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-medblue dark:text-white mb-8 text-center">
            Medical Education Blog
          </h1>
          
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post Cards */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src="/placeholder.svg" alt="NEET PG Preparation" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-medblue dark:text-white mb-3">
                  Complete NEET PG Preparation Guide 2024
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Essential tips and strategies for NEET PG aspirants, including study schedules and resource recommendations.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>5 min read</span>
                  <span className="mx-2">•</span>
                  <span>March 15, 2024</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src="/placeholder.svg" alt="USMLE Tips" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-medblue dark:text-white mb-3">
                  USMLE Step 1: What You Need to Know
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Comprehensive guide to USMLE Step 1 preparation, including high-yield topics and exam strategies.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>7 min read</span>
                  <span className="mx-2">•</span>
                  <span>March 12, 2024</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src="/placeholder.svg" alt="INICET Guide" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-medblue dark:text-white mb-3">
                  INICET: Your Path to Success
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Expert insights on INICET preparation, including past paper analysis and important topics.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>6 min read</span>
                  <span className="mx-2">•</span>
                  <span>March 10, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
