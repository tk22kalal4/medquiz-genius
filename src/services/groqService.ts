
import { toast } from "sonner";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  subject: string;
}

const getRandomQuestionType = () => {
  // Expanded list of question types for more variety
  const questionTypes = [
    "anatomy and structure identification",
    "physiological functions",
    "clinical correlations",
    "embryological development",
    "nerve pathways and innervation",
    "blood supply and vasculature",
    "anatomical variations",
    "surgical landmarks",
    "diagnostic features",
    "pathological conditions",
    "biochemical processes",
    "pharmacological mechanisms",
    "histological features",
    "radiological findings",
    "genetic disorders",
    "immunological responses",
    "microbiological aspects",
    "laboratory diagnostics",
    "therapeutic approaches",
    "epidemiological factors"
  ];
  return questionTypes[Math.floor(Math.random() * questionTypes.length)];
};

export const generateQuestion = async (scope: string, difficulty: string = 'easy'): Promise<Question | null> => {
  const apiKey = localStorage.getItem("groq_api_key");
  
  if (!apiKey) {
    toast.error("Please enter your Groq API key first");
    return null;
  }

  // Clean the API key to remove any potential whitespace
  const cleanedApiKey = apiKey.trim();
  console.log("API Key length:", cleanedApiKey.length);
  console.log("API Key starts with gsk_:", cleanedApiKey.startsWith('gsk_'));

  const getDifficultyPrompt = (level: string) => {
    switch(level.toLowerCase()) {
      case 'easy':
        return "Focus on basic concepts and fundamental knowledge from standard textbooks.";
      case 'medium':
        return "Generate a moderate difficulty question that combines theoretical knowledge with clinical applications.";
      case 'hard':
        return "Generate a complex clinical scenario-based question that requires integration of multiple concepts.";
      default:
        return "Focus on basic concepts and fundamental knowledge from standard textbooks.";
    }
  };

  const questionType = getRandomQuestionType();
  // Adding a random seed to increase variation
  const randomSeed = Math.floor(Math.random() * 10000);

  try {
    console.log(`Generating ${difficulty} question for scope:`, scope);
    console.log("Question type:", questionType);
    console.log("Random seed:", randomSeed);
    console.log("Making request to Groq API...");
    
    // Add a timeout for the request to fail gracefully
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cleanedApiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are a medical expert specializing in NEET PG, FMGE, and INICET exam preparation. ${getDifficultyPrompt(difficulty)} Make sure to generate a high-yield topics question based on latest pattern and syllabus. Avoid repetition from previous questions. IMPORTANT: Your response MUST be valid JSON format with no markdown or other formatting.`
          },
          {
            role: "user",
            content: `Generate a ${difficulty} level multiple choice question about ${questionType} in ${scope}. The question should be high-yield topic based on NEET-PG and INICET. Include different types of question but medically accurate details to ensure variation. Use seed: ${randomSeed} for uniqueness. Format the response in VALID JSON with the following structure EXACTLY:
            {
              "question": "question text",
              "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
              "correctAnswer": "A",
              "explanation": "detailed explanation",
              "subject": "${scope}"
            }
            Do not include any markdown, code blocks, or other formatting in your response - just the raw JSON object.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error details:", errorData);
      throw new Error(errorData.error?.message || `API request failed: ${response.statusText}`);
    }

    const data: GroqResponse = await response.json();
    console.log("Groq API response received");
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from API");
    }

    try {
      // Clean the response content to ensure it's valid JSON
      const content = data.choices[0].message.content.trim();
      // Check if the content is wrapped in markdown code blocks and remove them
      const cleanedContent = content.replace(/^```json\s*|\s*```$/g, '');
      console.log("Cleaned content:", cleanedContent);
      
      const questionData = JSON.parse(cleanedContent);
      console.log("Successfully parsed question data:", questionData);
      
      // Validate the question data structure
      if (!questionData.question || !Array.isArray(questionData.options) || 
          questionData.options.length !== 4 || !questionData.correctAnswer || 
          !questionData.explanation) {
        throw new Error("Invalid question format received from API");
      }
      
      return questionData as Question;
    } catch (parseError) {
      console.error("Error parsing API response:", parseError);
      console.log("Raw response content:", data.choices[0].message.content);
      toast.error("Failed to parse question. Please try again.");
      throw new Error("Failed to parse API response");
    }
  } catch (error: any) {
    console.error("Error generating question:", error);
    if (error.name === 'AbortError') {
      toast.error("Request timed out. Please try again.");
    } else {
      toast.error(error.message || "Failed to generate question. Please check your API key and try again.");
    }
    return null;
  }
};

export const handleDoubt = async (
  doubt: string,
  question: string,
  options: string[],
  correctAnswer: string,
  explanation: string
): Promise<string | null> => {
  const apiKey = localStorage.getItem("groq_api_key");
  
  if (!apiKey) {
    toast.error("Please enter your Groq API key first");
    return null;
  }

  const cleanedApiKey = apiKey.trim();

  try {
    console.log("Handling doubt:", doubt);
    console.log("Making request to Groq API for doubt resolution...");
    
    // Add a timeout for the request to fail gracefully
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cleanedApiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a medical education expert who helps students understand concepts clearly. Provide detailed, accurate but concise explanations for their doubts about medical questions. Be straightforward and get directly to the point."
          },
          {
            role: "user",
            content: `Context:
Question: ${question}
Options: ${options.join('\n')}
Correct Answer: ${correctAnswer}
Explanation: ${explanation}

Student's Doubt: ${doubt}

Please provide a clear, concise explanation addressing this doubt. Include relevant medical concepts and clinical correlations when appropriate, but be direct and straightforward.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    console.log("Doubt response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error details:", errorData);
      throw new Error(errorData.error?.message || `API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Groq API response received for doubt");
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from API");
    }

    return data.choices[0].message.content;

  } catch (error: any) {
    console.error("Error handling doubt:", error);
    if (error.name === 'AbortError') {
      toast.error("Request timed out. Please try again.");
    } else {
      toast.error(error.message || "Failed to get answer. Please try again.");
    }
    return null;
  }
};
