
import React, { useState, useEffect } from "react";
import HangmanGame from "../components/HangmanGame";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const Index = () => {
  const [showPlayerNameDialog, setShowPlayerNameDialog] = useState(false);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    // Check if player name exists in localStorage
    const storedName = localStorage.getItem('playerName');
    if (!storedName) {
      setShowPlayerNameDialog(true);
    } else {
      setPlayerName(storedName);
    }
  }, []);

  const handleSavePlayerName = () => {
    if (playerName.trim()) {
      localStorage.setItem('playerName', playerName.trim());
      setShowPlayerNameDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-hangman-light via-white to-hangman-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <HangmanGame />
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        Hangman Game - Challenge your friends with custom words!
      </div>
      
      <Dialog open={showPlayerNameDialog} onOpenChange={setShowPlayerNameDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome to Hangman!</DialogTitle>
            <DialogDescription>
              Enter your name to track your scores on the leaderboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="col-span-3"
                placeholder="Enter your name"
                autoComplete="off"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSavePlayerName}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
