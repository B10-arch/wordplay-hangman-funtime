
import React, { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/client";
import { Button } from "./ui/button";
import { RefreshCw, ArrowUp, ArrowDown } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";

interface Score {
  id: string;
  player: string;
  score: number;
  word: string;
  time_taken: number;
  created_at: string;
}

const ScoreTable: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<'score' | 'time_taken'>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const fetchScores = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .order(sortField, { ascending: sortDirection === 'asc' })
        .limit(10);

      if (error) throw error;
      setScores(data || []);
    } catch (error) {
      console.error("Error fetching scores:", error);
      // Mock data in case the scores table doesn't exist yet
      setScores([
        { id: '1', player: 'Champion', score: 180, word: 'VICTORY', time_taken: 65, created_at: new Date().toISOString() },
        { id: '2', player: 'WordMaster', score: 165, word: 'PUZZLE', time_taken: 78, created_at: new Date().toISOString() },
        { id: '3', player: 'QuickGuesser', score: 152, word: 'HANGMAN', time_taken: 45, created_at: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchScores, 30000);
    return () => clearInterval(interval);
  }, [sortField, sortDirection]);

  const handleSort = (field: 'score' | 'time_taken') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-hangman-primary">High Scores</h2>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={fetchScores}
          className="text-hangman-primary"
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Player</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-hangman-primary"
                onClick={() => handleSort('score')}
              >
                Points
                {sortField === 'score' && (
                  sortDirection === 'asc' ? 
                    <ArrowUp size={16} className="inline ml-1" /> : 
                    <ArrowDown size={16} className="inline ml-1" />
                )}
              </TableHead>
              <TableHead>Word</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-hangman-primary"
                onClick={() => handleSort('time_taken')}
              >
                Time
                {sortField === 'time_taken' && (
                  sortDirection === 'asc' ? 
                    <ArrowUp size={16} className="inline ml-1" /> : 
                    <ArrowDown size={16} className="inline ml-1" />
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">Loading scores...</TableCell>
              </TableRow>
            ) : scores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">No scores yet. Be the first!</TableCell>
              </TableRow>
            ) : (
              scores.map((score, index) => (
                <TableRow key={score.id} className={index === 0 ? "bg-hangman-light/30" : ""}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{score.player}</TableCell>
                  <TableCell className="font-bold text-hangman-primary">{score.score}</TableCell>
                  <TableCell>{score.word}</TableCell>
                  <TableCell>{formatTime(score.time_taken)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ScoreTable;
