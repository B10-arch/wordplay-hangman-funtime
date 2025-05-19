
import React from "react";

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  gameOver: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters, gameOver }) => {
  return (
    <div className="mb-10 text-center">
      <div className="flex justify-center flex-wrap gap-2 md:gap-3 py-4">
        {word.split("").map((letter, index) => {
          const isGuessed = guessedLetters.includes(letter);
          const isRevealed = isGuessed || gameOver;
          const isUnguessedAndGameOver = !isGuessed && gameOver;
          
          return (
            <div 
              key={index} 
              className={`
                inline-flex items-center justify-center
                w-8 h-12 md:w-10 md:h-14
                border-b-4 border-hangman-dark
                font-bold text-2xl md:text-3xl
                ${isRevealed ? 'animate-bounce-in' : ''}
                ${isUnguessedAndGameOver ? 'text-red-500' : 'text-hangman-dark'}
              `}
            >
              {isRevealed ? letter : ' '}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordDisplay;
