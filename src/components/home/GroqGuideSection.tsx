
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Step data for GROQ guide
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

const GroqGuideSection = () => {
  return (
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
  );
};

export default GroqGuideSection;
