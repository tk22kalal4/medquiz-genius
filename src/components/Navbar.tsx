import { Button } from "@/components/ui/button";
import { Book, Info, Lock, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-medblue">MedQuizAI</span>
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <a href="#" className="text-gray-700">Blog</a>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <a href="#" className="text-gray-700">Privacy Policy</a>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <a href="#" className="text-gray-700">Disclaimer</a>
            </Button>
            <Button className="bg-medblue hover:bg-medblue/90 text-white flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <a href="#" className="text-white">Login</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Blog</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Privacy Policy</a>
            <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Disclaimer</a>
            <a href="#" className="block px-3 py-2 text-white bg-medblue rounded-md">Login</a>
          </div>
        </div>
      )}
    </nav>
  );
};