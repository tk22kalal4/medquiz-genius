
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestartQuiz: () => void;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: string;
  quizId?: string;
}

export const QuizResults = ({ 
  score, 
  totalQuestions, 
  onRestartQuiz,
  subject,
  chapter,
  topic,
  difficulty,
  quizId
}: QuizResultsProps) => {
  const [userName, setUserName] = useState<string>("");
  const [hasRated, setHasRated] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: userData } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', user.id)
            .single();
          
          setUserName(userData?.name || 'User');
          
          // Check if the user has already rated this quiz
          if (quizId) {
            const { data: ratingData } = await supabase
              .from('quiz_ratings')
              .select('*')
              .eq('quiz_id', quizId)
              .eq('user_id', user.id)
              .single();
              
            setHasRated(!!ratingData);
          }
        }
      } catch (error: any) {
        console.error('Error fetching user name:', error);
      }
    };
    
    fetchUserName();
  }, [quizId]);
  
  const handleRatingChange = (newRating: number) => {
    setHasRated(true);
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="text-center mt-16">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {userName && (
            <div className="text-xl text-gray-600">
              Great job, {userName}!
            </div>
          )}
          <div className="text-4xl font-bold text-medical-blue">
            {score} / {totalQuestions}
          </div>
          <div className="text-2xl text-gray-600">
            {percentage}% Correct
          </div>
          
          {quizId && quizId !== "generated-quiz" && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Rate this Quiz</h3>
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  <div className="flex justify-center">
                    <StarRating 
                      quizId={quizId} 
                      readOnly={hasRated} 
                      onRated={handleRatingChange}
                    />
                  </div>
                  {hasRated && <span className="text-sm text-gray-500">Thank you for rating!</span>}
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <p className="text-gray-600">
              Keep practicing to improve your medical knowledge.
            </p>
            {onRestartQuiz && (
              <Button 
                onClick={onRestartQuiz}
                className="mt-4 bg-medical-blue hover:bg-medical-blue/90"
              >
                Start New Quiz
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
