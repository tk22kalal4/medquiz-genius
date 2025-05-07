
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Quiz as QuizComponent } from "@/components/Quiz";
import { Loader2 } from "lucide-react";
import { QuizError } from "@/components/quiz/QuizError";
import { StarRating } from "@/components/StarRating";

const Quiz = () => {
  const { subject, chapter, topic } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState("10");
  const [timeLimit, setTimeLimit] = useState("60");
  const [simultaneousResults, setSimultaneousResults] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Parse query parameters from URL
      const searchParams = new URLSearchParams(location.search);
      const difficultyParam = searchParams.get("difficulty");
      const questionCountParam = searchParams.get("count");
      const timeLimitParam = searchParams.get("time");
      const simultaneousParam = searchParams.get("simultaneous");

      if (difficultyParam) setDifficulty(difficultyParam);
      if (questionCountParam) setQuestionCount(questionCountParam);
      if (timeLimitParam) setTimeLimit(timeLimitParam);
      if (simultaneousParam) setSimultaneousResults(simultaneousParam === "true");

      // Check if the parameters are valid
      if (!subject) {
        setError("Missing subject parameter.");
      }

      setTimeout(() => setIsLoading(false), 500);
    } catch (err) {
      console.error("Error parsing quiz parameters:", err);
      setError("There was an error loading the quiz. Please try again.");
      setIsLoading(false);
    }
  }, [location.search, subject]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-medblue" />
      </div>
    );
  }

  if (error) {
    return <QuizError message={error} />;
  }

  const decodedSubject = subject ? decodeURIComponent(subject) : "General Medicine";
  const decodedChapter = chapter && chapter !== "all" ? decodeURIComponent(chapter) : "All Topics";
  const decodedTopic = topic && topic !== "all" ? decodeURIComponent(topic) : "";

  return (
    <div className="min-h-screen bg-medbg dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-medblue mb-6">
            {decodedSubject} Quiz
          </h1>
          
          <QuizComponent
            subject={decodedSubject}
            chapter={decodedChapter}
            topic={decodedTopic}
            difficulty={difficulty}
            questionCount={questionCount}
            timeLimit={timeLimit}
            simultaneousResults={simultaneousResults}
            quizId="generated-quiz"
            enableDoubtChat={true} // Enable doubt chat for AI-generated quizzes
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Quiz;
