
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "../integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "../hooks/use-toast";

interface CustomWord {
  id: string;
  word: string;
  creator_name: string;
  category: string;
  created_at: string;
}

interface CustomWordSelectorProps {
  onSelectWord: (word: string) => void;
  onRefresh: () => void;
}

const CustomWordSelector: React.FC<CustomWordSelectorProps> = ({ onSelectWord, onRefresh }) => {
  const { toast } = useToast();
  const [customWords, setCustomWords] = useState<CustomWord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCustomWords = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("custom_words")
        .select("*")
        .eq("is_used", false)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setCustomWords(data as CustomWord[]);
      }
    } catch (error) {
      console.error("Error fetching custom words:", error);
      toast({
        title: "Error fetching custom words",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomWords();
  }, []);

  const handleSelectWord = async (word: CustomWord) => {
    try {
      // Mark the word as used
      await supabase
        .from("custom_words")
        .update({ is_used: true })
        .eq("id", word.id);

      // Pass the word to the parent component
      onSelectWord(word.word);
      
      toast({
        title: "Custom word selected!",
        description: `Created by: ${word.creator_name}`,
      });
      
      // Refresh the list
      onRefresh();
    } catch (error) {
      console.error("Error selecting custom word:", error);
      toast({
        title: "Error selecting word",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md">
      <CardHeader className="bg-gradient-to-r from-hangman-light to-hangman-primary bg-opacity-20">
        <CardTitle className="text-xl text-center">Custom Words</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {loading ? (
          <div className="text-center py-4">Loading custom words...</div>
        ) : customWords.length === 0 ? (
          <div className="text-center py-4">No custom words available. Add one!</div>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {customWords.map((word) => (
              <div 
                key={word.id} 
                className="flex justify-between items-center p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100"
              >
                <div>
                  <p className="font-medium text-hangman-dark">
                    {word.category} <span className="text-xs text-gray-500">by {word.creator_name}</span>
                  </p>
                </div>
                <Button 
                  size="sm"
                  variant="outline" 
                  className="border-hangman-primary text-hangman-primary hover:bg-hangman-light"
                  onClick={() => handleSelectWord(word)}
                >
                  Play
                </Button>
              </div>
            ))}
          </div>
        )}
        <Button
          variant="ghost"
          className="w-full mt-4 text-hangman-secondary hover:text-hangman-primary"
          onClick={fetchCustomWords}
        >
          Refresh List
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomWordSelector;
