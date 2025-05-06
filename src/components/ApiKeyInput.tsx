
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

export const ApiKeyInput = ({ onSave }: { onSave: () => void }) => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Verify the key starts with gsk_
      if (!apiKey.trim().startsWith('gsk_')) {
        toast.error("Invalid API key format. GROQ API keys should start with 'gsk_'");
        setIsLoading(false);
        return;
      }
      
      localStorage.setItem("groq_api_key", apiKey);
      toast.success("API key saved successfully!");
      onSave();
    } catch (error) {
      console.error("Error saving API key:", error);
      toast.error("Failed to save API key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter GROQ AI API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey">API Key</label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your GROQ AI API key (starts with gsk_)"
                required
              />
              <p className="text-xs text-gray-500">
                Don't have a GROQ API key? <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-medblue hover:underline">Get one here</a>
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save API Key"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
