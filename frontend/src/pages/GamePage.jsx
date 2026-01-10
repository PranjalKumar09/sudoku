import { useEffect, useRef, useState } from "react";
import { generateSudoku, generateDailySudoku } from "../api/sudokuApi";
import SudokuGrid from "../components/SudokuGrid";
import Timer from "../components/Timer";

export default function GamePage() {
  const solutionRef = useRef(null); // 🔐 solution in memory only

  const [initialBoard, setInitialBoard] = useState([]);
  const [gameState, setGameState] = useState("playing"); 
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState(null);
  const [invalidCells, setInvalidCells] = useState(new Set());
  const [pencilMode, setPencilMode] = useState(false);
  const [notes, setNotes] = useState({});
  const [hintCount, setHintCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("normal"); // "normal" | "daily"
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    loadGame();
  }, [mode, difficulty]);

  async function loadGame() {
    setLoading(true);

    const res =
      mode === "daily"
        ? await generateDailySudoku()
        : await generateSudoku(difficulty);

    const { puzzle, solution } = res.data;

    setBoard(puzzle);
    setInitialBoard(puzzle.map((r) => [...r]));
    solutionRef.current = solution;

    setInvalidCells(new Set());
    setNotes({});
    setSelected(null);
    setHintCount(0);

    setLoading(false);
  }

  function handleInput(num) {
    if (!selected) return;

    const { row, col } = selected;

    // 🔒 original cells locked
    if (initialBoard[row][col] !== 0) return;

    // ✏ pencil mode
    if (pencilMode) {
      const key = `${row}-${col}`;
      const current = notes[key] || new Set();
      const next = new Set(current);
      next.has(num) ? next.delete(num) : next.add(num);
      setNotes({ ...notes, [key]: next });
      return;
    }

    const correct = solutionRef.current[row][col] === num;

    if (!correct) {
      setInvalidCells(new Set([...invalidCells, `${row}-${col}`]));
      return;
    }

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = num;
    setBoard(newBoard);

    const newInvalid = new Set(invalidCells);
    newInvalid.delete(`${row}-${col}`);
    setInvalidCells(newInvalid);
  }
  function handleReset() {
  setBoard(initialBoard.map(r => [...r]));
  setInvalidCells(new Set());
  setNotes({});
  setSelected(null);
  setHintCount(0);
}


  function handleHint() {
    if (!selected) {
      alert("Select a cell first");
      return;
    }

    if (hintCount >= 3) {
      alert("Maximum 3 hints allowed");
      return;
    }

    const { row, col } = selected;

    if (board[row][col] !== 0) {
      alert("Hint only works on empty cells");
      return;
    }

    const value = solutionRef.current[row][col];
    setHintCount(hintCount + 1);
    handleInput(value);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-fit">
      <Timer />
      <div className="flex gap-3 justify-center mb-4">
        <button
      onClick={loadGame}
      className="px-4 py-2 bg-purple-500 text-white rounded"
    >
      🎲 New Game
    </button>


        <button
          onClick={() => {setMode("daily"); loadGame ()}}
          className={`px-4 py-2 rounded ${
            mode === "daily" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          📅 Daily
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

      <div className={gameState === "paused" ? "blur-sm pointer-events-none" : ""}>
  <SudokuGrid
    board={board}
    initialBoard={initialBoard}
    selected={selected}
    setSelected={setSelected}
    invalidCells={invalidCells}
    notes={notes}
  />
</div>


      <div className="flex gap-2 mt-4 justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => handleInput(n)}
            className="w-10 h-10 bg-gray-200 rounded hover:bg-gray-300"
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
    </div>
  );
}
