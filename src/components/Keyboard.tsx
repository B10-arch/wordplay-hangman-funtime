
import React from "react";
import { alphabet } from "../utils/wordCategories";

interface KeyboardProps {
  guessedLetters: string[];
  correctLetters: string[];
  incorrectLetters: string[];
  onGuess: (letter: string) => void;
  disabled: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({
  guessedLetters,
  correctLetters,
  incorrectLetters,
  onGuess,
  disabled
}) => {
  const getLetterStatus = (letter: string) => {
    if (correctLetters.includes(letter)) return "correct";
    if (incorrectLetters.includes(letter)) return "incorrect";
    if (guessedLetters.includes(letter)) return "guessed";
    return "unused";
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex flex-wrap justify-center">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`letter-button ${getLetterStatus(letter)} ${
              guessedLetters.includes(letter) || disabled ? "disabled" : ""
            }`}
            onClick={() => onGuess(letter)}
            disabled={guessedLetters.includes(letter) || disabled}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
