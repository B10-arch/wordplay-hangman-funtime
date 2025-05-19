
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "../hooks/use-toast";
import { supabase } from "../integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface AddCustomWordProps {
  onWordAdded: () => void;
}

const AddCustomWord: React.FC<AddCustomWordProps> = ({ onWordAdded }) => {
  const { toast } = useToast();
  const [creatorName, setCreatorName] = useState<string>("");
  const [customWord, setCustomWord] = useState<string>("");
  const [category, setCategory] = useState<string>("Custom");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!creatorName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    if (!customWord.trim()) {
      toast({
        title: "Error",
        description: "Please enter a word",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("custom_words")
        .insert({
          word: customWord.toUpperCase(),
          creator_name: creatorName,
          category: category || "Custom"
        });

      if (error) throw error;

      toast({
        title: "Word added successfully!",
        description: "Others can now guess your word",
      });
      
      // Reset form fields
      setCustomWord("");
      setCategory("Custom");
      
      // Notify parent component
      onWordAdded();
      
    } catch (error) {
      console.error("Error adding custom word:", error);
      toast({
        title: "Error adding word",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg border-hangman-primary border">
      <CardHeader className="bg-gradient-to-r from-hangman-light to-hangman-primary bg-opacity-20 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-hangman-dark text-center">Create a Word</CardTitle>
        <CardDescription className="text-center">
          Add a word for others to guess
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="creator-name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <Input
              id="creator-name"
              type="text"
              placeholder="Enter your name"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              className="w-full border-hangman-light focus:border-hangman-primary"
              maxLength={30}
            />
          </div>
          
          <div>
            <label htmlFor="custom-word" className="block text-sm font-medium text-gray-700 mb-1">
              Word to Guess
            </label>
            <Input
              id="custom-word"
              type="text"
              placeholder="Enter a word for others to guess"
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              className="w-full border-hangman-light focus:border-hangman-primary"
              maxLength={15}
            />
            <p className="text-xs text-gray-500 mt-1">
              Only letters A-Z are allowed, max 15 characters
            </p>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category (Optional)
            </label>
            <Input
              id="category"
              type="text"
              placeholder="Enter a category (e.g., Movies, Sports)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-hangman-light focus:border-hangman-primary"
              maxLength={20}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          className="w-full bg-hangman-primary hover:bg-hangman-secondary text-white"
        >
          {isSubmitting ? "Adding..." : "Add Word"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddCustomWord;
