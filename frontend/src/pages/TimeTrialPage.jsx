import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import SudokuGrid from "../components/SudokuGrid";
import { useSudokuGame } from "../hooks/useSudokuGame";
import { recordGameWon } from "../utils/statsService";
import { showConfetti, shareGameResult } from "../utils/shareUtils";

export default function TimeTrialPage() {
    const TIME_LIMIT = 300; // 5 minutes in seconds
    const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT);
    const [puzzlesSolved, setPuzzlesSolved] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const [difficulty] = useState("easy"); // Time trial uses easy puzzles for speed

    const {
        board,
        initialBoard,
        selected,
        setSelected,
        notes,
        invalidCells,
        pencilMode,
        setPencilMode,
        gameState,
        setGameState,
        loading,
        shake,
        shakeLevel,
        handleInput,
        handleHint,
        handleReset,
        newGame,
    } = useSudokuGame({ mode: "time-trial", difficulty });

    // Countdown timer
    useEffect(() => {
        if (!gameActive || timeRemaining <= 0) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    setGameActive(false);
                    setGameState("lost");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameActive, timeRemaining, setGameState]);

    // Auto-start next puzzle on win
    useEffect(() => {
        if (gameState === "won" && gameActive) {
            setPuzzlesSolved((prev) => prev + 1);
            recordGameWon(difficulty, 0, 0, 0); // Record win
            setTimeout(() => {
                newGame(); // Start next puzzle
                setGameState("playing");
            }, 1000);
        }
    }, [gameState, gameActive, difficulty, newGame, setGameState]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const startGame = () => {
        setGameActive(true);
        setTimeRemaining(TIME_LIMIT);
        setPuzzlesSolved(0);
        newGame();
        setGameState("playing");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
            <Helmet>
                <title>Time Trial Mode | Sudoku</title>
                <meta name="description" content="Test your speed! Solve as many Sudoku puzzles as you can in 5 minutes." />
            </Helmet>

            <div className="bg-white p-6 rounded-xl shadow-lg w-fit">
                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold text-purple-900 mb-2">⏱️ Time Trial</h1>
                    <p className="text-gray-600">Solve as many puzzles as you can in 5 minutes!</p>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-8 mb-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">
                            {formatTime(timeRemaining)}
                        </div>
                        <div className="text-sm text-gray-600">Time Left</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{puzzlesSolved}</div>
                        <div className="text-sm text-gray-600">Solved</div>
                    </div>
                </div>

                {/* Start/Game Over Screen */}
                {!gameActive ? (
                    <div className="text-center py-8">
                        {timeRemaining === 0 ? (
                            <>
                                <div className="text-6xl mb-4">🎯</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Time's Up!</h2>
                                <p className="text-xl text-purple-600 mb-4">
                                    You solved <strong>{puzzlesSolved}</strong> puzzle{puzzlesSolved !== 1 ? 's' : ''}!
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={startGame}
                                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
                                    >
                                        🔄 Try Again
                                    </button>
                                    <button
                                        onClick={() => shareGameResult({
                                            difficulty: 'time-trial',
                                            time: TIME_LIMIT,
                                            mistakes: 0,
                                            hintsUsed: puzzlesSolved
                                        })}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        📤 Share Score
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-6xl mb-4">⚡</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Race?</h2>
                                <p className="text-gray-600 mb-6 max-w-md">
                                    You have <strong>5 minutes</strong> to solve as many easy Sudoku puzzles as possible.
                                    Each puzzle automatically advances when completed. Go fast!
                                </p>
                                <button
                                    onClick={startGame}
                                    className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold text-lg"
                                >
                                    🚀 Start Time Trial
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Game Board */}
                        <div className={`${shake ? "shake" : ""}`} style={{ "--shake-power": shakeLevel }}>
                            {!loading && (
                                <SudokuGrid
                                    board={board}
                                    initialBoard={initialBoard}
                                    selected={selected}
                                    setSelected={setSelected}
                                    invalidCells={invalidCells}
                                    notes={notes}
                                    selectedValue={selected ? board[selected.row][selected.col] : null}
                                />
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex gap-2 mt-4 justify-center">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                <button
                                    key={n}
                                    onClick={() => handleInput(n)}
                                    className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 font-semibold"
                                >
                                    {n}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-4 justify-center">
                            <button
                                onClick={() => setPencilMode(!pencilMode)}
                                className={`px-4 py-2 rounded ${pencilMode ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                ✏ Pencil
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                🔄 Reset
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
