
import React, { useState, useEffect } from "react";
import HangmanFigure from "./HangmanFigure";
import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard";
import GameStatus from "./GameStatus";
import CategorySelector from "./CategorySelector";
import CustomWordSelector from "./CustomWordSelector";
import { getRandomWord } from "../utils/wordCategories";
import { Button } from "./ui/button";
import { useToast } from "../hooks/use-toast";
import ScoreTable from "./ScoreTable";
import { Timer } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MAX_WRONG_GUESSES = 6;
const TIMER_DURATION = 120; // 2 minutes in seconds

const HangmanGame: React.FC = () => {
  const { toast } = useToast();
  const [word, setWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("random");
  const [score, setScore] = useState<{ wins: number; losses: number }>({ wins: 0, losses: 0 });
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [useCustomWord, setUseCustomWord] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATION);
  const [currentPoints, setCurrentPoints] = useState<number>(0);

  const startGame = (customWord?: string) => {
    let newWord = "";
    
    if (customWord) {
      newWord = customWord;
    } else {
      newWord = getRandomWord(selectedCategory === "random" ? undefined : selectedCategory);
    }
    
    setWord(newWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setIsGameOver(false);
    setIsGameWon(false);
    setGameStarted(true);
    setUseCustomWord(false);
    setTimeLeft(TIMER_DURATION);
    setCurrentPoints(0);
    
    toast({
      title: "New game started",
      description: customWord 
        ? "Playing with a custom word" 
        : `Category: ${selectedCategory === "random" ? "Random" : selectedCategory}`,
      duration: 2000,
    });
  };

  const resetGame = () => {
    startGame();
  };

  const calculatePoints = (timeRemaining: number): number => {
    // Base points for guessing correctly
    const basePoints = 100;
    // Bonus points based on time remaining (max 100 bonus points when all time remains)
    const timeBonus = Math.floor((timeRemaining / TIMER_DURATION) * 100);
    return basePoints + timeBonus;
  };

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || isGameOver) return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    if (word.includes(letter)) {
      setCorrectLetters([...correctLetters, letter]);
      
      // Check if all letters in the word have been guessed
      const isWordComplete = word
        .split("")
        .every((char) => newGuessedLetters.includes(char));

      if (isWordComplete) {
        const points = calculatePoints(timeLeft);
        setCurrentPoints(points);
        setIsGameWon(true);
        setIsGameOver(true);
        setScore({ ...score, wins: score.wins + 1 });
        
        // Save the score to Supabase
        saveScore(points);
        
        toast({
          title: "You won!",
          description: `You correctly guessed the word: ${word}. You earned ${points} points!`,
          duration: 3000,
        });
      }
    } else {
      const newWrongGuesses = wrongGuesses + 1;
      setIncorrectLetters([...incorrectLetters, letter]);
      setWrongGuesses(newWrongGuesses);

      if (newWrongGuesses >= MAX_WRONG_GUESSES) {
        setIsGameOver(true);
        setScore({ ...score, losses: score.losses + 1 });
        toast({
          title: "Game over",
          description: `The word was: ${word}`,
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const saveScore = async (points: number) => {
    try {
      const playerName = localStorage.getItem('playerName') || 'Anonymous';
      
      await fetch('https://api.lovable.ai/v1/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player: playerName,
          word: word,
          score: points,
          time_taken: TIMER_DURATION - timeLeft,
        }),
      });
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSelectCustomWord = (word: string) => {
    startGame(word);
  };

  useEffect(() => {
    if (!gameStarted) {
      setWord(getRandomWord());
    }
  }, [gameStarted]);

  // Timer effect
  useEffect(() => {
    let timer: number | undefined;
    
    if (gameStarted && !isGameOver && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsGameOver(true);
            setScore({ ...score, losses: score.losses + 1 });
            toast({
              title: "Time's up!",
              description: `The word was: ${word}`,
              variant: "destructive",
              duration: 3000,
            });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, isGameOver, timeLeft, word, score, toast]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 backdrop-blur-sm bg-white/40 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-hangman-primary">Hangman Game</h1>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <ScoreTable />
          <div className="flex gap-2 items-center">
            <p className="text-sm sm:text-base font-semibold">
              Wins: <span className="text-green-600">{score.wins}</span>
            </p>
            <p className="text-sm sm:text-base font-semibold">
              Losses: <span className="text-red-600">{score.losses}</span>
            </p>
          </div>
        </div>
      </div>

      {!gameStarted ? (
        <div className="text-center py-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-hangman-primary">Welcome to Hangman!</h2>
          <p className="mb-6 text-lg">
            Try to guess the hidden word before the hangman is complete.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              className="bg-hangman-primary hover:bg-hangman-secondary text-white px-8 py-3 rounded-md text-lg flex-1 max-w-xs mx-auto"
              onClick={() => setUseCustomWord(true)}
            >
              Play with Custom Word
            </Button>
            
            <Button 
              className="bg-hangman-secondary hover:bg-hangman-primary text-white px-8 py-3 rounded-md text-lg flex-1 max-w-xs mx-auto"
              onClick={() => startGame()}
            >
              Play Random Word
            </Button>
          </div>
          
          {useCustomWord ? (
            <div className="mb-8 animate-fade-in">
              <CustomWordSelector onSelectWord={handleSelectCustomWord} onRefresh={() => {}} />
              <Button 
                variant="ghost" 
                className="mt-4 text-hangman-primary"
                onClick={() => setUseCustomWord(false)}
              >
                Back
              </Button>
            </div>
          ) : (
            <div className="mb-8">
              <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                disabled={false}
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Timer className="text-hangman-primary" size={24} />
              <span className={`${timeLeft <= 30 ? 'text-red-600 animate-pulse' : 'text-hangman-dark'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            {currentPoints > 0 && !isGameOver && (
              <div className="text-lg font-bold text-green-600 animate-bounce-in">
                {currentPoints} points
              </div>
            )}
            <Button 
              variant="outline"
              onClick={resetGame}
              className="border-hangman-primary text-hangman-primary hover:bg-hangman-light"
            >
              New Word
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <HangmanFigure incorrectGuesses={wrongGuesses} />
            
            <div className="text-center mb-4">
              <p className="text-lg text-gray-600">
                Wrong Guesses: <span className="font-bold text-red-500">{wrongGuesses}</span> / {MAX_WRONG_GUESSES}
              </p>
            </div>
          </div>

          <WordDisplay word={word} guessedLetters={guessedLetters} gameOver={isGameOver} />

          {isGameOver && (
            <GameStatus
              isGameWon={isGameWon}
              isGameOver={isGameOver}
              word={word}
              onPlayAgain={resetGame}
              score={score}
              points={currentPoints}
            />
          )}

          {!isGameOver && (
            <Keyboard
              guessedLetters={guessedLetters}
              correctLetters={correctLetters}
              incorrectLetters={incorrectLetters}
              onGuess={handleGuess}
              disabled={isGameOver}
            />
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline"
                className="mt-4 border-hangman-primary text-hangman-primary hover:bg-hangman-light"
              >
                View High Scores
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="space-y-8 pt-6">
                <ScoreTable />
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
};

export default HangmanGame;
