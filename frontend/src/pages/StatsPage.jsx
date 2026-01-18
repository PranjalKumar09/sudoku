import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getStats, resetStats, exportStats, formatTime } from "../utils/statsService";
import { useState } from "react";

export default function StatsPage() {
    const [stats, setStats] = useState(getStats());

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all statistics? This cannot be undone.")) {
            resetStats();
            setStats(getStats());
        }
    };

    const winRate = stats.gamesPlayed > 0
        ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
        : 0;

    const avgTime = stats.gamesWon > 0
        ? Math.round(stats.totalTime / stats.gamesWon)
        : 0;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Helmet>
                <title>Your Statistics | Free Online Sudoku</title>
                <meta name="description" content="View your Sudoku game statistics, streaks, best times, and performance by difficulty level." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Your Statistics</h1>
                        <p className="text-gray-600 mt-2">Track your Sudoku progress and achievements</p>
                    </div>
                    <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
                        ← Back to Game
                    </Link>
                </div>

                {/* Overall Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard title="Games Played" value={stats.gamesPlayed} icon="🎮" />
                    <StatCard title="Games Won" value={stats.gamesWon} icon="🏆" />
                    <StatCard title="Win Rate" value={`${winRate}%`} icon="📊" />
                    <StatCard title="Current Streak" value={stats.currentStreak} icon="🔥" />
                </div>

                {/* Streaks and Times */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Streaks</h2>
                        <div className="space-y-3">
                            <StatRow label="Current Streak" value={`${stats.currentStreak} ${stats.currentStreak === 1 ? 'day' : 'days'}`} />
                            <StatRow label="Longest Streak" value={`${stats.longestStreak} ${stats.longestStreak === 1 ? 'day' : 'days'}`} />
                            <StatRow label="Last Played" value={stats.lastPlayedDate || 'Never'} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Time Stats</h2>
                        <div className="space-y-3">
                            <StatRow label="Average Time" value={formatTime(avgTime)} />
                            <StatRow label="Total Time Played" value={formatTime(stats.totalTime)} />
                            <StatRow label="Hints Used" value={stats.hintsUsed} />
                            <StatRow label="Mistakes Made" value={stats.mistakesMade} />
                        </div>
                    </div>
                </div>

                {/* By Difficulty */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Performance by Difficulty</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Difficulty</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Played</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Won</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Win Rate</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Best Time</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Avg Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Object.entries(stats.byDifficulty).map(([diff, data]) => {
                                    const winRate = data.played > 0 ? Math.round((data.won / data.played) * 100) : 0;
                                    return (
                                        <tr key={diff} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 capitalize font-medium">{diff}</td>
                                            <td className="px-4 py-3">{data.played}</td>
                                            <td className="px-4 py-3">{data.won}</td>
                                            <td className="px-4 py-3">{winRate}%</td>
                                            <td className="px-4 py-3">
                                                {stats.bestTimes[diff] ? formatTime(stats.bestTimes[diff]) : '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {data.avgTime > 0 ? formatTime(Math.round(data.avgTime)) : '-'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={exportStats}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        📥 Export Stats
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        🔄 Reset Stats
                    </button>
                </div>

                {/* Achievements Section (if games played) */}
                {stats.gamesPlayed > 0 && (
                    <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">🏅 Achievements</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <Achievement
                                unlocked={stats.gamesPlayed >= 1}
                                title="First Game"
                                desc="Play your first game"
                            />
                            <Achievement
                                unlocked={stats.gamesWon >= 1}
                                title="First Win"
                                desc="Win your first game"
                            />
                            <Achievement
                                unlocked={stats.gamesWon >= 10}
                                title="Puzzle Master"
                                desc="Win 10 games"
                            />
                            <Achievement
                                unlocked={stats.currentStreak >= 3}
                                title="On Fire!"
                                desc="3-day streak"
                            />
                            <Achievement
                                unlocked={stats.currentStreak >= 7}
                                title="Week Warrior"
                                desc="7-day streak"
                            />
                            <Achievement
                                unlocked={stats.byDifficulty.extreme.won >= 1}
                                title="Extreme Champion"
                                desc="Win an extreme puzzle"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-600">{title}</div>
        </div>
    );
}

function StatRow({ label, value }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-gray-600">{label}:</span>
            <span className="font-semibold text-gray-900">{value}</span>
        </div>
    );
}

function Achievement({ unlocked, title, desc }) {
    return (
        <div
            className={`p-4 rounded-lg border-2 ${unlocked
                    ? "bg-yellow-50 border-yellow-400"
                    : "bg-gray-100 border-gray-300 opacity-50"
                }`}
        >
            <div className="text-2xl mb-1">{unlocked ? "🏆" : "🔒"}</div>
            <div className="font-semibold text-sm">{title}</div>
            <div className="text-xs text-gray-600">{desc}</div>
        </div>
    );
}
