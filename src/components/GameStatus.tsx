
import React from "react";
import { Button } from "../components/ui/button";

interface GameStatusProps {
  isGameWon: boolean;
  isGameOver: boolean;
  word: string;
  onPlayAgain: () => void;
  score: { wins: number; losses: number };
}

const GameStatus: React.FC<GameStatusProps> = ({
  isGameWon,
  isGameOver,
  word,
  onPlayAgain,
  score
}) => {
  if (!isGameOver) return null;

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-lg animate-fade-in max-w-md mx-auto mb-8">
      {isGameWon ? (
        <div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">You Won!</h2>
          <p className="text-xl mb-4">
            Congratulations! You guessed the word correctly.
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over</h2>
          <p className="text-xl mb-4">
            The word was: <span className="font-bold">{word}</span>
          </p>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <div className="text-left">
          <p className="text-lg">Wins: <span className="font-bold text-green-600">{score.wins}</span></p>
        </div>
        <div className="text-right">
          <p className="text-lg">Losses: <span className="font-bold text-red-600">{score.losses}</span></p>
        </div>
      </div>
      <Button 
        className="bg-hangman-primary hover:bg-hangman-secondary text-white px-6 py-2 rounded-md text-lg"
        onClick={onPlayAgain}
      >
        Play Again
      </Button>
    </div>
  );
};

export default GameStatus;
