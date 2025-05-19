
import React, { useState, useEffect } from "react";
import HangmanFigure from "./HangmanFigure";
import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard";
import GameStatus from "./GameStatus";
import CategorySelector from "./CategorySelector";
import AddCustomWord from "./AddCustomWord";
import CustomWordSelector from "./CustomWordSelector";
import { getRandomWord } from "../utils/wordCategories";
import { Button } from "./ui/button";
import { useToast } from "../hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MAX_WRONG_GUESSES = 6;

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
  const [showAddCustomWord, setShowAddCustomWord] = useState<boolean>(false);
  const [useCustomWord, setUseCustomWord] = useState<boolean>(false);

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
        setIsGameWon(true);
        setIsGameOver(true);
        setScore({ ...score, wins: score.wins + 1 });
        toast({
          title: "You won!",
          description: `You correctly guessed the word: ${word}`,
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCustomWordAdded = () => {
    setShowAddCustomWord(false);
    toast({
      title: "Word added!",
      description: "Your word has been added to the custom words list",
      duration: 2000,
    });
  };

  const handleSelectCustomWord = (customWord: string) => {
    startGame(customWord);
  };

  const toggleAddCustomWord = () => {
    setShowAddCustomWord(!showAddCustomWord);
    setUseCustomWord(false);
  };

  const toggleUseCustomWord = () => {
    setUseCustomWord(!useCustomWord);
    setShowAddCustomWord(false);
  };

  useEffect(() => {
    if (!gameStarted) {
      setWord(getRandomWord());
    }
  }, [gameStarted]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 backdrop-blur-sm bg-white/40 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-hangman-primary">Hangman Game</h1>
        <div className="flex gap-2">
          <p className="text-sm sm:text-base font-semibold">
            Wins: <span className="text-green-600">{score.wins}</span>
          </p>
          <p className="text-sm sm:text-base font-semibold">
            Losses: <span className="text-red-600">{score.losses}</span>
          </p>
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
              onClick={() => setShowAddCustomWord(true)}
            >
              Add a Custom Word
            </Button>
            
            <Button 
              className="bg-hangman-secondary hover:bg-hangman-primary text-white px-8 py-3 rounded-md text-lg flex-1 max-w-xs mx-auto"
              onClick={() => setUseCustomWord(true)}
            >
              Play with Custom Word
            </Button>
          </div>
          
          {showAddCustomWord ? (
            <div className="mb-8 animate-fade-in">
              <AddCustomWord onWordAdded={handleCustomWordAdded} />
              <Button 
                variant="ghost" 
                className="mt-4 text-hangman-primary"
                onClick={toggleAddCustomWord}
              >
                Cancel
              </Button>
            </div>
          ) : useCustomWord ? (
            <div className="mb-8 animate-fade-in">
              <CustomWordSelector onSelectWord={handleSelectCustomWord} onRefresh={() => {}} />
              <Button 
                variant="ghost" 
                className="mt-4 text-hangman-primary"
                onClick={toggleUseCustomWord}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <CategorySelector
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategoryChange}
                  disabled={false}
                />
              </div>
              <Button 
                className="bg-hangman-primary hover:bg-hangman-secondary text-white px-8 py-3 rounded-md text-lg"
                onClick={() => startGame()}
              >
                Start Game
              </Button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <CategorySelector
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              disabled={gameStarted && !isGameOver}
            />

            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline"
                  className="border-hangman-primary text-hangman-primary hover:bg-hangman-light"
                >
                  Add/Play Custom Words
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="space-y-8 pt-6">
                  <AddCustomWord onWordAdded={handleCustomWordAdded} />
                  <div className="border-t pt-6">
                    <CustomWordSelector 
                      onSelectWord={(word) => {
                        handleSelectCustomWord(word);
                      }}
                      onRefresh={() => {}}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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

          {!isGameOver && (
            <div className="text-center">
              <Button 
                variant="outline"
                onClick={resetGame}
                className="mt-4 border-hangman-primary text-hangman-primary hover:bg-hangman-light"
              >
                New Word
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HangmanGame;
