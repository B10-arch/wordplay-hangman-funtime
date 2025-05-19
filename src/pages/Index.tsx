
import React from "react";
import HangmanGame from "../components/HangmanGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-hangman-light via-white to-hangman-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <HangmanGame />
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        Hangman Game - Challenge your friends with custom words!
      </div>
    </div>
  );
};

export default Index;
