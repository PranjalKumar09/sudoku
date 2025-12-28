import { useEffect, useRef, useState } from "react";

import { generateSudoku, generateDailySudoku } from "../api/sudokuApi";
import { saveGame } from "../utils/sudokuStorage";


const emptyBoard = () =>
  Array.from({ length: 9 }, () => Array(9).fill(0));

const MAX_MISTAKES = 3;
const MAX_HINTS = 3;

export function useSudokuGame({ mode = "normal", dailyDate, difficulty }) {
  const solutionRef = useRef(null);

  const [board, setBoard] = useState(emptyBoard());
  const [initialBoard, setInitialBoard] = useState(emptyBoard());
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState({});
  const [invalidCells, setInvalidCells] = useState(new Set());
  const [pencilMode, setPencilMode] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [loading, setLoading] = useState(true);
  const [shake, setShake] = useState(false);
  const [shakeLevel, setShakeLevel] = useState(0);





  async function loadNewGame(savedGame = null) {
    setLoading(true);

  if (savedGame) {
    setBoard(savedGame.board);
    setInitialBoard(savedGame.initialBoard);
    solutionRef.current = savedGame.solution;

    setNotes(savedGame.notes || {});
    setInvalidCells(new Set(savedGame.invalidCells || []));
    setMistakes(savedGame.mistakes || 0);
    setHintCount(savedGame.hintCount || 0);
    setGameState(savedGame.gameState || "playing");
    setSelected(null);
    setLoading(false);
    return;
  }
    const res =
      mode === "daily"
        ? await generateDailySudoku(dailyDate)
        : await generateSudoku(difficulty);

    const { puzzle, solution } = res.data;

    setBoard(puzzle);
    setInitialBoard(puzzle.map((r) => [...r]));
    solutionRef.current = solution;

    setNotes({});
    setInvalidCells(new Set());
    setMistakes(0);
    setHintCount(0);
    setSelected(null);
    setGameState("playing");
    setLoading(false);
  }

  // ✅ Win check
  useEffect(() => {
    if (!solutionRef.current) return;

    const solved = board.every((row, r) =>
      row.every((val, c) => val === solutionRef.current[r][c])
    );

    if (solved) setGameState("won");
  }, [board]);
  

  // ✏ Input handler
  function handleInput(num) {
  if (!selected || gameState !== "playing") return;
    if (num === 0) {
  const next = board.map(r => [...r]);
  next[row][col] = 0;
  setBoard(next);
  setInvalidCells(p => {
    const n = new Set(p);
    n.delete(`${row}-${col}`);
    return n;
  });
  return;
}


  const { row, col } = selected;
  if (initialBoard[row][col] !== 0) return;

  // ✏ Pencil mode
  if (pencilMode) {
    const key = `${row}-${col}`;
    setNotes((prev) => {
      const next = new Set(prev[key] || []);
      next.has(num) ? next.delete(num) : next.add(num);
      return { ...prev, [key]: next };
    });
    return;
  }

  const correct = solutionRef.current[row][col] === num;

  if (!correct) {
    setInvalidCells((p) => new Set([...p, `${row}-${col}`]));

    setMistakes((m) => {
      const next = m + 1;
      if (next >= MAX_MISTAKES) setGameState("lost");
       setShakeLevel(next);  
      return next;
    });

    // 💥 SHAKE TRIGGER
    setShake(true);
    setTimeout(() => setShake(false), 350);

    return;
  }

  const nextBoard = board.map((r) => [...r]);
  nextBoard[row][col] = num;
  setBoard(nextBoard);

  setInvalidCells((p) => {
    const n = new Set(p);
    n.delete(`${row}-${col}`);
    return n;
  });
}


  // 💡 Hint
  function handleHint() {
    if (!selected || hintCount >= MAX_HINTS) return;

    const { row, col } = selected;
    if (board[row][col] !== 0) return;

    setHintCount((h) => h + 1);
    handleInput(solutionRef.current[row][col]);
  }

  // 🔄 Reset
  function handleReset() {
    setBoard(initialBoard.map((r) => [...r]));
    setNotes({});
    setInvalidCells(new Set());
    setMistakes(0);
    setHintCount(0);
    setSelected(null);
    setGameState("playing");
  }

  return {
    // state
    board,
    initialBoard,
    selected,
    notes,
    invalidCells,
    pencilMode,
    mistakes,
    maxMistakes: MAX_MISTAKES,
    hintCount,
    gameState,
    setGameState,
    loading,
     shake,  
     shakeLevel,
     solutionRef,
      

    // setters
    setSelected,
    setPencilMode,

    // actions
    handleInput,
    handleHint,
    handleReset,
    newGame: loadNewGame,
  };
}
