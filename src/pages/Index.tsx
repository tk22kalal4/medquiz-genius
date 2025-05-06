
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import GroqGuideSection from "@/components/home/GroqGuideSection";
import ContentSection from "@/components/home/ContentSection";
import AdSections from "@/components/home/AdSections";

const Index = () => {
  return (
    <div className="min-h-screen bg-medbg dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section with YouTube Video First */}
      <HeroSection />
      
      {/* Horizontal Ad below hero section */}
      <AdSections />

      {/* GROQ AI Step Cards */}
      <GroqGuideSection />

      {/* Content Section with Features and Medical Updates */}
      <ContentSection />

      <Footer />
    </div>
  );
};

export default Index;
