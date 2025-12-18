import { useEffect, useState } from "react";
import SudokuGrid from "../components/SudokuGrid";
import Timer from "../components/Timer";

import { useSudokuGame } from "../hooks/useSudokuGame";
import { Helmet } from "react-helmet-async";
import { saveGame, loadSavedGame, clearGame } from "../utils/sudokuStorage";




export default function GamePage({ mode = "normal", dailyDate }) {
  
  const [difficulty, setDifficulty] = useState("easy");

  const {
  board,
  initialBoard,
  selected,
  setSelected,
  notes,
  invalidCells,
  pencilMode,
  setPencilMode,
  mistakes,
  maxMistakes,
  hintCount,
  gameState,
  setGameState,
  loading,
  shake,
  shakeLevel,
  solutionRef,
  handleInput,
  handleHint,
  handleReset,
  newGame,
} = useSudokuGame({ mode, dailyDate, difficulty });

  useEffect(() => {
    function handleKeyDown(e) {
      if (!selected || gameState !== "playing") return;

      const { row, col } = selected;

      // Numbers 1–9
      if (e.key >= "1" && e.key <= "9") {
        handleInput(Number(e.key));
      }

      // Clear cell
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
          handleInput(0);
       
      }

      // Arrow navigation
      if (e.key === "ArrowUp") setSelected({ row: clamp(row - 1, 0, 8), col });
      if (e.key === "ArrowDown")
        setSelected({ row: clamp(row + 1, 0, 8), col });
      if (e.key === "ArrowLeft")
        setSelected({ row, col: clamp(col - 1, 0, 8) });
      if (e.key === "ArrowRight")
        setSelected({ row, col: clamp(col + 1, 0, 8) });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, gameState, handleInput]);


useEffect(() => {
  const storageKey = getStorageKey();
  const saved = loadSavedGame(storageKey);

  if (saved) {
    newGame(saved); // ✅ restore
  } else {
    newGame(); // ✅ fresh game
  }
}, [mode, difficulty]);



  useEffect(() => {
    if (loading || !solutionRef.current) return;

    const storageKey = getStorageKey();

    saveGame(storageKey, {
      board,
      initialBoard,
      solution: solutionRef.current,
      notes,
      hintCount,
      mistakes,
      invalidCells: [...invalidCells],
      gameState,
      difficulty,
      mode,
      dailyDate,
    });
  }, [
    board,
    notes,
    hintCount,
    mistakes,
    invalidCells,
    gameState,
    difficulty,
    mode,
    dailyDate,
    loading,
  ]);

  function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}



function getStorageKey() {
  if (mode === "daily") {
    return `sudoku:daily:${dailyDate}`;
  }
  return `sudoku:normal:${difficulty}`;
}
  if (loading) return <div>Loading...</div>;

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Helmet>
       
    <meta
      name="description"
      content="Play free online Sudoku puzzles with daily challenges, hints, timer, notes, and 4 difficulty levels. Fast, clean, and mobile-friendly Sudoku game."
    />
      </Helmet>
      <div className="bg-white p-6 rounded-xl shadow-lg w-fit ">
        <Timer paused={gameState !== "playing"} />
        <div className="flex justify-center gap-2 mb-3">
  {[...Array(maxMistakes)].map((_, i) => (
    <span
      key={i}
      className={`text-2xl ${
        i < mistakes ? "text-red-500" : "text-gray-300"
      }`}
    >
      ❌
    </span>
  ))}
</div>

        {gameState === "won" && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 rounded text-center">
            <h2 className="text-2xl font-bold text-green-700">
              🎉 Puzzle Solved!
            </h2>
            <p className="text-green-600 mt-1">
              Great job! You completed the Sudoku.
            </p>
            <button
  onClick={() => window.open("https://forms.gle/NUkpFx1ZsGesNXBa7", "_blank")}
  className="px-4 py-2 bg-gray-900 text-white rounded"
>
  💬 Give Feedback
</button>
          </div>
        )}
        {gameState === "lost" && (
  <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded text-center">
    <h2 className="text-2xl font-bold text-red-700">💥 Game Over</h2>
    <p className="text-red-600 mt-1">
      You made {maxMistakes} mistakes.
    </p>
    <button
  onClick={() => window.open("https://forms.gle/NUkpFx1ZsGesNXBa7", "_blank")}
  className="px-4 py-2 bg-gray-900 text-white rounded"
>
  💬 Give Feedback
</button>

  </div>
)}


        <div className="flex gap-3 justify-center mb-4">
          <button
            onClick={() => {
              clearGame(getStorageKey());
              newGame();
            }}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            🎲 New Game
          </button>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="extreme">Extreme</option>
          </select>

          <button
            onClick={() =>
              setGameState(gameState === "paused" ? "playing" : "paused")
            }
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            {gameState === "paused" ? "▶ Resume" : "⏸ Pause"}
          </button>
        </div>

        <div
  className={`
    ${gameState !== "playing" ? "blur-sm pointer-events-none" : ""}
    ${shake ? "shake" : ""}
  `}
    style={{
    "--shake-power": Math.min(shakeLevel, 4)
  }}
>

          <SudokuGrid
            board={board}
            initialBoard={initialBoard}
            selected={selected}
            setSelected={setSelected}
            invalidCells={invalidCells}
            notes={notes}
            selectedValue={selected ? board[selected.row][selected.col] : null}
          />
        </div>

        <div className="flex gap-2 mt-4 justify-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
           aria-label={`Enter number ${n}`}
              onClick={() => handleInput(n)}
              disabled={gameState === "paused"}
              className={`w-10 h-10 rounded ${
                gameState === "paused"
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={() => setPencilMode(!pencilMode)}
            className={`px-4 py-2 rounded ${
              pencilMode ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            ✏ Pencil
          </button>

          <button
            onClick={handleHint}
            disabled={hintCount >= 3}
            className={`px-4 py-2 rounded text-white ${
              hintCount >= 3 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
            }`}
          >
            💡 Hint ({3 - hintCount})
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            🔄 Reset
          </button>
          
        </div>
        <p id="sudoku-game-instructions" className="sr-only">
  This is an interactive Sudoku puzzle. Use the keyboard or on-screen
  number buttons to fill the grid. You can pause the timer, use hints,
  enable pencil mode, or reset the puzzle at any time.
</p>

        
      </div>
      
    </div>
  );
}
