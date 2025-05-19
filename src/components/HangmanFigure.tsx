
import React from "react";

interface HangmanFigureProps {
  incorrectGuesses: number;
}

const HangmanFigure: React.FC<HangmanFigureProps> = ({ incorrectGuesses }) => {
  return (
    <div className="w-64 h-64 relative mx-auto mb-6">
      {/* Scaffold base */}
      <div className="absolute bottom-0 left-0 w-48 h-4 bg-hangman-dark rounded-md" />
      
      {/* Vertical pole */}
      <div className="absolute bottom-0 left-8 w-4 h-64 bg-hangman-dark rounded-md" />
      
      {/* Horizontal beam */}
      <div className="absolute top-0 left-8 w-40 h-4 bg-hangman-dark rounded-md" />
      
      {/* Support beam */}
      <div className="absolute top-0 left-8 w-20 h-4 bg-hangman-dark rounded-t-none rounded-b-md transform origin-top-left rotate-45" />
      
      {/* Rope */}
      <div className="absolute top-0 right-12 w-2 h-14 bg-hangman-dark rounded-md" />
      
      {/* Head */}
      <div className={`absolute top-14 right-8 w-12 h-12 rounded-full border-4 border-hangman-dark ${incorrectGuesses >= 1 ? 'opacity-100 animate-bounce-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Body */}
      <div className={`absolute top-26 right-13 w-2 h-24 bg-hangman-dark rounded-md ${incorrectGuesses >= 2 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Left arm */}
      <div className={`absolute top-32 right-20 w-12 h-2 bg-hangman-dark rounded-md origin-right transform rotate-45 ${incorrectGuesses >= 3 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Right arm */}
      <div className={`absolute top-32 right-8 w-12 h-2 bg-hangman-dark rounded-md origin-left transform -rotate-45 ${incorrectGuesses >= 4 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Left leg */}
      <div className={`absolute top-50 right-20 w-12 h-2 bg-hangman-dark rounded-md origin-right transform rotate-45 ${incorrectGuesses >= 5 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Right leg */}
      <div className={`absolute top-50 right-8 w-12 h-2 bg-hangman-dark rounded-md origin-left transform -rotate-45 ${incorrectGuesses >= 6 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Face (only shown when game is lost) */}
      {incorrectGuesses >= 6 && (
        <>
          {/* Left eye - X shape */}
          <div className="absolute top-17 right-15 w-2 h-2">
            <div className="absolute w-3 h-0.5 bg-hangman-dark rounded-full transform rotate-45"></div>
            <div className="absolute w-3 h-0.5 bg-hangman-dark rounded-full transform -rotate-45"></div>
          </div>
          
          {/* Right eye - X shape */}
          <div className="absolute top-17 right-8 w-2 h-2">
            <div className="absolute w-3 h-0.5 bg-hangman-dark rounded-full transform rotate-45"></div>
            <div className="absolute w-3 h-0.5 bg-hangman-dark rounded-full transform -rotate-45"></div>
          </div>
          
          {/* Sad mouth */}
          <div className="absolute top-22 right-14 w-6 h-6 border-b-2 border-hangman-dark rounded-full transform rotate-12 scale-x-75 -scale-y-100 animate-bounce-in" />
        </>
      )}
    </div>
  );
};

export default HangmanFigure;
