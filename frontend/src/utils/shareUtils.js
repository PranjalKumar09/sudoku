/**
 * Share game results using Web Share API or fallback to clipboard
 */
export async function shareGameResult({ difficulty, time, mistakes, hintsUsed }) {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const shareText = `🎮 I just completed a ${difficulty} Sudoku puzzle!
⏱️ Time: ${formatTime(time)}
❌ Mistakes: ${mistakes}/3
💡 Hints: ${hintsUsed}/3

Play Sudoku online: ${window.location.origin}`;

    // Try native Web Share API first (mobile)
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Sudoku Victory!",
                text: shareText,
            });
            return { success: true, method: "share" };
        } catch (err) {
            if (err.name === "AbortError") {
                // User cancelled share
                return { success: false, cancelled: true };
            }
            console.warn("Share failed, falling back to clipboard", err);
        }
    }

    // Fallback to clipboard
    try {
        await navigator.clipboard.writeText(shareText);
        return { success: true, method: "clipboard" };
    } catch (err) {
        console.error("Clipboard write failed", err);
        return { success: false, error: "Clipboard access denied" };
    }
}

/**
 * Show confetti animation on win
 */
export function showConfetti(duration = 3000) {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
    const confettiCount = 50;
    const confettiElements = [];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.animationDuration = `${2 + Math.random()}s`;

        document.body.appendChild(confetti);
        confettiElements.push(confetti);
    }

    // Clean up after animation
    setTimeout(() => {
        confettiElements.forEach((el) => el.remove());
    }, duration);
}
