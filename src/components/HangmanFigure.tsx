
import React from "react";

interface HangmanFigureProps {
  incorrectGuesses: number;
}

const HangmanFigure: React.FC<HangmanFigureProps> = ({ incorrectGuesses }) => {
  return (
    <div className="w-64 h-64 relative mx-auto mb-6">
      {/* Base - improved with proper depth */}
      <div className="absolute bottom-0 left-0 w-48 h-6 bg-gradient-to-r from-hangman-dark to-hangman-primary rounded-md" />
      
      {/* Vertical pole - improved with gradient */}
      <div className="absolute bottom-0 left-8 w-6 h-64 bg-gradient-to-t from-hangman-dark to-hangman-primary rounded-md" />
      
      {/* Horizontal beam - improved with gradient */}
      <div className="absolute top-0 left-8 w-40 h-6 bg-gradient-to-r from-hangman-dark to-hangman-primary rounded-md" />
      
      {/* Support beam - adjusted position and angle */}
      <div className="absolute top-6 left-8 w-24 h-5 bg-hangman-dark rounded-t-none rounded-b-md transform origin-top-left rotate-45" />
      
      {/* Rope - adjusted position and thickness */}
      <div className="absolute top-0 right-12 w-3 h-16 bg-hangman-dark rounded-md" />
      
      {/* Head - improved styling */}
      <div className={`absolute top-16 right-8 w-12 h-12 rounded-full border-4 border-hangman-dark ${incorrectGuesses >= 1 ? 'opacity-100 animate-bounce-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Body - adjusted position */}
      <div className={`absolute top-28 right-13.5 w-3 h-24 bg-hangman-dark rounded-md ${incorrectGuesses >= 2 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Left arm - adjusted position and angle */}
      <div className={`absolute top-32 right-15 w-16 h-3 bg-hangman-dark rounded-md origin-right transform rotate-45 ${incorrectGuesses >= 3 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Right arm - adjusted position and angle */}
      <div className={`absolute top-32 right-10 w-16 h-3 bg-hangman-dark rounded-md origin-left transform -rotate-45 ${incorrectGuesses >= 4 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Left leg - adjusted position and angle */}
      <div className={`absolute top-52 right-15 w-16 h-3 bg-hangman-dark rounded-md origin-right transform rotate-45 ${incorrectGuesses >= 5 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Right leg - adjusted position and angle */}
      <div className={`absolute top-52 right-10 w-16 h-3 bg-hangman-dark rounded-md origin-left transform -rotate-45 ${incorrectGuesses >= 6 ? 'opacity-100 animate-fade-in' : 'opacity-0'} transition-opacity duration-300`} />
      
      {/* Face (only shown when game is lost) */}
      {incorrectGuesses >= 6 && (
        <>
          {/* Left eye - X shape */}
          <div className="absolute top-18 right-14 w-2 h-2">
            <div className="absolute w-3 h-1 bg-hangman-dark rounded-full transform rotate-45"></div>
            <div className="absolute w-3 h-1 bg-hangman-dark rounded-full transform -rotate-45"></div>
          </div>
          
          {/* Right eye - X shape */}
          <div className="absolute top-18 right-9 w-2 h-2">
            <div className="absolute w-3 h-1 bg-hangman-dark rounded-full transform rotate-45"></div>
            <div className="absolute w-3 h-1 bg-hangman-dark rounded-full transform -rotate-45"></div>
          </div>
          
          {/* Sad mouth */}
          <div className="absolute top-22 right-14 w-6 h-6 border-b-2 border-hangman-dark rounded-full transform rotate-12 scale-x-75 -scale-y-100 animate-bounce-in" />
        </>
      )}
    </div>
  );
};

export default HangmanFigure;
