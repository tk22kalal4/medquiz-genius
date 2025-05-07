
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Quiz } from "@/components/Quiz";
import { Loader2, AlertCircle } from "lucide-react";

interface QuizDisplayProps {
  quizTitle: string;
  quizDescription?: string;
  quizId: string;
  timePerQuestion?: string | null;
  questionCount: number;
  formattedQuestions: {
    id: string;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: string;
    explanation?: string | null;
  }[];
}

export const QuizDisplay = ({
  quizTitle,
  quizDescription,
  quizId,
  timePerQuestion,
  questionCount,
  formattedQuestions
}: QuizDisplayProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Transform our formatted questions to match Quiz component's expected format
  const transformedQuestions = formattedQuestions.map(q => ({
    question: q.question_text,
    options: [
      `A. ${q.option_a}`,
      `B. ${q.option_b}`,
      `C. ${q.option_c}`,
      `D. ${q.option_d}`
    ],
    correctAnswer: q.correct_answer,
    explanation: q.explanation || "No explanation provided.",
    subject: quizTitle
  }));
  
  // Calculate total time if time per question is provided
  const totalTime = timePerQuestion ? 
    (parseInt(timePerQuestion) * questionCount).toString() : 
    "No Limit";
  
  useEffect(() => {
    // Set loading to false once questions are ready
    if (formattedQuestions.length > 0) {
      setLoading(false);
      setError(null);
      console.log("Questions loaded successfully:", formattedQuestions.length);
    } else {
      console.log("No questions available in formattedQuestions array");
      if (!loading) {
        setError("No questions available for this quiz.");
      }
    }
  }, [formattedQuestions, loading]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setLoading(true);
    setError(null);
    toast.info("Retrying to load questions...");
    
    // Simulate a delay before retrying
    setTimeout(() => {
      if (formattedQuestions.length > 0) {
        setLoading(false);
        toast.success("Questions loaded successfully!");
      } else {
        setError("Still unable to load questions. Please try again later.");
        toast.error("Failed to load questions.");
      }
    }, 2000);
  };
  
  if (loading && formattedQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-medblue mb-4" />
        <p className="text-center text-lg">Loading questions...</p>
      </div>
    );
  }

  if (error || formattedQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-center text-lg text-red-500 mb-4">{error || "No questions available for this quiz."}</p>
        <Button onClick={handleRetry} className="bg-medblue hover:bg-medblue/90">
          Retry Loading Questions
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">{quizTitle}</h1>
        {quizDescription && <p className="mb-6 text-gray-600">{quizDescription}</p>}
        
        <div className="mb-4 p-4 bg-blue-50 rounded-md">
          <h2 className="font-semibold mb-2">Quiz Info:</h2>
          <p><span className="font-medium">Questions:</span> {questionCount}</p>
          <p><span className="font-medium">Time Limit:</span> {totalTime === "No Limit" ? 
            "No time limit" : 
            `${totalTime} seconds`}
          </p>
        </div>
      </Card>
      
      {transformedQuestions.length > 0 ? (
        <Quiz
          subject={quizTitle}
          chapter="Custom Quiz"
          topic=""
          difficulty="medium"
          questionCount={questionCount.toString()}
          timeLimit={totalTime}
          quizId={quizId}
          simultaneousResults={true}
          preloadedQuestions={transformedQuestions}
        />
      ) : (
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-lg mb-4">No questions available for this quiz.</p>
          <Button onClick={handleRetry} className="bg-medblue hover:bg-medblue/90">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
