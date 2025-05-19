
import React from "react";
import HangmanGame from "../components/HangmanGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-hangman-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <HangmanGame />
      </div>
    </div>
  );
};

export default Index;
