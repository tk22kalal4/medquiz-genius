
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { generateQuestion } from "@/services/groqService";
import { toast } from "sonner";
import { QuizResults } from "./QuizResults";
import { NativeAd } from "./ads/NativeAd";
import { InArticleAd } from "./ads/InArticleAd";
import { QuizAd } from "./ads/QuizAd";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertCircle } from "lucide-react";

interface QuizProps {
  subject: string;
  chapter: string;
  topic: string;
  difficulty: string;
  questionCount: string;
  timeLimit: string;
  quizId?: string;
  simultaneousResults?: boolean;
  preloadedQuestions?: Question[];
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  subject: string;
}

export const Quiz = ({ 
  subject, 
  chapter, 
  topic, 
  difficulty, 
  questionCount, 
  timeLimit, 
  quizId,
  simultaneousResults = false,
  preloadedQuestions = []
}: QuizProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    timeLimit !== "No Limit" ? parseInt(timeLimit) : null
  );
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const navigate = useNavigate();

  // Initialize quiz with preloaded questions or fetch new ones
  useEffect(() => {
    if (preloadedQuestions && preloadedQuestions.length > 0) {
      setQuestions(preloadedQuestions);
      setCurrentQuestion(preloadedQuestions[0]);
      setIsLoading(false);
    } else {
      loadQuestion();
    }
  }, [preloadedQuestions]);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            toast.error("Time's up!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const getOptionStyle = (option: string) => {
    if (!selectedAnswer) {
      return "bg-white text-black hover:bg-gray-100 font-normal";
    }
    
    const isCorrect = option[0] === currentQuestion?.correctAnswer;
    
    if (isCorrect) {
      return "bg-[#E7F8E9] text-black border-[#86D492] font-normal";
    }
    
    if (selectedAnswer === option[0] && !isCorrect) {
      return "bg-[#FFE9E9] text-black border-[#FF8989] font-normal";
    }
    
    return "bg-white text-black font-normal";
  };

  const loadQuestion = useCallback(async () => {
    if (preloadedQuestions && preloadedQuestions.length > 0) {
      // For preloaded quiz, just move to the next question in the array
      if (questionNumber <= preloadedQuestions.length) {
        setCurrentQuestion(preloadedQuestions[questionNumber - 1]);
        setIsLoading(false);
        return;
      }
    } else {
      // For AI-generated quiz, fetch a new question with retry logic
      setIsLoading(true);
      setLoadError(null);
      
      try {
        const topicString = topic ? `${chapter} - ${topic}` : chapter;
        const scope = chapter === "Complete Subject" ? subject : `${subject} - ${topicString}`;
        const newQuestion = await generateQuestion(scope, difficulty);
        
        if (newQuestion) {
          setCurrentQuestion(newQuestion);
          // Add to questions array for result tracking
          setQuestions(prev => [...prev, newQuestion]);
          setIsLoading(false);
        } else {
          // If API returned null but no error was thrown
          throw new Error("Failed to generate question");
        }
      } catch (error: any) {
        console.error("Error loading question:", error);
        
        // Check if it's a rate limit error
        if (error.message && error.message.includes("Rate limit reached")) {
          setLoadError("GROQ API rate limit reached. Please wait a moment before trying again.");
        } else {
          setLoadError("Failed to load question. Please try again.");
        }
        
        setIsLoading(false);
        
        // Auto-retry with exponential backoff if rate limited (max 3 retries)
        if (retryAttempts < 3 && error.message && error.message.includes("Rate limit reached")) {
          const delay = Math.pow(2, retryAttempts) * 1000;
          toast.info(`Rate limit reached. Retrying in ${delay/1000} seconds...`);
          
          setTimeout(() => {
            setRetryAttempts(prev => prev + 1);
            loadQuestion();
          }, delay);
        }
      }
    }
    
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [questionNumber, preloadedQuestions, chapter, topic, subject, difficulty, retryAttempts]);

  const handleAnswerSelect = (answer: string) => {
    if (!selectedAnswer && timeRemaining !== 0) {
      setSelectedAnswer(answer);
      
      // Track user's answer for this question
      setUserAnswers(prev => ({
        ...prev,
        [questionNumber - 1]: answer
      }));
      
      if (answer === currentQuestion?.correctAnswer) {
        setScore(prev => prev + 1);
      }
    }
  };

  const handleNext = async () => {
    if (questionCount !== "No Limit" && questionNumber >= parseInt(questionCount)) {
      setIsQuizComplete(true);
      
      try {
        // Save quiz result to database if user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: userData } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', user.id)
            .single();
            
          const userName = userData?.name || 'User';
          
          const { data: resultData, error } = await supabase
            .from('quiz_results')
            .insert({
              quiz_id: quizId || 'ai-generated',
              user_id: user.id,
              user_name: userName,
              score: score,
              total_questions: parseInt(questionCount),
              time_taken: null
            })
            .select('id')
            .single();
            
          if (resultData && resultData.id) {
            // Navigate to results page if not showing results immediately
            if (!simultaneousResults) {
              navigate(`/quiz/results/${resultData.id}`);
              return;
            }
          }
        }
      } catch (error) {
        console.error("Error saving quiz result:", error);
      }
      
      return;
    }
    
    setQuestionNumber(prev => prev + 1);
    setRetryAttempts(0); // Reset retry attempts for the new question
    loadQuestion();
  };

  const handleRetry = () => {
    setRetryAttempts(0);
    loadQuestion();
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setQuestionNumber(1);
    setIsQuizComplete(false);
    setUserAnswers({});
    if (!preloadedQuestions.length) {
      setQuestions([]);
    }
    setTimeRemaining(timeLimit !== "No Limit" ? parseInt(timeLimit) : null);
    setRetryAttempts(0);
    
    if (preloadedQuestions && preloadedQuestions.length > 0) {
      setCurrentQuestion(preloadedQuestions[0]);
    } else {
      loadQuestion();
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isQuizComplete) {
    return (
      <>
        <QuizAd className="my-4" />
        <QuizResults 
          score={score} 
          totalQuestions={parseInt(questionCount)} 
          onRestartQuiz={handleRestartQuiz}
          subject={subject}
          chapter={chapter}
          topic={topic}
          difficulty={difficulty}
          questions={questions}
          answers={userAnswers}
          quizId={quizId}
        />
        <NativeAd className="my-8" />
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-medblue mb-4" />
        <p>Loading question...</p>
      </div>
    );
  }

  if (loadError || !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
        <p className="text-red-500 mb-4">{loadError || "Failed to load question"}</p>
        <Button onClick={handleRetry} className="bg-medblue hover:bg-medblue/90">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Top Ad */}
      <QuizAd className="mb-4" />
      
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Question {questionNumber} {questionCount !== "No Limit" && `of ${questionCount}`}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-lg">Score: {score}</div>
          {timeRemaining !== null && (
            <div className="text-lg">Time: {formatTime(timeRemaining)}</div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(option[0])}
              className={`w-full text-left justify-start border ${getOptionStyle(option)} overflow-x-auto whitespace-normal min-h-[48px] h-auto px-4 py-3 hover:bg-gray-100 active:bg-gray-100 transition-colors`}
              disabled={!!selectedAnswer || timeRemaining === 0}
              variant="outline"
            >
              <span className="break-words text-base">{option}</span>
            </Button>
          ))}
        </div>

        {questionNumber % 2 === 0 && <InArticleAd className="my-6" />}

        {selectedAnswer && (
          <div className="mt-6">
            <Button
              onClick={() => setShowExplanation(!showExplanation)}
              variant="outline"
              className="mb-4"
            >
              {showExplanation ? "Hide" : "Show"} Explanation
            </Button>
            {showExplanation && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">{currentQuestion.explanation}</p>
                <NativeAd className="mt-6" />
              </div>
            )}
            <Button onClick={handleNext} className="mt-4">
              Next Question
            </Button>
          </div>
        )}
      </div>
      
      {/* Bottom Ad */}
      <NativeAd className="mt-6" />
    </div>
  );
};
