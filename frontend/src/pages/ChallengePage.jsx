import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import SudokuGrid from "../components/SudokuGrid";
import { useSudokuGame } from "../hooks/useSudokuGame";
import { recordGameWon } from "../utils/statsService";
import { showConfetti } from "../utils/shareUtils";

export default function ChallengePage() {
    const LIVES = 5;
    const [currentLevel, setCurrentLevel] = useState(1);
    const [lives, setLives] = useState(LIVES);
    const [gameOver, setGameOver] = useState(false);
    const [startTime, setStartTime] = useState(null);

    // Progressive difficulty
    const getDifficulty = (level) => {
        if (level <= 2) return "easy";
        if (level <= 5) return "medium";
        if (level <= 8) return "hard";
        return "extreme";
    };

    const [difficulty, setDifficulty] = useState(getDifficulty(1));

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
        gameState,
        setGameState,
        loading,
        shake,
        shakeLevel,
        handleInput,
        handleHint,
        handleReset,
        newGame,
    } = useSudokuGame({ mode: "challenge", difficulty });

    // Track mistakes to lose lives
    useEffect(() => {
        if (mistakes > 0 && gameState === "playing") {
            setLives((prev) => {
                const newLives = Math.max(0, prev - 1);
                if (newLives === 0) {
                    setGameOver(true);
                    setGameState("lost");
                }
                return newLives;
            });
        }
    }, [mistakes, gameState, setGameState]);

    // Handle level completion
    useEffect(() => {
        if (gameState === "won" && !gameOver) {
            const time = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
            recordGameWon(difficulty, time, 0, mistakes);
            showConfetti(2000);

            setTimeout(() => {
                const nextLevel = currentLevel + 1;
                setCurrentLevel(nextLevel);
                setDifficulty(getDifficulty(nextLevel));
                setStartTime(Date.now());
                newGame();
                setGameState("playing");
            }, 2000);
        }
    }, [gameState, gameOver, currentLevel, difficulty, mistakes, startTime, newGame, setGameState]);

    const startChallenge = () => {
        setCurrentLevel(1);
        setLives(LIVES);
        setGameOver(false);
        setDifficulty("easy");
        setStartTime(Date.now());
        newGame();
        setGameState("playing");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
            <Helmet>
                <title>Challenge Mode | Sudoku</title>
                <meta name="description" content="Progressive difficulty challenge. How far can you go?" />
            </Helmet>

            <div className="bg-white p-6 rounded-xl shadow-lg w-fit">
                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold text-orange-900 mb-2">🔥 Challenge Mode</h1>
                    <p className="text-gray-600">Progressive difficulty - how far can you go?</p>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-8 mb-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">Level {currentLevel}</div>
                        <div className="text-sm text-gray-600 capitalize">{difficulty}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                            {"❤️".repeat(lives)}
                            {"🖤".repeat(LIVES - lives)}
                        </div>
                        <div className="text-sm text-gray-600">Lives</div>
                    </div>
                </div>

                {/* Game Over / Start Screen */}
                {(!startTime || gameOver) ? (
                    <div className="text-center py-8">
                        {gameOver ? (
                            <>
                                <div className="text-6xl mb-4">💀</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Challenge Failed!</h2>
                                <p className="text-xl text-orange-600 mb-4">
                                    You reached <strong>Level {currentLevel}</strong>
                                </p>
                                <p className="text-gray-600 mb-6">
                                    Difficulty: <span className="capitalize font-semibold">{difficulty}</span>
                                </p>
                                <button
                                    onClick={startChallenge}
                                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
                                >
                                    🔄 Try Again
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="text-6xl mb-4">🎯</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready for the Challenge?</h2>
                                <div className="text-left max-w-md mb-6 space-y-2 text-gray-600">
                                    <p>📈 <strong>Progressive Difficulty:</strong> Start easy, get harder</p>
                                    <p>❤️ <strong>Lives System:</strong> {LIVES} lives, lose one per mistake</p>
                                    <p>🏆 <strong>Goal:</strong> Reach the highest level possible</p>
                                    <p className="text-sm text-gray-500 mt-4">
                                        Levels 1-2: Easy • 3-5: Medium • 6-8: Hard • 9+: Extreme
                                    </p>
                                </div>
                                <button
                                    onClick={startChallenge}
                                    className="px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-bold text-lg"
                                >
                                    🚀 Start Challenge
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Win Message */}
                        {gameState === "won" && (
                            <div className="mb-4 p-4 bg-green-100 border border-green-400 rounded text-center">
                                <h2 className="text-xl font-bold text-green-700">
                                    ✅ Level {currentLevel} Complete!
                                </h2>
                                <p className="text-green-600">Loading next level...</p>
                            </div>
                        )}

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
                                    disabled={gameState !== "playing"}
                                    className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 font-semibold disabled:opacity-50"
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
                            <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white rounded">
                                🔄 Reset Level
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
