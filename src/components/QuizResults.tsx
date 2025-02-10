
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, PlayCircle, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestartQuiz: () => void;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: string;
}

export const QuizResults = ({ 
  score, 
  totalQuestions, 
  onRestartQuiz,
  subject,
  chapter,
  topic,
  difficulty
}: QuizResultsProps) => {
  const [userName, setUserName] = useState<string>("");
  const percentage = Math.round((score / totalQuestions) * 100);
  const navigate = useNavigate();
  
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
        }
      } catch (error: any) {
        console.error('Error fetching user name:', error);
      }
    };
    
    fetchUserName();
  }, []);
  
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
          <div className="flex justify-center gap-4 mt-8">
            <Button 
              onClick={() => navigate("/setup")}
              size="lg"
              className="bg-medical-blue hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Setup
            </Button>
            <Button 
              onClick={onRestartQuiz}
              size="lg"
              className="bg-medical-blue hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Start New Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
