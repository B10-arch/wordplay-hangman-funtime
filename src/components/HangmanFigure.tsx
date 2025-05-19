
import React from "react";

interface HangmanFigureProps {
  incorrectGuesses: number;
}

const HangmanFigure: React.FC<HangmanFigureProps> = ({ incorrectGuesses }) => {
  return (
    <div className="w-64 h-64 relative mx-auto mb-6">
      {/* Scaffold base */}
      <div className="absolute bottom-0 left-0 w-48 h-2 bg-hangman-dark rounded-md" />
      
      {/* Vertical pole */}
      <div className="absolute bottom-0 left-8 w-2 h-64 bg-hangman-dark rounded-md" />
      
      {/* Horizontal pole */}
      <div className="absolute top-0 left-8 w-32 h-2 bg-hangman-dark rounded-md" />
      
      {/* Support pole */}
      <div className="absolute top-0 left-8 w-2 h-10 bg-hangman-dark rounded-md" />
      
      {/* Rope */}
      <div className={`absolute top-10 left-38 w-1 h-10 bg-hangman-dark rounded-md ${incorrectGuesses >= 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Head */}
      <div className={`absolute top-20 left-32 w-12 h-12 rounded-full border-4 border-hangman-dark ${incorrectGuesses >= 1 ? 'opacity-100 animate-bounce-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Body */}
      <div className={`absolute top-32 left-38 w-1 h-20 bg-hangman-dark rounded-md ${incorrectGuesses >= 2 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Left arm */}
      <div className={`absolute top-36 left-28 w-10 h-1 bg-hangman-dark rounded-md origin-right transform rotate-45 ${incorrectGuesses >= 3 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Right arm */}
      <div className={`absolute top-36 left-38 w-10 h-1 bg-hangman-dark rounded-md origin-left transform -rotate-45 ${incorrectGuesses >= 4 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Left leg */}
      <div className={`absolute top-52 left-28 w-10 h-1 bg-hangman-dark rounded-md origin-right transform rotate-45 ${incorrectGuesses >= 5 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Right leg */}
      <div className={`absolute top-52 left-38 w-10 h-1 bg-hangman-dark rounded-md origin-left transform -rotate-45 ${incorrectGuesses >= 6 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Face (only shown when game is lost) */}
      {incorrectGuesses >= 6 && (
        <>
          {/* Left eye */}
          <div className="absolute top-23 left-35 w-1 h-1 bg-hangman-dark rounded-full animate-bounce-in" />
          {/* Right eye */}
          <div className="absolute top-23 left-40 w-1 h-1 bg-hangman-dark rounded-full animate-bounce-in" />
          {/* Sad mouth */}
          <div className="absolute top-28 left-35 w-6 h-1 bg-hangman-dark rounded-full transform rotate-12 animate-bounce-in" />
        </>
      )}
    </div>
  );
};

export default HangmanFigure;
