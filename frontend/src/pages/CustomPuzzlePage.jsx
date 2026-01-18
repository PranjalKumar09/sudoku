import { Helmet } from "react-helmet-async";
import { useState } from "react";
import SudokuGrid from "../components/SudokuGrid";

export default function CustomPuzzlePage() {
    const [inputMode, setInputMode] = useState(true);
    const [board, setBoard] = useState(
        Array.from({ length: 9 }, () => Array(9).fill(0))
    );
    const [initialBoard, setInitialBoard] = useState([]);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState("");

    const handleCellInput = (num) => {
        if (!selected) return;
        const { row, col } = selected;
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = num;
        setBoard(newBoard);
        setError("");
    };

    const validatePuzzle = () => {
        // Check if puzzle has at least 17 clues (minimum for unique solution)
        const clueCount = board.flat().filter((n) => n !== 0).length;
        if (clueCount < 17) {
            setError("Puzzle must have at least 17 numbers filled in.");
            return false;
        }

        // Check for conflicts in rows, columns, and boxes
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const num = board[row][col];
                if (num === 0) continue;

                // Check row
                for (let c = 0; c < 9; c++) {
                    if (c !== col && board[row][c] === num) {
                        setError(`Duplicate ${num} in row ${row + 1}`);
                        return false;
                    }
                }

                // Check column
                for (let r = 0; r < 9; r++) {
                    if (r !== row && board[r][col] === num) {
                        setError(`Duplicate ${num} in column ${col + 1}`);
                        return false;
                    }
                }

                // Check 3x3 box
                const boxRow = Math.floor(row / 3) * 3;
                const boxCol = Math.floor(col / 3) * 3;
                for (let r = boxRow; r < boxRow + 3; r++) {
                    for (let c = boxCol; c < boxCol + 3; c++) {
                        if ((r !== row || c !== col) && board[r][c] === num) {
                            setError(`Duplicate ${num} in 3×3 box`);
                            return false;
                        }
                    }
                }
            }
        }

        return true;
    };

    const startSolving = () => {
        if (!validatePuzzle()) return;

        setInitialBoard(board.map((r) => [...r]));
        setInputMode(false);
        setError("");
    };

    const clearBoard = () => {
        setBoard(Array.from({ length: 9 }, () => Array(9).fill(0)));
        setError("");
    };

    const resetToInput = () => {
        setInputMode(true);
        setBoard(initialBoard.map((r) => [...r]));
    };

    const loadExample = () => {
        // Example easy puzzle
        const example = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9],
        ];
        setBoard(example);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
            <Helmet>
                <title>Custom Puzzle | Sudoku</title>
                <meta
                    name="description"
                    content="Enter and solve your own Sudoku puzzles or import puzzles from newspapers."
                />
            </Helmet>

            <div className="bg-white p-6 rounded-xl shadow-lg w-fit">
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">
                        {inputMode ? "✏️ Enter Custom Puzzle" : "🧩 Solve Your Puzzle"}
                    </h1>
                    <p className="text-gray-600">
                        {inputMode
                            ? "Click cells and enter numbers to create your puzzle"
                            : "Now solve the puzzle you entered!"}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded text-red-700 text-sm">
                        ⚠️ {error}
                    </div>
                )}

                {/* Grid */}
                <div className="mb-4">
                    <SudokuGrid
                        board={board}
                        initialBoard={inputMode ? [] : initialBoard}
                        selected={selected}
                        setSelected={setSelected}
                        invalidCells={new Set()}
                        notes={{}}
                        selectedValue={selected ? board[selected.row][selected.col] : null}
                    />
                </div>

                {/* Number Input */}
                <div className="flex gap-2 mt-4 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
                        <button
                            key={n}
                            onClick={() => handleCellInput(n)}
                            className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 font-semibold"
                        >
                            {n === 0 ? "×" : n}
                        </button>
                    ))}
                </div>

                {/* Controls */}
                {inputMode ? (
                    <div className="flex gap-3 mt-4 justify-center flex-wrap">
                        <button
                            onClick={loadExample}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            📝 Load Example
                        </button>
                        <button
                            onClick={clearBoard}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            🗑️ Clear All
                        </button>
                        <button
                            onClick={startSolving}
                            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
                        >
                            ✅ Start Solving
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-3 mt-4 justify-center">
                        <button
                            onClick={resetToInput}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            ← Back to Edit
                        </button>
                        <button
                            onClick={clearBoard}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            🔄 Clear Solution
                        </button>
                    </div>
                )}

                {/* Instructions */}
                <div className="mt-6 p-4 bg-blue-50 rounded text-sm text-gray-700">
                    <p className="font-semibold mb-2">📖 Instructions:</p>
                    <ul className="space-y-1 text-xs">
                        <li>• Click a cell, then click a number to fill it</li>
                        <li>• Click × (zero) to clear a cell</li>
                        <li>• Minimum 17 numbers required for a valid puzzle</li>
                        <li>• No duplicate numbers in rows, columns, or 3×3 boxes</li>
                        <li>• Click "Load Example" to see a sample puzzle</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
