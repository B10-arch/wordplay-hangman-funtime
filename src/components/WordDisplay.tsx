
import React from "react";

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  gameOver: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters, gameOver }) => {
  return (
    <div className="mb-10 text-center">
      <div className="flex justify-center flex-wrap">
        {word.split("").map((letter, index) => (
          <div 
            key={index} 
            className={`word-letter ${
              guessedLetters.includes(letter) || gameOver 
                ? "text-hangman-dark" 
                : "text-transparent"
            } ${
              !guessedLetters.includes(letter) && gameOver 
                ? "text-red-500 animate-shake" 
                : ""
            }`}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordDisplay;
