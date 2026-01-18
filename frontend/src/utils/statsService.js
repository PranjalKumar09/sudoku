// Statistics Service - Track game performance

const STATS_KEY = "sudoku-statistics";

function getDefaultStats() {
    return {
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalTime: 0, // in seconds
        bestTimes: {
            easy: null,
            medium: null,
            hard: null,
            extreme: null,
        },
        byDifficulty: {
            easy: { played: 0, won: 0, avgTime: 0 },
            medium: { played: 0, won: 0, avgTime: 0 },
            hard: { played: 0, won: 0, avgTime: 0 },
            extreme: { played: 0, won: 0, avgTime: 0 },
        },
        hintsUsed: 0,
        mistakesMade: 0,
        lastPlayedDate: null,
    };
}

export function getStats() {
    try {
        const saved = localStorage.getItem(STATS_KEY);
        return saved ? JSON.parse(saved) : getDefaultStats();
    } catch {
        return getDefaultStats();
    }
}

function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function recordGameStart(difficulty) {
    const stats = getStats();
    stats.byDifficulty[difficulty].played += 1;
    stats.gamesPlayed += 1;
    saveStats(stats);
}

export function recordGameWon(difficulty, timeInSeconds, hintsUsed, mistakes) {
    const stats = getStats();
    const today = new Date().toDateString();

    // Update wins
    stats.gamesWon += 1;
    stats.byDifficulty[difficulty].won += 1;

    // Update streak
    if (stats.lastPlayedDate === today) {
        // Same day, count as same streak
    } else if (stats.lastPlayedDate) {
        const lastDate = new Date(stats.lastPlayedDate);
        const currentDate = new Date(today);
        const diffDays = Math.floor(
            (currentDate - lastDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
            // Consecutive day
            stats.currentStreak += 1;
        } else {
            // Streak broken
            stats.currentStreak = 1;
        }
    } else {
        // First game
        stats.currentStreak = 1;
    }

    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
    stats.lastPlayedDate = today;

    // Update time stats
    stats.totalTime += timeInSeconds;

    const diffStats = stats.byDifficulty[difficulty];
    const prevAvg = diffStats.avgTime || 0;
    const prevCount = diffStats.won - 1;
    diffStats.avgTime =
        prevCount > 0
            ? (prevAvg * prevCount + timeInSeconds) / diffStats.won
            : timeInSeconds;

    // Update best time
    if (
        !stats.bestTimes[difficulty] ||
        timeInSeconds < stats.bestTimes[difficulty]
    ) {
        stats.bestTimes[difficulty] = timeInSeconds;
    }

    // Track hints and mistakes
    stats.hintsUsed += hintsUsed;
    stats.mistakesMade += mistakes;

    saveStats(stats);
}

export function recordGameLost(difficulty) {
    const stats = getStats();
    stats.gamesLost += 1;

    // Reset streak on loss
    stats.currentStreak = 0;
    stats.lastPlayedDate = new Date().toDateString();

    saveStats(stats);
}

export function resetStats() {
    saveStats(getDefaultStats());
}

export function exportStats() {
    const stats = getStats();
    const dataStr = JSON.stringify(stats, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sudoku-stats-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}
